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

    default:
        return state;
    }
    
}

export default authReducer;