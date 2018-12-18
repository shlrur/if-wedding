export const types = {
    WIDGET_TYPES: {
        GET: 'WIDGET_TYPES.GET'
    },
    USING_WIDGETS: {
        GET: 'USING_WIDGETS.GET'
    },
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