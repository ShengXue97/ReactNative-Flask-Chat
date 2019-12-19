import React, { Component } from 'react' 
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';

var linedata = {
    labels: ['0600', '0800', '1000', '1200', '1400', '1600', '1800', '2000'],
    datasets: [
      {
        data: [0, 10, 40, 80, 99, 12],
        strokeWidth: 5, // optional
      },
    ],
  };

export default class Crowd extends Component {

    render() {
        return (

      <View>
  <Text style = {{ alignContent: "center"}}>
Crowd Level  </Text>
  <LineChart
    data={linedata}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    chartConfig={{
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `blue`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>

        )}
}