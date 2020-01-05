import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    FlatList,
} from "react-native";
import Day from "../Stops/Day";

export default class DayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            show: false,
        };

      }
    render() {
        return (
           <View style = {{}}>
                <FlatList
                  data = {this.props.dayList}
                  renderItem={({item}) => <Day location = {this.props.location} week = {this.props.week} name1={item.key} />}
                />
           </View>
        );
    }
}

