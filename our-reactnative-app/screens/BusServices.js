import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
} from "react-native";
import BusButton from "./components/Services/BusButton";


class BusServices extends Component {
    showAlert(message) {
        return alert(message);
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ height: 50, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Bus Services"
                                placeholderTextColor="white"
                                style={{ flex: 1, fontWeight: '700', paddingTop : 20, paddingLeft: 15}}
                            />
                            </View>
         
                    </View>
                <View style = {{flex : 1, flexDirection: 'column'}}>
                            <BusButton onPress = {()=>this.showAlert('PGP -> KR MRT -> LT27 -> Opp UHC --> YIH')}>A1</BusButton>
                            <BusButton onPress = {()=>this.showAlert('A2')}>A2</BusButton>
                            <BusButton onPress = {()=>this.showAlert('D1')}>D1</BusButton>
                            <BusButton onPress = {()=>this.showAlert('D2')}>D2</BusButton>

                            </View>

            </SafeAreaView>
        );
    }
}
export default BusServices;