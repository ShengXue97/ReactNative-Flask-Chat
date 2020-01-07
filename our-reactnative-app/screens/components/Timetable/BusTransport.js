import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window')

class BusTransport extends Component {
    render() {
        return (
            <View style={{ backgroundColor: 'lightyellow', flexDirection : 'row', 
            alignItems : 'center', 
            justifyContent : 'flex-start', 
            height: 80, marginLeft: 5, 
            marginRight: 5, borderWidth: 0.5, borderColor: '#dddddd' }}>
            <View style={{ flex : 1, flexDirection : 'row'}}>
              <View style={{width: 46, padding : 5 }}>
                    <Icon name={this.props.iconName} size={30} color="grey" />
              </View>
              <View style={{height: 40, width: width - 70, padding : 5, justifyContent: "flex-start" }}>
                  <View>
                      <Text style={{ fontSize: 14, fontWeight: '300'}}>{this.props.module.get("bus") + " bus from " + this.props.module.get("originBusStop") + " to " + this.props.module.get("destBusStop")}</Text>
                  </View>
                  <View >
                      <Text style={{ fontSize: 14, fontWeight: '300'}}>{"Board at " + this.props.module.get("compare") + " HRS"}</Text>
                  </View>
              </View>  
            </View>
            </View>
        );
    }
}
export default BusTransport;

