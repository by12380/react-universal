import auth0 from 'auth0-js';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_API_AUDIENCE, AUTH0_REDIRECT_URL } from '../config';

const auth = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_REDIRECT_URL,
    audience: AUTH0_API_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile'
});

module.exports = { auth }