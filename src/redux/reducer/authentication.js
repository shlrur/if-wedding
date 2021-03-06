import { types } from '../actions/authentication';

const initialState = {
    loading: false,
    loggedIn: false,
    isChecked: false,
    user: null
};

export default function loginReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGIN.REQUEST:
        case types.LOGOUT.REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.LOGIN.SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                isChecked: true,
                user: action.user
            };
        case types.LOGIN.FAILURE:
            return {
                ...state,
                loading: false
            };
        case types.LOGOUT.SUCCESS:
            return {
                ...initialState,
                isChecked: true
            };
        case types.LOGOUT.FAILURE:
            return {
                ...state,
                loading: false
            };
        case types.SET_WEDDING_INFORMATION.REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.SET_WEDDING_INFORMATION.SUCCESS:
        case types.SET_WEDDING_INFORMATION.FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
