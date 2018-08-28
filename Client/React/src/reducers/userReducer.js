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

    case 'STORE_USER_PENDING':
        return {
            ...state,
            storePending: true,
            storeSuccess: false,
            storeError: false
        }

    case 'STORE_USER_SUCCESS':
        return {
            ...state,
            storePending: false,
            storeSuccess: true,
            storeError: false
        }

    case 'STORE_USER_ERROR':
        return {
            ...state,
            storePending: false,
            storeSuccess: false,
            storeError: true
        }
    
    default:
        return state;
    }
}

export default userReducer;