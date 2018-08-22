import { AUTH0_DOMAIN } from '../config';

export const fetchUserPending = () => {
    return {
        type: 'FETCH_USER_PENDING'
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        user
    }
}

export const fetchUserError = () => {
    return {
        type: 'FETCH_USER_ERROR'
    }
}

export const fetchUser = (sessionItems) => (dispatch) => {

    dispatch(fetchUserPending());

    fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
        headers: {
            Authorization: `Bearer ${sessionItems.accessToken}`
        }
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to get user profile with status ${res.status}`;
        return res.json();
    })
    .then(user => {
        dispatch(fetchUserSuccess(user));
    })
    .catch(error => {
        console.log(error);
        dispatch(fetchUserError());
    })

}