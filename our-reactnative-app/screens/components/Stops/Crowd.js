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
  


export default class Crowd extends Component {
    
    render() {
        return (

      <View>
          <Text style = {{ alignContent: "center", paddingLeft: 5}}>
            No of People vs Time (In one day)
          </Text>
          <LineChart
            data={{
              labels: [],
              datasets: [
                {
                  data: this.props.value,
                }
              ]
            }}
            width={Dimensions.get('window').width} // from react-native
            height={160}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 4
              },
              xAxis: {
                visible: false,
              },
            }}
            bezier
            style={{
              marginVertical: 4,
              borderRadius: 8
            }}
          />
      </View>

   )}
}