import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated, StyleSheet } from 'react-native';

class FloatingInput extends Component {
    state = {
        isFocused: false,
    };

    UNSAFE_componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => this.setState({isFocused: true});
    handleBlur  = () => this.setState({isFocused: false});

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
        toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
        duration: 200,
        }).start();
    }

    render() {
        const { label, ...props } = this.props;
        const labelStyle = {
            position    : 'absolute',
            alignSelf   :'center', 
            fontFamily: 'ufonts.com_century-gothic',
            top: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [30, 8],
            }),
            zIndex: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [0, 1],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [14, 12],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : ['#000', '#000'],
            }),
            paddingLeft: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [0,15],
            }),
            paddingRight: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [0,15],
            }),
            borderRadius: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [0,3],
            }),
            backgroundColor: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : ['rgba(52, 52, 52, 0)','rgba(255, 255, 255, 1)'],
            }),
            borderColor: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : ['rgba(52, 52, 52, 0)','white'],
            }),
            borderWidth: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [0,0],
            }),
        };
        return (
            <View style={{ paddingTop: 18 }}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>

                <TextInput
                    {...props}
                    style   = {styles.TextInputStyleClass}
                    onFocus = {this.handleFocus}
                    onBlur  = {this.handleBlur}
                    blurOnSubmit
                />
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    TextInputStyleClass: {
        textAlign: 'center',
        marginBottom: 15,
        padding:10,
        height: 45,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,.5)',
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,.5)', 
        fontFamily: 'ufonts.com_century-gothic'
    }
});

export default FloatingInput;