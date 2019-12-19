import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet
} from "react-native";


import BusButton from "./components/Services/BusButton";
import Crowd from "./components/Stops/Crowd";



export default class BusStops extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 50, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Bus Stops"
                                placeholderTextColor="white"
                                style={{ flex: 1, fontWeight: '700', paddingTop : 20, paddingLeft: 15}}
                            />
                        </View>
                    </View>

                </View>
                <View style = {{flex : 1, flexDirection: 'column'}}>
                            <BusButton onPress = {()=>this.showAlert('PGP -> KR MRT -> LT27 -> Opp UHC --> YIH')}>BIZ2</BusButton>
                            <BusButton onPress = {()=>this.props.navigation.navigate('COM2')}>COM2</BusButton>
                            <BusButton onPress = {()=>this.showAlert('D1')}>Ventus</BusButton>
                            <BusButton onPress = {()=>this.showAlert('D2')}>NUS IT</BusButton>
                            </View>
                            <View style = {{flex : 1, flexDirection: 'column'}}>
                            <Crowd>Hi</Crowd>
                            </View>

            </SafeAreaView>
        );
    }
}

export class COM2 extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 50, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Timetable"
                                placeholderTextColor="white"
                                style={{ flex: 1, fontWeight: '700', paddingTop : 20, paddingLeft: 15}}
                            />
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}