import React from 'react';
import { Text } from "react-native";
import { createStackNavigator } from 'react-navigation';
import {createAppContainer} from 'react-navigation';

/* EMPLOYER SIGN UP */
import Klinik           from "../views/Logedin/home/Klinik";
import Dokter_Klinik    from "../views/Logedin/home/Dokter_Klinik";


const AllEmployeeCategory = createStackNavigator(
    {
        Home: {
            screen: Klinik,
            navigationOptions: {
                header: null,
            }
        },
        Dokter_Klinik: {
            screen: Dokter_Klinik,
            navigationOptions: {
                header: null,
                // headerTitle: 'Employee',
                // headerTitleStyle: {alignSelf: 'center', fontSize:20, fontFamily: 'ScriptMTBold', left: -20},
                // headerRight: (
                //     <Text style={{fontFamily:'ScriptMTBold', color: '#fff', fontSize:20, backgroundColor:'#1975a5', borderWidth:2, borderColor:'#1975a5', padding:5, borderRadius:5, right:20}}>Employee</Text>
                // ),
                // headerStyle: {
                //     elevation:1, height:50,
                // }
            }
        },
    }
);

const AllCategoryList = createAppContainer(AllEmployeeCategory);

export default AllCategoryList;