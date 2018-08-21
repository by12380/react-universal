const storage = window.require('electron-json-storage');

export const storeSession = (sessionItems) => {
    storage.set('session', sessionItems, function(error) {
        console.error(error);
    });
}

export const getSessionAsync = () => {
    return new Promise((resolve, reject) => {
        storage.get('session', function(error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    })
}

export const removeSessionAsync = () => {
    return new Promise((resolve, reject) => {
        storage.remove('session', function(error) {
            if (error) {
                reject(error);
            }
            resolve();
        });
    })
}