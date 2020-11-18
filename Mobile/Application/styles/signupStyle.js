import { StyleSheet, TextInput, Dimensions } from 'react-native'; 
TextInput.defaultProps.selectionColor       = '#156874';
TextInput.defaultProps.placeholderTextColor = '#9c9696'
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    MainContainer : {
    },
    li_logo: {
        marginTop: 40,
        height: 60,
        resizeMode: 'contain',
        justifyContent: 'flex-start',
        alignSelf: 'center'
    },
    logoName : {
        fontSize: 16, color: "#000", textAlign: 'center', fontFamily: 'calibri', bottom: 0
    },
    logoHolder : {
        marginBottom: 30
    },
    siHolder : {
        marginTop: 10, marginBottom:10, flexDirection:'row', justifyContent:'space-between'
    },
    InnerContainer : {    
        justifyContent: 'center', flex:1, padding: 30
    },    
    TextInputStyleClass: {
        textAlign: 'left',
        marginBottom: 10,
        paddingLeft:5,
        paddingRight:30,
        height: 55,
        fontSize: 15,
        color:'#156874',
        borderBottomWidth:1,
        borderBottomColor:'#156874'
    },
    li_btn: {
        height: 55,
        backgroundColor: '#1d7dbd',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        elevation:2
    },    
    si_btn: {
        height: 55,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        elevation:2
    },
    si_btn1: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    orText: {
        fontSize: 15, color: '#156874', fontWeight: 'bold', alignSelf: 'center', fontFamily: 'calibri'
    },
    buttonText: {
        fontSize: 16, color: '#156874', alignSelf: 'center'
    },
    backgroundImage: {
        flex: 1, width: null, height: null, resizeMode: 'cover', backgroundColor: '#fff'
    },
    siText : {
        fontSize: 20, color: "#156874", textAlign: 'center', marginBottom: 25, fontFamily: 'ScriptMTBold', fontFamily:'centuryGothicBold',
        borderBottomWidth:3, borderBottomColor:'#156874', paddingBottom:5
    },
    titles:{
        fontSize:20,
        flex:1,
        alignSelf:'center',
        fontWeight:'bold',
        fontFamily:'ScriptMTBold'
    },
    pickerHolder: {
        height:55, 
        marginBottom:10, 
        borderBottomColor:'#156874', 
        borderBottomWidth:1,
    },
    picker: {
        height: 55, width: width - 48, left:-3, marginBottom:10, color:'#156874'
    },
    tarif: {
        position:'absolute',
        left:5,
        top:13,
        fontSize:20,
        color:'#156874',
        fontFamily:'ScriptMTBold'
    },
    inputIcon:{
        position:'absolute',right:5,top:15
    },
    errorMsg: {
        color:'red', fontFamily:'centuryGothicBold', fontSize:16, alignSelf:'center', borderBottomWidth:0
    },
    cameraHolder: {
        position:'absolute',
        height:40,
        width:40,
        backgroundColor:'#156874',
        bottom:0,
        right:0,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        borderWidth:2,
        borderColor:'#fff',
        elevation:3
    }
});