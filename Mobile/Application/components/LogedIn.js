import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { logedUser, setNotification, storedNotification }  from "../auth";
import { LI_setState } from '../redux/actions/LogedIn';

// OTHER VIEWS
// import HomeView         from "../views/Logedin/home/Klinik";
import HomeView     from "./Home";
import ProfileView  from "../views/Logedin/profileView";
import Antrian      from "../views/Logedin/Antrian";

const EmployeeComponents = createBottomTabNavigator(
    {
        Home: {
            screen: HomeView,
            navigationOptions: {
                tabBarLabel:'Home',
                tabBarIcon: ({focused}) => {
                    return (
                        <global.ant_design name="home" size={28} color={(focused) ? '#156874' : '#abbdc7'} />
                    );
                }
            }
        },
        Antrian: {
            screen: Antrian,
            navigationOptions: {
                tabBarLabel:'Antrian',
                tabBarIcon: ({focused}) => {
                    return (
                        <View>
                            <global.ionicon name={'ios-list'} size={33} color={(focused) ? '#156874' : '#abbdc7'} />
                        </View>
                    );
                }
            }
        },
        Profile: {
            screen: ProfileView,
            navigationOptions: {
                tabBarLabel:'Profile',
                tabBarIcon: ({focused}) => {
                    return (
                        <global.ionicon name={'ios-person'} size={33} color={(focused) ? '#156874' : '#abbdc7'} />
                    );
                }
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: false,
            initialRouteName: 'Home',
            barStyle: { backgroundColor: 'red' },
            tabStyle :{
                elevation:0,
                borderWidth:0,
                backgroundColor:'#fff',
                activeColor: '#fff',
                inactiveColor: '#bda1f7',
                height:60,
                top:-10,
                elevation:10
            },
        },
    }
);

const styles = StyleSheet.create({
    notification : {
        position:'absolute',
        left:20,
        fontSize:8,
        backgroundColor: '#ec443e',
        color:'white',
        paddingLeft:4.4,
        paddingRight:4.4,
        paddingTop:1,
        paddingBottom:1,
        borderRadius:100,
        fontWeight:'bold'
    }
});

function mapStateToProps(state) {
    return {
        logedIn: state.LogedIn
    }
}

export default connect(mapStateToProps, { LI_setState })(EmployeeComponents);