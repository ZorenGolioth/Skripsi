import AsyncStorage from '@react-native-community/async-storage';

export const klinikData = (response) => {
    let data = {
        data    : response
    }
    AsyncStorage.setItem('klinikData', JSON.stringify(data));
}

export const klinikStoredData = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('klinikData')
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

export const klinik = (response) => {
    response = response.split('|');
    let data = {
        id_klinik   : response[0],
        nama_klinik : response[1]
    }
    AsyncStorage.setItem('klinik', JSON.stringify(data));
}

export const storedkKlinik = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('klinik')
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