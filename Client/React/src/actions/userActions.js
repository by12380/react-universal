import { auth } from '../utils/auth0';
import { APP_SERVER_URL } from '../config';

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

const storeUserPending = () => {
    return {
        type: 'STORE_USER_PENDING'
    }
}

const storeUserSuccess = () => {
    return {
        type: 'STORE_USER_SUCCESS'
    }
}

const storeUserError = () => {
    return {
        type: 'STORE_USER_ERROR'
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
            dispatch(storeUser(accessToken, profile));
        }
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