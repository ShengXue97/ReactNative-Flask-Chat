#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uuid
from datetime import datetime
from flask import Flask, request, abort, jsonify
import json
import DPQ

app = Flask(__name__)

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



if __name__ == '__main__':
    app.run(host = '172.17.127.241', debug=True, port=8668)