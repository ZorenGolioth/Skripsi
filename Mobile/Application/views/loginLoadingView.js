import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

class Aboutscreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AnimatedLoader
                    visible = {true} 
                    overlayColor="rgba(255,255,255,0)"
                    animationStyle = {style.lottie}
                    source  = {require('../assets/gif/dots-circles-round.json')}
                    speed = {1}
                />
                <Image
                    source  = {require('../assets/logo/e.png')}
                    style   = {style.li_logo}
                />
            </View>
        )
    }
}
const style = StyleSheet.create({
    li_logo: {
        // top: -50,
        width: 80,
        height: 80,
        resizeMode: 'contain',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        zIndex:2
    },
    lottie: {
      justifyContent: 'flex-start',
      alignSelf: 'center',
      width: 250,
      height: 250
    }
});
 
export default Aboutscreen;