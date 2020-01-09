import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
} from "react-native";
import axios from 'axios';

import Week from "../Stops/Week";
import WeekList from "../Stops/WeekList";
import Crowd from "./Crowd";
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements'

export default class BusStop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            show: false,
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
                <View style={{ flex: 1, paddingTop: 2, flexDirection: 'column', paddingHorizontal: 5 }}>
                    <TouchableOpacity
                      onPress={() => this.ShowHideComponent()}>
                        <View style={{ flex: 1, paddingTop: 1, flexDirection: 'row' }}>
                            <Icon style={{marginHorizontal : 5}} name='star' type='font-awesome' size={20} color="F19F86" />
                            <View style={{ flex: 1, paddingTop: 5, flexDirection: 'column' }}>
                                <Text
                                    style={{
                                      fontSize: 12,
                                      fontWeight: '700',
                                      paddingHorizontal: 20,
                                    }}>
                                    {this.props.fullName}
                                </Text>

                                <Text
                                    style={{
                                      fontSize: 10,
                                      fontWeight: '500',
                                      paddingHorizontal: 20,
                                    }}>
                                    {this.props.shortName}
                                </Text>
                            </View>
          
                        </View>
            
                        <View style={{ flex: 1, paddingTop: 5 }}>
                            <Divider style = {{height : 2}}/>
                        </View>
                    </TouchableOpacity>
              </View>


                

                <View>
                    {this.state.show ? (
                         <WeekList location = {this.props.shortName} busList = {this.props.busList} />
                    ):null}


                </View>
            </SafeAreaView>
        );
    }
}

