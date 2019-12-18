import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { SafeAreaView } from "react-navigation";
import axios from 'axios';
import tail from 'lodash/tail';
import Constants from 'expo-constants';

const serverURL = 'http://172.23.91.24:8668';
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

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      originLocation : "",
      destLocation : "",
      recommendedOriginBusStop : "", 
      recommendedDestBusStop : "",
      recommendedBus : "",
      recommendedTime : "",
      recommendedRoute : [],
      TextHolderOrigin:'Recommended Origin Bus Stop: ',
      TextHolderDest:'Recommended Dest Bus Stop:',
      TextHolderBus:'Recommended Bus:',
      TextHolderTime:'Estimated Time Taken: ',
      TextHolderRoute: 'Recommended Route: ',
    };
  }

  

  onLogin(){
    const { originLocation, destLocation } = this.state;
    // POST to Flask Server
      http.post('http://172.23.91.24:8668/login', {
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
 
        TextHolderOrigin: 'Recommended Origin Bus Stop: ' + response.data.recommendedOriginBusStop,
        TextHolderDest: 'Recommended Dest Bus Stop: ' + response.data.recommendedDestBusStop,
        TextHolderBus: 'Recommended Bus: ' + response.data.recommendedBus,
        TextHolderTime: 'Time Taken: ' + (response.data.recommendedTime / 60) + " minutes",
        TextHolderRoute: 'Recommended Route: ' + response.data.recommendedRoute,
    })
  }


  render() {
    const { recommendedOriginBusStop, recommendedDestBusStop, recommendedBus, recommendedTime, recommendedRoute } = this.state;
    return (

    <View style={styles.container}>

        <View>
          <Text style={{fontSize: 20}}>Origin Bus Stop</Text>
          <TextInput style={{ marginHorizontal : 10, marginVertical: 10, backgroundColor: '#ededed' }} onChangeText={(val) => this.setState({originLocation: val})} />
          
          <Text style={{fontSize: 20}}>Destination Bus Stop</Text>
          <TextInput style={{ marginHorizontal : 10, marginVertical: 10, backgroundColor: '#ededed' }} onChangeText={(val) => this.setState({destLocation: val})} />
          
          
          <Button title='Login' onPress={() => this.onLogin()} />
          <Text style={{marginVertical: 20, fontSize: 20}}> {this.state.TextHolderOrigin} </Text>
          <Text style={{marginVertical: 20, fontSize: 20}}> {this.state.TextHolderDest} </Text>
          <Text style={{marginVertical: 20, fontSize: 20}}> {this.state.TextHolderBus} </Text>
          <Text style={{marginVertical: 20, fontSize: 20}}> {this.state.TextHolderTime} </Text>
          <Text style={{marginVertical: 20, fontSize: 20}}> {this.state.TextHolderRoute} </Text>
        </View>

      </View>
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

/*
# TODO
1. add Update(Check for new messages) function
*/