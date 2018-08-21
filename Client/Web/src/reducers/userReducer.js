const initialState = {
    pending: false,
    success: false,
    error: false,
    profile: {
        name: '',
        email: '',
        picture: ''
    }
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        
    case 'FETCH_USER_PENDING':
        return {
            ...state,
            pending: true,
            success: false,
            error: false
        }

    case 'FETCH_USER_SUCCESS':
        return {
            ...state,
            profile: action.profile,
            pending: false,
            success: true,
            error: false
        }

    case 'FETCH_USER_ERROR':
        return {
            ...state,
            pending: false,
            success: false,
            error: true
        }
    
    default:
        return state;
    }
}

export default userReducer;