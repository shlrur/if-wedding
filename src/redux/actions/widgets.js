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
    },
    RESET_WIDGET_STATES: 'RESET_WIDGET_STATES'
};

// widget types
export const getWidgetTypesRequest = (theme) => ({
    type: types.GET_WIDGET_TYPES.REQUEST,
    theme
});

export const getWidgetTypesSuccess = (widgetTypes) => ({
    type: types.GET_WIDGET_TYPES.SUCCESS,
    widgetTypes
});

export const getWidgetTypesFailure = () => ({
    type: types.GET_WIDGET_TYPES.FAILURE
});


// in use widgets
export const getUseWidgetsRequest = (dashboardId) => ({
    type: types.GET_USE_WIDGETS.REQUEST,
    dashboardId
});

export const getUseWidgetsSuccess = (useWidgets) => ({
    type: types.GET_USE_WIDGETS.SUCCESS,
    useWidgets
});

export const getUseWidgetsFailure = () => ({
    type: types.GET_USE_WIDGETS.FAILURE
});


// add use widget
export const addUseWidgetRequest = (addedWidgetType) => ({
    type: types.ADD_USE_WIDGET.REQUEST,
    addedWidgetType
});

export const addUseWidgetSuccess = (useWidgets) => ({
    type: types.ADD_USE_WIDGET.SUCCESS,
    useWidgets
});

export const addUseWidgetFailure = () => ({
    type: types.ADD_USE_WIDGET.FAILURE
});


// deleteUseWidget
export const deleteUseWidgetRequest = (widget) => ({
    type: types.DELETE_USE_WIDGET.REQUEST,
    widget
});

export const deleteUseWidgetSuccess = (useWidgets) => ({
    type: types.DELETE_USE_WIDGET.SUCCESS,
    useWidgets
});

export const deleteUseWidgetFailure = () => ({
    type: types.DELETE_USE_WIDGET.FAILURE
});


// reset widget states
export const resetWidgetStates = () => ({
    type: types.RESET_WIDGET_STATES
});