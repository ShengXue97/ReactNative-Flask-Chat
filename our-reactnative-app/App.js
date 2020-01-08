import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation'
import BusStops from './screens/BusStops'
import Settings from './screens/Settings'
import Timetable from './screens/Timetable'
import Path from './screens/Path'
import { SafeAreaView } from "react-navigation";

export default createBottomTabNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/settingsIcon.png')} style={{ height: 25, width: 25, tintColor: tintColor }} />
      )
    }
  },
  Timetable: {
    screen: Timetable,
    navigationOptions: {
      tabBarLabel: 'Timetable',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/timetableIcon.png')} style={{ height: 25, width: 25, tintColor: tintColor }} />
      )
    }
  },
  
  BusStops: {
    screen: BusStops,
    navigationOptions: {
      tabBarLabel: 'Bus Stops',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/busStopIcon.png')} style={{ height: 25, width: 25, tintColor: tintColor }} />
      )
    }
  },
  Path: {
    screen: Path,
    navigationOptions: {
      tabBarLabel: 'Path',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('./assets/mailIcon.png')} style={{ height: 25, width: 25, tintColor: tintColor }} />
      )
    }
  }
}, {
    tabBarOptions: {
      activeTintColor: '#376dcf',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  })
