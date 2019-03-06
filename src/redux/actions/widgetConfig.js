export const types = {
    ADD_ALBUM_WIDGET_IMAGES: {
        REQUEST: 'ADD_ALBUM_WIDGET_IMAGES.REQUEST',
        SUCCESS: 'ADD_ALBUM_WIDGET_IMAGES.SUCCESS',
        FAILURE: 'ADD_ALBUM_WIDGET_IMAGES.FAILURE'
    },
    GET_ALBUM_WIDGET_IMAGES: {
        REQUEST: 'GET_ALBUM_WIDGET_IMAGES.REQUEST',
        SUCCESS: 'GET_ALBUM_WIDGET_IMAGES.SUCCESS',
        FAILURE: 'GET_ALBUM_WIDGET_IMAGES.FAILURE'
    },
    SET_ALBUM_WIDGET_IMAGE_SELECTION: {
        REQUEST: 'SET_ALBUM_WIDGET_IMAGE_SELECTION.REQUEST',
        SUCCESS: 'SET_ALBUM_WIDGET_IMAGE_SELECTION.SUCCESS',
        FAILURE: 'SET_ALBUM_WIDGET_IMAGE_SELECTION.FAILURE'
    },
    SET_GENERAL_WIDGET_CONFIGS: {
        REQUEST: 'SET_GENERAL_WIDGET_CONFIGS.REQUEST',
        SUCCESS: 'SET_GENERAL_WIDGET_CONFIGS.SUCCESS',
        FAILURE: 'SET_GENERAL_WIDGET_CONFIGS.FAILURE'
    },
    GET_GUESTBOOK_WIDGET_MESSAGES: {
        REQUEST: 'GET_GUESTBOOK_WIDGET_MESSAGES.REQUEST',
        SUCCESS: 'GET_GUESTBOOK_WIDGET_MESSAGES.SUCCESS',
        FAILURE: 'GET_GUESTBOOK_WIDGET_MESSAGES.FAILURE'
    },
    SET_GUESTBOOK_WIDGET_MESSAGE: {
        REQUEST: 'SET_GUESTBOOK_WIDGET_MESSAGE.REQUEST',
        SUCCESS: 'SET_GUESTBOOK_WIDGET_MESSAGE.SUCCESS',
        FAILURE: 'SET_GUESTBOOK_WIDGET_MESSAGE.FAILURE'
    }
};

// get images
export const getAlbumWidgetImagesRequest = (widgetId) => ({
    type: types.GET_ALBUM_WIDGET_IMAGES.REQUEST,
    widgetId
});

export const getAlbumWidgetImagesSuccess = (imageInfos, widgetId) => ({
    type: types.GET_ALBUM_WIDGET_IMAGES.SUCCESS,
    imageInfos, widgetId
});

export const getAlbumWidgetImagesFailure = () => ({
    type: types.GET_ALBUM_WIDGET_IMAGES.FAILURE
});


// set images
export const addAlbumWidgetImagesRequest = (addingImages, widgetId) => ({
    type: types.ADD_ALBUM_WIDGET_IMAGES.REQUEST,
    addingImages,
    widgetId
});

export const addAlbumWidgetImagesSuccess = (imageInfos, widgetId) => ({
    type: types.ADD_ALBUM_WIDGET_IMAGES.SUCCESS,
    imageInfos, widgetId
});

export const addAlbumWidgetImagesFailure = () => ({
    type: types.ADD_ALBUM_WIDGET_IMAGES.FAILURE
});


// set image selection
export const setAlbumWidgetImageSelectionRequest = (imageId, isShowing, widgetId) => ({
    type: types.SET_ALBUM_WIDGET_IMAGE_SELECTION.REQUEST,
    imageId,
    isShowing,
    widgetId
});

export const setAlbumWidgetImageSelectionSuccess = (widgetId) => ({
    type: types.SET_ALBUM_WIDGET_IMAGE_SELECTION.SUCCESS,
    widgetId
});

export const setAlbumWidgetImageSelectionFailure = () => ({
    type: types.SET_ALBUM_WIDGET_IMAGE_SELECTION.FAILURE
});


// set general config
export const setGeneralWidgetConfigsRequest = (object, widgetId) => ({
    type: types.SET_GENERAL_WIDGET_CONFIGS.REQUEST,
    object, widgetId
});

// export const setGeneralWidgetConfigsSuccess = (images) => ({
//     type: types.SET_GENERAL_WIDGET_CONFIGS.SUCCESS,
//     images
// });

export const setGeneralWidgetConfigsFailure = () => ({
    type: types.SET_GENERAL_WIDGET_CONFIGS.FAILURE
});


// get guestbook messages
export const getGuestbookWidgetMessagesRequest = (/*pageInd, */widgetId) => ({
    type: types.GET_GUESTBOOK_WIDGET_MESSAGES.REQUEST,
    /*pageInd, */widgetId
});

export const getGuestbookWidgetMessagesSuccess = (messages, widgetId) => ({
    type: types.GET_GUESTBOOK_WIDGET_MESSAGES.SUCCESS,
    messages, widgetId
});

export const getGuestbookWidgetMessagesFailure = () => ({
    type: types.GET_GUESTBOOK_WIDGET_MESSAGES.FAILURE
});


// set guestbook message
export const setGuestbookWidgetMessageRequest = (message, widgetId) => ({
    type: types.SET_GUESTBOOK_WIDGET_MESSAGE.REQUEST,
    message, widgetId
});

export const setGuestbookWidgetMessageSuccess = (message, widgetId) => ({
    type: types.SET_GUESTBOOK_WIDGET_MESSAGE.SUCCESS,
    message, widgetId
});

export const setGuestbookWidgetMessageFailure = () => ({
    type: types.SET_GUESTBOOK_WIDGET_MESSAGE.FAILURE
});