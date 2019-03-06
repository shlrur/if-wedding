import { types } from '../actions/widgetConfig';

const initialState = {
    //     widgetTypesLoading: false,
    //     widgetTypes: null,
    //     useWidgetsLoading: false,
    //     useWidgets: null
    //     // TODO
    loadings: {},
    guestbookMessages: {},
    imageInfos: {}
};

export default function widgetReducer(state = initialState, action = {}) {
    switch (action.type) {
        // get album images
        case types.GET_ALBUM_WIDGET_IMAGES.REQUEST:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: true }
            };
        case types.GET_ALBUM_WIDGET_IMAGES.SUCCESS:
            return {
                ...state,
                imageInfos: { ...state.imageInfos, [action.widgetId]: action.imageInfos },
                loadings: { ...state.loadings, [action.widgetId]: false }
            };
        case types.GET_ALBUM_WIDGET_IMAGES.FAILURE:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: false }
            };


        // add album images
        case types.ADD_ALBUM_WIDGET_IMAGES.REQUEST:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: true }
            };
        case types.ADD_ALBUM_WIDGET_IMAGES.SUCCESS:
            return {
                ...state,
                imageInfos: { ...state.imageInfos, [action.widgetId]: [...action.imageInfos, ...state.imageInfos[action.widgetId]] },
                loadings: { ...state.loadings, [action.widgetId]: false }
            };
        case types.ADD_ALBUM_WIDGET_IMAGES.FAILURE:
            return {
                ...state,
                loadings: { ...state.loadings, [action.widgetId]: false }
            };

        
            // set album image selection
            // case types.SET_ALBUM_WIDGET_IMAGE_SELECTION.REQUEST:
            //     return {
            //         ...state,
            //         loadings: { ...state.loadings, [action.widgetId]: true }
            //     };
            // case types.SET_ALBUM_WIDGET_IMAGE_SELECTION.SUCCESS:
            //     return {
            //         ...state,
            //         // imageInfos: { ...state.imageInfos, [action.widgetId]: [action.imageInfo, ...state.imageInfos[action.widgetId]] },
            //         loadings: { ...state.loadings, [action.widgetId]: false }
            //     };
            // case types.SET_ALBUM_WIDGET_IMAGE_SELECTION.FAILURE:
            //     return {
            //         ...state,
            //         loadings: { ...state.loadings, [action.widgetId]: false }
            //     };


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
