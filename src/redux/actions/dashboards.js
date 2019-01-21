export const types = {
    GET_DASHBOARDS: {
        REQUEST: 'GET_DASHBOARDS.REQUEST',
        SUCCESS: 'GET_DASHBOARDS.SUCCESS',
        FAILURE: 'GET_DASHBOARDS.FAILURE'
    }
};

// get dashboard
export const getDashboardsRequest = () => ({
    type: types.GET_DASHBOARDS.REQUEST
});

export const getDashboardsSuccess = (dashboards) => ({
    type: types.GET_DASHBOARDS.SUCCESS,
    dashboards
});

export const getDashboardsFailure = () => ({
    type: types.GET_DASHBOARDS.FAILURE
});