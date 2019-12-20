import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView } from "react-navigation";
import axios from 'axios';
import tail from 'lodash/tail';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';


const serverURL = 'http://172.17.127.241:8668';
const http = axios.create({
  baseURL: serverURL,
});

const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
];

function Item({ message, username }) {
    console.log({message});
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{username} : {message}</Text>
    </View>
  );
}

const locations = [
	{label: "OppKRMRT", value: "OppKR", },
	{label: "KRMRT", value: "KRMRT", },
	{label: "AS5", value: "AS5", },
	{label: "BIZ2", value: "BIZ2", },
	{label: "BGMRT", value: "BGMRT", },
	{label: "OTHBldg", value: "OTHBldg", },
	{label: "CLB", value: "CLB", },
	{label: "CollegeGreen", value: "CollegeGreen", },
	{label: "COM2", value: "COM2", },
	{label: "EA", value: "EA", },
	{label: "IT", value: "IT", },
	{label: "KRBusTerminal", value: "KRBusTerminal", },
	{label: "KRMRT", value: "KRMRT", },
	{label: "KV", value: "KV", },
	{label: "LT13", value: "LT13", },
	{label: "LT27", value: "LT27", },
	{label: "Museum", value: "Museum", },
	{label: "OppHSSML", value: "OppHSSML", },
	{label: "OppKRMRT", value: "OppKRMRT", },
	{label: "OppNUSS", value: "OppNUSS", },
	{label: "OppTCOMS", value: "OppTCOMS", },
	{label: "OppUHall", value: "OppUHall", },
	{label: "OppUHC", value: "OppUHC", },
	{label: "OppYIH", value: "OppYIH", },
	{label: "PGPHse15", value: "PGPHse15", },
	{label: "PGP7", value: "PGP7", },
	{label: "PGP", value: "PGP", },
	{label: "PGPR", value: "PGPR", },
	{label: "RafflesHall", value: "RafflesHall", },
	{label: "S17", value: "S17", },
	{label: "TCOMS", value: "TCOMS", },
	{label: "JapaneseSch", value: "JapaneseSch", },
	{label: "UHall", value: "UHall", },
	{label: "UHC", value: "UHC", },
	{label: "UTown", value: "UTown", },
	{label: "Ventus", value: "Ventus", },
	{label: "YIH", value: "YIH", },
	{label: "AS1", value: "AS1", },
	{label: "AS2", value: "AS2", },
	{label: "AS3", value: "AS3", },
	{label: "AS4", value: "AS4", },
	{label: "AS5", value: "AS5", },
	{label: "AS6", value: "AS6", },
	{label: "AS7", value: "AS7", },
	{label: "AS8", value: "AS8", },
	{label: "BIZ1", value: "BIZ1", },
	{label: "BIZ2", value: "BIZ2", },
	{label: "CAPT", value: "CAPT", },
	{label: "CELS", value: "CELS", },
	{label: "COM1", value: "COM1", },
	{label: "COM2", value: "COM2", },
	{label: "E1", value: "E1", },
	{label: "E2", value: "E2", },
	{label: "E2A", value: "E2A", },
	{label: "E3", value: "E3", },
	{label: "E3A", value: "E3A", },
	{label: "E4", value: "E4", },
	{label: "E4A", value: "E4A", },
	{label: "E5", value: "E5", },
	{label: "EA", value: "EA", },
	{label: "EH", value: "EH", },
	{label: "ENG", value: "ENG", },
	{label: "ERC", value: "ERC", },
	{label: "EW1", value: "EW1", },
	{label: "EW2", value: "EW2", },
	{label: "GBT", value: "GBT", },
	{label: "HSSMLCR", value: "HSSMLCR", },
	{label: "I3", value: "I3", },
	{label: "KEVII", value: "KEVII", },
	{label: "LT1", value: "LT1", },
	{label: "LT2", value: "LT2", },
	{label: "LT3", value: "LT3", },
	{label: "LT4", value: "LT4", },
	{label: "LT6", value: "LT6", },
	{label: "LT7", value: "LT7", },
	{label: "LT7A", value: "LT7A", },
	{label: "LT8", value: "LT8", },
	{label: "LT9", value: "LT9", },
	{label: "LT10", value: "LT10", },
	{label: "LT11", value: "LT11", },
	{label: "LT12", value: "LT12", },
	{label: "LT13", value: "LT13", },
	{label: "LT14", value: "LT14", },
	{label: "LT15", value: "LT15", },
	{label: "LT16", value: "LT16", },
	{label: "LT17", value: "LT17", },
	{label: "LT18", value: "LT18", },
	{label: "LT19", value: "LT19", },
	{label: "LT20", value: "LT20", },
	{label: "LT21", value: "LT21", },
	{label: "LT26", value: "LT26", },
	{label: "LT28", value: "LT28", },
	{label: "LT29", value: "LT29", },
	{label: "LT31", value: "LT31", },
	{label: "LT32", value: "LT32", },
	{label: "LT33", value: "LT33", },
	{label: "LT34", value: "LT34", },
	{label: "MD1", value: "MD1", },
	{label: "MD5", value: "MD5", },
	{label: "MD4", value: "MD4", },
	{label: "MD7", value: "MD7", },
	{label: "MD9", value: "MD9", },
	{label: "MD10", value: "MD10", },
	{label: "NAK-AUD", value: "NAK-AUD", },
	{label: "PGPH-FR4", value: "PGPH-FR4", },
	{label: "RC4", value: "RC4", },
	{label: "RH", value: "RH", },
	{label: "RMI", value: "RMI", },
	{label: "RVR", value: "RVR", },
	{label: "S1A", value: "S1A", },
	{label: "S2", value: "S2", },
	{label: "S4", value: "S4", },
	{label: "S5", value: "S5", },
	{label: "S6", value: "S6", },
	{label: "S7", value: "S7", },
	{label: "S8", value: "S8", },
	{label: "S11", value: "S11", },
	{label: "S12", value: "S12", },
	{label: "S13", value: "S13", },
	{label: "S14", value: "S14", },
	{label: "S16", value: "S16", },
	{label: "S17", value: "S17", },
	{label: "SDE", value: "SDE", },
	{label: "SDE2", value: "SDE2", },
	{label: "SDE4", value: "SDE4", },
	{label: "SR_LT19", value: "SR_LT19", },
	{label: "TC", value: "TC", },
	{label: "TH", value: "TH", },
	{label: "TP", value: "TP", },
	{label: "USP", value: "USP", },
	{label: "UT", value: "UT", },
	{label: "UTSRC", value: "UTSRC", },
	{label: "WT", value: "WT", },
	{label: "Y", value: "Y", },
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      originLocation : "OppKRMRT",
      destLocation : "OppKRMRT",
      recommendedOriginBusStop : "", 
      recommendedDestBusStop : "",
      recommendedRoute : [],
      TextHolderStart: 'Walk from OppKRMRT',
      TextHolderOrigin:'Board bus at: ',
      TextHolderDest:'Alight bus at: ',
      TextHolderEnd: 'Walk to OppKRMRT',
      TextHolderBus:'',
      TextHolderTime:'',
      TextHolderRoute: 'Bus route: ',
      TextInputOrigin: 'OppKRMRT',
      TextInputDest: 'OppKRMRT',
      showRoute: true
    };
  }

  toggleShow = () => {
    this.setState({showRoute: !this.state.showRoute})
  }

  onLogin(){
    const { originLocation, destLocation } = this.state;
    // POST to Flask Server
      http.post('http://172.17.127.241:8668/login', {
      originLocation : originLocation,
      destLocation : destLocation,
      })
      .then((response) => this.onLoginSuccess(response))
      .catch((err) => console.log(err));
  }

  onLoginSuccess(response){
    const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute } = response;
    console.log("Received: " + JSON.stringify(response))
    this.setState({
        TextHolderOrigin: 'Board bus at: ' + response.data.recommendedOriginBusStop,
        TextHolderDest: 'Alight bus at: ' + response.data.recommendedDestBusStop,
        TextHolderBus: 'via ' + response.data.recommendedBus,
        TextHolderTime: (response.data.recommendedTime / 60) + " min",
        TextHolderRoute: 'Bus route: ' + response.data.recommendedRoute,
        recommendedRoute: response.data.recommendedRoute,
    })
  }


  render() {
    const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute } = this.state;
    return (

    <SafeAreaView style={styles.container}>
        <View
          style={{
            height: this.startHeaderHeight,
            backgroundColor: '#376DCF',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Path"
              placeholderTextColor="white"
              style={{ fontWeight: '700', paddingLeft: 15, paddingTop: 15 }}
            />
          </View>
        </View>

        <View style = {{flex : 1, marginHorizontal: 10}}>
          <View style={{flex : 1, flexDirection : 'row'}}>
              <Icon style={{marginHorizontal : 5, marginVertical : 15}} name='home' type='font-awesome' size={40} color="grey" />
              <View style={{flex : 1, borderWidth : 2, borderColor : "grey", marginHorizontal : 10, marginVertical : 10, flexDirection : 'row'}}>
                <View style={{flex : 1}}>
                    <RNPickerSelect
                        placeholder={{
                          label: 'Select origin...', value: null, color: '#9EA0A4'}}
                        items={locations}
                        onValueChange={value => {
                          this.setState({originLocation: value, TextInputOrigin: value, TextHolderStart: "Walk from " + value})
                        }}
                        style={{
                          ...pickerSelectStyles,
                          iconContainer: {
                            top: 10,
                            right: 12,
                          },
                        }}
                        value={this.state.originLocation}
                        useNativeAndroidPickerStyle={true}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                          return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                        }}
                      />
                </View>

                <View style={{flex : 1}}>
                    <TextInput style={{ flex : 1, marginHorizontal : 10, marginVertical: 10, backgroundColor: '#ededed', height: 30 }} onChangeText={(val) => this.setState({originLocation: val, TextInputOrigin: val,  TextHolderStart: "Walk from " + val})} value={this.state.TextInputOrigin}/>
                </View>
              </View>
          </View>
          
          <View style={{flex : 1, flexDirection : 'row'}}>
              <Icon style={{marginHorizontal : 5, marginVertical : 15}} name='flag-checkered' type='font-awesome' size={40} color="grey" />
              <View style={{flex : 1, borderWidth : 2, borderColor : "grey", marginHorizontal : 10, marginVertical : 10, flexDirection : 'row'}}>
                <View style={{flex : 1}}>
                    <RNPickerSelect
                        placeholder={{
                          label: 'Select origin...', value: null, color: '#9EA0A4'}}
                        items={locations}
                        onValueChange={value => {
                          this.setState({destLocation: value, TextInputDest: value, TextHolderEnd: "Walk to " + value})
                        }}
                        style={{
                          ...pickerSelectStyles,
                          iconContainer: {
                            top: 10,
                            right: 12,
                          },
                        }}
                        value={this.state.destLocation}
                        useNativeAndroidPickerStyle={true}
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                          return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                        }}
                      />
                </View>

                <View style={{flex : 1}}>
                    <TextInput style={{ flex : 1, marginHorizontal : 10, marginVertical: 10, backgroundColor: '#ededed', height: 30 }} onChangeText={(val) => this.setState({destLocation: val, TextHolderDest: val,  TextHolderEnd: "Walk to " + val})} value={this.state.TextInputDest}/>
                </View>
              </View>
          </View>

          <View style={{flex : 7, borderWidth: 0.5, borderColor: '#dddddd',}}>
            <ScrollView scrollEventThrottle={16} style={{flex : 1}}>
                <View style = {{flex : 1}}>
                    <Button style = {{marginHorizontal : 10}} title='Find Directions' onPress={() => this.onLogin()} />
                </View>
            
            

                <View style = {{flex : 1}}>
                    <Text style={{fontSize: 20, fontWeight : 'bold'}}> {this.state.TextHolderTime} </Text>
                </View>

                <View style = {{flex : 1}}>
                    <Text style={{fontSize: 20, fontWeight : '100'}}> {this.state.TextHolderBus} </Text>
                </View>

                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>
                  <Icon style={{marginHorizontal : 5}} name='home' type='font-awesome' size={40} color="grey" />
                  <View style={{flex : 1, marginHorizontal : 10, marginVertical : 0, flexDirection : 'row'}}>
                      <Text style={{ marginVertical : 5, fontSize: 20}}> {this.state.TextHolderStart} </Text>
                  </View>
                </View>

                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>
                  
                  <TouchableOpacity onPress={() => this.toggleShow()}  style={{flex : 1, marginVertical : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <View style={{flexDirection : 'row'}}>
                        <Icon style={{ marginHorizontal : 5}} name='bus' type='font-awesome' size={40} color="grey" />
                        <Text style={{ marginVertical : 5, marginHorizontal : 5, fontSize: 20}}> {this.state.TextHolderOrigin} </Text>
                    </View>

                    <View style={{}}>
                        <Icon style={{ marginHorizontal : 5, marginVertical : 15}} name='ellipsis-v' type='font-awesome' size={40} color="grey" />
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                    {this.state.showRoute && <Route recommendedRoute= {recommendedRoute}/>}
                </View>


                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>

                  <Icon style={{marginHorizontal : 5}} name='bus' type='font-awesome' size={40} color="grey" />
                  <View style={{flex : 1, marginHorizontal : 10, marginVertical : 10, flexDirection : 'row'}}>
                      <Text style={{ marginVertical : 0, fontSize: 20}}> {this.state.TextHolderDest} </Text>
                  </View>
                </View>

                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>
                  <Icon style={{marginHorizontal : 5}} name='flag-checkered' type='font-awesome' size={40} color="grey" />
                  <View style={{flex : 1, marginHorizontal : 10, marginVertical : 10, flexDirection : 'row'}}>
                      <Text style={{  fontSize: 20}}> {this.state.TextHolderEnd} </Text>
                  </View>
                </View>

            </ScrollView>
          </View>

         </View>

      </SafeAreaView>
    );
  }
}

export class Route extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <FlatList
        data={this.props.recommendedRoute}
        renderItem={({ item }) => 
        <View style={{flex : 0.5, flexDirection : 'row', paddingLeft : 10, borderWidth: 0.5, borderColor: '#dddddd'}}>
            <Icon style={{marginHorizontal : 5, paddingTop : 13, paddingLeft: 5}} name='bars' type='font-awesome' size={15} color="grey" />
            <View style={{flex : 1, marginHorizontal : 10, flexDirection : 'row'}}>
            <Text style={{ fontSize: 15}}> {item} </Text>
            </View>
        </View>
      }
     />
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
/*
# TODO
1. add Update(Check for new messages) function
*/
