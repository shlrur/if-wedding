import { types } from '../actions/widgets';

const initialState = {
    widgetTypesLoading: false,
    widgetTypes: null,
    useWidgetsLoading: false,
    useWidgets: null
    // TODO
};

export default function widgetReducer(state = initialState, action = {}) {
    switch (action.type) {
        // widget types
        case types.GET_WIDGET_TYPES.REQUEST:
            return {
                ...state,
                widgetTypesLoading: true
            };
        case types.GET_WIDGET_TYPES.SUCCESS:
            return {
                ...state,
                widgetTypesLoading: false,
                widgetTypes: action.widgetTypes
            };
        case types.GET_WIDGET_TYPES.FAILURE:
            return {
                ...state,
                widgetTypesLoading: false,
            }
        // in use widgets
        case types.GET_USE_WIDGETS.REQUEST:
            return {
                ...state,
                useWidgetsLoading: true
            };
        case types.GET_USE_WIDGETS.SUCCESS:
            return {
                ...state,
                useWidgetsLoading: false,
                useWidgets: action.useWidgets
            };
        case types.GET_USE_WIDGETS.FAILURE:
            return {
                ...state,
                useWidgetsLoading: false
            };
        default:
            return state
    }
}
