import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  Linking,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import SwipeableRating from 'react-native-swipeable-rating';
import { connect } from 'react-redux';
import Loading from 'react-native-whc-loading'
import { logedUser, onSignOut, onSkipWelcome }  from "../../auth";
import LoadingScreen from "../loadingScreen";
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
        this.refs.loading.show();
        onSignOut();
        onSkipWelcome();
        setTimeout(() => {
            this.refs.loading.close();
            this.props.navigation.navigate('Login');
        }, 500);
    }
    ratingCompleted(rating) {
        alert("Rating is: " + rating)
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
            avatar,
            fullname,
            username,
            address,
            phone,
            email,
            dob,
            userType,
            gender,
            NlUserIcon,
            em_phone
        } = this.state.storedData;

        if(username && username !== '')
        {
            return (
                <ScrollView style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="#156874" translucent={false}/>
                    {/* <Image style={styles.header} source={{ uri: em_phone }}/>
                    
                    <View style={styles.pp_holder}>
                        <Image style={styles.avatar} source={{ uri: avatar }}/>
                    </View> */}

                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{fullname}</Text>

                            <View style={styles.card}>
                                <Text style={styles.cardTittle}>Personal Details</Text>

                                <View style={styles.details}>
                                    <global.fontAwesome5 name="location-arrow" size={20} color={'#156874'} style={styles.sicon}/>
                                    <Text style={[styles.perDet, {}]}>{address}</Text>
                                </View>

                                <View style={styles.details}>
                                    <global.fontAwesome5 name="calendar-alt" size={23} color={'#156874'} style={styles.sicon}/>
                                    <Text style={[styles.perDet, {}]}>{dob}</Text>
                                </View>

                                <View style={styles.details}>
                                    <global.fontAwesome5 name="phone" size={18} color={'#156874'} style={styles.sicon}/>
                                    <Text style={[styles.perDet, {}]}>{phone}</Text>
                                </View>

                                <View style={styles.details} onPress={() => Linking.openURL(global.loged_site)}>
                                    <global.fontAwesome5 name="mail-bulk" size={18} color={'#156874'} style={styles.sicon}/>
                                    <Text style={[styles.perDet, {}]}>{email}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={[styles.buttonContainer, {marginTop:20, backgroundColor:'#1b9b3b'}]} onPress={() => {this.qt_logout()}}>
                                <Text style={{color:'white', fontFamily: 'ufonts.com_century-gothic'}}>Logout</Text>  
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Loading ref="loading"/>
                </ScrollView>
            );
        }
        else
        {  
            return (
                <ScrollView style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="#156874" translucent={false}/>
                    <Image style={styles.header} source={{ uri: em_phone }}/>
                    
                    <View style={styles.pp_holder}>
                        <Image style={styles.avatar} source={{ uri: NlUserIcon }}/>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <View style={{alignItems:'center', top:-10, marginBottom: 10}}>
                                <SwipeableRating
                                    rating={this.state.rating}
                                    size={32}
                                    gap={4}
                                />
                            </View>

                            <Text style={[styles.info, {color:'red', top: -25}]}>(You are not currently Loged In)</Text>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.qt_logout()}}>
                                <Text style={{color:'white', fontFamily: 'ufonts.com_century-gothic'}}>Login OR Signup Now</Text>  
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Loading ref="loading"/>
                </ScrollView>
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
    header:{
        // backgroundColor: "#156874",
        height: Dimensions.get('window').height / 2 - 40,
        width: null
    },
    pp_holder: {
        width: 180,
        height: 180,
        borderRadius: 100,
        alignSelf:'center',
        alignItems:'center',
        position: 'absolute',
        marginTop: (Dimensions.get('window').height / 2) - 130,
        backgroundColor: 'white',
        elevation:4,
    },
    avatar: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderWidth: 6,
        borderColor: "white",
        alignSelf:'center',
        alignItems:'center',
        position: 'absolute',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2.22,
    },
    body:{
        marginTop:100,
    },
    bodyContent: {
        padding:30,
    },
    name:{
        fontSize:35,
        color: "#156874",
        fontWeight: "600",
        textAlign: 'center',
        // fontFamily: 'ScriptMTBold'
    },
    info:{
        fontSize:24,
        color: "#696969",
        marginTop:10,
        textAlign: 'center',
        fontFamily: 'SelfDestructButtonBB_reg'
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'left'
    },
    card:{
        backgroundColor: "#FFFFFF",
        borderRadius:10,
        padding:15,
        marginTop:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
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
    details:{
        color:"#808080",
        fontSize: 15,
        fontFamily: 'ufonts.com_century-gothic',
        top:10,
    },
    perDet: {
        fontSize: 15,
        left:30,
        top:-22,
        width: Dimensions.get('window').width - 120,
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
});