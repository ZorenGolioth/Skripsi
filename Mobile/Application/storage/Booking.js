import AsyncStorage from '@react-native-community/async-storage';

export const data = (response) => {
    let data = {
        data    : response
    }
    AsyncStorage.setItem('data', JSON.stringify(data));
}

export const storedData = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('data')
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