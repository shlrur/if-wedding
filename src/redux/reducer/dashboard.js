import { types } from '../actions/dashboards'

const initialState = {
    loading: false,
    dashboards: null
}

export default function dashboardReducer(state = initialState, action = {}) {
    switch (action.type) {
        // widget types
        case types.GET_DASHBOARDS.REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.GET_DASHBOARDS.SUCCESS:
            return {
                ...state,
                loading: false,
                dashboards: action.dashboards
            };
        case types.GET_DASHBOARDS.FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}
