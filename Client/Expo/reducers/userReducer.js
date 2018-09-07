const initialState = {
    userPending: false,
    userSuccess: false,
    userError: false,
    user: {
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
            userPending: true,
            userSuccess: false,
            userError: false
        }

    case 'FETCH_USER_SUCCESS':
        return {
            ...state,
            user: action.user,
            userPending: false,
            userSuccess: true,
            userError: false
        }

    case 'FETCH_USER_ERROR':
        return {
            ...state,
            userPending: false,
            userSuccess: false,
            userError: true
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