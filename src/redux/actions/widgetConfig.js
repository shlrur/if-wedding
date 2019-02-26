export const types = {
    SET_ALBUM_WIDGET_IMAGES: {
        REQUEST: 'SET_ALBUM_WIDGET_IMAGES.REQUEST',
        SUCCESS: 'SET_ALBUM_WIDGET_IMAGES.SUCCESS',
        FAILURE: 'SET_ALBUM_WIDGET_IMAGES.FAILURE'
    },
    GET_ALBUM_WIDGET_IMAGES: {
        REQUEST: 'GET_ALBUM_WIDGET_IMAGES.REQUEST',
        SUCCESS: 'GET_ALBUM_WIDGET_IMAGES.SUCCESS',
        FAILURE: 'GET_ALBUM_WIDGET_IMAGES.FAILURE'
    },
    SET_GENERAL_WIDGET_CONFIGS: {
        REQUEST: 'SET_GENERAL_WIDGET_CONFIGS.REQUEST',
        SUCCESS: 'SET_GENERAL_WIDGET_CONFIGS.SUCCESS',
        FAILURE: 'SET_GENERAL_WIDGET_CONFIGS.FAILURE'
    }
};

// set images
export const setAlbumWidgetImagesRequest = (images, widgetId) => ({
    type: types.SET_ALBUM_WIDGET_IMAGES.REQUEST,
    images,
    widgetId
});

// export const setAlbumWidgetImagesSuccess = (urls) => ({
//     type: types.SET_ALBUM_WIDGET_IMAGES.SUCCESS,
//     urls
// });

export const setAlbumWidgetImagesFailure = () => ({
    type: types.SET_ALBUM_WIDGET_IMAGES.FAILURE
});


// get images
export const getAlbumWidgetImagesRequest = (urls) => ({
    type: types.GET_ALBUM_WIDGET_IMAGES.REQUEST,
    urls
});

// export const getAlbumWidgetImagesSuccess = (images) => ({
//     type: types.GET_ALBUM_WIDGET_IMAGES.SUCCESS,
//     images
// });

export const getAlbumWidgetImagesFailure = () => ({
    type: types.GET_ALBUM_WIDGET_IMAGES.FAILURE
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