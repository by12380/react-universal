const authReducer = (state = {}, action) => {

    switch (action.type) {

    case "LOGIN_SUCCESS":
        return {
            ...state,
            sessionItems: action.sessionItems,
            success: true,
            error: false
        };

    case "LOGIN_ERROR":
        return {
            ...state,
            success: false,
            error: true
        };

    default:
        return state;
    }
    
}

export default authReducer;