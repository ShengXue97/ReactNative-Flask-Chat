#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uuid
from datetime import datetime
from flask import Flask, request, abort, jsonify
import json
import DPQ
import requests


app = Flask(__name__)
ip_address = '172.17.124.131'

@app.route("/")
def index():
    return "Hi, This is index page :) \n"

@app.route("/login", methods=["GET","POST"])
def login():
    originLocation = request.json.get('originLocation', None)
    destLocation = request.json.get('destLocation', None)
    g = DPQ.Graph()
    # Shortest distance from source lesson location to destination lesson location
    results = g.dijkstra(originLocation, destLocation);

    return jsonify({
        'status': 'OK',
        'message': 'Successfully Logged In',
        'recommendedOriginBusStop': results[0],
        'recommendedDestBusStop': results[1],
        'recommendedBus': results[2],
        'recommendedTime': results[3],
        'recommendedRoute': results[4],
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
    print r.json()
    return (r.json())
      



if __name__ == '__main__':
    app.run(host = ip_address, debug=True, port=8668)