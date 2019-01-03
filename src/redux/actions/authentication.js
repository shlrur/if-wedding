export const types = {
    LOGIN: {
        REQUEST: 'LOGIN.REQUEST',
        SUCCESS: 'LOGIN.SUCCESS',
        FAILURE: 'LOGIN.FAILURE'
    },
    LOGOUT: {
        REQUEST: 'LOGOUT.REQUEST',
        SUCCESS: 'LOGOUT.SUCCESS',
        FAILURE: 'LOGOUT.FAILURE'
    },
    REGIST: {
        REQUEST: 'REGIST.REQUEST',
        SUCCESS: 'REGIST.SUCCESS',
        FAILURE: 'REGIST.FAILURE'
    }
};

// login
export const login = providerName => ({
    type: types.LOGIN.REQUEST,
    providerName
});

export const loginSuccess = user => ({
    type: types.LOGIN.SUCCESS,
    user
});

export const loginFailure = error => ({
    type: types.LOGIN.FAILURE,
    error
});


// logout
export const logout = () => ({
    type: types.LOGOUT.REQUEST
});

export const logoutSuccess = () => ({
    type: types.LOGOUT.SUCCESS
});

export const logoutFailure = error => ({
    type: types.LOGOUT.FAILURE,
    error
});


// regist user
export const regist = () => ({
    type: types.REGIST.REQUEST
});
