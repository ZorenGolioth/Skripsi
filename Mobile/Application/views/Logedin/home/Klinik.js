import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    Dimensions
} from 'react-native';
import Loading from 'react-native-whc-loading';
import { Appbar } from 'react-native-paper';
import { klinikData, klinikStoredData, klinik }  from "../../../storage/Klinik";
import { connect } from 'react-redux';
import { LI_setGlobalState } from '../../../redux/actions/LogedIn';
const { width, height } = Dimensions.get('window');

class EmployeeCategoryList extends Component {

    constructor(props) {
            super(props);
            this.state = {
                data        : [],
                totalData   : 0,
                refresh     : true,
                loading      : true,
            };
    }

    componentDidMount() {
        this._makeRemoteRequest();
    }

    _makeRemoteRequest = () => {
        fetch(global.url+'API/semua_klinik', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', }
        })
        .then(res => res.json())
        .then(res => {
            klinikData(res.records);
            this.setState({ data : res.records, totalData : res.records.length, refresh : false, });
        })
        .catch(e => {
            klinikStoredData()
            .then(res => {
                this.setState({ data : res.data, totalData : res.data.length, refresh : false, });
            })
            .catch(e => {
                this.setState({ refresh: false, totalData: 0 });
                Alert.alert(
                    'Connection Error',
                    'Please check your connection and try again.',
                    [
                        {text: 'OK'}
                    ],
                    { cancelable: false }
                );
            });
        });
    };

    _renderRefresh = (type = false) => {
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

    clickEventListener = (item) => {
        this.props.LI_setGlobalState(item.id_klinik, 'LI_IdKlinik');
        this.props.LI_setGlobalState(item.nama_klinik, 'LI_NamaKlinik');
        klinik(item.id_klinik+'|'+item.nama_klinik);
        this.props.navigation.navigate('Dokter_Klinik');
    }

    _renderHeadBar = () => {
        return (
            <Appbar style={[styles.appbar, {justifyContent:'center'}]}>
                <Image
                    source={require('../../../assets/logo/head-logo.png')}
                    style={{ 
                        width: 120,
                        height:40,
                        alignSelf:'center',
                    }}
                />
            </Appbar>
        );
    }

    render() {
        const { data, refresh } = this.state;
        return (
            <View style={styles.container}>
                {this._renderHeadBar()}
                <FlatList 
                    style={styles.contentList}
                    contentContainerStyle={styles.listContainer}
                    data={data}
                    keyExtractor= {(item) => {
                        return item.id_klinik.toString();
                    }}
                    refreshing  = {refresh}
                    onRefresh   = {this._renderRefresh}
                    renderItem  = {({item}) => {
                    return (
                        <TouchableOpacity style={styles.card} onPress={()=> this.clickEventListener(item)}>
                            <Image style={styles.image} source={require('../../../assets/images/klinik.png')}/>
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{item.nama_klinik}</Text>
                                <Text style={styles.count}>{item.lokasi_klinik}</Text>
                                <Text style={styles.count}>Ph : {item.telpon}</Text>
                                {
                                    item.total_dokter > 0 ? <Text style={[styles.msgTxt]}>({item.total_dokter } dokter)</Text>
                                    : null
                                }
                                {/* <Text style={[styles.msgTxt]}>{item.total_dokter } dokter</Text> */}
                                {/* <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                                    <Text style={styles.followButtonText}>See All Employees</Text>  
                                </TouchableOpacity> */}
                            </View>
                        </TouchableOpacity>
                    )}}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        logedIn: state.LogedIn
    }
}

export default connect(mapStateToProps, { LI_setGlobalState })(EmployeeCategoryList);

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:"#ebf0f7"
        backgroundColor:"#fff",
    },
    listContainer:{
    paddingBottom:20,
    },
    contentList:{
        flex:1,
    },
    cardContent: {
        marginLeft:20,
        width: width - 170,
    },
    image:{
        width:80,
        height:80,
        borderRadius:15,
        // borderWidth:2,
        // borderColor:"#ebf0f7",
        top:4,
        left:5
    },

    card:{
        shadowColor: '#00000021',
        shadowOffset: {
        width: 0,
        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 2,

        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        backgroundColor:"white",
        padding: 10,
        flexDirection:'row',
        borderRadius:10,
    },

    name:{
        fontSize:16,
        // flex:1,
        alignSelf:'flex-start',
        color:"rgba(0,0,0,.8)",
        // fontFamily: 'ScriptMTBold',
        fontFamily: 'ufonts.com_century-gothic',
    },
    count:{
        fontSize:14,
        flex:1,
        alignSelf:'flex-start',
        color:"rgba(0,0,0,.8)",
        fontStyle:'italic'
    },
    followButton: {
        marginTop:10,
        marginBottom:5,
        height:30,
        // width:100,
        padding:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
        backgroundColor: "#1975a5",
        // borderWidth:1,
        borderColor:"#dcdcdc",
    },
    followButtonText:{
        color: "white",
        fontSize:14,
    },
    appbar: {
        alignItems: 'center', 
        justifyContent:'space-between', 
        height: 60, 
        paddingVertical: 0, 
        paddingHorizontal: 8,
        backgroundColor: '#156874',
        elevation: 1,
    },
});