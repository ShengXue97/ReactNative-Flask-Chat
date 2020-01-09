import React, {Component} from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements'
import axios from 'axios';
import tail from 'lodash/tail';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from "react-native";
import {Autocomplete, withKeyboardAwareScrollView} from "react-native-dropdown-autocomplete";

const ip_address = '0.0.0.0'
const serverURL = 'http://' + ip_address + ':8668';

const http = axios.create({
  baseURL: serverURL,
});

const data = [
    "OppKRMRT",
    "KRMRT",
    "AS5",
    "BIZ2",
    "BGMRT",
    "OTHBldg",
    "CLB",
    "CollegeGreen",
    "COM2",
    "EA",
    "IT",
    "KRBusTerminal",
    "KRMRT",
    "KV",
    "LT13",
    "LT27",
    "Museum",
    "OppHSSML",
    "OppKRMRT",
    "OppNUSS",
    "OppTCOMS",
    "OppUHall",
    "OppUHC",
    "OppYIH",
    "PGPHse15",
    "PGP7",
    "PGP",
    "PGPR",
    "RafflesHall",
    "S17",
    "TCOMS",
    "JapaneseSch",
    "UHall",
    "UHC",
    "UTown",
    "Ventus",
    "YIH",
    "AS1",
    "AS2",
    "AS3",
    "AS4",
    "AS5",
    "AS6",
    "AS7",
    "AS8",
    "BIZ1",
    "BIZ2",
    "CAPT",
    "CELS",
    "COM1",
    "COM2",
    "E1",
    "E2",
    "E2A",
    "E3",
    "E3A",
    "E4",
    "E4A",
    "E5",
    "EA",
    "EH",
    "ENG",
    "ERC",
    "EW1",
    "EW2",
    "GBT",
    "HSSMLCR",
    "I3",
    "KEVII",
    "LT1",
    "LT2",
    "LT3",
    "LT4",
    "LT6",
    "LT7",
    "LT7A",
    "LT8",
    "LT9",
    "LT10",
    "LT11",
    "LT12",
    "LT13",
    "LT14",
    "LT15",
    "LT16",
    "LT17",
    "LT18",
    "LT19",
    "LT20",
    "LT21",
    "LT26",
    "LT28",
    "LT29",
    "LT31",
    "LT32",
    "LT33",
    "LT34",
    "MD1",
    "MD5",
    "MD4",
    "MD7",
    "MD9",
    "MD10",
    "NAK-AUD",
    "PGPH-FR4",
    "RC4",
    "RH",
    "RMI",
    "RVR",
    "S1A",
    "S2",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S11",
    "S12",
    "S13",
    "S14",
    "S16",
    "S17",
    "SDE",
    "SDE2",
    "SDE4",
    "SR_LT19",
    "TC",
    "TH",
    "TP",
    "USP",
    "UT",
    "UTSRC",
    "WT",
    "Y",
];

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


