export const types = {
    GET_DASHBOARD: {
        REQUEST: 'GET_DASHBOARD.REQUEST',
        SUCCESS: 'GET_DASHBOARD.SUCCESS',
        FAILURE: 'GET_DASHBOARD.FAILURE'
    }
};

// get dashboard
export const getDashboardRequest = () => ({
    type: types.GET_DASHBOARD.REQUEST
});

export const getDashboardSuccess = (dashboard) => ({
    type: types.GET_DASHBOARD.SUCCESS,
    dashboard
});

export const getDashboardFailure = () => ({
    type: types.GET_DASHBOARD.FAILURE
});