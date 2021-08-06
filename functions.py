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
    duplicateCountrySuffix = df.groupby(df['Country']).cumcount().astype('str')
    duplicateCountrySuffix = "-"+duplicateCountrySuffix
    duplicateCountrySuffix = duplicateCountrySuffix.str.replace("-0","")

    df['Country'] = df['Country'] + duplicateCountrySuffix
    df['Rand'] = np.empty((len(df), 0)).tolist() # Add Rand column with an empty list per country
    df['Screeners'] = np.empty((len(df), 0)).tolist() # Add Screeners column with an empty list per country
    stopDateChecker = df['Stop Date'].isna().values.any() #variable to check if there are any missing stop dates

    maxStopDate = df['Stop Date'].max() #variable to hold the maximum stop date if present

    # Lists to include in dictionary to turn into Dataframe
    dates = []
    screeners = []
    randomizers = []
    country = []
    i = 0 # start date iterator varaible

    # Loop to add rows of countries, month dates, screener counts, and randomization count
    while sum(randomizers) < targetEnrollment: # End once target enrollment number is met
        startdate=df['Start Date'].min() + relativedelta(months=i) #Add a new month per iteration of while loop
        
        for c in df['Country']: # Iterate and perform all actions below per country
            countryScreenRate=float(df.loc[(df['Country'] == c),'Screeners Per Month'].iloc[0])
            countryScreenFailRate = float(df.loc[(df['Country'] == c),'Screen Fail Rate'].iloc[0])
            countryStartDate=df.loc[(df['Country'] == c),'Start Date'].iloc[0]
            countryRandList=df.loc[(df['Country'] == c),'Rand'].iloc[0]
            countryStopDate = df.loc[(df['Country'] == c), 'Stop Date'].iloc[0]
            countryScreenRateRounded = math.ceil(countryScreenRate)
            if countryStartDate <= startdate and (pd.isna(countryStopDate) or startdate < countryStopDate) and countryScreenFailRate < 1.0: # if country start date occurred and no stop date or date is less than stop date
                for day in range(countryScreenRateRounded): #add the date to list * # of screeners that month
                    countryScreenList=df.loc[(df['Country'] == c),'Screeners'].iloc[0]
                    countryTotalScreened = len(countryScreenList)
                    monthsElapsed = (startdate.year - countryStartDate.year)*12 + (startdate.month - countryStartDate.month) + 1
                    if monthsElapsed == 0:
                        currentCountryScreenRate = 0
                    else:
                        currentCountryScreenRate = float(countryTotalScreened / monthsElapsed)
                    if currentCountryScreenRate < countryScreenRate:
                        screeners.extend([1])
                        country.extend([c])
                        countryScreenList.extend([1])
                        dates.append(startdate.strftime('%d-%b-%Y'))
                        countryTotalRandomized = len(countryRandList)
                        if countryTotalRandomized == 0:
                            currentCountryScreenFailRate = 0
                        else:
                            currentCountryScreenFailRate = np.mean(countryRandList[:(countryTotalRandomized)])
                        if countryTotalRandomized == 0:
                            countryRandList.extend([1])
                            randomizers.extend([1])
                        elif currentCountryScreenFailRate > (1-countryScreenFailRate):
                            countryRandList.extend([0])
                            randomizers.extend([0])
                        else:
                            countryRandList.extend([1])
                            randomizers.extend([1])
        i+=1
        if pd.notnull(maxStopDate) and maxStopDate < startdate and stopDateChecker == False:
            print("***Warning: Enrollment target was not met")
            break

    # Combine all the lists created from the loop into a dictionary and then into a dataframe    
    dict = {'Country': country,'Date': dates,'Screeners': screeners,'Rand': randomizers}
    dfTotal = pd.DataFrame(dict)

    #split by delimiter only if there are duplicate countries
    if True in dfTotal['Country'].str.contains('\\-[0-9]*',regex=True).tolist():
        dfTotal[['Country','Junk']] = dfTotal['Country'].str.split('-',expand=True) 
        dfTotal = dfTotal[['Country','Date','Screeners','Rand']]
    else:
        dfTotal = dfTotal[['Country','Date','Screeners','Rand']]
    dfTotal['Running Total'] = dfTotal['Rand'].cumsum()
    dfTotal = dfTotal.loc[dfTotal['Running Total'] <= targetEnrollment]
    dfTotal['Date'] = pd.to_datetime(dfTotal['Date'])
    dfTotal.drop(columns=['Running Total'], inplace=True)
    dfTotalAgg = dfTotal.groupby(['Country','Date']).agg({'Screeners': ['sum'], 'Rand': ['sum']})
    dfTotalAgg.columns = ['Screeners','Rand']
    dfTotalAgg = dfTotalAgg.reset_index()
    dfTotalAgg['Date'] = dfTotalAgg['Date'].dt.strftime('%Y-%m-%d')
    dfMonths = dfTotal.groupby('Country')['Date'].nunique()
    dfMean = dfTotal.groupby(['Country'], as_index=False).mean()
    dfMean['Screen Fail Rate'] = 1 - dfMean['Rand']
    dfMean = dfMean[['Country','Screen Fail Rate']]
    dfSum = dfTotal.groupby(['Country'], as_index=False).sum()
    dfFinal = reduce(lambda left, right: pd.merge(left, right, on='Country'), [dfSum, dfMean, dfMonths])
    dfFinal['Enrollment Rate'] = dfFinal.apply(lambda x: round(x['Rand']/x['Date'],2), axis=1)
    dfFinal['Screen Fail Rate'] = dfFinal['Screen Fail Rate'].apply(lambda x: round(x*100,1))
    dfFinal.drop(columns=['Date'],inplace=True)
    plotlyData = {}
    plotlyData['ScreeningPlot'] = {}
    plotlyData['EnrolledPlot'] = {}
    plotlyData['csv'] = []
    plotlyData['Countries'] = dfFinal['Country'].tolist()
    dfAllMonths = pd.DataFrame(dfTotalAgg['Date'].unique(), columns=['Date'])
    for country in plotlyData['Countries']:
        dfCountry = dfTotalAgg.loc[dfTotalAgg['Country']==country, ['Date','Screeners','Rand']]
        dfCountryMerge = dfAllMonths.merge(dfCountry,how='left',on='Date').sort_values(by=['Date'])
        dfCountryMerge.fillna(0,inplace=True)
        countryScreeners = dfCountryMerge['Screeners'].cumsum().tolist()
        countryEnrolled = dfCountryMerge['Rand'].cumsum().tolist()
        countryDates = dfCountryMerge['Date'].tolist()
        for i in range(len(countryDates)):
            plotlyData['csv'].append([country,countryDates[i],countryScreeners[i],countryEnrolled[i]])
        plotlyData['ScreeningPlot'][country] = {'Dates': countryDates, 'Screeners': countryScreeners} 
        plotlyData['EnrolledPlot'][country] = {'Dates': countryDates, 'Enrolled': countryEnrolled}
    for column in ['Screeners','Rand','Screen Fail Rate','Enrollment Rate']:
        plotlyData[column] = dfFinal[['Country',column]].sort_values(by=[column], ascending=True).values.tolist()
    plotlyData['csv'].sort(key=lambda x: x[1])
    plotlyData['Global SF Rate'] = round(float((1-dfFinal['Rand'].sum()/dfFinal['Screeners'].sum())*100),1)
    plotlyData['Global Randomized'] = int(dfFinal['Rand'].sum())
    plotlyData['Global Screened'] = int(dfFinal['Screeners'].sum())
    plotlyData['Global Start Date'] = dfTotal['Date'].min().strftime('%d-%b-%Y')
    plotlyData['Global Stop Date'] = dfTotal['Date'].max().strftime('%d-%b-%Y')
    plotlyData['Global Enrollment Rate'] = round(plotlyData['Global Randomized'] / int(dfMonths.sum()),2)
    return plotlyData