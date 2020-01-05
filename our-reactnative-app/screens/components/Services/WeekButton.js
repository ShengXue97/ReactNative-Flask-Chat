import React, { Component } from 'react' 
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements';

export default class WeekButton extends Component {
	render() {
		return (
			<TouchableOpacity
              onPress={this.props.onPress}>
              <View style = {{flex: 1, flexDirection: 'row', marginHorizontal: 15}}>
                <Icon style={{marginHorizontal : 5}} name='angle-double-right' type='font-awesome' size={20} color="grey" />
			    <Text
                    style={{
                                      fontSize: 12,
                                      fontWeight: '500',
                                      paddingHorizontal: 20,
                                    }}>
                                    {this.props.name}
                </Text>
              </View>
			</TouchableOpacity>

		);
	}
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'blue',
    padding: 20,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

