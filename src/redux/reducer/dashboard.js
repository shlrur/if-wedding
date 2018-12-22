import { types } from '../actions/dashboard'

const initialState = {
    loading: false,
    dashboard: null
}

export default function dashboardReducer(state = initialState, action = {}) {
    switch (action.type) {
        // widget types
        case types.GET_DASHBOARD.REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_DASHBOARD.SUCCESS:
            return {
                ...state,
                loading: false,
                dashboard: action.dashboard
            };
        case types.GET_DASHBOARD.FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
