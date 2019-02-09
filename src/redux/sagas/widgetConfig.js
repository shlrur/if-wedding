import { eventChannel } from 'redux-saga';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

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
        let subscribe;

        var next = function (snapshot) {
            console.log(snapshot)
        };
        var error = function (error) {
            console.log('upload image error: ', error);
        };
        var complete = function () {
            console.log('image upload complete');
        };

        for (i = 0; i < images.length; i++) {
            task = yield call(rsf.storage.uploadFile, `test-${i}`, images[i]);

            // subscribe = eventChannel(emit => task.task.on('state_changed', emit));
            task.task
                .then(snapshot => console.log('0 ', snapshot.ref.getDownloadURL()))
                .then((url) => {
                    console.log('1 ', url);
                })
                .catch((error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        //  ...
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                });

            // subscribe({
            //     'next': (snapshot) => {
            //         console.log(snapshot);
            //     },
            //     'error': (err) => {
            //         console.log('upload image error: ', err);
            //     },
            //     'complete': () => {
            //         console.log('image upload complete');
            //     }
            // });

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