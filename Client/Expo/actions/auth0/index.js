import { AuthSession } from 'expo';
import { 
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_API_AUDIENCE } from '../../config';
import {
    loginPending,
    loginSuccess,
    loginCancel,
    loginError,
    logoutPending,
    logoutSuccess,
    logoutError,
    fetchAccessTokenPending,
    fetchAccessTokenSuccess,
    fetchAccessTokenError,
    refreshTokenPending,
    refreshTokenSuccess,
    refreshTokenError,
    storeSession,
    removeSession } from '../authActions';
import {
    fetchUserPending,
    fetchUserSuccess,
    fetchUserError,
    storeUser } from '../userActions';

export const login = () => (dispatch) => {
    const REDIRECT_URI = AuthSession.getRedirectUrl();
    const scopes = ['offline_access', 'openid', 'profile'];

    dispatch(loginPending());

    AuthSession.startAsync({
        authUrl:
        `https://${AUTH0_DOMAIN}/authorize?` +
        `&audience=${AUTH0_API_AUDIENCE}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&response_type=code` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}`
    })
    .then(result => {
        if (result.type === 'success') {
            dispatch(fetchAccessToken(result.params.code));
            dispatch(loginSuccess());
        } else {
            dispatch(loginCancel());
        }
    })
    .catch(error => {
        console.error(error);
        dispatch(loginError());
    })
}

export const logout = () => (dispatch) => {

    dispatch(logoutPending());

    fetch(`https://${AUTH0_DOMAIN}/v2/logout`)
    .then(res => {
        dispatch(removeSession());
        dispatch(logoutSuccess());
    })
    .catch(error => {
        console.log(error);
        dispatch(logoutError());
    })

}

export const fetchAccessToken = (code) => (dispatch) => {
    const REDIRECT_URI = AuthSession.getRedirectUrl();

    dispatch(fetchAccessTokenPending());

    fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
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
    .then(res => {
        if (res.status !== 200)
            throw `failed to fetch access token with status ${res.status}`;
        return res.json();
    })
    .then(result => {
        const sessionItems = {
            expiresAt: JSON.stringify((result.expires_in * 1000) + new Date().getTime()),
            accessToken: result.access_token,
            refreshToken: result.refresh_token
        }
        dispatch(fetchUser(sessionItems.accessToken));
        dispatch(storeSession(sessionItems));
        dispatch(fetchAccessTokenSuccess(sessionItems));
    })
    .catch(error => {
        console.error(error);
        dispatch(fetchAccessTokenError());
    })
}

export const refreshAccessToken = (refreshToken) => (dispatch) => {

    dispatch(refreshTokenPending());

    fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'grant_type': 'refresh_token',
            'client_id': AUTH0_CLIENT_ID,
            'client_secret': AUTH0_CLIENT_SECRET,
            'refresh_token': refreshToken
        }),
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to refresh token with status ${res.status}`;
        return res.json();
    })
    .then(authResult => {
        authResult.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            const sessionItems = {
                accessToken: authResult.accessToken,
                idToken: authResult.idToken,
                expiresAt: authResult.expiresAt
            }
        dispatch(refreshTokenSuccess(sessionItems));
    })
    .catch(error => {
        console.log(error);
        dispatch(refreshTokenError());
    })

}

export const switchAccount = () => (dispatch) => {
    const REDIRECT_URI = AuthSession.getRedirectUrl();
    const scopes = ['offline_access', 'openid', 'profile', 'email'];

    dispatch(loginPending());

    AuthSession.startAsync({
        authUrl:
        `https://${AUTH0_DOMAIN}/authorize?` +
        `&audience=${AUTH0_API_AUDIENCE}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&response_type=code` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}` +
        `&prompt=login`
    })
    .then(result => {
        if (result.type === 'success') {
            dispatch(fetchAccessToken(result.params.code));
            dispatch(loginSuccess());
        } else {
            dispatch(loginCancel());
        }
    })
    .catch(error => {
        console.error(error);
        dispatch(loginError());
    })
}

export const fetchUser = (accessToken) => (dispatch) => {

    dispatch(fetchUserPending());

    fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to get user profile with status ${res.status}`;
        return res.json();
    })
    .then(user => {
        dispatch(fetchUserSuccess(user));
        dispatch(storeUser(accessToken, user));
    })
    .catch(error => {
        console.log(error);
        dispatch(fetchUserError());
    })

}