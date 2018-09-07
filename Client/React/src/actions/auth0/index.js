import {
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_API_AUDIENCE,
    AUTH0_LOGIN_REDIRECT_URL } from '../../config';

import {
        fetchUserPending,
        fetchUserSuccess,
        fetchUserError,
        storeUser } from '../userActions';

export const refreshAccessToken = () => (dispatch) => {

    const scopes = ['openid', 'profile', 'email'];

    const authUrl =
        `https://${AUTH0_DOMAIN}/authorize?
        &audience=${AUTH0_API_AUDIENCE}
        &scope=${encodeURIComponent(scopes.join(' '))}
        &response_type=token
        &client_id=${AUTH0_CLIENT_ID}
        &redirect_uri=${AUTH0_LOGIN_REDIRECT_URL}
        &prompt=none`;

     window.location.href = authUrl;

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