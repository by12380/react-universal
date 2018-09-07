import { AUTH0_DOMAIN, APP_SERVER_URL } from '../config';

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

export const storeUserPending = () => {
    return {
        type: 'STORE_USER_PENDING'
    }
}

export const storeUserSuccess = () => {
    return {
        type: 'STORE_USER_SUCCESS'
    }
}

export const storeUserError = () => {
    return {
        type: 'STORE_USER_ERROR'
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
        dispatch(storeUser(accessToken, user));
    })
    .catch(error => {
        console.log(error);
        dispatch(fetchUserError());
    })

}

export const storeUser = (accessToken, user) => (dispatch) => {

    dispatch(storeUserPending());

    fetch(`${APP_SERVER_URL}/users/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            email: user.email,
        }),
    })
    .then(res => {
        if (res.status !== 200)
            throw `failed to store user with status ${res.status}`;
        return res.json();
    })
    .then(result => {
        dispatch(storeUserSuccess());
    })
    .catch(error => {
        dispatch(storeUserError());
    })

}