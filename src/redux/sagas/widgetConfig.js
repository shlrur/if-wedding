import { eventChannel } from 'redux-saga';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';

import rsf from '../rsf';
import {
    types,
    getAlbumWidgetImagesSuccess,
    getAlbumWidgetImagesFailure,
    setAlbumWidgetImagesSuccess,
    setAlbumWidgetImagesFailure
} from '../actions/widgetConfig';
import { changedUseWidgetsConfigs } from '../actions/widgets';
import { getUser, getUseWidgets } from './selector';

function* setAlbumWidgetImagesSaga({ images, widgetId }) {
    try {
        const user = yield select(getUser);
        const _useWidgets = yield select(getUseWidgets); // no use
        const useWidget = {
            ..._useWidgets.filter((_useWidget) => {
                return _useWidget.id === widgetId;
            })[0]
        };
        let i;
        let task;
        let channel;

        for (i = 0; i < images.length; i++) {
            task = yield call(rsf.storage.uploadFile, `test-${i}`, images[i]);

            channel = eventChannel(emit => task.task.on('state_changed', emit));

            yield takeEvery(channel, (a, b, c) => {
                console.log(a, b, c);
            });

            yield task;
        }

        useWidget.configs.showingImageUrls = ['123', '456'];

        let changedUseWidgets = _useWidgets.map((_useWidget) => {
            if (_useWidget.id === useWidget.id) {
                return useWidget;
            } else {
                return _useWidget;
            }
        });

        yield put(changedUseWidgetsConfigs(changedUseWidgets));
    } catch (err) {
        console.log(err);
        yield put(setAlbumWidgetImagesFailure(err));
    }
}

export default function* widgetsRootSaga() {
    yield all([
        takeEvery(types.SET_ALBUM_WIDGET_IMAGES.REQUEST, setAlbumWidgetImagesSaga)
    ]);
}