import { types } from '../actions/dashboards'

const initialState = {
    loading: false,
    dashboards: [],
    selectedDashboardInd: -1,
    defaultDashboardId: null
}

export default function dashboardReducer(state = initialState, action = {}) {
    switch (action.type) {
        // get dashboards
        case types.GET_DASHBOARDS.REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_DASHBOARDS.SUCCESS:
            return {
                ...state,
                loading: false,
                dashboards: action.dashboards,
                selectedDashboardInd: action.selectedDashboardInd,
                defaultDashboardId: action.defaultDashboardId
            };
        case types.GET_DASHBOARDS.FAILURE:
            return {
                ...state,
                loading: false,
            }

        // create dashboard with theme
        case types.CREATE_DASHBOARD.REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.CREATE_DASHBOARD.SUCCESS:
            return {
                ...state,
                loading: false,
                dashboards: [...state.dashboards, action.dashboard],
                selectedDashboardInd: state.dashboards.length
            }
        case types.CREATE_DASHBOARD.FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
