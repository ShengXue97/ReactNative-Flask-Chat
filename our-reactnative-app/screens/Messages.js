import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    StyleSheet
} from "react-native";

class Trips extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 50, backgroundColor: '#376DCF', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Messages"
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
export default Trips;