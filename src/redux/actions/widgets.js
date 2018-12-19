export const types = {
    GET_WIDGET_TYPES: {
        REQUEST: 'GET_WIDGET_TYPES.REQUEST',
        SUCCESS: 'GET_WIDGET_TYPES.SUCCESS',
        FAILURE: 'GET_WIDGET_TYPES.FAILURE'
    },
    GET_USE_WIDGETS: {
        REQUEST: 'GET_USE_WIDGETS.REQUEST',
        SUCCESS: 'GET_USE_WIDGETS.SUCCESS',
        FAILURE: 'GET_USE_WIDGETS.FAILURE'
    },
    ADD_USE_WIDGET: {
        REQUEST: 'ADD_USE_WIDGET.REQUEST',
        SUCCESS: 'ADD_USE_WIDGET.SUCCESS',
        FAILURE: 'ADD_USE_WIDGET.FAILURE'
    },
    DELETE_USE_WIDGET: {
        REQUEST: 'DELETE_USE_WIDGET.REQUEST',
        SUCCESS: 'DELETE_USE_WIDGET.SUCCESS',
        FAILURE: 'DELETE_USE_WIDGET.FAILURE'
    },
    MODIFY_USE_WIDGET: {
        REQUEST: 'MODIFY_USE_WIDGET.REQUEST',
        SUCCESS: 'MODIFY_USE_WIDGET.SUCCESS',
        FAILURE: 'MODIFY_USE_WIDGET.FAILURE'
    }
};

export const getWidgetTypesRequest = () => ({
    type: types.GET_WIDGET_TYPES.REQUEST
});

export const getWidgetTypesSuccess = (widgetTypes) => ({
    type: types.GET_WIDGET_TYPES.SUCCESS,
    widgetTypes
});

export const getWidgetTypesFailure = () => ({
    type: types.GET_WIDGET_TYPES.FAILURE
});

export const getUsingWidgetsRequest = () => ({
    type: types.GET_USE_WIDGETS.REQUEST
});

export const addUsingWidgetRequest = () => ({
    type: types.ADD_USING_WIDGET.REQUEST
});

export const deleteUsingWidgetRequest = () => ({
    type: types.DELETE_USING_WIDGET.REQUEST
});

export const modifyUsingWidgetRequest = () => ({
    type: types.MODIFY_USING_WIDGET.REQUEST
});