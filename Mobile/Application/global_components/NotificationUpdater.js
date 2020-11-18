import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logedUser }  from "../auth";
import { LI_setGlobalState } from '../redux/actions/LogedIn';

class NotificationUpdater extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
        };
    }

    componentDidMount() {
        logedUser().then(res => {
            this.setState({ username: res.username });
            this._renderNotification();
            setInterval(() => {
                this._renderNotification();
            }, 10000);
        });
    }

    _renderNotification = () => {
        fetch(global.url+'notificationUpdater/notification', {
            method  : 'POST',
            headers : { Accept: 'application/json', 'Content-Type': 'application/json', },
            body    : JSON.stringify({ username  : this.state.username })
        })
        .then(r => r.json())
        .then(r => {
            this.props.LI_setGlobalState(r, 'LI_totalNotif');
        })
        .catch(e => {});
    }

    render() {
        if(this.props.logedIn.LI_totalNotif > 0)
        {
            return (
                <Text style={ styles.notification }>{this.props.logedIn.LI_totalNotif}</Text>
            );
        }
        else
        {
            return (
                <Text style={{ position:'absolute' }}></Text>
            )
        }
    }
}

const styles = StyleSheet.create({
    notification : {
        position:'absolute',
        left:18,
        fontSize:8,
        backgroundColor: '#ec443e',
        color:'white',
        paddingLeft:4.4,
        paddingRight:4.4,
        paddingTop:1,
        paddingBottom:1,
        borderRadius:100,
        fontWeight:'bold'
    }
});

function mapStateToProps(state) {
    return {
        logedIn: state.LogedIn
    }
}

export default connect(mapStateToProps, { LI_setGlobalState })(NotificationUpdater);