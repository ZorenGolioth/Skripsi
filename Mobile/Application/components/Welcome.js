import React from 'react';
import { Image, Text } from "react-native";
import { createStackNavigator } from 'react-navigation';

/* LOGIN */
import Login                from "../views/Login/Login";
// import ForgotPassword       from "../views/Login/forgotPasswordView";

/* EMPLOYEE SIGN UP */
import Data_Pasien    from "../views/Signup/Pasien/Data_Pasien";
import User_Details  from "../views/Signup/Pasien/User_Details"

import loadingScreen        from "../views/loadingScreen";
import loginLoadingScreen   from "../views/loginLoadingView";

const Welcome = createStackNavigator(
    {
        /* LOGIN */
        Login: {
            screen: Login,
            navigationOptions: {
                header: null,
            }
        },
        // ForgotPassword: {
        //     screen: ForgotPassword,
        //     navigationOptions: {
        //         headerTitleStyle: {alignSelf: 'center', fontSize:16, color:'white', left: -20, fontFamily:'centuryGothic'},
        //         headerRight: (
        //             <Image
        //                 source={require('../assets/logo/e.png')}
        //                 style={{ width:120, height:30, right:20, position:'absolute' }}
        //             />
        //         ),
        //         headerStyle: {
        //             marginTop:24,
        //             elevation:5,
        //             backgroundColor:'#156874',
        //             color:'white'
        //         },
        //         headerTintColor: 'white',
        //     }
        // },

        /* EMPLOYEE */
        Data_Pasien: {
            screen: Data_Pasien,
            navigationOptions: {
                headerRight: (
                    <Image
                        source={require('../assets/logo/head-logo.png')}
                        style={{ width:90, height:30, right:20, position:'absolute' }}
                    />
                ),
                headerStyle: {
                    marginTop:24,
                    elevation:5,
                    backgroundColor:'#156874',
                    color:'white'
                },
                headerTintColor: 'white',
            }
        },
        User_Details: {
            screen: User_Details,
            navigationOptions: {
                headerRight: (
                    <Image
                        source={require('../assets/logo/head-logo.png')}
                        style={{ width:90, height:30, right:20, position:'absolute' }}
                    />
                ),
                headerStyle: {
                    marginTop:24,
                    elevation:5,
                    backgroundColor:'#156874',
                    color:'white'
                },
                headerTintColor: 'white',
            }
        },

        /* LOADING */
        Loading: {
            screen: loadingScreen,
            navigationOptions: {
                header: null,
            }
        },
        LoginLoading: {
            screen: loginLoadingScreen,
            navigationOptions: {
                header: null,
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            // headerStyle: {
                // backgroundColor: '#000',
                // paddingTop: 20,
                // top:120,
                // height: (Platform.OS === 'ios') ? 48 : 150,
                // color:'white',
                // headerTintColor: 'white',
            // },
            style: {
                color:'white'
            }
        }
    }
);

export default Welcome;