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
    },
    SET_WEDDING_INFORMATION: {
        REQUEST: 'SET_WEDDING_INFORMATION.REQUEST',
        SUCCESS: 'SET_WEDDING_INFORMATION.SUCCESS',
        FAILURE: 'SET_WEDDING_INFORMATION.FAILURE'
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


// set wedding information
export const setWeddingInformation = (inform) => ({
    type: types.SET_WEDDING_INFORMATION.REQUEST,
    inform
});

export const setWeddingInformationSuccess = () => ({
    type: types.SET_WEDDING_INFORMATION.SUCCESS
});

export const setWeddingInformationFailure = error => ({
    type: types.SET_WEDDING_INFORMATION.FAILURE,
    error
});