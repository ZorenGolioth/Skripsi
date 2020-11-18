import AsyncStorage from '@react-native-community/async-storage';

export const onSignIn = (response) => {
    response = response.split('::');
    let data = {
        fullname    : response[0],
        address     : response[1],
        phone       : response[2],
        dob         : response[3],
        gender      : response[4],
        id_user     : response[5],
        username    : response[6],
        email       : response[7],
        connError   : response[8],
    }
    AsyncStorage.setItem('logedUser', JSON.stringify(data));
}

export const SkipWelcome = (response) => {
    AsyncStorage.setItem('skip_welcome', JSON.stringify(response));
}

export const onSignOut = () => {
    AsyncStorage.removeItem('logedUser');
}

export const onSkipWelcome = () => {
    AsyncStorage.removeItem('skip_welcome');
}

export const logedUser = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('logedUser')
        .then(res => {
            if (res !== null) {
                resolve(JSON.parse(res));
            } else {
                resolve('');
            }
        })
        .catch(err => reject(err));
    });
}

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('logedUser')
        .then(res => {
            if (res !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
        .catch(err => reject(err));
    });
};

export const isSkiped = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('skip_welcome')
        .then(res => {
            if (res !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
        .catch(err => reject(err));
    });
};

export const firstLogin = (response) => {
    AsyncStorage.setItem('firstLogin', response);
}

export const isFirstLogin = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('firstLogin')
        .then(res => {
            if (res !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
        .catch(err => reject(err));
    });
};

export const setNotification = (response) => {
    AsyncStorage.setItem('notification', JSON.stringify(response));
}

export const storedNotification = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('notification')
        .then(res => {
            if (res !== null) {
                resolve(JSON.parse(res));
            } else {
                resolve('');
            }
        })
        .catch(err => reject(err));
    });
}