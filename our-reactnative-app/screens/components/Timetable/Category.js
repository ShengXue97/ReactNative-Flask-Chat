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

class Category extends Component {
    render() {
        return (
            <View style={{ flexDirection : 'row', 
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
                      <Text style={{ fontSize: 14, fontWeight: '300'}}>{this.props.module.get("module") + " " + this.props.module.get("type")}</Text>
                  </View>
                  <View >
                      <Text style={{ fontSize: 14, fontWeight: '300'}}>{"@ " + this.props.module.get("venue")}</Text>
                  </View>
                  <View >
                      <Text style={{ fontSize: 14, fontWeight: '300'}}>{this.props.module.get("startTime") + " - " + this.props.module.get("endTime")}</Text>
                  </View>
              </View>  
            </View>
            </View>
        );
    }
}
export default Category;

