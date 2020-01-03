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
import Category from './components/Timetable/Category.js'

import { createStackNavigator } from 'react-navigation'; 



export class Monday extends Component {
  constructor(props) {
    super(props);

  }
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                              alignItems: 'center',
                              justifyContent: 'center',
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
                              <Category module = {global.monday[0]} iconName="graduation-cap"/>
                              <Category module = {global.monday[1]} iconName="graduation-cap"/>

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

  }
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                              <Category module = {global.tuesday[0]} iconName="graduation-cap"/>
                              <Category module = {global.tuesday[1]} iconName="graduation-cap"/>

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

  }
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                              <Category module = {global.tuesday[0]} iconName="graduation-cap"/>
                              <Category module = {global.tuesday[1]} iconName="graduation-cap"/>

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

  }
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                              <Category module = {global.tuesday[0]} iconName="graduation-cap"/>
                              <Category module = {global.tuesday[1]} iconName="graduation-cap"/>

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

  }
    componentWillMount() {
        this.startHeaderHeight = 50
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
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
                              <Category module = {global.monday[0]} iconName="graduation-cap"/>
                              <Category module = {global.tuesday[1]} iconName="graduation-cap"/>

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
