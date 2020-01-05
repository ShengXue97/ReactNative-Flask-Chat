import React, { Component } from 'react' 
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements';

export default class BusButton extends Component {
	render() {
		return (
			<TouchableOpacity
              onPress={this.props.onPress}>
              <View style = {{flex: 1, flexDirection: 'row', marginHorizontal: 20}}>
                <Icon style={{marginHorizontal : 5}} name='star' type='font-awesome' size={20} color="grey" />
			    <Text
                    style={{
                                      fontSize: 10,
                                      fontWeight: '700',
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

