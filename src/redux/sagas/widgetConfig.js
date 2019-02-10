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
        let fileUniqName;
        let uploadedFileInfos = [];

        for (i = 0; i < images.length; i++) {
            let time = new Date();
            fileUniqName = `${user.uid}/${useWidget.id}/${time.getTime()}`;
            task = yield call(rsf.storage.uploadFile, fileUniqName, images[i]);

            const promise = new Promise((resolve) => {
                task.task.on('state_changed', (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, (error) => {
                    throw(error);
                }, () => {
                    task.task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve({
                            fileName: fileUniqName,
                            fileUrl: downloadURL
                        });
                    });
                });
            });

            const uploadInfo = yield promise;
            uploadedFileInfos.push(uploadInfo);

            yield task;
        }

        console.log(uploadedFileInfos);

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