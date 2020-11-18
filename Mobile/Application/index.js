import React from "react";
import { AppRegistry, ActivityIndicator, } from "react-native";
import {createAppContainer} from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers';

import { createRootNavigator } from "./router";
import { isSkiped } from "./auth";

import Ionicons     from "react-native-vector-icons/Ionicons";
import AntDesign    from "react-native-vector-icons/AntDesign";
import EvilIcons    from "react-native-vector-icons/EvilIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome  from "react-native-vector-icons/FontAwesome";
import Feather      from "react-native-vector-icons/Feather";
import Entypo       from "react-native-vector-icons/Entypo";

/* set global url */
// global.url   = 'https://emplomee.000webhostapp.com/ml-api/ml_em_api2020/';
// global.url   = 'http://10.0.2.2:80/git/MadeLine/ApiLine.ml/ml_em_api2020/';
global.url   = 'http://192.168.1.7:80/doclin/12345/';

global.ionicon      = Ionicons;
global.ant_design   = AntDesign;
global.evilicons    = EvilIcons;
global.fontAwesome5 = FontAwesome5;
global.fontAwesome  = FontAwesome;
global.feather      = Feather;
global.entypo       = Entypo;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false,
            isReady: false
        };
    }

    // async _loadAssetsAsync() {
    //     const imageAssets = cacheImages([
    //         require('./assets/images/cover2.jpg'),
    //         require('./assets/images/white2.jpg'),
    //         require('./assets/images/employee.png'),
    //         require('./assets/images/employer.png'),
    //         require('./assets/logo/e.png')
    //     ]);

    //     await Promise.all([...imageAssets]);
    // }

    componentDidMount() {
        isSkiped()
        .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
        .catch(err => alert("An error occurred"));
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;
        const store = createStore(reducers);
        
        if (!checkedSignIn && !this.state.isReady) {
            this._loadAssetsAsync
            return null;
        }

        const Layout = createAppContainer(createRootNavigator(signedIn));
        const AppContainer = () => {
            return (
                <Provider store={store}>
                    <Layout/>
                </Provider>
            );
        }
        
        return <AppContainer />;
    }
}