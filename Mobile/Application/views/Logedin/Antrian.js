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
    StatusBar
} from 'react-native';
import SwipeableRating from 'react-native-swipeable-rating';
import { Appbar } from 'react-native-paper';
import Loading from 'react-native-whc-loading';

import { logedUser }  from "../../auth";
import { data, storedData }  from "../../storage/Booking";
import { connect } from 'react-redux';
import styles from '../../styles/EmployeeAllList';
import { LI_setGlobalState, LI_setState } from '../../redux/actions/LogedIn';

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
        };
    }

    componentDidMount() {
        logedUser()
        .then(res => {
            this.setState({ storedData: res });
            this._makeRemoteRequest();
            setInterval(() => {
                if(this.props.logedIn.LI_totalNotif !== this.props.logedIn.LI_FL_TotNotif)
                {
                    this._makeRemoteRequest();
                    this.props.LI_setGlobalState(this.props.logedIn.LI_totalNotif, 'LI_FL_TotNotif');
                }
                else if(this.props.logedIn.LI_loadAntrian)
                {
                    this.props.LI_setGlobalState(false, 'LI_loadAntrian');
                    this._makeRemoteRequest();
                }
            }, 1);
        })
        .catch(err => {
            alert(err.message);
        });
    }

    _makeRemoteRequest = () => {
        this.setState({ dataLoading: true });

        fetch(global.url+'API/booking', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_user : this.state.storedData.id_user,
            })
        })
        .then(res => res.json())
        .then(res => {
            data(res.records);
            this.setState({
                data        : res.records,
                totalData   : res.records.length,
                error       : res.error || null,
                refresh     : false,
                dataLoading : false,
            });
            this.arrayholder = res.records;
        })
        .catch(e => {
            storedData()
            .then(res => {
                this.setState({
                    data        : res.data,
                    totalData   : res.data.length,
                    error       : e.message || null,
                    refresh     : false,
                    dataLoading : false,
                });
            })
            .catch(e => {
                this.setState({ error: e.message, refresh: false, dataLoading: false, totalData: 0 });
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
        });
    };

    _renderRefresh = (type = false) => {
        this.refs.loading.show();
        this.setState ({ seed : this.state.seed + 1, loading: type }, () => {
            if(type)
            {
                setTimeout(() => {
                    this._makeRemoteRequest();
                    this.refs.loading.close();
                }, 100);
            }
            else
            {
                this._makeRemoteRequest();
                this.refs.loading.close();
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

    _batalBooking = (id_reservasi) => {
        this.refs.loading.show();
        fetch(global.url+'API/booking/batal', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_reservasi  : id_reservasi,
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
                    this.props.LI_setGlobalState(true, 'LI_loadDokter');
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
            console.log(e.message);
        });
    }

    _renderAppBar = () => {
        return (
            <View>
                <Appbar style={[styles.onJobAppbar, {justifyContent:'flex-start', height:60}]}>
                    <Image
                        source={require('../../assets/logo/head-logo.png')}
                        style={{ 
                            width: 100,
                            height:30,
                            alignSelf:'center',
                        }}
                    />
                </Appbar>
                <StatusBar barStyle="light-content" backgroundColor="#156874"/>
            </View>
        );
    }

    _cekTerima = (item, id_user) => {
        if(item.terima === '1')
        {
            if(item.id_pasien === id_user)
            {
                return(
                    <View style={{position:'absolute', backgroundColor:'#24754f', borderRadius:10, padding:10, right:0, minWidth:50, alignItems:"center"}}>
                        <Text style={{fontSize:25, color:'white'}}>{item.no_antrian}</Text>
                    </View>
                )
            }
            else
            {
                return(
                    <View style={{position:'absolute', borderRadius:10, padding:10, borderWidth:3, borderColor:'gray', right:0, minWidth:50, alignItems:"center"}}>
                        <Text style={{fontSize:25, color:'gray'}}>{item.no_antrian}</Text>
                    </View>
                )
            }
        }
    }

    _tombolBatalBooking = (item, id_user) => {
        if(item.id_pasien === id_user)
        {
            return(
                <View style={[styles.nameContainer, {top:0, left: 15}]}>
                    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor:'#c85366', height:35, width:120, marginTop:10}]} onPress={() => {this._batalBooking(item.id_reservasi)}}>
                        <Text style={{color:'white', fontFamily: 'ufonts.com_century-gothic'}}>Batal booking</Text>  
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderItem = ({item}) => {

        const { username, id_user } = this.state.storedData;
        const { userSelected, modalVisible } = this.state;
        
        if(username && username !== '')
        {
            return (
                <View>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <View style={styles.fl_ph}>
                                <Image style={styles.pic} source={require('../../assets/images/dokter.png')}/>
                            </View>
                            <View>
                                <View style={[styles.nameContainer, {top:0}]}>
                                    <Text style={[styles.nameTxt, {fontSize:18}]} numberOfLines={1} ellipsizeMode="tail">{item.nama_pasien}</Text>
                                </View>
                                <View style={[styles.nameContainer, {top:0}]}>
                                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.nama_dokter}</Text>
                                </View>
                                <View style={[styles.nameContainer, {top:0}]}>
                                    <Text style={[styles.nameTxt, {fontStyle:'italic'}]} numberOfLines={1} ellipsizeMode="tail">({item.spesialis} / {item.sub_spesialis})</Text>
                                </View>
                                {this._tombolBatalBooking(item, id_user)}
                                {this._cekTerima(item, id_user)}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        const { data, refresh, totalData, dataLoading } = this.state;


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
                                return item.id_reservasi;
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
                            <Text style={{textAlign:'center', fontSize:18, marginBottom:20}}>Belum ada antrian booking!</Text>
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
                    {this._renderAppBar()}
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

export default connect(mapStateToProps, { LI_setGlobalState, LI_setState })(EmployeeAllList);