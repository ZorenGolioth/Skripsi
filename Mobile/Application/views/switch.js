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
} from 'react-native';
import SwipeableRating from 'react-native-swipeable-rating';
import Loading from 'react-native-whc-loading';
import { logedUser }  from "../../../auth";
import { data, storedData }  from "../../../storage/EmployeeAllList";
import { connect } from 'react-redux';
import styles from '../../../styles/EmployeeAllList';
import { LI_setGlobalState, LI_setState } from '../../../redux/actions/LogedIn';
import SwitchToggle from "react-native-switch-toggle";

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
            switchOn1: false,
            switchOn2: false,
            switchOn4: false
        };
    }

    componentDidMount() {
        logedUser()
        .then(res => {
            this.setState({ storedData: res });
            this._makeRemoteRequest();
            setInterval(() => {
                if(this.props.logedIn.LI_loadAllEmployee) {
                    this.props.LI_setGlobalState(false, 'LI_loadAllEmployee');
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

        fetch(global.url+'employeeAllList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username  : this.state.storedData.username,
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
            this.refs.loading.close();
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
                this.refs.loading.close();
            })
            .catch(e => {
                this.setState({ error: e.message, refresh: false, dataLoading: false, totalData: 0 });
                this.refs.loading.close();
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

    _isFavorite = (item, profile = false) => {
        if(item.favorite)
        {
            if(profile)
            {
                return (
                    <View style={[styles.favHolder, {top: 10, right:10, height:38, width:38, alignItems:'center', elevation:5, borderRadius:3}]}>
                        <Image style={[styles.icon, {height:24, width:24, top:4}]} source={{ uri: item.lovedIcon }}/>
                    </View>
                );
            }
            else
            {
                return (
                    <View style={styles.favHolder}>
                        <Image style={styles.icon} source={{ uri: item.lovedIcon }}/>
                    </View>
                );
            }
        }
    }

    _bookNow = (employee, employer) => {
        this.refs.loading.show();
        fetch(global.url+'newBooking/book', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employee  : employee,
                employer  : employer,
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
                    this.props.LI_setGlobalState(true, 'LI_loadFavoriteEmployee');
                    this.props.LI_setGlobalState(true, 'LI_loadCategoryEmployee');
                    this.props.LI_setGlobalState(true, 'LI_loadOnJobEmployee');
                    this.props.LI_setGlobalState(true, 'LI_loadOnJobUpdater');
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
        });
    }

    getButtonText() {
        return this.state.switchOn4 ? "Hour" : "Day";
    }
    
    getRightText() {
        return this.state.switchOn4 ? "" : "Hour";
    }
    
    getLeftText() {
        return this.state.switchOn4 ? "Day" : "";
    }

    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
    };
    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
    };
    onPress3 = () => {
        this.setState({ switchOn3: !this.state.switchOn3 });
    };
    onPress4 = () => {
        this.setState({ switchOn4: !this.state.switchOn4 });
    };

    renderItem = ({item}) => {

        const { username, em_phone } = this.state.storedData;
        const { userSelected, modalVisible } = this.state;
        
        if(username && username !== '')
        {
            return (
                <View>
                    <TouchableOpacity onPress = {() => {this._showProfileModal(item)}}>
                        <View style={styles.row}>
                            <View style={styles.fl_ph}>
                                {this._isFavorite(item)}
                                <Image source={ { uri:item.avatar } } style={styles.pic} />
                            </View>
                            <View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.em_employee_fullname} {this.props.logedIn.LI_loadData}</Text>
                                    <Text style={styles.mblTxt} onPress={() => {this._bookNow(item.em_username, username)}}>Book Now</Text>
                                </View>
                                <View style={[styles.msgContainer, {top:0}]}>
                                    <Text style={styles.msgTxt}>{item.em_utype} - {item.em_employee_profession}</Text>
                                </View>
                                <View style={[styles.msgContainer, {left:10, marginTop:5}]}>
                                    <SwipeableRating
                                        rating={item.em_employee_rating ? parseInt(item.em_employee_rating) : 0}
                                        size={18}
                                        color={'orange'}
                                    />
                                </View>
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
                                    <ScrollView contentContainerStyle={styles.modalInfo}>
                                        <Image style={styles.header} source={{ uri: em_phone }}/>
                                        {this._isFavorite(userSelected, true)}
                                        <View style={styles.pp_holder}>
                                            <Image style={styles.avatar} source={{ uri: userSelected.avatar }}/>
                                        </View>

                                        <View style={styles.body}>
                                            <Text style={styles.name}>{userSelected.em_employee_fullname}</Text>
                                            <Text style={styles.info}>({userSelected.em_utype} - {userSelected.em_employee_profession})</Text>

                                            <View style={{alignItems:'center', marginTop: 0, marginBottom: 0, height: 50}}>
                                                <SwipeableRating
                                                    rating  = {userSelected.em_employee_rating ? parseInt(userSelected.em_employee_rating) : 0}
                                                    size    = {32}
                                                    gap     = {4}
                                                    color={'orange'}
                                                />
                                            </View>

                                            <View style={styles.card}>
                                                <Text style={styles.cardTittle}>Personal Details / Data Pribadi</Text>

                                                <View style={styles.details}>
                                                    <global.fontAwesome5 name="location-arrow" size={20} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.em_employee_address}</Text>
                                                </View>

                                                <View style={styles.details}>
                                                    <global.fontAwesome5 name="calendar-alt" size={23} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.em_employee_dob}</Text>
                                                </View>
                                                
                                                <Text style={[styles.cardTittle, {marginTop: 30}]}>Profession / Profesi</Text>

                                                <View style={styles.details}>
                                                    <global.fontAwesome name="money" size={20} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.em_employee_category} ({userSelected.em_employee_profession})</Text>
                                                </View>
                                                
                                                <Text style={[styles.cardTittle, {marginTop: 30}]}>Rate / Tarif</Text>

                                                <View style={styles.details}>
                                                    <global.fontAwesome name="money" size={20} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.em_employee_Mrate} / Month</Text>
                                                </View>

                                                <View style={styles.details}>
                                                    <global.fontAwesome name="money" size={20} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.em_employee_Wrate} / Week</Text>
                                                </View>

                                                <View style={styles.details}>
                                                    <global.fontAwesome name="money" size={20} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.em_employee_Drate} / Day</Text>
                                                </View>

                                                <View style={styles.details} onPress={() => Linking.openURL(global.loged_site)}>
                                                    <global.fontAwesome name="money" size={20} color={'#1975a5'} style={styles.sicon}/>
                                                    <Text style={[styles.perDet, {}]}>{userSelected.em_employee_Hrate} / Hour</Text>
                                                </View>
                                            </View>

                                            <TouchableOpacity style={[styles.buttonContainer]} onPress={() => {this._bookNow(userSelected.em_username, username)}}>
                                                <Text style={{color:'white', fontFamily: 'ufonts.com_century-gothic'}}>Book Now</Text>  
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
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
        const { data, refresh, totalData, dataLoading } = this.state;


        if(!dataLoading)
        {
            if(totalData > 0)
            {
                return (
                    <View style={{ flex: 1 }} >
                        <View style={styles.container}>
                            <SwitchToggle switchOn={this.state.switchOn1} onPress={this.onPress1} />
                            <SwitchToggle
                            containerStyle={{
                                marginTop: 16,
                                width: 108,
                                height: 48,
                                borderRadius: 25,
                                backgroundColor: "#ccc",
                                padding: 5
                            }}
                            circleStyle={{
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                backgroundColor: "white" // rgb(102,134,205)
                            }}
                            switchOn={this.state.switchOn2}
                            onPress={this.onPress2}
                            circleColorOff="white"
                            circleColorOn="red"
                            duration={500}
                            />
                            <SwitchToggle
                            containerStyle={{
                                marginTop: 16,
                                width: 160,
                                height: 65,
                                borderRadius: 30,
                                padding: 5
                            }}
                            backgroundColorOn="#a0e1e5"
                            backgroundColorOff="#e5e1e0"
                            circleStyle={{
                                width: 55,
                                height: 55,
                                borderRadius: 27.5,
                                backgroundColor: "blue" // rgb(102,134,205)
                            }}
                            switchOn={this.state.switchOn3}
                            onPress={this.onPress3}
                            circleColorOff="#ff11ff"
                            circleColorOn="green"
                            duration={500}
                            />
                            <SwitchToggle
                            buttonText={this.getButtonText()}
                            backTextRight={this.getRightText()}
                            backTextLeft={this.getLeftText()}
                            type={1}
                            buttonStyle={{
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute"
                            }}
                            rightContainerStyle={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            leftContainerStyle={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "flex-start"
                            }}
                            buttonTextStyle={{ fontSize: 20 }}
                            textRightStyle={{ fontSize: 20 }}
                            textLeftStyle={{ fontSize: 20 }}
                            containerStyle={{
                                marginTop: 16,
                                width: 160,
                                height: 65,
                                borderRadius: 30,
                                padding: 5
                            }}
                            backgroundColorOn="#fff"
                            backgroundColorOff="#fff"
                            circleStyle={{
                                width: 80,
                                height: 55,
                                borderRadius: 27.5,
                                backgroundColor: "blue" // rgb(102,134,205)
                            }}
                            switchOn={this.state.switchOn4}
                            onPress={this.onPress4}
                            circleColorOff="#e5e1e0"
                            circleColorOn="#e5e1e0"
                            duration={500}
                            />
                        </View>
                        <FlatList 
                            data            = { data }
                            keyExtractor    = {(item) => {
                                return item.em_uid;
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
                    <View style={{ flex: 1, justifyContent:'center' }} >
                        <Text style={{textAlign:'center', fontSize:18, marginBottom:20}}>The are no employees available yet!</Text>
                        <Text style={{alignSelf:'center', color:'white', borderRadius:3, padding:10, backgroundColor:'green'}} onPress={() => this._renderRefresh(true)}>Reload Employee List</Text>
                        <Loading ref="loading"/>
                    </View>
                );
            }
        }
        else
        {
            return (
                <View style={{ flex: 1 }} >
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