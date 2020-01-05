#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uuid
import datetime as dt
from flask import Flask, request, abort, jsonify
import json
import DPQ
import socket
import pandas as pd
import requests


app = Flask(__name__)

@app.route("/")
def index():
    return "Hi, This is index page :) \n"

@app.route("/login", methods=["GET","POST"])
def login():
    originLocation = request.json.get('originLocation', None)
    destLocation = request.json.get('destLocation', None)
    crowdPref = request.json.get('crowdPref', None)
    walkPref = request.json.get('walkPref', None)
    # Driver program
    g = DPQ.Graph()
    # Shortest distance from source lesson location to destination lesson location
    now = g.roundTime(dt.datetime.now(), 300)
    datenow = now.strftime("%d/%m/%Y")
    timenow = now.strftime("%H:%M:%S").replace(':', '-')
    results = g.dijkstra(originLocation, destLocation, crowdPref, walkPref, timenow, datenow );
    print(results)

    return jsonify({
        'status': 'OK',
        'message': 'Successfully Logged In',
        'recommendedOriginBusStop': results[0],
        'recommendedDestBusStop': results[1],
        'recommendedBus': results[2],
        'recommendedTime': results[3],
        'recommendedRoute': results[4],
})

@app.route("/graph", methods=["GET","POST"])
def getGraphCrowd():
    location = request.json.get('location', None)
    week = request.json.get('week', None)
    dayofweek = request.json.get('dayofweek', None)
    date =  ""
    print("???????????????????")
    print(week)
    if week == "Week 1":
        if dayofweek == "Monday":
            date =  "2019-08-12"
        elif dayofweek == "Tuesday":
            date =  "2019-08-13"
        elif dayofweek == "Wednesday":
            date =  "2019-08-14"
        elif dayofweek == "Thursday":
            date =  "2019-08-15"
        elif dayofweek == "Friday":
            date =  "2019-08-16"
        elif dayofweek == "Saturday":
            date =  "2019-08-17"
        elif dayofweek == "Sunday":
            date =  "2019-08-18"
    elif week == "Week 2":
        if dayofweek == "Monday":
            date =  "2019-08-19"
        elif dayofweek == "Tuesday":
            date =  "2019-08-20"
        elif dayofweek == "Wednesday":
            date =  "2019-08-21"
        elif dayofweek == "Thursday":
            date =  "2019-08-22"
        elif dayofweek == "Friday":
            date =  "2019-08-23"
        elif dayofweek == "Saturday":
            date =  "2019-08-24"
        elif dayofweek == "Sunday":
            date =  "2019-08-25"
    elif week == "Week 3":
        if dayofweek == "Monday":
            date =  "2019-08-26"
        elif dayofweek == "Tuesday":
            date =  "2019-08-27"
        elif dayofweek == "Wednesday":
            date =  "2019-08-28"
        elif dayofweek == "Thursday":
            date =  "2019-08-29"
        elif dayofweek == "Friday":
            date =  "2019-08-30"
        elif dayofweek == "Saturday":
            date =  "2019-09-31"
        elif dayofweek == "Sunday":
            date =  "2019-09-01"
    elif week == "Week 4":
        if dayofweek == "Monday":
            date =  "2019-09-02"
        elif dayofweek == "Tuesday":
            date =  "2019-09-03"
        elif dayofweek == "Wednesday":
            date =  "2019-09-04"
        elif dayofweek == "Thursday":
            date =  "2019-09-05"
        elif dayofweek == "Friday":
            date =  "2019-09-06"
        elif dayofweek == "Saturday":
            date =  "2019-09-07"
        elif dayofweek == "Sunday":
            date =  "2019-09-08"
    elif week == "Week 5":
        if dayofweek == "Monday":
            date =  "2019-09-09"
        elif dayofweek == "Tuesday":
            date =  "2019-09-10"
        elif dayofweek == "Wednesday":
            date =  "2019-09-11"
        elif dayofweek == "Thursday":
            date =  "2019-09-12"
        elif dayofweek == "Friday":
            date =  "2019-09-13"
        elif dayofweek == "Saturday":
            date =  "2019-09-14"
        elif dayofweek == "Sunday":
            date =  "2019-09-15"
    elif week == "Week 6":
        if dayofweek == "Monday":
            date =  "2019-09-16"
        elif dayofweek == "Tuesday":
            date =  "2019-09-17"
        elif dayofweek == "Wednesday":
            date =  "2019-09-18"
        elif dayofweek == "Thursday":
            date =  "2019-09-19"
        elif dayofweek == "Friday":
            date =  "2019-09-20"
        elif dayofweek == "Saturday":
            date =  "2019-09-21"
        elif dayofweek == "Sunday":
            date =  "2019-09-22"
    elif week == "Recess Week":
        if dayofweek == "Monday":
            date =  "2019-09-23"
        elif dayofweek == "Tuesday":
            date =  "2019-09-24"
        elif dayofweek == "Wednesday":
            date =  "2019-09-25"
        elif dayofweek == "Thursday":
            date =  "2019-09-26"
        elif dayofweek == "Friday":
            date =  "2019-09-27"
        elif dayofweek == "Saturday":
            date =  "2019-09-28"
        elif dayofweek == "Sunday":
            date =  "2019-09-29"
    elif week == "Week 7":
        if dayofweek == "Monday":
            date =  "2019-09-30"
        elif dayofweek == "Tuesday":
            date =  "2019-10-01"
        elif dayofweek == "Wednesday":
            date =  "2019-10-02"
        elif dayofweek == "Thursday":
            date =  "2019-10-03"
        elif dayofweek == "Friday":
            date =  "2019-10-04"
        elif dayofweek == "Saturday":
            date =  "2019-10-05"
        elif dayofweek == "Sunday":
            date =  "2019-10-06"
    elif week == "Week 8":
        if dayofweek == "Monday":
            date =  "2019-10-07"
        elif dayofweek == "Tuesday":
            date =  "2019-10-08"
        elif dayofweek == "Wednesday":
            date =  "2019-10-09"
        elif dayofweek == "Thursday":
            date =  "2019-10-10"
        elif dayofweek == "Friday":
            date =  "2019-10-11"
        elif dayofweek == "Saturday":
            date =  "2019-10-12"
        elif dayofweek == "Sunday":
            date =  "2019-10-13"
    elif week == "Week 9":
        if dayofweek == "Monday":
            date =  "2019-10-14"
        elif dayofweek == "Tuesday":
            date =  "2019-10-15"
        elif dayofweek == "Wednesday":
            date =  "2019-10-16"
        elif dayofweek == "Thursday":
            date =  "2019-10-17"
        elif dayofweek == "Friday":
            date =  "2019-10-18"
        elif dayofweek == "Saturday":
            date =  "2019-10-19"
        elif dayofweek == "Sunday":
            date =  "2019-10-20"
    elif week == "Week 10":
        if dayofweek == "Monday":
            date =  "2019-10-21"
        elif dayofweek == "Tuesday":
            date =  "2019-10-22"
        elif dayofweek == "Wednesday":
            date =  "2019-10-23"
        elif dayofweek == "Thursday":
            date =  "2019-10-24"
        elif dayofweek == "Friday":
            date =  "2019-10-25"
        elif dayofweek == "Saturday":
            date =  "2019-10-26"
        elif dayofweek == "Sunday":
            date =  "2019-10-27"
    elif week == "Week 11":
        if dayofweek == "Monday":
            date =  "2019-10-28"
        elif dayofweek == "Tuesday":
            date =  "2019-10-29"
        elif dayofweek == "Wednesday":
            date =  "2019-10-30"
        elif dayofweek == "Thursday":
            date =  "2019-10-31"
        elif dayofweek == "Friday":
            date =  "2019-11-01"
        elif dayofweek == "Saturday":
            date =  "2019-11-02"
        elif dayofweek == "Sunday":
            date =  "2019-11-03"
    elif week == "Week 12":
        if dayofweek == "Monday":
            date =  "2019-11-04"
        elif dayofweek == "Tuesday":
            date =  "2019-11-05"
        elif dayofweek == "Wednesday":
            date =  "2019-11-06"
        elif dayofweek == "Thursday":
            date =  "2019-11-07"
        elif dayofweek == "Friday":
            date =  "2019-11-08"
        elif dayofweek == "Saturday":
            date =  "2019-11-09"
        elif dayofweek == "Sunday":
            date =  "2019-11-10"
    elif week == "Week 13":
        if dayofweek == "Monday":
            date =  "2019-11-11"
        elif dayofweek == "Tuesday":
            date =  "2019-11-12"
        elif dayofweek == "Wednesday":
            date =  "2019-11-13"
        elif dayofweek == "Thursday":
            date =  "2019-11-14"
        elif dayofweek == "Friday":
            date =  "2019-11-15"
        elif dayofweek == "Saturday":
            date =  "2019-11-16"
        elif dayofweek == "Sunday":
            date =  "2019-11-17"
    elif week == "Reading Week":
        if dayofweek == "Monday":
            date =  "2019-11-18"
        elif dayofweek == "Tuesday":
            date =  "2019-11-19"
        elif dayofweek == "Wednesday":
            date =  "2019-11-20"
        elif dayofweek == "Thursday":
            date =  "2019-11-21"
        elif dayofweek == "Friday":
            date =  "2019-11-22"
        elif dayofweek == "Saturday":
            date =  "2019-11-23"
        elif dayofweek == "Sunday":
            date =  "2019-11-24"

    df = pd.read_csv("output4/" + location + "/" + dayofweek + "/" + "Output_" + location + "_" + dayofweek + "_" + date + ".csv")
    print(df.head())

    return jsonify({
        'status': 'OK',
        'message': 'Successfully Logged In',
        'time': df['time'].tolist(),
        'value': df['value'].tolist(),
})

@app.route("/requestIP", methods=["GET","POST"])
def requestIP():
    ip = socket.gethostbyname(socket.gethostname())
    return jsonify({
        'status': 'OK',
        'ip': ip,
})


@app.route("/getBus", methods = ["GET","POST"])
def getBus():
    busNumber = request.json.get('busNumber',None)
    g = DPQ.Graph()
    stops = g.getBusRoute(busNumber)
    return jsonify({
    'route': stops
    })

@app.route("/Timetable/<moduleCode>", methods = ["GET","POST"])
def getTimeTable(moduleCode):
    baseUrl = 'https://api.nusmods.com/v2/2019-2020/modules/'
    moduleCodeJSON = moduleCode + ".json"
    finalUrl = baseUrl + moduleCodeJSON
    r = requests.get(finalUrl)
    #print r.json()
    return (r.json())
      


if __name__ == '__main__':
    ip = socket.gethostbyname("")
    app.run(host = ip, debug=True, port=8668)