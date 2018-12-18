export const types = {
    GET_WIDGET_TYPES: {
        REQUEST: 'GET_WIDGET_TYPES.REQUEST',
        SUCCESS: 'GET_WIDGET_TYPES.SUCCESS',
        FAILURE: 'GET_WIDGET_TYPES.FAILURE'
    },
    GET_USE_WIDGETS: {
        GET: 'USING_WIDGETS.GET'
    },
    ADD_USE_WIDGET: {

    },
    DELETE_USE_WIDGET: {},
    MODIFY_USE_WIDGET: {},
    USING_WIDGET: {
        ADD: 'USING_WIDGET.ADD',
        DELETE: 'USING_WIDGET.DELETE',
        MODIFY: 'USING_WIDGET.MODIFY'
    }
};

export const getWidgetTypes = () => ({
    type: types.WIDGET_TYPES.GET
});

export const getUsingWidgets = () => ({
    type: types.USING_WIDGETS.GET
});

export const addUsingWidget = () => ({
    type: types.USING_WIDGET.ADD
});

export const deleteUsingWidget = () => ({
    type: types.USING_WIDGET.DELETE
});

export const modifyUsingWidget = () => ({
    type: types.USING_WIDGET.MODIFY
});