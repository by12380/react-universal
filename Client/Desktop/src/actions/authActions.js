export const loginSuccess = (sessionItems) => {
    return {
        type: 'LOGIN_SUCCESS',
        sessionItems
    };
};

export const loginError = () => {
    return {
        type: 'LOGIN_ERROR',
    };
};