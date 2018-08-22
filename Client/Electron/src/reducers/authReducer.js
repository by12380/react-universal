const authReducer = (state = {}, action) => {

    switch (action.type) {

    case "LOGIN_SUCCESS":
        return {
            ...state,
            sessionItems: action.sessionItems,
            success: true,
            error: false,
            renewPending: false,
            renewSuccess: false,
            renewError: false
        };

    case "LOGIN_ERROR":
        return {
            ...state,
            success: false,
            error: true,
            renewPending: false,
            renewSuccess: false,
            renewError: false
        };

    case "RENEW_TOKEN_PENDING":
        return {
            ...state,
            success: false,
            error: false,
            renewPending: true,
            renewSuccess: false,
            renewError: false
        };

    case "RENEW_TOKEN_SUCCESS":
        return {
            ...state,
            success: false,
            error: false,
            renewPending: false,
            renewSuccess: true,
            renewError: false,
            sessionItems: action.sessionItems
        };

    case "RENEW_TOKEN_ERROR":
        return {
            ...state,
            success: false,
            error: false,
            renewPending: false,
            renewSuccess: false,
            renewError: true,
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