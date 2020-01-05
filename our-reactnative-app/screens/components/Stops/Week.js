import React, { Component } from "react";
import {
    View,
    SafeAreaView,
} from "react-native";

import WeekButton from "../Services/WeekButton";
import DayList from "../Stops/DayList";
import Crowd from "./Crowd";

export default class Week extends Component {
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
          this.setState({ show: true });
        }
      };

    render() {
        const { time, value } = this.state;
        return (
            <SafeAreaView>
                <View style = {{marginVertical: 5}}>
                    <WeekButton name = {this.props.name1} onPress = {this.ShowHideComponent}></WeekButton>
                </View>

                <View>
                    {this.state.show ? (
                         <DayList 
                         location = {this.props.location}
                         week = {this.props.name1}
                         dayList ={[
                            {key: 'Monday'},
                            {key: 'Tuesday'},
					        {key: 'Wednesday'},
					        {key: 'Thursday'},
					        {key: 'Friday'},
                            {key: 'Saturday'},
                            {key: 'Sunday'},
                          ]} />
                    ):null}


                </View>
            </SafeAreaView>
        );
    }
}

