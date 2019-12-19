import React, { Component } from "react";
import {
    View,
    SafeAreaView,
} from "react-native";


import BusButton from "../Services/BusButton";
import Crowd from "./Crowd";


export default class BusStop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            show: true,
        };
      }

      ShowHideComponent = () => {
        if (this.state.show == true) {
          this.setState({ show: false });
        } else {
          this.setState({ show: true });
        }
      };

    render() {
        return (
            <SafeAreaView>
            <View style = {{marginVertical: 20}}>
            <BusButton name = {this.props.name1} onPress = {this.ShowHideComponent}></BusButton>
    </View>

    <View>
    {this.state.show ? (
      <Crowd>Hi</Crowd>):null}


      </View>
      </SafeAreaView>
   
        );
    }
}

