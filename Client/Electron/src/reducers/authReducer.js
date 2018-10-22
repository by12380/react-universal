const initialState = {
    loginPending: false,
    loginSuccess: false,
    loginCancel: false,
    loginError: false,
    fetchTokenPending: false,
    fetchTokenPending: false,
    fetchTokenError: false,
    sessionItems: {
        accessToken: '',
        refreshToken: '',
        expiresAt: ''
    }
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

    case 'LOGIN_PENDING':
        return {
            ...state,
            loginPending: true,
            loginSuccess: false,
            loginCancel: false,
            loginError: false,
            refreshError: false
        }

    case 'LOGIN_SUCCESS':
        return {
            ...state,
            loginPending: false,
            loginSuccess: true,
            loginCancel: false,
            loginError: false
        }

    case 'LOGIN_CANCEL':
        return {
            ...state,
            loginPending: false,
            loginSuccess: false,
            loginCancel: true,
            loginError: false
        }

    case 'LOGIN_ERROR':
        return {
            ...state,
            loginPending: false,
            loginSuccess: false,
            loginCancel: false,
            loginError: true
        }

    case 'LOGOUT_PENDING':
        return {
            ...state,
            logoutPending: true,
            logoutSuccess: false,
            logoutError: false
        }

    case 'LOGOUT_SUCCESS':
        return {
            ...state,
            logoutPending: false,
            logoutSuccess: true,
            logoutError: false,
            sessionItems: {
                accessToken: '',
                refreshToken: '',
                expiresAt: ''
            }
        }

    case 'LOGOUT_ERROR':
        return {
            ...state,
            logoutPending: false,
            logoutSuccess: false,
            logoutError: true
        }

    case 'FETCH_ACCESS_TOKEN_PENDING':
        return {
            ...state,
            fetchTokenPending: true,
            fetchTokenSuccess: false,
            fetchTokenError: false
        }

    case 'FETCH_ACCESS_TOKEN_SUCCESS':
        return {
            ...state,
            fetchTokenPending: false,
            fetchTokenSuccess: true,
            fetchTokenError: false,
            sessionItems: action.sessionItems
        }

    case 'FETCH_ACCESS_TOKEN_ERROR':
        return {
            ...state,
            fetchTokenPending: false,
            fetchTokenSuccess: false,
            fetchTokenError: true
        }

    case "REFRESH_TOKEN_PENDING":
        return {
            ...state,
            refreshPending: true,
            refreshSuccess: false,
            refreshError: false
        };

    case "REFRESH_TOKEN_SUCCESS":
        return {
            ...state,
            refreshPending: false,
            refreshSuccess: true,
            refreshError: false,
            sessionItems: action.sessionItems
        };

    case "REFRESH_TOKEN_ERROR":
        return {
            ...state,
            refreshPending: false,
            refreshSuccess: false,
            refreshError: true,
        };

    case "LOAD_SESSION_PENDING":
        return {
            ...state,
            sessionPending: true,
            sessionSuccess: false,
            sessionError: false
        };

    case "LOAD_SESSION_SUCCESS":
        return {
            ...state,
            sessionPending: false,
            sessionSuccess: true,
            sessionError: false,
            sessionItems: action.sessionItems
        };

    case "LOAD_SESSION_ERROR":
        return {
            ...state,
            sessionPending: false,
            sessionSuccess: false,
            sessionError: true
        };

    case "REMOVE_SESSION_PENDING":
        return {
            ...state,
            removePending: true,
            removeSuccess: false,
            removeError: false
        };

    case "REMOVE_SESSION_SUCCESS":
        return {
            ...state,
            removePending: false,
            removeSuccess: true,
            removeError: false,
        };

    case "REMOVE_SESSION_ERROR":
        return {
            ...state,
            removePending: false,
            removeSuccess: false,
            removeError: true
        };

    default:
        return state;
    }
    
}

export default authReducer;