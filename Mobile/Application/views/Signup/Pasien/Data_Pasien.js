import React, { Component } from 'react';
 
import {
    Image, 
    StatusBar, 
    TextInput, 
    View,
    Text, 
    TouchableHighlight,
    ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from 'react-native-whc-loading'
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import { connect } from 'react-redux';
import { employee_state, setPdButton } from '../../../redux/actions/PasienSignup';
import styles from '../../../styles/signupStyle';

class signupView extends Component
{
    constructor(props) {
        super(props) 

        this.state = {
            date     : new Date(),
            mode     : 'date',
            show     : false,
            errorMsg : '',
        };
    }
 
    setDate = (event, date) => {
        let go   = date || '';
        date = date || this.state.date;
    
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
        
        date = go ? moment.utc(date).format('MM/DD/YYYY') : '';
        this.props.employee_state(date, 'dob');
        this.props.setPdButton('PdButtonState');
    }
  
    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }
  
    datepicker = () => {
        this.show('date');
    }
  
    timepicker = () => {
        this.show('time');
    }

    _setState = (varName, button, data) => {
        this.props.employee_state(data, varName);
        this.props.setPdButton(button);
    }

    _setGender = (value, index) => {
        this.props.employee_state(value, 'gender');
        this.props.setPdButton('PdButtonState');
        this.props.navigation.navigate('User_Details');
    }
    
    render() {
        const { show, date, mode } = this.state;
        const { fullname, address, phone, dob, gender, PdButtonState } = this.props.signup;
        return (
            <ImageBackground style = {styles.backgroundImage}>
                <StatusBar backgroundColor = "#156874" barStyle = "light-content" />
                <KeyboardAwareScrollView resetScrollToCoords = {{ x: 0, y: 0 }} contentContainerStyle = {styles.MainContainer}>

                    <View style={styles.InnerContainer}>
                        <Text style= {styles.siText}>
                            Data Pribadi
                        </Text>

                        { this.state.errorMsg 
                            ? <Text style= {[styles.siText, styles.errorMsg]}>{this.state.errorMsg}</Text>
                            : null
                        }
                        
                        <View>
                            <TextInput
                                placeholder     = 'Nama Lengkap'
                                onChangeText    = {(text) => this._setState('fullname', 'PdButtonState', text)}
                                returnKeyType   = {'next'}
                                onSubmitEditing = {() => this.refs.address.focus()}
                                blurOnSubmit    = {false}

                                value   = {fullname ? fullname : ''}
                                style   = {styles.TextInputStyleClass}
                                ref     = 'fullname'
                            />
                            <global.ant_design name="user" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                  
                        <View>
                            <TextInput
                                placeholder     = 'Alamat'
                                onChangeText    = {(text) => this._setState('address', 'PdButtonState', text)}                         
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                onSubmitEditing = {() => this.refs.phone.focus()}
                                blurOnSubmit    = {false}
                                
                                value   = {address ? address : ''}
                                style   = {[styles.TextInputStyleClass, {paddingRight:50}]}
                                ref     = 'address'
                            />
                            <global.ant_design name="enviromento" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>

                        <View>
                            <TextInput
                                placeholder     = 'No Telfon'
                                onChangeText    = {(text) => this._setState('phone', 'PdButtonState', text)}
                                keyboardType    = {'numeric'}
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                onSubmitEditing = {() => this.refs.birthDay.focus()}
                                
                                value = { phone ? phone : '' }
                                style = { styles.TextInputStyleClass }
                                ref   = 'phone'
                            />
                            <global.ant_design name="phone" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                
                        <View>
                            <TextInput
                                placeholder     = 'Tanggal Lahir'
                                onTouchStart    = {this.datepicker}
                                onFocus         = {this.datepicker}
                                autoCapitalize  = {'none'}
                                returnKeyType   = {'next'}
                                
                                value   = { mode === 'date' && dob ? moment.utc(date).format('MM/DD/YYYY') : '' }
                                style   = {styles.TextInputStyleClass}
                                ref     = 'birthDay'
                            />
                            <global.ant_design name="calendar" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>

                        { show && 
                            <DateTimePicker 
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={this.setDate}
                            />
                        }

                        <View style={ styles.pickerHolder }>
                            <Picker
                                selectedValue = {gender}
                                style={styles.picker}
                                onValueChange = {this._setGender}
                                ref = 'gender'
                                iconColor={'white'}
                                >
                                <Picker.Item label="Jenis Kelamin" value="" />
                                <Picker.Item label="Laki - Laki" value="Laki - Laki" />
                                <Picker.Item label="Perempuan" value="Perempuan" />
                            </Picker>
                            <global.ant_design name='caretdown' size={14} color='#156874' style={[{right: 8, top: 19, position: 'absolute' }]} />
                        </View>
                
                        <TouchableHighlight
                            style = {[
                                        styles.si_btn,
                                        {
                                            backgroundColor: PdButtonState ? '#fff' : '#23ac67',
                                        }
                                    ]}
                            underlayColor = 'white' 
                            onPress  = {() => this.props.navigation.navigate('User_Details')}
                            disabled = {PdButtonState}
                            >
                            
                            <Text style = {[styles.buttonText, {color: PdButtonState ? '#99aab1' : '#fff'}]}>
                                Lanjut
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <Loading ref="loading"/>
                </KeyboardAwareScrollView>
                <Image style = {[{opacity:0.1, resizeMode:'cover', alignSelf:'center', top:0, position:'absolute', zIndex:-1}]} source ={require('../../../assets/logo/logo.png')} />
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        signup: state.pasienSignup
    }
}

export default connect(mapStateToProps, { employee_state, setPdButton })(signupView);