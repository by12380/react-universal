import { getSessionItemsAsync, setSessionAsync, clearSessionAsync } from '../utils/session';

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

export const refreshTokenPending = () => {
    return {
        type: 'REFRESH_TOKEN_PENDING'
    };
};

export const refreshTokenSuccess = (sessionItems) => {
    return {
        type: 'REFRESH_TOKEN_SUCCESS',
        sessionItems
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
    }
}

export const loadSessionSuccess = (sessionItems) => {
    return {
        type: 'LOAD_SESSION_SUCCESS',
        sessionItems
    }
}

export const loadSessionError = () => {
    return {
        type: 'LOAD_SESSION_ERROR'
    }
}

export const storeSessionPending = () => {
    return {
        type: 'STORE_SESSION_PENDING'
    }
}

export const storeSessionSuccess = (sessionItems) => {
    return {
        type: 'STORE_SESSION_SUCCESS',
        sessionItems
    }
}

export const storeSessionError = () => {
    return {
        type: 'STORE_SESSION_ERROR'
    }
}

export const removeSessionPending = () => {
    return {
        type: 'REMOVE_SESSION_PENDING'
    }
}

export const removeSessionSuccess = () => {
    return {
        type: 'REMOVE_SESSION_SUCCESS'
    }
}

export const removeSessionError = () => {
    return {
        type: 'REMOVE_SESSION_ERROR'
    }
}

export const loadSession = () => (dispatch) => {
    dispatch(loadSessionPending());
    getSessionItemsAsync()
    .then(sessionItems => {
        if (sessionItems.accessToken !== null) {
            dispatch(loadSessionSuccess(sessionItems));
        } else {
            dispatch(loadSessionError());
        }
    })
    .catch(error => {
        console.log(error);
        dispatch(loadSessionError());
    })
}

export const storeSession = (sessionItems) => (dispatch) => {

    dispatch(storeSessionPending());

    setSessionAsync(sessionItems)
    .then(result => {
        dispatch(storeSessionSuccess());
    })
    .catch(error => {
        console.log(error);
        dispatch(storeSessionError());
    })

}

export const removeSession = () => (dispatch) => {
    
    dispatch(removeSessionPending());

    clearSessionAsync()
    .then(result => {
        dispatch(removeSessionSuccess());
    })
    .catch(error => {
        console.log(error);
        dispatch(removeSessionError());
    })

}
