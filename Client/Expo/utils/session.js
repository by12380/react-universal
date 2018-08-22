import { AsyncStorage } from 'react-native';

//Returns user session items including access_token, refresh_token, and expires_at.
async function getSessionItemsAsync() {

    const sessionItems = {
        accessToken: await AsyncStorage.getItem('access_token'),
        refreshToken: await AsyncStorage.getItem('refresh_token'),
        expiresAt: await AsyncStorage.getItem('expires_at'),
    }

    return sessionItems;
}

async function setSessionAsync(sessionItems) {

    await AsyncStorage.setItem('access_token', sessionItems.accessToken);
    await AsyncStorage.setItem('refresh_token', sessionItems.refreshToken);
    await AsyncStorage.setItem('expires_at', sessionItems.expiresAt);

}

async function clearSessionAsync() {

    await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'expires_at']);

}

module.exports = { getSessionItemsAsync, setSessionAsync, clearSessionAsync };