import { AuthSession } from 'expo';
import { 
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_API_AUDIENCE } from '../config';
import { AsyncStorage } from "react-native"

/*Runs auth flow:
1. Check if user authenticated, if not ->
2. Renew access token using refresh token, if fails ->
3. Bring up user login prompt
*/
async function autoLogInAsync() {
    const isAuthenticated = await isAuthenticatedAsync();
    if (!isAuthenticated) {
        try {
            const sessionItem = await _renewAccessTokenAsync();
            if (!sessionItem) throw "failed to renew access token";
        }
        catch(e) {
            await logInAsync();
        }
    }
}

//Brings up login prompt and logs in user
async function logInAsync() {
    try {
        const REDIRECT_URI = AuthSession.getRedirectUrl();
        const scopes = ['offline_access', 'openid', 'profile'];
        let result = await AuthSession.startAsync({
            authUrl:
            `https://${AUTH0_DOMAIN}/authorize?` +
            `&audience=${AUTH0_API_AUDIENCE}` +
            `&scope=${encodeURIComponent(scopes.join(' '))}` +
            `&response_type=code` +
            `&client_id=${AUTH0_CLIENT_ID}` +
            `&redirect_uri=${REDIRECT_URI}`
        });
        if (result.type === 'success') {
            let authResult = await _getAccessTokenAsync(result.params.code);
            return await _setSessionAsync(authResult);
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

async function logOutAsync() {
    try {
        // Logout from Auth0
        await fetch(`https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}`);

        // Clear Access Token and ID Token from local storage
        await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'expires_at']);
    }
    catch(e) {
        console.error(e);
    }
}

//Returns user session items including access_token, refresh_token, and expires_at.
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

//Returns a boolean checking if user has an active login session
async function isAuthenticatedAsync() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(await AsyncStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
}

async function _getAccessTokenAsync(code) {
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

async function _setSessionAsync(authResult) {
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

async function _renewAccessTokenAsync() {
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
        console.log(authResult);
        return await _setSessionAsync(authResult);
    }
    catch(e){
        console.log(e);
        return null;
    }
}

module.exports = { autoLogInAsync, logInAsync, logOutAsync, isAuthenticatedAsync, getSessionItemsAsync };