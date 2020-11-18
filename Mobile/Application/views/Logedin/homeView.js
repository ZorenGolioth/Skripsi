import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Linking,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { logedUser, onSignOut, onSkipWelcome }  from "../../auth";
import LoadingScreen from "../loadingScreen";
import EmployerHome from "../../components/home/EmployerHome";
import { LI_setState } from '../../redux/actions/LogedIn';

class Profile extends Component {
    constructor(props) { 
        super(props) 

        this.state = {
            starCount   : 3.5,
            rating      : 0,
            loading     : false,
            storedData  : '',
        };
    }

    componentDidMount() {
        this._setData();
    }

    _setData = () => {
        this.setState({ loading: true });
        logedUser()
        .then(res => {
            this.setState({ storedData: res, loading: false });
        })
        .catch(err => {
            this.setState({ loading: false });
            alert(err.message);
        });
    }

    handleRating = (rating) => {
        this.setState({rating});
    }

    qt_logout = () => {
        onSignOut();
        onSkipWelcome();
        this.props.navigation.navigate('Loading');
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 500);
    }

    render() {
        
        if (this.state.loading)
        {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <LoadingScreen size='large' />
                </View>
            );
        }

        const {
            username,
            address,
            phone,
            email,
            dob,
            userType
        } = this.state.storedData;

        if(username && username !== '')
        {
            if(userType === 'Employee')
            {
                return (
                    <ScrollView style={styles.container}>
                        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,.9)" translucent={true}/>
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>                
                                <Text style={styles.info}>({userType})</Text>
                            </View>
                        </View>
                    </ScrollView>
                );
            }
            else
            {
                return (
                    <EmployerHome/>
                );
            }
        }
        else
        {
            return (
                <View>
                    <Text style={styles.cardTittle}>Non User</Text>
                                    
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.qt_logout()}}>
                        <Text style={{color:'white', fontFamily: 'ufonts.com_century-gothic'}}>Logout</Text>  
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        logedIn: state.LogedIn
    }
}

export default connect(mapStateToProps, { LI_setState })(Profile);

const styles = StyleSheet.create({
    info:{
        fontSize:24,
        color: "#1975a5",
        marginTop:10,
        textAlign: 'center',
        fontFamily: 'SelfDestructButtonBB_reg'
    },
    body:{
        marginTop:100,
    },
    bodyContent: {
        padding:30,
    },
    buttonContainer: {
      marginBottom:10,
      height:45,
      // flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      // width:250,
      borderRadius:10,
      backgroundColor: "#2e809e",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 1,
    },
    cardTittle:{
        color:"#000",
        fontSize:18,
        marginBottom:5,
        textAlign:'center',
        fontFamily: 'ufonts.com_century-gothic',
        borderBottomColor: 'rgba(0,0,0,.5)',
        borderBottomWidth: 2,
        paddingBottom: 10
    },
});