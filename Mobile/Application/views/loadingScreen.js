import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ImageBackground
    } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

class Aboutscreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* <Image
                    source  = {require('../assets/logo/e.png')}
                    style   = {style.li_logo}
                /> */}
                <AnimatedLoader
                    visible = {true} 
                    overlayColor="rgb(255,255,255)"
                    animationStyle = {style.lottie} 
                    source  = {require('../assets/gif/dots-circles-round.json')}
                    speed = {1}
                />
            </View>
        )
    }
}
const style = StyleSheet.create({
    li_logo: {
        // top: -50,
        height: 40,
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