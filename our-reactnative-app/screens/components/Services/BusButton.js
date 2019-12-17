import React, { Component } from 'react' 
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Divider
} from 'react-native';

export default class BusButton extends Component {
	render() {
		return (
			<TouchableOpacity
      style={styles.button} 
      onPress={this.props.onPress}>
			<Text style={styles.whiteFont}>{this.props.children}</Text>
			</TouchableOpacity>

		);
	}
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'black',
    padding: 20,
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 8
  },
  whiteFont: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

