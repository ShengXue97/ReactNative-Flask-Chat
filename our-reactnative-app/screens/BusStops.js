import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import BusStop from './components/Stops/BusStop';
import { Card, ListItem, Button, Icon, Divider } from 'react-native-elements'

export class BusStops extends Component {
  componentWillMount() {
    this.startHeaderHeight = 50;
    if (Platform.OS == 'android') {
      // this.startHeaderHeight = 100 + StatusBar.currentHeight
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: this.startHeaderHeight,
              backgroundColor: '#376DCF',
              borderBottomWidth: 1,
              borderBottomColor: '#dddddd',
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Bus Stops Crowd Level"
                placeholderTextColor="white"
                style={{ fontWeight: '700', paddingLeft: 15, paddingTop: 15 }}
              />
            </View>
          </View>

          <ScrollView scrollEventThrottle={16} style={{}}>
              

            <View style={{ flex: 1, paddingTop: 5 }}>
             <BusStop 
              fullName = "BIZ 2"
              shortName = "BIZ2"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />

<BusStop 
              fullName = "Information Technology"
              shortName = "IT"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Kent Ridge Bus Terminal"
              shortName = "KRT"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Kent Vale"
              shortName = "KV"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "LT 13"
              shortName = "LT13"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "LT 27"
              shortName = "LT27"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "COM 2"
              shortName = "COM2"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Museum"
              shortName = "MUSM"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Opp Hon Sui Sen Memorial Library"
              shortName = "OHSSL"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Opp NUSS"
              shortName = "ONUSS"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Opp University Hall"
              shortName = "OUHALL"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Opp University Health Centre"
              shortName = "OUHC"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Opp Yusof Ishak House"
              shortName = "OYIH"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Prince George's Park"
              shortName = "PGP"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Prince George Park Residences"
              shortName = "PGPH7"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Raffles Hall"
              shortName = "RH"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "S17"
              shortName = "S17"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "University Hall"
              shortName = "UHALL"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "University Health Centre"
              shortName = "UHC"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "University Town"
              shortName = "UT"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Ventus"
              shortName = "VEN"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />
<BusStop 
              fullName = "Yusof Ishak House"
              shortName = "YIH"
              busList ={[
                    {key: 'Week 1'},
                    {key: 'Week 2'},
					{key: 'Week 3'},
					{key: 'Week 4'},
					{key: 'Week 5'},
					{key: 'Week 6'},
					{key: 'Recess Week'},
					{key: 'Week 7'},
					{key: 'Week 8'},
					{key: 'Week 9'},
					{key: 'Week 10'},
					{key: 'Week 11'},
					{key: 'Week 12'},
					{key: 'Week 13'},
					{key: 'Reading Week'},
                  ]} />

              
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
//
export default BusStops;