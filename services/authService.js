import { AuthSession } from 'expo';
import { 
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_API_AUDIENCE } from '../config';
import { AsyncStorage } from "react-native"

async function logInAsync() {
    try {
        const REDIRECT_URI = AuthSession.getRedirectUrl();
        let result = await AuthSession.startAsync({
            authUrl:
            `https://${AUTH0_DOMAIN}/authorize?` +
            `&audience=${AUTH0_API_AUDIENCE}` +
            `&scope=offline_access` +
            `&response_type=code` +
            `&client_id=${AUTH0_CLIENT_ID}` +
            `&redirect_uri=${REDIRECT_URI}`
        });
        if (result.type === 'success') {
            let authResult = await exchangeCodeForTokenAsync(result.params.code);
            return await setSessionAsync(authResult);
        }
        else
        {
            return {cancelled: true};
        }
    }
    catch(e)
    {
      console.error(e);
      return {error: true};
    }
}

async function getSessionItemsAsync() {
    try {
        const sessionItems = {
            'access_token': await AsyncStorage.getItem('access_token'),
            'refresh_token': await AsyncStorage.getItem('refresh_token'),
            'expires_at': await AsyncStorage.getItem('expires_at'),
        }
        return sessionItems;
    }
    catch(e)
    {
        console.error(e);
    }
}

async function isAuthenticatedAsync() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(await AsyncStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
}

async function exchangeCodeForTokenAsync(code) {
    try {
        const REDIRECT_URI = AuthSession.getRedirectUrl();
        let response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'grant_type': 'authorization_code',
                'client_id': AUTH0_CLIENT_ID,
                'client_secret': AUTH0_CLIENT_SECRET,
                'code': code,
                'redirect_uri': REDIRECT_URI
            }),
        })
        return await response.json();
    }
    catch(e)
    {
        console.error(e);
        return {error: true};
    }
}

async function setSessionAsync(authResult) {
    // Set the time that the Access Token will expire at
    const expires_at = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
    const access_token = authResult.access_token;
    const refresh_token = authResult.refresh_token;

    try {
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('refresh_token', refresh_token);
        await AsyncStorage.setItem('expires_at', expires_at);
        return {
            access_token,
            refresh_token,
            expires_at
        }
    }
    catch(e)
    {
        console.error(e);
        return null;
    }
}

async function renewAccessTokenAsync() {
    try {
        const sessionItems = await getSessionItemsAsync();
        const refresh_token = sessionItems.refresh_token;
        const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'grant_type': 'refresh_token',
                'client_id': AUTH0_CLIENT_ID,
                'client_secret': AUTH0_CLIENT_SECRET,
                'refresh_token': refresh_token
            }),
        })

        if (response.status != 200) throw { message: 'failed to renew access token', status: response.status };

        const { access_token, expires_in } = await response.json();
        const authResult = {
            access_token,
            expires_in,
            refresh_token
        }
        return await setSessionAsync(authResult);
    }
    catch(e){
        console.log(e);
        return null;
    }
}

module.exports = { logInAsync, getSessionItemsAsync, isAuthenticatedAsync };