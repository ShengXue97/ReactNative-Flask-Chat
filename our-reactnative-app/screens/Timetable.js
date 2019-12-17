import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Category from './components/Timetable/Category.js'

import { createStackNavigator } from 'react-navigation'; 

export class Monday extends Component {
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
                              <Category name1="A1 bus from KRMRT to LT27 (1 bus stop)" name2="Board at 1145 HRS, Current Crowd: 25" iconName="bus"/>
                              <Category name1="MA1101R Tutorial @ S17-0406" name2="1200HRS - 1300HRS" iconName="graduation-cap"/>
                              <Category name1="Walk to S17-0302" iconName="flag"/>
                              <Category name1="MA1101R Laboratory @ S17-0302" name2="1600HRS - 1800HRS" iconName="graduation-cap"/>
                              <Category name1="D2 bus from S17 to OppKRMRT (1 bus stop)" name2="Board at 1800HRS
                              , Current Crowd: 31" iconName="bus"/>
                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Tuesday extends Component {
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
                              <Category name1="A1 bus from KRMRT to LT27 (1 bus stop)" name2="Board at 1145 HRS, Current Crowd: 25" iconName="bus"/>
                              <Category name1="ST2334 Tutorial @ S17-0406" name2="1200HRS - 1300HRS" iconName="graduation-cap"/>
                              <Category name1="Walk to S14-0302" iconName="flag"/>
                              <Category name1="CS2030 Laboratory @ S17-0302" name2="1600HRS - 1800HRS" iconName="graduation-cap"/>
                              <Category name1="D2 bus from S17 to OppKRMRT (1 bus stop)" name2="Board at 1800HRS
                              , Current Crowd: 31" iconName="bus"/>
                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Wednesday extends Component {
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
                              <Category name1="A1 bus from KRMRT to LT27 (1 bus stop)" name2="Board at 1145 HRS, Current Crowd: 25" iconName="bus"/>
                              <Category name1="CS2106 Tutorial @ S17-0406" name2="1200HRS - 1300HRS" iconName="graduation-cap"/>
                              <Category name1="Walk to COM2" iconName="flag"/>
                              <Category name1="CS2103 Laboratory @ S17-0302" name2="1600HRS - 1800HRS" iconName="graduation-cap"/>
                              <Category name1="A2 bus from S17 to OppKRMRT (1 bus stop)" name2="Board at 1800HRS
                              , Current Crowd: 31" iconName="bus"/>
                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Thursday extends Component {
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
                              <Category name1="A1 bus from KRMRT to LT27 (1 bus stop)" name2="Board at 1145 HRS, Current Crowd: 25" iconName="bus"/>
                              <Category name1="GEH1006 Tutorial @ S17-0406" name2="1200HRS - 1300HRS" iconName="graduation-cap"/>
                              <Category name1="Walk to S10-0302" iconName="flag"/>
                              <Category name1="GER1000 Laboratory @ S17-0302" name2="1600HRS - 1800HRS" iconName="graduation-cap"/>
                              <Category name1="A1 bus from S17 to OppKRMRT (1 bus stop)" name2="Board at 1800HRS
                              , Current Crowd: 31" iconName="bus"/>
                          </View>
                      </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export class Friday extends Component {
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
                              <Category name1="A1 bus from KRMRT to LT27 (1 bus stop)" name2="Board at 1145 HRS, Current Crowd: 25" iconName="bus"/>
                              <Category name1="CS1101S Tutorial @ S17-0406" name2="1200HRS - 1300HRS" iconName="graduation-cap"/>
                              <Category name1="Walk to S17-0302" iconName="flag"/>
                              <Category name1="CS2105 Laboratory @ S17-0302" name2="1600HRS - 1800HRS" iconName="graduation-cap"/>
                              <Category name1="A2 bus from S17 to OppKRMRT (1 bus stop)" name2="Board at 1800HRS
                              , Current Crowd: 31" iconName="bus"/>
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
