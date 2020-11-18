import React, { Component } from 'react';
 
import 
{
    StatusBar,
    TextInput,
    View,
    Text, 
    TouchableHighlight, 
    ImageBackground,
    TouchableOpacity,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import Loading from 'react-native-whc-loading';
import { set_state, setCpButton } from '../../redux/actions/ChangePassword';
import styles from '../../styles/signupStyle';
 
class ChangePasswordView extends Component
{ 
    constructor(props) {
        super(props)

        this.state = {
            errorMsg: '',
            changed: false,
        };
    }
 
    _changePassword = async () => {
        let formDataPost = new FormData();
        const { CP }  = this.props;

        for(let p in CP) formDataPost.append(p, CP[p]);

        this.refs.loading.show();

        try {
            await fetch (global.url+'changePassword/cp',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: formDataPost
            })
            .then(response => response.json())
            .then(response => {
                if(response.includes('|'))
                {
                    this._setDefaultValue();
                    let r = response.split('|');
                    this.setState({ errorMsg : r[1], changed: true });

                    setTimeout(() => {
                        this.refs.loading.close();
                        this.props.navigation.navigate('Login');
                    }, 1000);
                }
                else
                {
                    this.refs.loading.close();
                    this.setState({ errorMsg : response, changed: false });
                }
            })
            .catch(e => {
                this.refs.loading.close();
                this.setState({ errorMsg : 'Oops..., Kesalahan sambungan! \nSilahkan coba kembali.', changed: false });
            })
        } catch (e) {
            this.refs.loading.close();
            this.setState({ errorMsg : 'Oops..., Kesalahan sambungan! \nSilahkan coba kembali.', changed: false });
        }
    }

    _setDefaultValue = () => {
        this.props.set_state('', 'CpEmail');
        this.props.set_state('', 'CpNewPassword');
        this.props.set_state('', 'CpConfirmPassword');
        this.props.setCpButton('CpButtonState');
    }

    _setState = (varName, button, data) => {
        this.props.set_state(data, varName);
        this.props.setCpButton(button);
        this.setState({ errorMsg: '' });        
    }
    
    render() {
        const { CpEmail, CpNewPassword, CpConfirmPassword, CpButtonState } = this.props.CP;
        return (
            <ImageBackground style = {styles.backgroundImage}>
                <StatusBar backgroundColor = "#156874" barStyle = "light-content" />

                <KeyboardAwareScrollView resetScrollToCoords = {{ x: 0, y: 0 }} contentContainerStyle = {styles.MainContainer} >
                    <View style={styles.InnerContainer}>

                        <Text style = {styles.siText}>Ganti Password</Text>

                        { this.state.errorMsg 
                            ? <Text style= {[styles.siText, {color: this.state.changed ? 'green' : 'red', fontFamily:'centuryGothicBold', fontSize:16, alignSelf:'center', borderBottomWidth:0}]}>{this.state.errorMsg}</Text>
                            : null
                        }
                
                        <View>
                            <TextInput
                                placeholder     = 'Email'
                                onChangeText    = {(text) => this._setState('CpEmail', 'CpButtonState', text)}
                                value           = {CpEmail ? CpEmail : ''}
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                keyboardType    = {'email-address'}
                                onSubmitEditing = {() => this.refs.password.focus()}
                                blurOnSubmit    = {false}
                                
                                style = {[styles.TextInputStyleClass]}
                                ref   = 'email'
                            />
                            <global.ant_design name="user" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                
                        <View>
                            <TextInput
                                placeholder     = 'Password baru'
                                onChangeText    = {(text) => this._setState('CpNewPassword', 'CpButtonState', text)}
                                value           = {CpNewPassword ? CpNewPassword : ''}
                                returnKeyType   = {'next'}
                                autoCapitalize  = {'none'}
                                secureTextEntry = {true}
                                onSubmitEditing = {() => this.refs.confPassword.focus()}
                                blurOnSubmit    = {false}

                                style = {[styles.TextInputStyleClass]}
                                ref   = 'password'
                            />
                            <global.ant_design name="lock" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                
                        <View>
                            <TextInput
                                placeholder     = 'Ketik kembali Password'
                                onChangeText    = {(text) => this._setState('CpConfirmPassword', 'CpButtonState', text)}
                                value           = {CpConfirmPassword ? CpConfirmPassword : ''}
                                secureTextEntry = {true}
                                onSubmitEditing = {CpButtonState ? null : this._changePassword}

                                style = {[styles.TextInputStyleClass]}
                                ref   = 'confPassword'
                            />
                            <global.ant_design name="lock" size={20} color={'#156874'} style={styles.inputIcon} />
                        </View>
                
                        <TouchableHighlight
                            style = {[styles.li_btn, 
                                    {
                                        backgroundColor: CpButtonState ? '#fff' : '#23ac67'
                                    }
                                    ]}
                            underlayColor = 'white'
                            onPress = {this._changePassword}
                            disabled = {CpButtonState}
                            >

                            <Text style = {[styles.buttonText, {color: CpButtonState ? '#99aab1' : '#fff'}]}>
                                Ganti Password
                            </Text>
                        </TouchableHighlight>
                
                        <TouchableOpacity style={[styles.si_btn1, {alignSelf:'center', marginTop:20}]} underlayColor = 'white' onPress={() => this.props.navigation.navigate('UserOption')}>
                            <Text style = {[styles.buttonText]}>
                                Sign Up <global.ant_design name="adduser" size={16} color={'#156874'} style={{position:'absolute',right:20,top:13}} />
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Loading ref="loading"/>
                </KeyboardAwareScrollView>
                {/* <Image style = {[{opacity:0.1, resizeMode:'cover', alignSelf:'center', top:0, position:'absolute', zIndex:-1}]} source ={require('../../assets/images/cover2.jpg')} /> */}
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        CP: state.changePassword
    }
}

export default connect(mapStateToProps, { set_state, setCpButton })(ChangePasswordView);