const initialState = {
    success: false,
    error: false,
    refreshPending: false,
    refreshSuccess: false,
    refreshError: false,
    sessionItems: {
        accessToken: '',
        refreshToken: '',
        expiresAt: ''
    }
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

    case "LOGIN_SUCCESS":
        return {
            ...state,
            sessionItems: action.sessionItems,
            success: true,
            error: false,
            refreshPending: false,
            refreshSuccess: false,
            refreshError: false
        };

    case "LOGIN_ERROR":
        return {
            ...state,
            success: false,
            error: true,
            refreshPending: false,
            refreshSuccess: false,
            refreshError: false
        };

    case "REFRESH_TOKEN_PENDING":
        return {
            ...state,
            success: false,
            error: false,
            refreshPending: true,
            refreshSuccess: false,
            refreshError: false
        };

    case "REFRESH_TOKEN_SUCCESS":
        return {
            ...state,
            success: false,
            error: false,
            refreshPending: false,
            refreshSuccess: true,
            refreshError: false,
            sessionItems: action.sessionItems
        };

    case "REFRESH_TOKEN_ERROR":
        return {
            ...state,
            success: false,
            error: false,
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