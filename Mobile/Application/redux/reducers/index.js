import { combineReducers } from 'redux';

import pasienSignup     from './PasienSignup';
import Login            from './Login';
import LogedIn          from './LogedIn';
import ChangePassword   from './ChangePassword';

export default combineReducers({
    pasienSignup    : pasienSignup,
    logIn           : Login,
    LogedIn         : LogedIn,
    changePassword  : ChangePassword,
});