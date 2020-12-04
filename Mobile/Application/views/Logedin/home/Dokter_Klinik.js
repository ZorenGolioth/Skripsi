import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    Modal,
    ScrollView,
    TextInput
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Appbar } from 'react-native-paper';
import Loading from 'react-native-whc-loading';
import { logedUser }  from "../../../auth";
import { connect } from 'react-redux';
import moment from 'moment'
import styles from '../../../styles/EmployeeAllList';
import { LI_setGlobalState } from '../../../redux/actions/LogedIn';

class EmployeeAllList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data         : [],
            error        : null,
            refresh      : false,
            userSelected : [],
            modalVisible : false,
            storedData   : '',
            loading      : true,
            totalData    : 0,
            dataLoading  : true,
            connection   : true,

            date     : new Date(),
            mode     : 'date',
            show     : false,
            tanggal  : '',
            waktu   : '',
        };
    }

    componentDidMount() {
        logedUser()
        .then(res => {
            this.setState({ storedData: res });
            this._makeRemoteRequest();
            setInterval(() => {
                if(this.props.logedIn.LI_loadDokter) {
                    this.props.LI_setGlobalState(false, 'LI_loadDokter');
                    this._makeRemoteRequest();
                }
            }, 1);
        })
        .catch(err => {
            alert(err.message);
        });
    }

    _makeRemoteRequest = () => {
        if(this.state.loading) this.refs.loading.show();
        this.setState({ dataLoading: true });

        fetch(global.url+'semua_klinik/dokter_klinik', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_klinik : this.props.logedIn.LI_IdKlinik,
                id_user   : this.state.storedData.id_user,
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                data        : res.records,
                totalData   : res.records.length,
                refresh     : false,
                dataLoading : false,
                connection  : true,
            });
            this.arrayholder = res.records;
            this.refs.loading.close();
        })
        .catch(e => {
            alert(e.message)
            this.setState({ connection: false });
            this.refs.loading.close();
        });
    };

    _renderRefresh = (type = false) => {
        if(type) this.refs.loading.show();
        this.setState ({ seed : this.state.seed + 1, loading: type }, () => {
            if(type)
            {
                setTimeout(() => {
                    this._makeRemoteRequest();
                }, 100);
            }
            else
            {
                this._makeRemoteRequest();
            }
        });
    };

    _showProfileModal = (item) => {
        this.refs.loading.show();
        this.setState({userSelected: item}, () => {
            setTimeout(() => {
                this.refs.loading.close();
                this._hideProfileModal(true);
            }, 1);
        });
    }
  
    _hideProfileModal(visible) {
        this.setState({modalVisible: visible});
    }

    _bookNow = (id_dokter, id_pasien) => {
        this.refs.loading.show();
        fetch(global.url+'API/booking/sekarang', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_dokter   : id_dokter,
                id_pasien   : id_pasien,
                tanggal     : this.state.tanggal,
                waktu       : this.state.waktu
            })
        })
        .then(r => r.json())
        .then(r => {
            this.refs.loading.close();
            if(r.includes('|'))
            {
                this.setState ({ seed : this.state.seed + 1 }, () => {
                    this._makeRemoteRequest();
                    this.setState({ modalVisible: false });
                    this.props.LI_setGlobalState(true, 'LI_loadAntrian');
                    setTimeout(() => {
                        this.props.navigation.navigate('Antrian');
                    }, 10);
                });
            }
            else
            {
                Alert.alert(
                    'Oops...!', r, [{text: 'OK'}],
                    { cancelable: false }
                );
            }
        })
        .catch(e => {
            this.refs.loading.close();
            Alert.alert(
                'Connection Error',
                'Please check your connection and try again.',
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            );
            console.log(e.message)
        });
    }
 
    // setDate = (event, date) => {
    //     let go   = date || '';
    //     date = date || this.state.date;
    
    //     this.setState({
    //         show: Platform.OS === 'ios' ? true : false,
    //         date,
    //     });
        
    //     date = go ? moment.utc(date).format('MM/DD/YYYY') : '';
    //     this.setState({ tanggal: date});
    // }

    setDate = (event, selectedDate) => {
        let go   = selectedDate || '';
        selectedDate = selectedDate || this.state.date;
        selectedDate = go ? moment.utc(selectedDate).format('MM/DD/YYYY') : '';
        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            tanggal: selectedDate
        });
    };
  
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

    _isBooked = (item, id_user, profile = false) => {
        if(item.booking === 0)
        {
            if(profile)
            {
                return (
                    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor:'#24754f'}]} onPress={() => {this._bookNow(item.id_dokter, id_user)}}>
                        <Text style={{color:'white', fontFamily: 'ufonts.com_century-gothic'}}>Booking sekarang</Text>  
                    </TouchableOpacity>
                );
            }
            else
            {
                return (
                    <View style={[styles.nameContainer, {top:0, left: 15, marginTop:10}]}>
                        <Text style={styles.mblTxt} onPress={() => {this._bookNow(item.id_dokter, id_user)}}>Booking sekarang</Text>
                    </View>
                );
            }
        }
    }

    _renderAppBar = () => {
        return (
            <Appbar style={[styles.appbar]}>
                <TouchableOpacity style={{ padding:10, left:-10 }} onPress={() => this.props.navigation.navigate('Home')}>
                    <global.fontAwesome5 name="arrow-left" size={18} color={'#000'} style={styles.sicon} />
                </TouchableOpacity>
                <Text style={{fontFamily: 'ScriptMTBold', fontSize:20, color:'#1975a5'}}>{this.props.logedIn.LI_NamaKlinik}</Text>
            </Appbar>
        );
    }

    renderItem = ({item}) => {

        const { username, id_user } = this.state.storedData;
        const { userSelected, modalVisible, show, mode, tanggal, date, waktu } = this.state;
        
        if(username && username !== '')
        {
            return (
                <View>
                    <TouchableOpacity onPress = {() => {this._showProfileModal(item)}}>
                        <View style={styles.row}>
                            <View style={styles.fl_ph}>
                                <Image style={styles.pic} source={require('../../../assets/images/dokter.png')}/>
                            </View>
                            <View>
                                <View style={[styles.msgContainer, {top:0}]}>
                                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.nama_dokter}</Text>
                                </View>
                                <View style={[styles.msgContainer, {top:0}]}>
                                    <Text style={styles.msgTxt}>{item.spesialis ?? '-'} / {item.sub_spesialis ?? '-'}</Text>
                                </View>
                                <View style={[styles.msgContainer, {top:0}]}>
                                    <Text style={styles.msgTxt}>Senin - Jumat : {item.jadwal_jam ?? '-'}</Text>
                                </View>
                                {this._isBooked(item, id_user)}
                            </View>
                        </View>
                    </TouchableOpacity>

                    <Modal
                        animationType   = {'fade'}
                        transparent     = { true }
                        onRequestClose  = { () => this._hideProfileModal(false) }
                        visible         = { modalVisible }
                        >

                        <View style={styles.popupOverlay}>
                            <View style={styles.popup}>
                                <View style={styles.popupContent}>
                                    <KeyboardAwareScrollView resetScrollToCoords = {{ x: 0, y: 0 }} contentContainerStyle = {styles.MainContainer}>
                                    <ScrollView contentContainerStyle={styles.modalInfo}>
                                        <View style={[styles.body, {marginTop:50}]}>
                                            <Text style={styles.name}>{userSelected.nama_dokter}</Text>
                                            <View style={styles.card}>
                                                <Text style={styles.cardTittle}>Personal Details / Data Pribadi</Text>

                                                <View style={styles.details}>
                                                    <global.fontAwesome5 name="angle-right" size={20} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.jenis_kelamin}</Text>
                                                </View>

                                                <View style={styles.details}>
                                                    <global.fontAwesome5 name="angle-right" size={23} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.tanggal_lahir}</Text>
                                                </View>

                                                <View style={styles.details}>
                                                    <global.fontAwesome5 name="angle-right" size={23} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.spesialis} / {userSelected.sub_spesialis}</Text>
                                                </View>
                                            </View>
                                            
                                            <View style={styles.card}>
                                                <Text style={styles.cardTittle}>Detail booking</Text>
                
                                                <View>
                                                    <TextInput
                                                        placeholder     = 'Tanggal resevasi'
                                                        onTouchStart    = {this.datepicker}
                                                        onFocus         = {this.datepicker}
                                                        autoCapitalize  = {'none'}
                                                        
                                                        value   = { mode === 'date' && tanggal ? moment.utc(date).format('MM/DD/YYYY') : '' }
                                                        style   = {styles.TextInputStyleClass}
                                                        ref     = 'birthDay'
                                                    />
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
                
                                                <View>
                                                    <TextInput
                                                        placeholder     = 'Waktu reservasi'
                                                        onChangeText    = {(text) => this.setState({waktu: text})}  
                                                        
                                                        value   = { waktu ?? ''}
                                                        style   = {styles.TextInputStyleClass}
                                                    />
                                                </View>
                                            </View> 
                                            {this._isBooked(userSelected, id_user, true)}
                                        </View>
                                    </ScrollView>
                                    </KeyboardAwareScrollView>
                                </View>
                                <View style={styles.popupButtons}>
                                    <TouchableOpacity onPress={() => {this._hideProfileModal(false) }} style={styles.btnClose}>
                                        <Text style={{color:'black', fontSize: 16, fontFamily: 'ufonts.com_century-gothic'}}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }
    }

    render() {
        const { data, refresh, totalData, dataLoading, connection } = this.state;
        const { connError } = this.state.storedData;
        
        if(!connection)
        {
            return (
                <View style={{ flex: 1}} >
                    {this._renderAppBar()}
                    <View style={{flex: 1, justifyContent:'center' }}>
                        <Image source = {{ uri: connError }} style = {{ height: 180, width: 180, alignSelf:'center', top:-40, marginBottom:-30 }} />
                        <Text style={{textAlign:'center', fontSize:18, marginBottom:20}}>Oops, connection error!</Text>
                        <Text style={{alignSelf:'center', color:'white', borderRadius:3, padding:10, backgroundColor:'green'}} onPress={() => this._renderRefresh(true)}>Try again!</Text>
                        <Loading ref="loading"/>
                    </View>
                </View>
            );
        }

        if(!dataLoading)
        {
            if(totalData > 0)
            {
                return (
                    <View style={{ flex: 1 }} >
                        {this._renderAppBar()}
                        <FlatList 
                            data            = { data }
                            keyExtractor    = {(item) => {
                                return item.id_dokter;
                            }}
                            refreshing      = {refresh}
                            onRefresh       = {this._renderRefresh}
                            renderItem      = {this.renderItem}
                        />
                        <Loading ref="loading"/>
                    </View>
                );
            }
            else
            {
                return (
                    <View style={{ flex: 1}} >
                        {this._renderAppBar()}
                        <View style={{ flex: 1, justifyContent:'center' }} >
                            <Text style={{textAlign:'center', fontSize:18, marginBottom:20}}>{this.props.logedIn.LI_NamaKlinik} belum memiliki dokter!</Text>
                            <Text style={{alignSelf:'center', color:'white', borderRadius:3, padding:10, backgroundColor:'green'}} onPress={() => this._renderRefresh(true)}>Refresh</Text>
                            <Loading ref="loading"/>
                        </View>
                    </View>
                );
            }
        }
        else
        {
            return (
                <View style={{ flex: 1 }} >
                    <Image source = {{ uri: connError }} style = {{ display:'none' }} />
                    <Loading ref="loading"/>
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

export default connect(mapStateToProps, { LI_setGlobalState })(EmployeeAllList);