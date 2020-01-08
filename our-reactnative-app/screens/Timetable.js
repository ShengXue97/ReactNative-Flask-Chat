import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import axios from 'axios';

import Category from './components/Timetable/Category.js'
import WalkTransport from './components/Timetable/WalkTransport.js';
import BusTransport from './components/Timetable/BusTransport.js';
import EmptyTimeTable from './components/Timetable/EmptyTimeTable.js';

import { createStackNavigator } from 'react-navigation'; 


const ip_address = '0.0.0.0'
const serverURL = 'http://' + ip_address + ':8668';
const http = axios.create({
  baseURL: serverURL,
});
export class Monday extends Component {
  constructor(props) {
    super(props);

    if (global.monday2.length == 0){
        for (let i = 0; i < global.monday.length - 1; i++) {
             // POST to Flask Server
              http.post(serverURL + '/login', {
              originLocation : global.monday[i].get("venue").split('-')[0],
              destLocation : global.monday[i + 1].get("venue").split('-')[0],
              boardTime : global.monday[i + 1].get("compare"),
              crowdPref: global.distance1,
              walkPref: global.distance2,
              })
              .then((response) => this.onLoginSuccess(response))
              .catch((err) => console.log(err));
        }
        for (let i = 0; i < global.monday.length; i++) {
            global.monday2.push(global.monday[i]);
            console.log("here" + global.monday2[i]);
        }

         global.monday2.sort(this.comparatorHere);
    }
    

  }

