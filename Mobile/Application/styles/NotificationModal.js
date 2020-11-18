import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    popupOverlay: {
        backgroundColor: "rgba(0,0,0,.5)",
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
    modalInfo:{
        padding:20
    },
    body:{
        marginTop:0,
    },
    title:{
        position:'relative',
        marginTop:0,
        fontSize:25,
        color: "#1975a5",
        fontWeight: "600",
        textAlign: 'center',
        fontFamily: 'BebasNeue'
    },
    content:{
        fontSize:16,
        marginTop:20,
        textAlign: 'center',
    },


    header:{
        height: 200,
        width: Dimensions.get('window').width - 20,
        position:'relative',
    },
    pp_holder: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf:'center',
        alignItems:'center',
        position: 'relative',
        top: -75,
        elevation:4,
        marginBottom:-55,
        backgroundColor:'white'
    },
    avatar: {
        width: 150,
        height: 150,
        borderWidth: 4,
        borderColor: "white",
        borderRadius: 100,
        alignSelf:'center',
        alignItems:'center',
        position: 'absolute',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2.22,
    },
    card:{
        backgroundColor: "#FFFFFF",
        borderRadius:3,
        padding:15,
        marginTop:40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        width: Dimensions.get('window').width - 60,
        marginBottom: 24,
    },
    cardTittle:{
        color:"#000",
        fontSize:16,
        marginBottom:5,
        textAlign:'center',
        borderBottomColor: 'rgba(0,0,0,.3)',
        borderBottomWidth: 2,
        paddingBottom: 10
    },
    details:{
        color:"#808080",
        fontSize: 15,
        top:10,
    },
    perDet: {
        fontSize: 14,
        left:40,
        top:-22,
        width: Dimensions.get('window').width - 170,
    },
    popupButtons: {
        flexDirection: 'row',
        borderTopWidth: 2,
        borderColor: "rgba(0,0,0,0.05)",
        justifyContent:'center',
    },
    btnClose:{
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 60,
        fontWeight:'900',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
    },
    buttonContainer: {
        marginBottom:10,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        borderRadius:3,
        backgroundColor: "#1b9b3b",
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
    },
    appbar: {
        alignItems: 'center', 
        justifyContent:'space-between', 
        height: 50, 
        paddingVertical: 0, 
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        elevation: 1,
    },
    onJobAppbar: {
        alignItems: 'center', 
        justifyContent:'space-between', 
        height: 50, 
        paddingVertical: 0, 
        paddingHorizontal: 15,
        backgroundColor: '#1975a5',
        elevation: 1,
    },
});