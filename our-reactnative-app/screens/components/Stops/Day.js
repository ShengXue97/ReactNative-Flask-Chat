import React, { Component } from "react";
import {
    View,
    SafeAreaView,
} from "react-native";
import axios from 'axios';

import DayButton from "../Services/DayButton";
import Crowd from "./Crowd";
const serverURL = 'http://192.168.50.226:8668';
const http = axios.create({
  baseURL: serverURL,
});


export default class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            show: false,
            time: ["10:00", "11:00"],
            value:["1","2"],
        };

      }

      ShowHideComponent = () => {
        if (this.state.show == true) {
          this.setState({ show: false });
        } else {
          this.getGraph();
        }
      };

      getGraph(){
    // POST to Flask Server
      http.post(serverURL + '/graph', {
      location : this.props.location,
      dayofweek : this.props.name1,
      week : this.props.week,
      })
      .then((response) => this.onGraphSucess(response))
      .catch((err) => console.log(err));
}

    onGraphSucess(response){
        this.setState({
            show: true,
            time: response.data.time,
            value: response.data.value,
        });
        
    }

    render() {
        const { time, value } = this.state;
        return (
            <SafeAreaView>
                <View style = {{marginVertical: 5}}>
                    <DayButton name = {this.props.name1} onPress = {this.ShowHideComponent}></DayButton>
                </View>

                <View>
                    {this.state.show ? (
                         <Crowd time = {time} value = {value} />):null}


                </View>
            </SafeAreaView>
        );
    }
}

