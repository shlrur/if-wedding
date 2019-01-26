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
    MODIFY_DASHBOARD_LAYOUT: {
        REQUEST: 'MODIFY_DASHBOARD_LAYOUT.REQUEST',
        SUCCESS: 'MODIFY_DASHBOARD_LAYOUT.SUCCESS',
        FAILURE: 'MODIFY_DASHBOARD_LAYOUT.FAILURE'
    },
    RESET_DASHBOARD_STATES: 'RESET_DASHBOARD_STATES'
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

// modify dashboard layout
export const modifyDashboardLayoutRequest = (layout) => ({
    type: types.MODIFY_DASHBOARD_LAYOUT.REQUEST,
    layout
});

export const modifyDashboardLayoutSuccess = () => ({
    type: types.MODIFY_DASHBOARD_LAYOUT.SUCCESS
});

export const modifyDashboardLayoutFailure = () => ({
    type: types.MODIFY_DASHBOARD_LAYOUT.FAILURE
});

// reset dashboards state
export const resetDashboardStates = () => ({
    type: types.RESET_DASHBOARD_STATES
})