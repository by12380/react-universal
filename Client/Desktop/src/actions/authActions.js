import { auth } from '../utils/auth0';

export const loginSuccess = (sessionItems) => {
    return {
        type: 'LOGIN_SUCCESS',
        sessionItems
    };
};

export const loginError = () => {
    return {
        type: 'LOGIN_ERROR',
    };
};

export const renewTokenPending = () => {
    return {
        type: 'RENEW_TOKEN_PENDING'
    };
};

export const renewTokenSuccess = (sessionItems) => {
    return {
        type: 'RENEW_TOKEN_SUCCESS',
        sessionItems
    };
};

export const renewTokenError = () => {
    return {
        type: 'RENEW_TOKEN_ERROR'
    };
};

export const renewToken = () => (dispatch) => {
    dispatch(renewTokenPending());
    auth.checkSession({}, (err, authResult) => {
        if (err) {
            dispatch(renewTokenError());
        } else {
            authResult.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            const sessionItems = {
                accessToken: authResult.accessToken,
                idToken: authResult.idToken,
                expiresAt: authResult.expiresAt
            }
            dispatch(renewTokenSuccess(sessionItems));
        }
    })
}

