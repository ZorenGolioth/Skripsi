import React, { Component } from 'react';
import 
{ 
    Image,
    StatusBar, 
    TextInput, 
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import Loading from 'react-native-whc-loading'
import { set_state, setLiButton } from '../../redux/actions/Login';
import styles from '../../styles/signupStyle';
import {onSignIn, SkipWelcome}   from "../../auth";
const { width, height } = Dimensions.get('window');
 
class LoginView extends Component
{ 
    constructor(props) { 
        super(props)

        this.state = {
            showAlert   : false,
            headAlert   : '',
            errorMsg    : '',
            okMenu      : '',
            cancelMenu  : true,
        };
    }

    _setDefaultValue = () => {
        this.props.set_state('', 'LiUnEmail');
        this.props.set_state('', 'LiPassword');
        this.props.setLiButton('LiButtonState');
    }

    _setState = (varName, button, data) => {
        this.props.set_state(data, varName);
        this.props.setLiButton(button);
        this.setState({ errorMsg: '' });
    }
 
    _login = async () => {
        let formDataPost = new FormData();
        const { logIn }  = this.props;

        for(let p in logIn) formDataPost.append(p, logIn[p]);

        this.refs.loading.show();

        try {
            await fetch (global.url+'API/login',{
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
                }
                else
                {
                    this.setState({ errorMsg   : response });
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
            console.log(e.message)
        }
    }
    
    render() {
        const { LiUnEmail, LiPassword, LiButtonState } = this.props.logIn;
        const { errorMsg } = this.state;
        return (
            <ImageBackground style = {styles.backgroundImage}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true}/>

                <KeyboardAwareScrollView resetScrollToCoords = {{ x: 0, y: 0 }} contentContainerStyle = {styles.MainContainer} >
                    <View style={styles.InnerContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={{ 
                                height: height/2,
                                resizeMode: 'contain',
                                alignSelf:'center',
                                marginTop:0,
                                marginBottom:20
                            }}
                        />

                        { errorMsg 
                            ? <Text style= {[styles.siText, styles.errorMsg]}>{errorMsg}</Text>
                            : null
                        }
            
                        <View>
                            <TextInput
                                placeholder     = 'Email / Username'
                                onChangeText    = {(text) => this._setState('LiUnEmail', 'LiButtonState', text)}
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                onSubmitEditing = {() => this.refs.password.focus()}
                                blurOnSubmit    = {false}
                                value           = {LiUnEmail ? LiUnEmail : ''}
                                
                                style = {[styles.TextInputStyleClass]}
                                ref   = 'email'
                            />
                            <global.ant_design name="user" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
            
                        <View>
                            <TextInput
                                placeholder     = 'Password'
                                onChangeText    = {(text) => this._setState('LiPassword', 'LiButtonState', text)}
                                secureTextEntry = {true}
                                value           = {LiPassword ? LiPassword : ''}
    
                                style = {[styles.TextInputStyleClass]}
                                ref   = 'password'
                                onSubmitEditing = { LiButtonState ? null : this._login }
                            />
                            <global.ant_design name="lock" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
            
                        <TouchableOpacity
                            style = {[styles.li_btn,
                                        {
                                            backgroundColor: LiButtonState ? '#fff' : '#23ac67'
                                        }
                                    ]}
                            underlayColor = 'white'
                            onPress = {this._login}
                            disabled = {LiButtonState} >
                            
                            <Text style = {[styles.buttonText, {color:LiButtonState ? '#99aab1' : '#fff'}]}>
                                Sign In <global.entypo name="login" size={18} color={LiButtonState ? '#99aab1' : '#fff'} style={{position:'absolute',right:20,top:13}} />
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.siHolder}>
                            {/* <Text style = {[styles.logoName, {color:'#156874'}]} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Lupa Password? </Text> */}

                            {/* <Text style = {[styles.orText]}>
                                <global.ant_design name="arrowright" size={16} color={'#156874'} style={{position:'absolute',right:20,top:13}} />
                            </Text> */}
            
                            <TouchableOpacity style={styles.si_btn1} underlayColor = 'white' onPress={() => this.props.navigation.navigate('Data_Pasien')}>
                                <Text style = {[styles.buttonText, {fontSize:16}]}>
                                    Daftar <global.ant_design name="adduser" size={16} color={'#156874'} style={{position:'absolute',right:20,top:13}} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Loading ref="loading"/>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        logIn: state.logIn
    }
}

export default connect(mapStateToProps, { set_state, setLiButton })(LoginView);