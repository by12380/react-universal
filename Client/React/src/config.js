export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
export const AUTH0_API_AUDIENCE = process.env.AUTH0_API_AUDIENCE;
export const AUTH0_LOGIN_REDIRECT_URL = process.env.AUTH0_LOGIN_REDIRECT_URL || 'http://localhost:3000/callback';
export const AUTH0_LOGOUT_REDIRECT_URL = process.env.AUTH0_LOGOUT_REDIRECT_URL || 'http://localhost:3000/';

//App server
export const APP_SERVER_URL = process.env.APP_SERVER_URL || 'http://localhost:8080';