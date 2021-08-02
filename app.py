from flask import Flask, render_template, url_for, request, jsonify
import pandas as pd
import numpy as np
import secrets
import math
from datetime import datetime
from datetime import timedelta
from dateutil.relativedelta import *

### Initialize Flask App ###
app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_urlsafe(16)

### Website Routes ###
@app.route("/")
def home():
    return render_template('home.html')

@app.route("/enrollment")
def enrollment():
    return render_template('enrollforecast.html')

@app.route('/API/enrollment', methods=['GET','POST'])
def api_enrollment():
    data = request.get_json()
    df = pd.DataFrame.from_dict(data['tableData'])
    df['Screeners Per Month'] = df.apply(lambda x: round(float(x['Enrollment Rate'])/(1-(float(x['Screen Fail Rate']))),3), axis=1)
    df['Start Date'] = pd.to_datetime(df['Start Date'])
    df['Stop Date'] = pd.to_datetime(df['Stop Date'])
    if data['Current Enrollment'] == '':
        Enroll = int(data['Target Enrollment'])
    else:
        Enroll = int(data['Target Enrollment']) - int(data['Current Enrollment'])

    # Count number of duplicate countries
    z = df.groupby(df['Country']).cumcount()
    z = sum(z)

    # Add suffix for duplicate country names in the case of stop and then restart
    v = df.groupby(df['Country']).cumcount()
    v = v.astype('str')
    v = "-"+v
    v = v.str.replace("-0","")

    df['Country'] = df['Country'] + v

    df['Rand'] = np.empty((len(df), 0)).tolist() # Add Rand column with an empty list per country
    df['Screeners'] = np.empty((len(df), 0)).tolist() # Add Screeners column with an empty list per country
    stopdatechecker = df['Stop Date'].isna().values.any() #variable to check if there are any missing stop dates

    maxstopdate = df['Stop Date'].max() #variable to hold the maximum stop date if present

    # Lists to include in dictionary to turn into Dataframe
    dates = []
    screeners = []
    randomizers = []
    country = []
    monthratio = 0
    day2 = 0
    i = 0 # start date iterator varaible

    # Loop to add rows of countries, month dates, screener counts, and randomization count
    while sum(randomizers) < Enroll: # End once target enrollment number is met
        startdate=df['Start Date'].min() + relativedelta(months=i) #Add a new month per iteration of while loop
        
        for c in df['Country']: # Iterate and perform all actions below per country
            Screeners2=float(df.loc[(df['Country'] == c),'Screeners Per Month'].iloc[0])
            SFRate = float(df.loc[(df['Country'] == c),'Screen Fail Rate'].iloc[0])
            SDate=df.loc[(df['Country'] == c),'Start Date'].iloc[0]
            CountryRandList=df.loc[(df['Country'] == c),'Rand'].iloc[0]
            stopdate = df.loc[(df['Country'] == c), 'Stop Date'].iloc[0]
            ScreenersRange = math.ceil(Screeners2)
            if SDate <= startdate and (pd.isna(stopdate) or startdate < stopdate) and SFRate < 1.0: # if country start date occurred and no stop date or date is less than stop date
                for day in range(ScreenersRange): #add the date to list * # of screeners that month
                    CountryScreenList=df.loc[(df['Country'] == c),'Screeners'].iloc[0]
                    LenCountryScreenList = len(CountryScreenList)
                    monthdiff = (startdate.year - SDate.year)*12 + (startdate.month - SDate.month) + 1
                    if monthdiff == 0:
                        monthratio = 0
                    else:
                        monthratio = float(LenCountryScreenList / monthdiff)
                    if monthratio < Screeners2:
                        screeners.extend([1])
                        country.extend([c])
                        CountryScreenList.extend([1])
                        a_date = startdate
                        a_date = a_date.strftime('%d-%b-%Y')
                        dates.append(a_date)
                        LenCountryRandList = len(CountryRandList)
                        if LenCountryRandList == 0:
                            meanvalue = 0
                        else:
                            meanvalue = np.mean(CountryRandList[:(LenCountryRandList)])
                        if LenCountryRandList == 0:
                            CountryRandList.extend([1])
                            randomizers.extend([1])
                        elif meanvalue > (1-SFRate):
                            CountryRandList.extend([0])
                            randomizers.extend([0])
                        else:
                            CountryRandList.extend([1])
                            randomizers.extend([1])
            elif SDate <= startdate and (pd.isna(stopdate) or startdate < stopdate) and SFRate == 1.0:
                for day in range(ScreenersRange):
                    CountryScreenList=df.loc[(df['Country'] == c),'Screeners'].iloc[0]
                    LenCountryScreenList = len(CountryScreenList) #ADDED
                    monthdiff = (startdate.year - SDate.year)*12 + (startdate.month - SDate.month) + 1
                    
                    if monthdiff == 0:
                        monthratio = 0
                    else:
                        monthratio = float(LenCountryScreenList / monthdiff)
                    if monthratio < Screeners2:
                        country.extend([c])
                        screeners.extend([1])
                        CountryScreenList.extend([1])
                        a_date = startdate
                        a_date = a_date.strftime('%d-%b-%Y')
                        dates.append(a_date)
                        randomizers.extend([0])
        i+=1
        if pd.notnull(maxstopdate) and maxstopdate < startdate and stopdatechecker == False:
            print("***Warning: Enrollment target was not met")
            break

    # Combine all the lists created from the loop into a dictionary and then into a dataframe    
    dict = {'Country': country,'Date': dates,'Screeners': screeners,'Rand': randomizers}
    dfTotal = pd.DataFrame(dict)

    #split by delimiter only if there are duplicate countries
    if z > 0:
        dfTotal[['Country','Junk']] = dfTotal['Country'].str.split('-',expand=True) 
        dfTotal = dfTotal[['Country','Date','Screeners','Rand']]
    else:
        dfTotal = dfTotal[['Country','Date','Screeners','Rand']]
    dfTotal['Running Total'] = dfTotal['Rand'].cumsum()
    dfTotal = dfTotal.loc[dfTotal['Running Total'] <= Enroll]
    dfTotal['Date'] = pd.to_datetime(dfTotal['Date'])
    dfTotal.drop(columns=['Running Total'], inplace=True)
    dfMean = dfTotal.groupby(['Country'], as_index=False).mean()
    dfMean['Screen Fail Rate'] = 1 - dfMean['Rand']
    dfMean = dfMean[['Country','Screen Fail Rate']]
    dfSum = dfTotal.groupby(['Country'], as_index=False).sum()
    dfFinal = pd.merge(dfSum,dfMean, on = 'Country', how = 'left')
    TotalSF = (1-dfFinal['Rand'].sum()/dfFinal['Screeners'].sum())*100
    TotalRand = dfFinal['Rand'].sum()
    TotalScreen = dfFinal['Screeners'].sum()


    TotalMinDate = dfTotal['Date'].min()
    TotalMinDate = TotalMinDate.strftime('%d-%b-%Y')
    TotalMaxDate = dfTotal['Date'].max()
    TotalMaxDate = TotalMaxDate.strftime('%d-%b-%Y')
    print(dfFinal)
    print(f"Start Date: {TotalMinDate}")
    print(f"Stop Date: {TotalMaxDate}")
    print(f"Randomized: {TotalRand}")
    print(f"Screened: {TotalScreen}")
    print(f"Screen Failure Rate: {TotalSF:.2f}%")
    return jsonify(result="success!")

if __name__ == '__main__':
    app.run(debug=True)