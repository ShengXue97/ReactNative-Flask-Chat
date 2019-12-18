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
const serverURL = 'http://172.17.127.250:8668';
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
export default class Route extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      busNumber : "",
      route : "",
      TextHolderRoute: 'Route: ',
    };
  }
  showAlert(message) {
    return alert(message);
}
  

  onGetBus(){
    const { busNumber } = this.state;
    console.log("wtf is going on" + busNumber)
    // POST to Flask Server
      http.post('http://172.17.127.250:8668/getBus', {
      busNumber : busNumber,
      })
      .then((response) => this.onGetBusSuccess(response))
      .catch((err) => console.log(err));
  }

  onGetBusSuccess(response){
    const { route } = response;
    console.log("Received: " + JSON.stringify(response))
    this.setState({
        TextHolderRoute: 'route: ' + response.data.route
    })
  }


  render() {
    const { busNumber } = this.state;
    return (

    <View style={styles.container}>

        <View>          
          <View style = {{flex : 1, flexDirection: 'column'}}>
                            <BusButton onPress = {()=>this.setState({busNumber:'A1'})}>A1</BusButton>
                            <Button title='Login' onPress={() => this.onGetBus()} />

   

                            </View>
          
          <Button title='GetRoute' onPress={() => this.onGetBus()} />
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
