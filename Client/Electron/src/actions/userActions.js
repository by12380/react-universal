import { auth } from '../utils/auth0';

const fetchUserPending = () => {
    return {
        type: 'FETCH_USER_PENDING'
    }
}

const fetchUserSuccess = (profile) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        profile
    }
}

const fetchUserError = () => {
    return {
        type: 'FETCH_USER_ERROR'
    }
}

export const fetchUser = (accessToken) => (dispatch) => {
    dispatch(fetchUserPending());
    auth.client.userInfo(accessToken, (err, result) => {
        if (err) {
            dispatch(fetchUserError());
        } else {
            const profile = { 
                name: result.name,
                email: result.email,
                picture: result.picture
            }
            dispatch(fetchUserSuccess(profile));
        }
    })
}