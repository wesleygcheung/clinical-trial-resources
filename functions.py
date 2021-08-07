import pandas as pd
import numpy as np
import math
from dateutil.relativedelta import *
from functools import reduce

def enrollment_forecast(data):
    df = pd.DataFrame.from_dict(data['tableData'])
    df['Screeners Per Month'] = df.apply(lambda x: round(float(x['Enrollment Rate'])/(1-(float(x['Screen Fail Rate']))),3), axis=1)
    df['Start Date'] = pd.to_datetime(df['Start Date'])
    df['Stop Date'] = pd.to_datetime(df['Stop Date'])
    if data['Current Enrollment'] == '':
        targetEnrollment = int(data['Target Enrollment'])
    else:
        targetEnrollment = int(data['Target Enrollment']) - int(data['Current Enrollment'])

    # Add suffix for duplicate country names in the case of stop and then restart
    # Each duplicate country will iterate as a unique country and then be merged as one country
    duplicateCountrySuffix = df.groupby(df['Country']).cumcount().astype('str')
    duplicateCountrySuffix = "-"+duplicateCountrySuffix
    duplicateCountrySuffix = duplicateCountrySuffix.str.replace("-0","")
    df['Country'] = df['Country'] + duplicateCountrySuffix

    # Create Rand and Screeners columns as an empty list per country
    df['Rand'] = np.empty((len(df), 0)).tolist()
    df['Screeners'] = np.empty((len(df), 0)).tolist()

    # Check if there are any missing stop dates - if all countries have stop dates we may break the loop at the max stop date.
    stopDateChecker = df['Stop Date'].isna().values.any() 
    maxStopDate = df['Stop Date'].max()

    # Lists to include in dictionary to turn into Dataframe
    forecastDict = {'Country': [],'Date': [],'Screeners': [],'Rand': []}

    monthIterator = 0 # start date iterator varaible

    # Loop until target enrollment is met or max stop date is met. Loop starts at min start date and adds 1 month per loop.
    while sum(forecastDict['Rand']) < targetEnrollment:
        startdate=df['Start Date'].min() + relativedelta(months=monthIterator) #Add a new month per iteration of while loop
        for country in df['Country']:
            countryScreenRate=float(df.loc[(df['Country'] == country),'Screeners Per Month'].iloc[0])
            countryScreenFailRate = float(df.loc[(df['Country'] == country),'Screen Fail Rate'].iloc[0])
            countryStartDate=df.loc[(df['Country'] == country),'Start Date'].iloc[0]
            countryRandList=df.loc[(df['Country'] == country),'Rand'].iloc[0]
            countryStopDate = df.loc[(df['Country'] == country), 'Stop Date'].iloc[0]
            countryScreenRateRounded = math.ceil(countryScreenRate)
            # If country start date has occurred and no stop date or loop date is less than stop date
            if countryStartDate <= startdate and (pd.isna(countryStopDate) or startdate < countryStopDate) and countryScreenFailRate < 1.0:
                # Loop once per screeners per month for the country
                for day in range(countryScreenRateRounded):
                    # Calculate the country's current screeners per month by using the country specific screening list
                    countryScreenList=df.loc[(df['Country'] == country),'Screeners'].iloc[0]
                    countryTotalScreened = len(countryScreenList)
                    monthsElapsed = (startdate.year - countryStartDate.year)*12 + (startdate.month - countryStartDate.month) + 1
                    if monthsElapsed == 0:
                        currentCountryScreenRate = 0
                    else:
                        currentCountryScreenRate = float(countryTotalScreened / monthsElapsed)
                    # If the current month's screening rate is lower than the country's set screening rate, perform actions below.
                    if currentCountryScreenRate < countryScreenRate:
                        forecastDict['Country'].extend([country]) # Add the country name to the global country list
                        countryScreenList.extend([1]) # Add a new screener to the country screening list
                        forecastDict['Date'].append(startdate.strftime('%d-%b-%Y')) # Add the current looped month to the global date list
                        # Calculate the country's screen failure % as the mean of the country randomization list
                        countryTotalRandomized = len(countryRandList)
                        if countryTotalRandomized == 0:
                            currentCountryScreenFailRate = 0
                        else:
                            currentCountryScreenFailRate = np.mean(countryRandList)
                        if countryTotalRandomized == 0: # Always randomize the first screening subject
                            countryRandList.extend([1])
                            forecastDict['Rand'].extend([1])
                        elif currentCountryScreenFailRate > (1-countryScreenFailRate):
                            countryRandList.extend([0])
                            forecastDict['Rand'].extend([0])
                        else:
                            countryRandList.extend([1])
                            forecastDict['Rand'].extend([1])
        monthIterator+=1
        if pd.notnull(maxStopDate) and maxStopDate < startdate and stopDateChecker == False:
            break
    forecastDict['Screeners'] = [1 for i in forecastDict['Rand']] # Match list of enrolled/screen failed with a screener
    # Combine all the lists created from the loop into a dictionary and then into a dataframe    
    dfTotal = pd.DataFrame(forecastDict)

    # Split by delimiter only if there are duplicate countries
    if True in dfTotal['Country'].str.contains('\\-[0-9]*',regex=True).tolist():
        dfTotal[['Country','Junk']] = dfTotal['Country'].str.split('-',expand=True) 
        dfTotal = dfTotal[['Country','Date','Screeners','Rand']]
    else:
        dfTotal = dfTotal[['Country','Date','Screeners','Rand']]

    # Filter out any enrolled or screened after target enrollment was met
    dfTotal['Running Total'] = dfTotal['Rand'].cumsum()
    dfTotal = dfTotal.loc[dfTotal['Running Total'] <= targetEnrollment]
    dfTotal['Date'] = pd.to_datetime(dfTotal['Date'])
    dfTotal.drop(columns=['Running Total'], inplace=True)

    # Dataframe aggregated by country and month
    dfTotalAgg = dfTotal.groupby(['Country','Date']).agg({'Screeners': ['sum'], 'Rand': ['sum']})
    dfTotalAgg.columns = ['Screeners','Rand']
    dfTotalAgg = dfTotalAgg.reset_index()
    dfTotalAgg['Date'] = dfTotalAgg['Date'].dt.strftime('%Y-%m-%d')

    # Dataframe of total months forecasted for each country in the forecast
    dfMonths = dfTotal.groupby('Country')['Date'].nunique()
    
    # Dataframe to calculate SF% by Country
    dfMean = dfTotal.groupby(['Country'], as_index=False).mean()
    dfMean['Screen Fail Rate'] = 1 - dfMean['Rand']
    dfMean = dfMean[['Country','Screen Fail Rate']]

    # Dataframe of sum of screeners and sum of enrolled
    dfSum = dfTotal.groupby(['Country'], as_index=False).sum()

    # Create dataframe with screened, enrolled, sf%, and total months by country
    dfFinal = reduce(lambda left, right: pd.merge(left, right, on='Country'), [dfSum, dfMean, dfMonths])
    dfFinal['Enrollment Rate'] = dfFinal.apply(lambda x: round(x['Rand']/x['Date'],2), axis=1) # Calculate enrollment rate as enrolled divided by months
    dfFinal['Screen Fail Rate'] = dfFinal['Screen Fail Rate'].apply(lambda x: round(x*100,1))
    dfFinal.drop(columns=['Date'],inplace=True)

    # Initialize JSON AJAX payload
    plotlyData = {'Area Plot': {}, 'csv': [], 'Countries': dfFinal['Country'].tolist()}

    # Create dataframe of all unique months in forecast. 
    # Each country's data will be merged and NaNs for non-forecasted months filled as 0's so area chart can stack properly.
    dfAllMonths = pd.DataFrame(dfTotalAgg['Date'].unique(), columns=['Date']).sort_values(by=['Date'])
    countryDates = dfAllMonths['Date'].tolist()

    for country in plotlyData['Countries']:
        # Create mini-dataframe for this country, merge with all forecasted months and fill screened and enrolled NaNs as 0
        dfCountry = dfTotalAgg.loc[dfTotalAgg['Country']==country, ['Date','Screeners','Rand']]
        dfCountryMerge = dfAllMonths.merge(dfCountry,how='left',on='Date').sort_values(by=['Date'])
        dfCountryMerge.fillna(0,inplace=True)

        # Generate country running totals for screened and enrolled
        countryScreeners = dfCountryMerge['Screeners'].cumsum().tolist()
        countryEnrolled = dfCountryMerge['Rand'].cumsum().tolist()

        # Create area plot datasets as running totals of screened and enrolled by date
        plotlyData['Area Plot'][country] = {'Dates': countryDates, 'Screeners': countryScreeners, 'Enrolled': countryEnrolled} 

        # Add each row of the country dataframe to the JSON CSV payload
        for i in range(len(countryDates)):
            plotlyData['csv'].append([country,countryDates[i],countryScreeners[i],countryEnrolled[i]])
    
    # Sort CSV by date ascending
    plotlyData['csv'].sort(key=lambda x: x[1])

    # Generate datasets for horizontal bar plots
    for column in ['Screeners','Rand','Screen Fail Rate','Enrollment Rate']:
        plotlyData[column] = dfFinal[['Country',column]].sort_values(by=[column], ascending=True).values.tolist()
    
    # Generate dashboard BAN metrics
    plotlyData['Global SF Rate'] = round(float((1-dfFinal['Rand'].sum()/dfFinal['Screeners'].sum())*100),1)
    plotlyData['Global Randomized'] = int(dfFinal['Rand'].sum())
    plotlyData['Global Screened'] = int(dfFinal['Screeners'].sum())
    plotlyData['Global Start Date'] = dfTotal['Date'].min().strftime('%d-%b-%Y')
    plotlyData['Global Stop Date'] = dfTotal['Date'].max().strftime('%d-%b-%Y')
    plotlyData['Global Enrollment Rate'] = round(plotlyData['Global Randomized'] / int(dfMonths.sum()),2)

    return plotlyData