      onLoginSuccess(response){
        const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute, boardTime, originLocation, destLocation } = response.data;
        let myMap2 = new Map();
        myMap2.set('bus', recommendedBus);
        myMap2.set('originBusStop', recommendedOriginBusStop);
        myMap2.set('destBusStop', recommendedDestBusStop);
        myMap2.set('compare', boardTime);
        myMap2.set('view', 'Transport');
        myMap2.set('originLocation', originLocation);
        myMap2.set('destLocation', destLocation);
        global.monday2.push(myMap2);
        global.monday2 = [...new Set(global.monday2)];
        global.monday2.sort(this.comparatorHere);
      }

  comparatorHere(a, b) {
    if (a.get('compare') == b.get('compare')){
        if (a.get('view') == "Transport" && b.get('view') == "Category"){
            return -1;  
		} else if (a.get('view') == "Category" && b.get('view') == "Transport"){
            return  1;  
		} else {
            return 0;  
		}
	} else {
        return a.get('compare') - b.get('compare');
	}
  }

    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    genMod(item, key){

        if (item.get("view") == "Category") {
              return <Category module = {item} iconName = "graduation-cap"/>
		} else if (item.get("view") == "Transport") {
            if (item.get("bus") == "Walk") {
                return <WalkTransport module = {item} iconName = "flag"/>
            } else {
                return <BusTransport module = {item} iconName = "bus"/>
			}
              
		} else if(item.get("view") == "Empty") {
      return <EmptyTimeTable module = {item} iconName = 'cross'/>
    }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>

                <View
          style={{
            height: this.startHeaderHeight,
            backgroundColor: 'purple',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text
              style={{ fontWeight: '700', paddingLeft: 115, paddingTop: 20, paddingBottom: 20, color: 'white',textAlign: 'center'}}
            >Recommended Timetable</Text>
          </View>
        </View>
                    <View style={{ flex: 1, flexDirection : 'column'}}>
                      <View style={{ flexDirection : 'row', paddingTop: 5, justifyContent : 'space-around' }}>
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Monday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  M
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Tuesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Wednesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  W
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Thursday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Friday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  F
                            </Text>
                            
                          </TouchableOpacity>
                            
                      </View>
                      
                      <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
      

                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                  Monday
                              </Text>

                              {global.monday2.map((item,key) => this.genMod(item, key))}


                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Tuesday extends Component {
  constructor(props) {
    super(props);

    if (global.tuesday2.length == 0){
        for (let i = 0; i < global.tuesday.length - 1; i++) {
             // POST to Flask Server
              http.post(serverURL + '/login', {
              originLocation : global.tuesday[i].get("venue").split('-')[0],
              destLocation : global.tuesday[i + 1].get("venue").split('-')[0],
              boardTime : global.tuesday[i + 1].get("compare"),
              crowdPref: global.distance1,
              walkPref: global.distance2,
              })
              .then((response) => this.onLoginSuccess(response))
              .catch((err) => console.log(err));
        }
        for (let i = 0; i < global.tuesday.length; i++) {
            global.tuesday2.push(global.tuesday[i]);
        }

         global.tuesday2.sort(this.comparatorHere);
    }
    

  }

      onLoginSuccess(response){
        const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute, boardTime, originLocation, destLocation } = response.data;
        let myMap2 = new Map();
        myMap2.set('bus', recommendedBus);
        myMap2.set('originBusStop', recommendedOriginBusStop);
        myMap2.set('destBusStop', recommendedDestBusStop);
        myMap2.set('compare', boardTime);
        myMap2.set('view', 'Transport');
        myMap2.set('originLocation', originLocation);
        myMap2.set('destLocation', destLocation);
        global.tuesday2.push(myMap2);
        global.tuesday2 = [...new Set(global.tuesday2)];
        global.tuesday2.sort(this.comparatorHere);
      }

  comparatorHere(a, b) {
    if (a.get('compare') == b.get('compare')){
        if (a.get('view') == "Transport" && b.get('view') == "Category"){
            return -1;  
		} else if (a.get('view') == "Category" && b.get('view') == "Transport"){
            return  1;  
		} else {
            return 0;  
		}
	} else {
        return a.get('compare') - b.get('compare');
	}
  }

    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    genMod(item, key){

        if (item.get("view") == "Category") {
              return <Category module = {item} iconName = "graduation-cap"/>
		} else if (item.get("view") == "Transport") {
            if (item.get("bus") == "Walk") {
                return <WalkTransport module = {item} iconName = "flag"/>
            } else {
                return <BusTransport module = {item} iconName = "bus"/>
			}
              
		} else if(item.get("view") == "Empty") {
      return <EmptyTimeTable module = {item} iconName = 'cross'/>
    }
    
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>

                    <View style={{ height: this.startHeaderHeight, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                        <View style={{flexDirection : 'row', justifyContent : 'flex-start'}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Recommended Timetable"
                                placeholderTextColor="white"
                                style={{fontWeight: '700', paddingLeft : 15, paddingTop : 15}}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection : 'column'}}>
                      <View style={{ flexDirection : 'row', paddingTop: 5, justifyContent : 'space-around' }}>
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Monday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  M
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Tuesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Wednesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  W
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Thursday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Friday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  F
                            </Text>
                            
                          </TouchableOpacity>
                            
                      </View>
                      
                      <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
      

                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                  Tuesday
                              </Text>

                              {global.tuesday2.map((item,key) => this.genMod(item, key))}


                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Wednesday extends Component {
  constructor(props) {
    super(props);

    if (global.wednesday2.length == 0){
        for (let i = 0; i < global.wednesday.length - 1; i++) {
             // POST to Flask Server
              http.post(serverURL + '/login', {
              originLocation : global.wednesday[i].get("venue").split('-')[0],
              destLocation : global.wednesday[i + 1].get("venue").split('-')[0],
              boardTime : global.wednesday[i + 1].get("compare"),
              crowdPref: global.distance1,
              walkPref: global.distance2,
              })
              .then((response) => this.onLoginSuccess(response))
              .catch((err) => console.log(err));
        }
        for (let i = 0; i < global.wednesday.length; i++) {
            global.wednesday2.push(global.wednesday[i]);
        }

         global.wednesday2.sort(this.comparatorHere);
    }
    

  }

      onLoginSuccess(response){
        const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute, boardTime, originLocation, destLocation } = response.data;
        let myMap2 = new Map();
        myMap2.set('bus', recommendedBus);
        myMap2.set('originBusStop', recommendedOriginBusStop);
        myMap2.set('destBusStop', recommendedDestBusStop);
        myMap2.set('compare', boardTime);
        myMap2.set('view', 'Transport');
        myMap2.set('originLocation', originLocation);
        myMap2.set('destLocation', destLocation);
        global.wednesday2.push(myMap2);
        global.wednesday2 = [...new Set(global.wednesday2)];
        global.wednesday2.sort(this.comparatorHere);
      }

  comparatorHere(a, b) {
    if (a.get('compare') == b.get('compare')){
        if (a.get('view') == "Transport" && b.get('view') == "Category"){
            return -1;  
		} else if (a.get('view') == "Category" && b.get('view') == "Transport"){
            return  1;  
		} else {
            return 0;  
		}
	} else {
        return a.get('compare') - b.get('compare');
	}
  }

    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    genMod(item, key){

        if (item.get("view") == "Category") {
              return <Category module = {item} iconName = "graduation-cap"/>
		} else if (item.get("view") == "Transport") {
            if (item.get("bus") == "Walk") {
                return <WalkTransport module = {item} iconName = "flag"/>
            } else {
                return <BusTransport module = {item} iconName = "bus"/>
			}
              
		}
   else if(item.get("view") == "Empty") {
    return <EmptyTimeTable module = {item} iconName = 'cross'/>
  }
}
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>

                    <View style={{ height: this.startHeaderHeight, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                        <View style={{flexDirection : 'row', justifyContent : 'flex-start'}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Recommended Timetable"
                                placeholderTextColor="white"
                                style={{fontWeight: '700', paddingLeft : 15, paddingTop : 15}}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection : 'column'}}>
                      <View style={{ flexDirection : 'row', paddingTop: 5, justifyContent : 'space-around' }}>
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Monday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  M
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Tuesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Wednesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  W
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Thursday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Friday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  F
                            </Text>
                            
                          </TouchableOpacity>
                            
                      </View>
                      
                      <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
      

                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                  Wednesday
                              </Text>

                              {global.wednesday2.map((item,key) => this.genMod(item, key))}


                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Thursday extends Component {
  constructor(props) {
    super(props);

    if (global.thursday2.length == 0){
        for (let i = 0; i < global.thursday.length - 1; i++) {
             // POST to Flask Server
              http.post(serverURL + '/login', {
              originLocation : global.thursday[i].get("venue").split('-')[0],
              destLocation : global.thursday[i + 1].get("venue").split('-')[0],
              boardTime : global.thursday[i + 1].get("compare"),
              crowdPref: global.distance1,
              walkPref: global.distance2,
              })
              .then((response) => this.onLoginSuccess(response))
              .catch((err) => console.log(err));
        }
        for (let i = 0; i < global.thursday.length; i++) {
            global.thursday2.push(global.thursday[i]);
        }

         global.thursday2.sort(this.comparatorHere);
    }
    

  }

      onLoginSuccess(response){
        const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute, boardTime, originLocation, destLocation } = response.data;
        let myMap2 = new Map();
        myMap2.set('bus', recommendedBus);
        myMap2.set('originBusStop', recommendedOriginBusStop);
        myMap2.set('destBusStop', recommendedDestBusStop);
        myMap2.set('compare', boardTime);
        myMap2.set('view', 'Transport');
        myMap2.set('originLocation', originLocation);
        myMap2.set('destLocation', destLocation);
        global.thursday2.push(myMap2);
        global.thursday2 = [...new Set(global.thursday2)];
        global.thursday2.sort(this.comparatorHere);
      }

  comparatorHere(a, b) {
    if (a.get('compare') == b.get('compare')){
        if (a.get('view') == "Transport" && b.get('view') == "Category"){
            return -1;  
		} else if (a.get('view') == "Category" && b.get('view') == "Transport"){
            return  1;  
		} else {
            return 0;  
		}
	} else {
        return a.get('compare') - b.get('compare');
	}
  }

    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    genMod(item, key){

        if (item.get("view") == "Category") {
              return <Category module = {item} iconName = "graduation-cap"/>
		} else if (item.get("view") == "Transport") {
            if (item.get("bus") == "Walk") {
                return <WalkTransport module = {item} iconName = "flag"/>
            } else {
                return <BusTransport module = {item} iconName = "bus"/>
			}
              
		}
   else if(item.get("view") == "Empty") {
    return <EmptyTimeTable module = {item} iconName = 'cross'/>
  }
}
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>

                    <View style={{ height: this.startHeaderHeight, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                        <View style={{flexDirection : 'row', justifyContent : 'flex-start'}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Recommended Timetable"
                                placeholderTextColor="white"
                                style={{fontWeight: '700', paddingLeft : 15, paddingTop : 15}}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection : 'column'}}>
                      <View style={{ flexDirection : 'row', paddingTop: 5, justifyContent : 'space-around' }}>
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Monday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  M
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Tuesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Wednesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  W
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Thursday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Friday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  F
                            </Text>
                            
                          </TouchableOpacity>
                            
                      </View>
                      
                      <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
      

                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                  Thursday
                              </Text>

                              {global.thursday2.map((item,key) => this.genMod(item, key))}


                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Friday extends Component {
  constructor(props) {
    super(props);

    if (global.friday2.length == 0){
        for (let i = 0; i < global.friday.length - 1; i++) {
             // POST to Flask Server
              http.post(serverURL + '/login', {
              originLocation : global.friday[i].get("venue").split('-')[0],
              destLocation : global.friday[i + 1].get("venue").split('-')[0],
              boardTime : global.friday[i + 1].get("compare"),
              crowdPref:global.distance1,
              walkPref: global.distance2,
              })
              .then((response) => this.onLoginSuccess(response))
              .catch((err) => console.log(err));
        }
        for (let i = 0; i < global.friday.length; i++) {
            global.friday2.push(global.friday[i]);
        }

         global.friday2.sort(this.comparatorHere);
    }
    

  }

      onLoginSuccess(response){
        const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute, boardTime, originLocation, destLocation } = response.data;
        let myMap2 = new Map();
        myMap2.set('bus', recommendedBus);
        myMap2.set('originBusStop', recommendedOriginBusStop);
        myMap2.set('destBusStop', recommendedDestBusStop);
        myMap2.set('compare', boardTime);
        myMap2.set('view', 'Transport');
        myMap2.set('originLocation', originLocation);
        myMap2.set('destLocation', destLocation);
        global.friday2.push(myMap2);
        global.friday2 = [...new Set(global.friday2)];
        global.friday2.sort(this.comparatorHere);
      }

  comparatorHere(a, b) {
    if (a.get('compare') == b.get('compare')){
        if (a.get('view') == "Transport" && b.get('view') == "Category"){
            return -1;  
		} else if (a.get('view') == "Category" && b.get('view') == "Transport"){
            return  1;  
		} else {
            return 0;  
		}
	} else {
        return a.get('compare') - b.get('compare');
	}
  }

    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    genMod(item, key){

        if (item.get("view") == "Category") {
              return <Category module = {item} iconName = "graduation-cap"/>
		} else if (item.get("view") == "Transport") {
            if (item.get("bus") == "Walk") {
                return <WalkTransport module = {item} iconName = "flag"/>
            } else {
                return <BusTransport module = {item} iconName = "bus"/>
			}
              
		}
   else if(item.get("view") == "Empty") {
    return <EmptyTimeTable module = {item} iconName = 'cross'/>
  }
}
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>

                    <View style={{ height: this.startHeaderHeight, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd'}}>
                        <View style={{flexDirection : 'row', justifyContent : 'flex-start'}}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Recommended Timetable"
                                placeholderTextColor="white"
                                style={{fontWeight: '700', paddingLeft : 15, paddingTop : 15}}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection : 'column'}}>
                      <View style={{ flexDirection : 'row', paddingTop: 5, justifyContent : 'space-around' }}>
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Monday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  M
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Tuesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Wednesday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  W
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Thursday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  T
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Friday'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems:'center',
                              justifyContent:'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, color :'grey' }}>
                                  F
                            </Text>
                            
                          </TouchableOpacity>
                            
                      </View>
                      
                      <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
      

                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                  Friday
                              </Text>

                              {global.friday2.map((item,key) => this.genMod(item, key))}


                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export default createStackNavigator (
    {
        Monday:Monday,
        Tuesday:Tuesday,
        Wednesday:Wednesday,
        Thursday:Thursday,
        Friday:Friday
    },{
        initialRouteName:'Monday',
        headerMode: 'none',
        transitionConfig: () => ({
        transitionSpec: {
          duration: 0,  // Set the animation duration time as 0 !!
        },
        }),
    }
    
)
