import { auth } from '../../utils/auth0';
import {
        refreshTokenPending,
        refreshTokenSuccess,
        refreshTokenError } from '../authActions';

import {
        fetchUserPending,
        fetchUserSuccess,
        fetchUserError,
        storeUserPending,
        storeUserSuccess,
        storeUserError } from '../userActions';

import { APP_SERVER_URL } from '../../config';

export const refreshAccessToken = () => (dispatch) => {
    dispatch(refreshTokenPending());
    auth.checkSession({}, (err, authResult) => {
        if (err) {
            dispatch(refreshTokenError());
        } else {
            authResult.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            const sessionItems = {
                accessToken: authResult.accessToken,
                idToken: authResult.idToken,
                expiresAt: authResult.expiresAt
            }
            dispatch(refreshTokenSuccess(sessionItems));
        }
    })
}

export const fetchUser = (accessToken) => (dispatch) => {
    dispatch(fetchUserPending());
    auth.client.userInfo(accessToken, (err, result) => {
        if (err) {
            dispatch(fetchUserError());
        } else {
            const profile = { 
                name: result.name,
                email: result.email,
                picture: result.picture
            }
            dispatch(fetchUserSuccess(profile));
            dispatch(storeUser(accessToken, profile));
        }
    })
}

export const storeUser = (accessToken, user) => (dispatch) => {

    dispatch(storeUserPending());

    fetch(`${APP_SERVER_URL}/users/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            email: user.email,
        }),
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to store user with status ${res.status}`;
        return res.json();
    })
    .then(result => {
        dispatch(storeUserSuccess());
    })
    .catch(error => {
        dispatch(storeUserError());
    })

}