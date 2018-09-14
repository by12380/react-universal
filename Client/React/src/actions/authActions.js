import { storeSession, getSession, clearSession } from '../utils/session';
import { fetchUser } from './auth0';

export const loginSuccess = (sessionItems) => {
    fetchUser(sessionItems.accessToken);
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


export const refreshTokenError = () => {
    return {
        type: 'REFRESH_TOKEN_ERROR'
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