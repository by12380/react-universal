import { webAuth } from '../utils/auth';
import { storeSession, getSessionAsync, removeSessionAsync } from '../utils/session';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_API_AUDIENCE, AUTH0_REDIRECT_URL, AUTH0_CLIENT_SECRET, AUTH0_LOGOUT_REDIRECT_URL } from '../config';

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

export const login = () => (dispatch) => {

    const scopes = ['offline_access', 'openid', 'profile', 'email'];

    const authUrl =
        `https://${AUTH0_DOMAIN}/authorize?` +
        `&audience=${AUTH0_API_AUDIENCE}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&response_type=code` +
        `&client_id=${AUTH0_CLIENT_ID}` +
        `&redirect_uri=${AUTH0_REDIRECT_URL}`;

    dispatch(loginPending());

    webAuth(authUrl, AUTH0_REDIRECT_URL)
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

    const logOutUrl =
        `https://${AUTH0_DOMAIN}/v2/logout?client_id=${AUTH0_CLIENT_ID}`;

    dispatch(logoutPending());

    webAuth(logOutUrl, AUTH0_LOGOUT_REDIRECT_URL)
    .then(result => {
        if (result.type === 'success') {
            dispatch(removeSession());
            dispatch(logoutSuccess());
        } else {
            dispatch(logoutError());
        }
    })
    .catch(error => {
        console.error(error);
        dispatch(logoutError());
    })

}

export const fetchAccessToken = (code) => (dispatch) => {

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
            'redirect_uri': AUTH0_REDIRECT_URL
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
        storeSession(sessionItems);
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
        console.error(error);
        dispatch(refreshTokenError());
    })

}

export const loadSession = () => (dispatch) => {
    dispatch(loadSessionPending())
    getSessionAsync()
    .then(sessionItems => {
        //Check if sessionItems is {} (empty)
        if (Object.keys(sessionItems).length === 0 && sessionItems.constructor === Object) {
            dispatch(loadSessionError());
        } else {
            dispatch(loadSessionSuccess(sessionItems));
        }
    })
    .catch(error => {
        dispatch(loadSessionError());
    })
}

export const removeSession = () => (dispatch) => {
    dispatch(removeSessionPending())
    removeSessionAsync()
    .then(() => {
        dispatch(removeSessionSuccess());
    })
    .catch(error => {
        dispatch(removeSessionError());
    })
}

