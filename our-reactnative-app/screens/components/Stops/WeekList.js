import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    FlatList,
} from "react-native";
import Week from "../Stops/Week";

export default class WeekList extends Component {
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
                  data = {this.props.busList}
                  renderItem={({item}) => <Week location = {this.props.location} name1={item.key} />}
                />
           </View>
        );
    }
}

