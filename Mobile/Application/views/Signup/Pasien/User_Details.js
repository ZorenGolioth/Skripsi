import React, { Component } from 'react'; 
import {
    Image,
    StatusBar, 
    TextInput, 
    View, 
    Alert,
    Text, 
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from 'react-native-whc-loading'
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { employee_state, setPudButton } from '../../../redux/actions/PasienSignup';
import { onSignIn, SkipWelcome }   from "../../../auth";
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

    _setState = (varName, button, data) => {
        this.props.employee_state(data, varName);
        this.props.setPudButton(button);
        this.setState({ errorMsg: '' });
    }

    _setDefaultValue = () => {
        // user details
        this.props.employee_state('', 'username');
        this.props.employee_state('', 'email');
        this.props.employee_state('', 'password');
        this.props.employee_state('', 'rePassword');
        // this.props.employee_state('', 'avatar');
        this.props.setPudButton('UserButtonState');

        // personal details
        this.props.employee_state('', 'fullname');
        this.props.employee_state('', 'address');
        this.props.employee_state('', 'phone');
        this.props.employee_state('', 'dob');
        this.props.employee_state('', 'gender');
        this.props.setPudButton('PdButtonState');
    }

    _openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.props.employee_state(image, 'avatar');
        })
        .catch(error => {});
    }

    _saveData = async () => {
        let formDataPost    = new FormData();
        // const { avatar }    = this.props.signup;
        const { signup }    = this.props;

        // for(let p in signup) {
        //     if(p !== 'avatar') formDataPost.append(p, signup[p]);
        //     if(avatar.path && p === 'avatar') {
        //         formDataPost.append('photo', {
        //             uri: avatar.path,
        //             type: avatar.mime,
        //             name: 'profile-picture.jpg'
        //         });
        //     }
        // }

        for(let p in signup) formDataPost.append(p, signup[p]);

        this.refs.loading.show();

        try {
            await fetch (global.url+'API/pasien_baru', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formDataPost
            })
            .then(response => response.json())
            .then(response => {
                this.refs.loading.close();
                if(response.includes('|'))
                {
                    SkipWelcome('1');
                    onSignIn(response.split('|')[1]);
                    this._setDefaultValue();
                    this.props.navigation.navigate('Home');
                    this.setState({ errorMsg: '' });
                }
                else
                {
                    this.setState({ errorMsg: response });
                }
            })
            .catch(e => {
                this.refs.loading.close();
                this.setState({ errorMsg : 'Oops..., Kesalahan sambungan! \nSilahkan coba kembali.' });
                console.log(e.message)
            })
        } catch (e) {
            this.refs.loading.close();
            this.setState({ errorMsg : 'Oops..., Kesalahan sambungan! \nSilahkan coba kembali.' });
        }
    }
    
    render() {
        const { username, email, password, rePassword, UserButtonState } = this.props.signup;

        // let sourceUri;
        // if(gender === 'Male') {
        //     sourceUri   =   avatar.path 
        //                     ? { uri: avatar.path }
        //                     : require(`../../../assets/images/mAvatar.png`);
        // } else {
        //     sourceUri   =   avatar.path 
        //                     ? { uri: avatar.path }
        //                     : require(`../../../assets/images/fAvatar.png`);
        // }
        
        return (
            <ImageBackground style = {styles.backgroundImage}>
                <StatusBar backgroundColor = "#156874" barStyle = "light-content" />

                <KeyboardAwareScrollView resetScrollToCoords = {{ x: 0, y: 0 }} contentContainerStyle = {styles.MainContainer}>
                    {/* <View style={[
                                    styles.row,
                                    {
                                        alignSelf:'center',
                                        elevation:5,
                                        width: 150, 
                                        height: 150,
                                        borderRadius:100,
                                        marginTop:20,
                                    }
                                ]}>
                        <Image 
                            source={sourceUri}
                            // indicator={ProgressBar}
                            style={{
                                width: 150, 
                                height: 150,
                                borderRadius:100,
                                overflow:'hidden',
                                backgroundColor:'white',
                                borderWidth:5,
                                borderColor:'white',
                            }}
                        />

                        <TouchableOpacity onPress={this._openGallery} style={styles.cameraHolder} >
                            <global.evilicons name="camera" size={35} color={'#fff'} />
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.InnerContainer}>
                        <Text style= {styles.siText}>
                            Data Pengguna
                        </Text>

                        { this.state.errorMsg 
                            ? <Text style= {[styles.siText, styles.errorMsg]}>{this.state.errorMsg}</Text>
                            : null
                        }

                        <View>
                            <TextInput
                                placeholder     = 'Masukan username'
                                onChangeText    = {(text) => this._setState('username', 'UserButtonState', text)}
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                onSubmitEditing = {() => this.refs.email.focus()}
                                value   = {username ? username : ''}
                                style   = {styles.TextInputStyleClass}
                                ref     = 'username'
                            />
                            <global.ant_design name="user" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                            
                        <View>
                            <TextInput
                                placeholder     = 'Masukan email'
                                onChangeText    = {(text) => this._setState('email', 'UserButtonState', text)}                         
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                keyboardType    = {'email-address'}
                                onSubmitEditing = {() => this.refs.password.focus()}                                
                                value   = {email ? email : ''}
                                style   = {styles.TextInputStyleClass}
                                ref     = 'email'
                            />
                            <global.ant_design name="mail" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                
                        <View>
                            <TextInput
                                placeholder     = 'Masukan password'
                                onChangeText    = {(text) => this._setState('password', 'UserButtonState', text)}
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                secureTextEntry = {true}
                                onSubmitEditing = {() => this.refs.rePassword.focus()}
                                
                                value = { password ? password : '' }
                                style = { styles.TextInputStyleClass }
                                ref   = 'password'
                            />
                            <global.ant_design name="lock" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                
                        <View>
                            <TextInput
                                placeholder     = 'Ulangi password'
                                onChangeText    = {(text) => this._setState('rePassword', 'UserButtonState', text)}
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                secureTextEntry = {true}
                                onSubmitEditing = {UserButtonState ? null : this._saveData}                                
                                value = {rePassword ? rePassword : ''}
                                style = {styles.TextInputStyleClass }
                                ref   = 'rePassword'
                            />
                            <global.ant_design name="lock" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>

                        <TouchableHighlight
                            style = {[
                                        styles.si_btn,
                                        {
                                            backgroundColor: UserButtonState ? '#fff' : '#23ac67',
                                        }
                                    ]}
                            underlayColor = 'white'
                            onPress     = { UserButtonState ? this._saveData : this._saveData }
                            disabled    = { UserButtonState }
                            >
                            
                            <Text style = {[styles.buttonText, {color:UserButtonState ? '#99aab1' : '#fff'}]}>
                                Daftar Sekarang
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <Loading ref="loading"/>
                </KeyboardAwareScrollView>
                {/* <Image style = {[{opacity:0.1, resizeMode:'cover', alignSelf:'center', top:0, position:'absolute', zIndex:-1}]} source ={require('../../../assets/images/cover2.jpg')} /> */}
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        signup: state.pasienSignup
    }
}

export default connect(mapStateToProps, { employee_state, setPudButton })(signupView);