class Path extends React.Component {
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
      distance1: 5,
      distance2: 5,
      showRoute: true
    };
  }

  handleSelectItemOrigin(item, index) {
    this.setState({originLocation: item, TextInputOrigin: item,  TextHolderStart: "Walk from " + item});
    console.log(item);
  }

  handleSelectItemDest(item, index) {
    this.setState({destLocation: item, TextInputDest: item,  TextHolderEnd: "Walk to " + item});
    console.log(item);
  }

  retrieveData = async () => {
      try {
        const value1 = await AsyncStorage.getItem('@MySuperStore:key1');
        if (value1 !== null) {
          // We have data!!
          this.setState({distance1: parseInt(value1)})
        }
       } catch (error) {
         // Error retrieving data
       }

       try {
        const value2 = await AsyncStorage.getItem('@MySuperStore:key2');
        if (value2 !== null) {
          // We have data!!
          this.setState({distance2: parseInt(value2)})
        }
       } catch (error) {
         // Error retrieving data
       }

       
       this.onLogin();
  }

  toggleShow = () => {
    this.setState({showRoute: !this.state.showRoute})
  }

  onLogin(){
    const { originLocation, destLocation, distance1, distance2 } = this.state;
    // POST to Flask Server
      http.post(serverURL + '/login', {
      originLocation : originLocation,
      destLocation : destLocation,
      crowdPref: distance1,
      walkPref: distance2,
      boardTime: (new Date().getHours() + new Date().getMinutes()),
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
    alert('Successfully updated path information!');
  }


  render() {
    const {scrollToInput, onDropdownClose, onDropdownShow} = this.props;
    const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute } = this.state;
    return (

    <SafeAreaView style={styles.container}>
         <View
          style={{
            height: this.startHeaderHeight,
            backgroundColor: 'purple',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text
              style={{ fontWeight: '700', paddingLeft: 175, paddingTop: 20, paddingBottom: 20, color: 'white',textAlign: 'center'}}
            >Path</Text>
          </View>
        </View>

        <View style = {{flex : 1, marginHorizontal: 10, paddingVertical: 5, paddingHorizontal: 5}}>
          
          <View style={{flex : 1, borderWidth : 2, borderColor : "grey", flexDirection : 'column'}}>
              <View style={{flex : 1, flexDirection : 'row'}}>
                  <View style = {{flex: 7, paddingHorizontal: 5}}>
                        <Autocomplete style={styles.input}
                          handleSelectItem={(item, id) => this.handleSelectItemOrigin(item, id)}
                          inputContainerStyle = {styles.inputContainer}
                          data={data}
                          placeholder = {"OppKRMRT"}
                          minimumCharactersCount={0}
                          highlightText
                          valueExtractor={item => item}
                          />
                  </View>
                  <View style={{flex : 1, marginHorizontal : 10, marginVertical : 15, flexDirection : 'column'}}>
                    <Icon style={{marginHorizontal : 5}} name='home' type='font-awesome' size={40} color="F19F86" />
                  </View>
              </View>
              <View style={{flex : 1, flexDirection : 'row'}}>
                  <View style = {{flex: 7, paddingHorizontal: 5}}>
                        <Autocomplete style={styles.input}
                          handleSelectItem={(item, id) => this.handleSelectItemDest(item, id)}
                          inputContainerStyle = {styles.inputContainer}
                          data={data}
                          placeholder = {"OppKRMRT"}
                          minimumCharactersCount={0}
                          highlightText
                          valueExtractor={item => item}
                          />
                  </View>
                  <View style={{flex : 1, marginHorizontal : 10, marginVertical : 10, flexDirection : 'column'}}>
                    <Icon style={{marginHorizontal : 5, marginVertical : 15}} name='flag-checkered' type='font-awesome' size={40} color="F19F86" />
                  </View>
              </View>

            </View>

          <View style={{flex : 7, borderWidth: 0.5, borderColor: '#dddddd', paddingTop: 15}}>
            <ScrollView scrollEventThrottle={16} style={{flex : 1}}>
                <View style = {{flex : 1}}>
                    <Button style = {{marginHorizontal : 10}} backgroundColor='purple' title='Find Directions' onPress={() => this.retrieveData()} />
                </View>
            

                <View style = {{flex : 1}}>
                    <Text style={{fontSize: 20, fontWeight : '100'}}> {this.state.TextHolderBus} </Text>
                </View>

                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>
                  <Icon style={{marginHorizontal : 5}} name='home' type='font-awesome' size={40} color="F19F86" />
                  <View style={{flex : 1, marginHorizontal : 10, marginVertical : 0, flexDirection : 'row'}}>
                      <Text style={{ marginVertical : 5, fontSize: 20}}> {this.state.TextHolderStart} </Text>
                  </View>
                </View>

                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>
                  
                  <TouchableOpacity onPress={() => this.toggleShow()}  style={{flex : 1, marginVertical : 10, flexDirection : 'row', justifyContent : 'space-between'}}>
                    <View style={{flexDirection : 'row'}}>
                        <Icon style={{ marginHorizontal : 5}} name='bus' type='font-awesome' size={40} color="F19F86" />
                        <Text style={{ marginVertical : 5, marginHorizontal : 5, fontSize: 20}}> {this.state.TextHolderOrigin} </Text>
                    </View>

                    <View style={{}}>
                        <Icon style={{ marginHorizontal : 5, marginVertical : 15}} name='ellipsis-v' type='font-awesome' size={40} color="F19F86" />
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                    {this.state.showRoute && <Route recommendedRoute= {recommendedRoute}/>}
                </View>


                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>

                  <Icon style={{marginHorizontal : 5}} name='bus' type='font-awesome' size={40} color="F19F86" />
                  <View style={{flex : 1, marginHorizontal : 10, marginVertical : 10, flexDirection : 'row'}}>
                      <Text style={{ marginVertical : 0, fontSize: 20}}> {this.state.TextHolderDest} </Text>
                  </View>
                </View>

                <View style={{flex : 1, flexDirection : 'row', borderWidth: 0.5, borderColor: '#dddddd',}}>
                  <Icon style={{marginHorizontal : 5}} name='flag-checkered' type='font-awesome' size={40} color="F19F86" />
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
            <Icon style={{marginHorizontal : 5, paddingTop : 13, paddingLeft: 5}} name='bars' type='font-awesome' size={15} color="F19F86" />
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
    backgroundColor: "#ffffff",
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
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  input: {maxHeight: 40},
  inputContainer: {
    flex: 1,
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 12,
    justifyContent: "flex-start",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
});

/*
# TODO
1. add Update(Check for new messages) function
*/
export default withKeyboardAwareScrollView(Path);