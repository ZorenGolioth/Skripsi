import React from 'react';
import { Platform, StyleSheet, View, Text, Modal, TouchableOpacity, Alert, Dimensions } from 'react-native';
 
export default class Popup extends React.Component {
 
    constructor(props) { 
        super(props); 
        this.state = {
            showAlert   : false,
            headAlert   : '',
            bodyAlert   : '',
            okMenu      : '',
            cancelMenu  : true,
        }; 
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            showAlert   : props.showAlert,
            headAlert   : props.headAlert,
            bodyAlert   : props.bodyAlert,
            okMenu      : props.okMenu,
            cancelMenu  : props.cancelMenu,
        });
    }
 
    Show_Custom_Alert(visible) {    
        this.setState({showAlert: visible});        
    }

    ok_Button=()=>{
        Alert.alert("OK Button Clicked.");
    }
 
    render() {
        const { showAlert, headAlert, bodyAlert, okMenu, cancelMenu } = this.state;
        return (        
            <View style={[styles.MainContainer]}>
                <Modal        
                    visible={showAlert}
                    transparent={true}
                    animationType={"fade"}
                    onRequestClose={ () => { this.Show_Custom_Alert(!showAlert)}} >        
        
                    <View style={styles.popupOverlay}>
                        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={styles.Alert_Main_View}>
                                <Text style={styles.Alert_Title}>{headAlert}</Text>
                                <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,.4)', alignSelf:'center', borderRadius:100}} />
                                <Text style={styles.Alert_Message}>{bodyAlert}</Text>
                                <View style={{flexDirection: 'row', justifyContent:'center', height: '24%'}}>
                                    {
                                    okMenu ?
                                        <TouchableOpacity 
                                            style={styles.buttonStyle}
                                            onPress={() => { this.Show_Custom_Alert(!showAlert)} } 
                                            activeOpacity={0.7} 
                                            >            
                                            <Text style={styles.TextStyle}> Cancel </Text>                        
                                        </TouchableOpacity>
                                    : null 
                                    }

                                    <TouchableOpacity 
                                        style={styles.buttonStyle} 
                                        onPress={() => { this.Show_Custom_Alert(!showAlert)} } 
                                        activeOpacity={0.7} 
                                        >            
                                        <Text style={styles.TextStyle}> {okMenu ? okMenu : 'Ok'} </Text>                        
                                    </TouchableOpacity>
                                </View>                        
                            </View>        
                        </View>
                    </View>
                </Modal>
            </View>                
        );
    }
}
    
const styles = StyleSheet.create({    
    MainContainer :{        
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
        backgroundColor:'rgba(255,255,255,.1)'
    },
    
    Alert_Main_View:{
        // backgroundColor : "#009688",
        backgroundColor : "#fff",
        height: 180 ,
        width: '80%',
        borderRadius:10,
        padding:20
    },
    
    Alert_Title:{    
        fontSize: 20, 
        color: "#000",
        textAlign: 'left',
        height: '25%'    
    },

    Alert_Message:{    
        fontSize: 15, 
        color: "#000",
        textAlign: 'left',
        paddingTop: 5,
        paddingBottom: 10,
        height: '60%'    
    },

    buttonStyle: {        
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    TextStyle:{
        color:'#000',
        textAlign:'left',
        fontSize: 16,
        marginTop: -5
    },
    popupOverlay: {
        backgroundColor: "rgba(0,0,0,.7)",
        flex: 1,
    },
    popup: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 3,
        overflow:'hidden'
    },
    popupContent: {
        height: Dimensions.get('window').height - 90,
    }, 
});