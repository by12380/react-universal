import auth0 from 'auth0-js';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_API_AUDIENCE, AUTH0_REDIRECT_URL, HOME_URL } from '../config';

export const auth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_REDIRECT_URL,
    audience: AUTH0_API_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email'
});

export const logOut = () => {
    auth.logout({
        returnTo: HOME_URL
    });
}

export const getTokensFromAuthCallbackAsync = () => {
    return new Promise((resolve, reject) => {
        auth.parseHash((err, result) => {
            if (result && result.accessToken && result.idToken) {
                //Add a new field 'expiresAt' that gives the datetime the token expires.
                result.expiresAt = JSON.stringify((result.expiresIn * 1000) + new Date().getTime());
                resolve(result);
            } else if (err) {
                console.log(err);
                reject(err);
            }
        });
    })
};

export const logIn = () => {
    auth.authorize();
}
