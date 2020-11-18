import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated, StyleSheet } from 'react-native';

class hidePhInput extends Component {
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
        duration: 0,
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
                outputRange : [12, 22],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : [14, 0],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange  : [0, 1],
                outputRange : ['#000', '#000'],
            }),
        };
        return (
            <View>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
            </View>
        );
    }
}

export default hidePhInput;