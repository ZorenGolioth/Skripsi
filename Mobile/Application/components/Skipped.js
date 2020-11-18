import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from 'react-navigation';
import { isSkiped, logedUser, setNotification, storedNotification }  from "../auth";

// OTHER VIEWS
import HomeView         from "../views/Logedin/homeView";
import ProfileView      from "../views/Logedin/profileView";
import NotificationView from "../views/Logedin/NotificationView";

setInterval(() => {
    logedUser().then(res => {global.notif = res.username});
}, 0);

setInterval(() => {
    if(global.notif)
    {
        fetch(global.url+'employeeAllList/notif', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username  : global.notif,
            })
        })
        .then(r => r.json())
        .then(r => {
            setNotification(r);
        })
        .catch(e => {})
    }
}, 1000);
storedNotification().then(res => global.notification = res);

const EmployeeComponents = createBottomTabNavigator(
    {
        Home: {
            screen: HomeView,
            navigationOptions: {
                tabBarLabel:'Home',
                tabBarIcon: ({tintColor}) => {
                    return (
                        <global.ant_design name="home" size={25} color={tintColor} />
                    );
                }
            }
        },
        Notification: {
            screen: NotificationView,
            navigationOptions: {
                tabBarLabel:'Notification',
                tabBarIcon: ({tintColor}) => {
                    return (
                        <View>
                            <global.ant_design name="mail" size={25} color={tintColor} />
                            <Text style={ styles.notification }>{global.notification}</Text>
                        </View>
                    );
                }
            }
        },
        Profile: {
            screen: ProfileView,
            navigationOptions: {
                tabBarLabel:'Profile',
                tabBarIcon: ({tintColor}) => {
                    return (
                        <global.ant_design name="user" size={25} color={tintColor} />
                    );
                }
            }
        }
    }
);

const styles = StyleSheet.create({
    notification : {
        position:'absolute',
        left:15,
        fontSize:8,
        backgroundColor: '#ec443e',
        color:'white',
        paddingLeft:4,
        paddingRight:4,
        paddingTop:1,
        paddingBottom:1,
        borderRadius:5,
        fontWeight:'bold'
    }
});

export default EmployeeComponents;