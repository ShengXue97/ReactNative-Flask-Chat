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
            height: 50, marginLeft: 5, 
            marginRight: 5, borderWidth: 0.5, borderColor: '#dddddd' }}>
            <View style={{ flex : 1, flexDirection : 'row'}}>
              <View style={{width: 40, padding : 5 }}>
                    <Icon name={this.props.iconName} size={30} color="grey" />
              </View>
              <View style={{width: width - 60, padding : 5, justifyContent: "flex-start" }}>
                  <View style={{flex: 1}}>
                      <Text style={{ fontSize: 12, fontWeight: '200'}}>{this.props.name1}</Text>
                  </View>
                  <View style={{flex: 1}}>
                      <Text style={{ fontSize: 9, fontWeight: '300'}}>{this.props.name2}</Text>
                  </View>
              </View>  
            </View>
            </View>
        );
    }
}
export default Category;

