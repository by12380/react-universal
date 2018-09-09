import { AuthSession } from 'expo';
import { 
    AUTH0_DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_API_AUDIENCE } from '../config';
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
            dispatch(loginCancel());
        }
    })
    .catch(error => {
        console.error(error);
        dispatch(loginError());
    })
}

export const logout = () => (dispatch) => {

    dispatch(logoutPending());

    fetch(`https://${AUTH0_DOMAIN}/v2/logout`)
    .then(res => {
        dispatch(removeSession());
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
        dispatch(storeSession(sessionItems));
        dispatch(fetchAccessTokenSuccess(sessionItems));
    })
    .catch(error => {
        console.error(error);
        dispatch(fetchAccessTokenError());
    })
}

export const refreshAccessToken = (refreshToken) => (dispatch) => {

    dispatch(refreshTokenPending());

    fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'grant_type': 'refresh_token',
            'client_id': AUTH0_CLIENT_ID,
            'client_secret': AUTH0_CLIENT_SECRET,
            'refresh_token': refreshToken
        }),
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to refresh token with status ${res.status}`;
        return res.json();
    })
    .then(authResult => {
        authResult.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            const sessionItems = {
                accessToken: authResult.accessToken,
                idToken: authResult.idToken,
                expiresAt: authResult.expiresAt
            }
        dispatch(refreshTokenSuccess(sessionItems));
    })
    .catch(error => {
        console.log(error);
        dispatch(refreshTokenError());
    })

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

export const switchAccount = () => (dispatch) => {
    const REDIRECT_URI = AuthSession.getRedirectUrl();
    const scopes = ['offline_access', 'openid', 'profile', 'email'];

    dispatch(loginPending());

    AuthSession.startAsync({
        authUrl:
        `https://${AUTH0_DOMAIN}/authorize?` +
        `&audience=${AUTH0_API_AUDIENCE}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&response_type=code` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}` +
        `&prompt=login`
    })
    .then(result => {
        if (result.type === 'success') {
            dispatch(fetchAccessToken(result.params.code));
            dispatch(loginSuccess());
        } else {
            dispatch(loginCancel());
        }
    })
    .catch(error => {
        console.error(error);
        dispatch(loginError());
    })
}
