import querystring from 'querystring';
import url from 'url';

import {
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_API_AUDIENCE,
    AUTH0_LOGIN_REDIRECT_URL,
    AUTH0_LOGOUT_REDIRECT_URL } from '../config';

export const logIn = () => {

    const scopes = ['openid', 'profile', 'email'];

    const authUrl =
        `https://${AUTH0_DOMAIN}/authorize?` +
        `&audience=${AUTH0_API_AUDIENCE}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&response_type=token` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&redirect_uri=${AUTH0_LOGIN_REDIRECT_URL}`;

    //Redirect to login page
    window.location.href = authUrl;
}

export const logOut = () => {
    const logoutUrl =
        `https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${AUTH0_LOGOUT_REDIRECT_URL}`;

    //Redirect to logout page
    window.location.href = logoutUrl;
}

export const refreshAccessToken = () => {

    const scopes = ['openid', 'profile', 'email'];

    const refreshTokenUrl =
        `https://${AUTH0_DOMAIN}/authorize?` +
        `&audience=${AUTH0_API_AUDIENCE}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&response_type=token` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&redirect_uri=${AUTH0_LOGIN_REDIRECT_URL}` +
        `&prompt=none`;

    //Redirect to refresh token url
    window.location.href = refreshTokenUrl;

}

export const getTokensFromAuthCallback = () => {
    return new Promise((resolve, reject) => {
        let params = null;
        const obj = url.parse(window.location.href);
        const hashParams = querystring.parse(obj.hash ? obj.hash.substring(1): null);
        const queryParams = querystring.parse(obj.query);
        params = {
            ...hashParams,
            ...queryParams
        }
        if (params && params.access_token) {
            //Add a new field 'expiresAt' that gives the datetime the token expires.
            params.expires_at = JSON.stringify((params.expires_in * 1000) + new Date().getTime());
            resolve(params);
        } else {
            reject(params);
        }
    })
};
