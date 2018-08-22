import { AuthSession } from 'expo';
import { 
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_API_AUDIENCE } from '../config';

export const loginPending = () => {
    return {
        type: 'LOGIN_PENDING'
    }
}

export const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

export const loginCancel = () => {
    return {
        type: 'LOGIN_CANCEL'
    }
}

export const loginError = () => {
    return {
        type: 'LOGIN_ERROR'
    }
}

export const logoutPending = () => {
    return {
        type: 'LOGOUT_PENDING'
    }
}

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const logoutError = () => {
    return {
        type: 'LOGOUT_ERROR'
    }
}

export const fetchAccessTokenPending = () => {
    return {
        type: 'FETCH_ACCESS_TOKEN_PENDING'
    }
}

export const fetchAccessTokenSuccess = (sessionItems) => {
    return {
        type: 'FETCH_ACCESS_TOKEN_SUCCESS',
        sessionItems
    }
}

export const fetchAccessTokenError = () => {
    return {
        type: 'FETCH_ACCESS_TOKEN_ERROR'
    }
}

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
            dispatch(loginCanceled());
        }
    })
    .catch(error => {
        console.error(error);
        dispatch(loginError());
    })
}

export const logout = () => (dispatch) => {

    dispatch(logoutPending());

    fetch(`https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}`)
    .then(res => {
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
        return res.json();
    })
    .then(result => {
        const sessionItems = {
            expiresAt: JSON.stringify((result.expires_in * 1000) + new Date().getTime()),
            accessToken: result.access_token,
            refreshToken: result.refresh_token
        }
        dispatch(fetchAccessTokenSuccess(sessionItems));
    })
    .catch(error => {
        console.error(error);
        dispatch(fetchAccessTokenError());
    })
}