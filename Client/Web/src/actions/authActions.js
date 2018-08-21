import { auth } from '../utils/auth0';
import { storeSession, getSession, clearSession } from '../utils/session';

export const loginSuccess = (sessionItems) => {
    storeSession(sessionItems);
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

export const loadSessionPending = () => {
    return {
        type: 'LOAD_SESSION_PENDING'
    };
};

export const loadSessionSuccess = (sessionItems) => {
    return {
        type: 'LOAD_SESSION_SUCCESS',
        sessionItems
    };
};

export const loadSessionError = () => {
    return {
        type: 'LOAD_SESSION_ERROR'
    };
};

export const removeSessionPending = () => {
    return {
        type: 'REMOVE_SESSION_PENDING'
    };
};

export const removeSessionSuccess = () => {
    return {
        type: 'REMOVE_SESSION_SUCCESS',
    };
};

export const removeSessionError = () => {
    return {
        type: 'REMOVE_SESSION_ERROR'
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

export const loadSession = () => (dispatch) => {
    dispatch(loadSessionPending())
    const sessionItems = getSession();

    //Check if sessionItems is {} (empty)
    if (Object.keys(sessionItems).length === 0 && sessionItems.constructor === Object) {
        dispatch(loadSessionError());
    } else {
        dispatch(loadSessionSuccess(sessionItems));
    }
}

export const removeSession = () => (dispatch) => {
    dispatch(removeSessionPending())
    const result = clearSession();
    if (result) {
        dispatch(removeSessionSuccess());
    }
    else {
        dispatch(removeSessionError());
    }
}