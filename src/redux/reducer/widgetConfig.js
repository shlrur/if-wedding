import { types } from '../actions/widgetConfig';

const initialState = {
    //     widgetTypesLoading: false,
    //     widgetTypes: null,
    //     useWidgetsLoading: false,
    //     useWidgets: null
    //     // TODO
    loadings: {},
    guestbookMessages: {}
};

export default function widgetReducer(state = initialState, action = {}) {
    switch (action.type) {
        // get guestbook messages
        case types.GET_GUESTBOOK_WIDGET_MESSAGES.REQUEST:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: true }
            };
        case types.GET_GUESTBOOK_WIDGET_MESSAGES.SUCCESS:
            return {
                ...state,
                guestbookMessages: { ...state.guestbookMessages, [action.widgetId]: action.messages },
                loadings: { ...state.loadings, [action.widgetId]: false }
            };
        case types.GET_GUESTBOOK_WIDGET_MESSAGES.FAILURE:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: false }
            };


        // set guestbook message
        case types.SET_GUESTBOOK_WIDGET_MESSAGE.REQUEST:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: true }
            };
        case types.SET_GUESTBOOK_WIDGET_MESSAGE.SUCCESS:
            return {
                ...state,
                guestbookMessages: { ...state.guestbookMessages, [action.widgetId]: [action.message, ...state.guestbookMessages[action.widgetId]] },
                loadings: { ...state.loadings, [action.widgetId]: false }
            };
        case types.SET_GUESTBOOK_WIDGET_MESSAGE.FAILURE:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: false }
            };


        // reset widget states
        case types.RESET_WIDGET_STATES:
            return initialState;
        default:
            return state;
    }
}
