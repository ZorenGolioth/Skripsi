import React, { Component } from 'react'; 
import {
    StyleSheet, 
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { employee_state } from '../redux/actions/EmployeeSignup';
import { employer_state } from '../redux/actions/EmployerSignup';
import styles from '../styles/signupStyle';

class UserOption extends Component
{
    constructor(props) {
        super(props);
    }

    _setUserType = (data, page) => {
        (data === 'Employee')
        ? this.props.employee_state(data, 'userType')
        : this.props.employer_state(data, 'userType');
        this.props.navigation.navigate(page);
    }
    
    render() {
        
        return (
            <ImageBackground style = {[styles.backgroundImage]} >
                <StatusBar backgroundColor = "#156874" barStyle = "light-content" />
                <KeyboardAwareScrollView resetScrollToCoords = {{ x: 0, y: 0 }} contentContainerStyle = {styles.MainContainer}>
                    <View style={styles.InnerContainer}>
                        <View style={styles1.container}>
                            <TouchableOpacity style={[styles1.card, {backgroundColor:'#fff'}]} onPress={() => {this._setUserType('Employee', 'Employee_Personal')}}>
                                <Image style={styles1.cardImage} source={require('../assets/images/employee.png')}/>
                            </TouchableOpacity>

                            <View style={styles1.cardHeader}>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <Text style={[styles.siText, {fontSize:16, borderBottomWidth:0}]}>Daftar {"\n"}Sebagai Employee</Text>
                                </View>
                            </View>
                            
                            <Text style= {[styles.siText, {marginBottom:40, top:20, borderBottomWidth:0}]}>
                                <global.entypo name="select-arrows" size={25} color={'#156874'} style={{position:'absolute',right:20,top:13}} />
                            </Text>

                            <TouchableOpacity style={[styles1.card, {backgroundColor:'#fff'}]} onPress={() => {this._setUserType('Employer', 'Employer_Personal')}}>
                                <Image style={styles1.cardImage} source={require('../assets/images/employer.png')}/>
                            </TouchableOpacity>

                            <View style={styles1.cardHeader}>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <Text style={[styles.siText, {fontSize:16, borderBottomWidth:0}]}>Daftar {"\n"}Sebagai Employer</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <Image style = {[{opacity:0.1, resizeMode:'cover', alignSelf:'center', top:0, position:'absolute', zIndex:-1}]} source ={require('../assets/images/cover2.jpg')} />
            </ImageBackground>
        );
    }
}

const styles1 = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-10,
    },
    card:{
        shadowColor: '#474747',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        marginVertical: 20,
        marginHorizontal: 40,
        backgroundColor:"#e2e2e2",
        width:104,
        height:104,
        borderRadius:100,
        alignItems:'center',
        alignSelf: 'center',
        justifyContent:'center',
        elevation:4,
        marginBottom:10,
        overflow:'hidden',
    },
    cardHeader: {
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
    },
    cardImage:{
        width: 100, 
        height: 100,
        backgroundColor:'white',
    },
});

function mapStateToProps(state) {
    return {
        signup: state.signup
    }
}

export default connect(mapStateToProps, { employee_state, employer_state })(UserOption);