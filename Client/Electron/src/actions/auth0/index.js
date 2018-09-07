import { 
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_API_AUDIENCE,
    AUTH0_CLIENT_SECRET,
    AUTH0_LOGIN_REDIRECT_URL,
    AUTH0_LOGOUT_REDIRECT_URL } from '../../config';

import {
    loginPending,
    loginSuccess,
    loginCancel,
    loginError,
    logoutPending,
    logoutSuccess,
    logoutError,
    refreshTokenPending,
    refreshTokenSuccess,
    refreshTokenError,
    removeSession } from '../authActions';

import {
    fetchUserPending,
    fetchUserSuccess,
    fetchUserError,
    storeUser } from '../userActions';

import { storeSession } from '../../utils/session';
import { webAuth } from '../../utils/auth';


const fetchAccessTokenPending = () => {
    return {
        type: 'FETCH_ACCESS_TOKEN_PENDING'
    }
}

const fetchAccessTokenSuccess = (sessionItems) => {
    return {
        type: 'FETCH_ACCESS_TOKEN_SUCCESS',
        sessionItems
    }
}

const fetchAccessTokenError = () => {
    return {
        type: 'FETCH_ACCESS_TOKEN_ERROR'
    }
}

export const login = () => (dispatch) => {

    const scopes = ['offline_access', 'openid', 'profile', 'email'];

    const authUrl =
        `https://${AUTH0_DOMAIN}/authorize?` +
        `&audience=${AUTH0_API_AUDIENCE}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&response_type=code` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&redirect_uri=${AUTH0_LOGIN_REDIRECT_URL}`;

    dispatch(loginPending());

    webAuth(authUrl, AUTH0_LOGIN_REDIRECT_URL)
    .then(result => {
        if (result.type === 'success') {
            dispatch(_fetchAccessToken(result.params.code));
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

    const logOutUrl =
        `https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}`;

    dispatch(logoutPending());

    webAuth(logOutUrl, AUTH0_LOGOUT_REDIRECT_URL)
    .then(result => {
        if (result.type === 'success') {
            dispatch(removeSession());
            dispatch(logoutSuccess());
        } else {
            dispatch(logoutError());
        }
    })
    .catch(error => {
        console.error(error);
        dispatch(logoutError());
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
        console.error(error);
        dispatch(refreshTokenError());
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

const _fetchAccessToken = (code) => (dispatch) => {

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
            'redirect_uri': AUTH0_LOGIN_REDIRECT_URL
        }),
    })
    .then(res => {
        return res.json();
    })
    .then(result => {
        const sessionItems = {
            expiresAt: JSON.stringify((result.expires_in * 1000) + new Date().getTime()),
            accessToken: result.access_token,
            refreshToken: result.refresh_token
        }
        storeSession(sessionItems);
        dispatch(fetchAccessTokenSuccess(sessionItems));
    })
    .catch(error => {
        console.error(error);
        dispatch(fetchAccessTokenError());
    })
}