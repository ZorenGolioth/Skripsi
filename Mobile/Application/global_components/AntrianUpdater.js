import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { logedUser }  from "../auth";
import { LI_setGlobalState } from '../redux/actions/LogedIn';

class AntrianUpdater extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_user : '',
        };
    }

    componentDidMount() {
        logedUser().then(res => {
            this.setState({
                id_user   : res.id_user
            });

            this._renderNotification(true);

            setInterval(() => {
                this._renderNotification();
            }, 5000);

            setInterval(() => {
                if(this.props.logedIn.LI_totalNotif !== this.props.logedIn.LI_FL_TotNotif)
                {
                    console.log(this.props.logedIn.LI_totalNotif+' '+this.props.logedIn.LI_FL_TotNotif)
                    this._renderNotification(true);
                }
            }, 1);
        });
    }

    _renderNotification = (fl = false) => {
        fetch(global.url+'API/booking/not_done', {
            method  : 'POST',
            headers : { Accept: 'application/json', 'Content-Type': 'application/json', },
            body    : JSON.stringify({ id_user  : this.state.id_user })
        })
        .then(r => r.json())
        .then(r => {
            this.props.LI_setGlobalState(r, 'LI_totalNotif');
            if(fl) this.props.LI_setGlobalState(r, 'LI_FL_TotNotif');
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
        top:-5,
        left:13,
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

export default connect(mapStateToProps, { LI_setGlobalState })(AntrianUpdater);