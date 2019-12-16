import React, { Component } from 'react';
import { 
    View, 
    TouchableWithoutFeedback, 
    TouchableOpacity,
    Dimensions,
    Text,
    Slider
} from 'react-native';
import { connect} from 'react-redux';


class CustomSlider extends Component {

    state={
        slideValue: 0,
    }


    render() {
        const width = Dimensions.get('window').width;
        const sliderStyle = {
            sliderDummy: {
                backgroundColor: '#d3d3d3',
                width: 300,
                height:30,
                borderRadius: 50,
                position: 'absolute',                
            },
            sliderReal: {
                backgroundColor: '#119EC2',
                width: (this.state.slideValue/50) * 300,
                height:30,
            }
        }
        return(
            <View style={{borderRadius: 50, overflow: 'hidden'}}>       
            <View style={{flexDirection: 'row', position: 'absolute'}}>
                <View style={sliderStyle.sliderDummy}></View>
                <View style={sliderStyle.sliderReal}></View>
            </View>
            <Slider 
                style={{width: 300, height: 30, borderRadius: 50}}
                minimumValue={0}
                maximumValue={50}
                value={this.state.slideValue}
                onValueChange={(value)=> this.setState({ slideValue: value}) }
                maximumTrackTintColor='transparent'  
                minimumTrackTintColor='transparent'
                />  

            </View>

        );
    }

}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => {
    return{

    }
};


export default CustomSlider;