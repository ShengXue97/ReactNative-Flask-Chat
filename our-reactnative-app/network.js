import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { SafeAreaView } from "react-navigation";
import axios from 'axios';
import tail from 'lodash/tail';
import Constants from 'expo-constants';

const serverURL = 'http://172.17.143.41:8668';
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

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      msgs: [],
    };
  }

  

  onLogin(){
    const { isLoggedIn, username } = this.state;
    if(!isLoggedIn){
      // POST to Flask Server
      http.post('http://172.17.143.41:8668/login', {username})
      .then(() => this.onLoginSuccess())
      .catch((err) => console.log(err));
    } else {
      alert('You are already logged in !');
    }

    //const response = await fetch('http://dummy.restapiexample.com/api/v1/employees');
    //console.log("response : " + JSON.stringify());
  }

  onLoginSuccess(){
    this.setState({isLoggedIn: true});
    this.getMessages();
  }

  addMessage(data){
    console.log("UO: " + JSON.stringify(data));
    const { msgs } = this.state;
    const { id, message } = data;
    msgs.push(data);
    this.setState({
      lastUpdated: new Date(),
      lastID: id,
    });
  }

  addMessageList(list){
    if (!list || list.length == 0) {
      return;
    } 
    const { msgs } = this.state;
    this.setState({
      msgs: [...msgs, ...list],
      lastUpdated: new Date(),
      lastID: tail(list).id,
    });
  }

  getMessages(){
    const { lastID } = this.state;
    // Get request to Flask Server
    http.get(lastID ? `http://172.17.143.41:8668/get/${lastID}` : '/get')
    .then((response) => this.addMessageList(response.data))
    .catch((err) => console.log(err));
  }

  onMsgSend(){
    const { input, username } = this.state;
    // POST to Flask Server
    http.post('http://172.17.143.41:8668/send', {
      username,
      message: input,
    })
    .then((response) => this.addMessage({
      message: input,
      id: response.data.id,
    }));
  }


  render() {
    const { msgs, isLoggedIn, lastUpdated } = this.state;
    return (

    <View style={styles.container}>

        <View>
          <Text>Login</Text>
          <TextInput style={{ backgroundColor: '#ededed' }} onChangeText={(val) => this.setState({username: val})} />
          <Button title='Login' onPress={() => this.onLogin()} />
          <Text>Online Status: {isLoggedIn ? 'Online' : 'Offline'}</Text>
        </View>

        <FlatList
        data={msgs}
        renderItem={({ item }) => <Item title={item.data} />}
        keyExtractor={item => item.data}
        extraData = {lastUpdated}
        />

        <View>
          <TextInput style={{ backgroundColor: '#ededed' }} onChangeText={(val) => this.setState({input: val})} />
          <Button title='send' onPress={() => this.onMsgSend()} />
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

/*
# TODO
1. add Update(Check for new messages) function
*/
