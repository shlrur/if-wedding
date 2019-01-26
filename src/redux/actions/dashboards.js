export const types = {
    GET_DASHBOARDS: {
        REQUEST: 'GET_DASHBOARDS.REQUEST',
        SUCCESS: 'GET_DASHBOARDS.SUCCESS',
        FAILURE: 'GET_DASHBOARDS.FAILURE'
    },
    CREATE_DASHBOARD: {
        REQUEST: 'CREATE_DASHBOARD.REQUEST',
        SUCCESS: 'CREATE_DASHBOARD.SUCCESS',
        FAILURE: 'CREATE_DASHBOARD.FAILURE'
    },
    MODIFY_DASHBOARD: 'MODIFY_DASHBOARD'
};

// get dashboards
export const getDashboardsRequest = () => ({
    type: types.GET_DASHBOARDS.REQUEST
});

export const getDashboardsSuccess = (dashboards, selectedDashboardInd, defaultDashboardId) => ({
    type: types.GET_DASHBOARDS.SUCCESS,
    dashboards,
    selectedDashboardInd,
    defaultDashboardId
});

export const getDashboardsFailure = () => ({
    type: types.GET_DASHBOARDS.FAILURE
});

// create dashboard
export const createDashboardRequest = (theme) => ({
    type: types.CREATE_DASHBOARD.REQUEST,
    theme
});

export const createDashboardSuccess = (dashboard) => ({
    type: types.CREATE_DASHBOARD.SUCCESS,
    dashboard
});

export const createDashboardFailure = () => ({
    type: types.CREATE_DASHBOARD.FAILURE
});

// modify dashboard(for add, delete)
export const modifyDashboard = (dashboard) => ({
    type: types.MODIFY_DASHBOARD,
    dashboard
});