import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Alert,
    StyleSheet,
    Button
} from "react-native";
import Constants from 'expo-constants';
import axios from 'axios';



import BusButton from "./components/Services/BusButton";
const ip_address = '172.17.125.132'
const serverURL = 'http://' + ip_address + ':8668';const http = axios.create({
  baseURL: serverURL,
});

export default class Route extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      busNumber : "",
      route : "",
      TextHolderRoute: 'Route: ',
    };
  }


async doStuff(busNum) {
  this.setState({busNumber:busNum});
  this.onGetBus()
}

  onGetBus() {
    const { busNumber} = this.state;
    // POST to Flask Server
      http.post(serverURL+ '/getBus', {
      busNumber : busNumber,
      })
      .then((response) => this.onGetBusSuccess(response))
      .catch((err) => console.log(err))
    }


  onGetBusSuccess(response){
    const { route } = response;
    this.setState({
        TextHolderRoute: 'route: ' + response.data.route
    })    
  }


  render() {
    const { busNumber } = this.state;
    return (
    <SafeAreaView style = {{flex : 1}}>
                    <View style={{ flex: 1 }}>
                    <View style={{ height: 50, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Bus Services"
                                placeholderTextColor="white"
                                style={{ flex: 1, fontWeight: '700', paddingTop : 20, paddingLeft: 15}}
                            />
                        </View>
                    </View>
                </View>
          <View style = {{flex : 1, flexDirection: 'column'}}>
                            <BusButton name = 'A1' onPress = {()=>this.doStuff('A1')}></BusButton>
                            <BusButton name = 'A2' onPress = {()=>this.doStuff('A2')}>A2</BusButton>
                            <BusButton name = 'D1' onPress = {()=>this.doStuff('D1')}>D1</BusButton>
                            <BusButton name = 'D2' onPress = {()=>this.doStuff('D2')}>D2</BusButton>

                            </View>
                            <View>
                            <Text style={{marginVertical: 20, fontSize: 20}}> {this.state.TextHolderRoute} </Text>
                            </View>
          

        </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: 'grey',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 33,
  },
});
