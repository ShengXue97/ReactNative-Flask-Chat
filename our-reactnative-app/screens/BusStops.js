import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Button,
    Text,
    ScrollView
} from "react-native";
import { createStackNavigator } from 'react-navigation'; 



import BusStop from "./components/Stops/BusStop"


export class KRMRT extends Component {
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
           // this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('KRMRT'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  KR MRT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('BIZ2'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  BIZ2
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('IT'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  IT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('UTown'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  UTown
                            </Text>
                            
                          </TouchableOpacity>
                      </View>
                      </View>
                      
                    <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Kent Ridge MRT                              
                                </Text>
                              <BusStop name1 = 'A1'></BusStop>
                              <BusStop name1 = 'D2'></BusStop>
                              </View>
                      </ScrollView>
                      </View>
          </SafeAreaView>
        );
    }
}

export class BIZ2 extends Component {
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
           // this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('KRMRT'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  KRMRT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('BIZ2'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  BIZ2
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('IT'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  IT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('UTown'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  UTown
                            </Text>
                            
                          </TouchableOpacity>
                      </View>
                      </View>
                      
                    <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Biz 2                              
                                </Text>
                                <BusStop name1 = 'A1'></BusStop>
                              <BusStop name1 = 'D1'></BusStop>   
                              </View>                           
                      </ScrollView>
                      </View>
          </SafeAreaView>
        );
    }
}

export class IT extends Component {
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
           // this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('KRMRT'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  KRMRT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('BIZ2'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  BIZ2
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('IT'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  IT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('UTown'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  UTown
                            </Text>
                            
                          </TouchableOpacity>
                      </View>
                      </View>
                      
                    <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Information Technology                              
                                </Text>
                                <BusStop name1 = 'A2'></BusStop>
                              <BusStop name1 = 'D1'></BusStop>   
                              </View>   
                      </ScrollView>
                      </View>
          </SafeAreaView>
        );
    }
}

export class UTown extends Component {
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            //this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('KRMRT'); }}
                            style={{
                              borderWidth:1,
                              borderColor:'grey',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width:60,
                              height:60,
                              backgroundColor:'#fff',
                              borderRadius:50,
                            }}
                            >
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  KRMRT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('BIZ2'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  BIZ2
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('IT'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  IT
                            </Text>
                            
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('UTown'); }}
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
                            <Text style={{ fontSize: 9, fontWeight: '400', paddingHorizontal: 20, color :'black' }}>
                                  UTown
                            </Text>
                            
                          </TouchableOpacity>
                      </View>
                      </View>
                      
                    <ScrollView scrollEventThrottle={16} style={{}}>
                          <View style={{ flex: 1, paddingTop: 5 }}>
                              <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                University Town                              
                                </Text>
                                <BusStop name1 = 'D1'></BusStop>
                              <BusStop name1 = 'D2'></BusStop>   
                              </View>   
                      </ScrollView>
                      </View>
          </SafeAreaView>
        );
    }
}


export default createStackNavigator (
    {
        KRMRT:KRMRT,
        BIZ2:BIZ2,
        IT:IT,
        UTown:UTown,
    },{
        initialRouteName:'KRMRT',
        headerMode: 'none',
        transitionConfig: () => ({
        transitionSpec: {
          duration: 0,  // Set the animation duration time as 0 !!
        },
        }),
    }
    
)