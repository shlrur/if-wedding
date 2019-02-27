import { all, call, put, takeEvery, select } from 'redux-saga/effects';

import rsf from '../rsf';
import {
    types,
    // getAlbumWidgetImagesSuccess,
    // getAlbumWidgetImagesFailure,
    // setAlbumWidgetImagesSuccess,
    setAlbumWidgetImagesFailure,
    setGeneralWidgetConfigsFailure,
    setGuestbookWidgetMessageSuccess,
    setGuestbookWidgetMessageFailure,
    getGuestbookWidgetMessagesSuccess,
    getGuestbookWidgetMessagesFailure
} from '../actions/widgetConfig';
import { changedUseWidgetsConfigs } from '../actions/widgets';
import { getUser, getUseWidgets, getDashboards, getSelectedDashboardInd } from './selector';

function* setAlbumWidgetImagesSaga({ images, widgetId }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];
        const _useWidgets = yield select(getUseWidgets); // no use
        const useWidget = {
            ..._useWidgets.filter((_useWidget) => {
                return _useWidget.id === widgetId;
            })[0]
        };

        let i;
        let task;
        let uniqFilePath;
        let uploadedFileInfos = [];

        for (i = 0; i < images.length; i++) {
            let time = new Date();
            uniqFilePath = `${user.uid}/${dashboard.id}/${useWidget.id}/${time.getTime()}`;
            task = yield call(rsf.storage.uploadFile, uniqFilePath, images[i]);

            const promise = new Promise((resolve) => {
                task.task.on('state_changed', (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, (error) => {
                    throw (error);
                }, () => {
                    task.task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve({
                            filePath: uniqFilePath,
                            fileUrl: downloadURL
                        });
                    });
                });
            });

            const uploadInfo = yield promise;
            uploadedFileInfos.push(uploadInfo);

            yield task;
        }

        useWidget.configs.showingImageInfos = uploadedFileInfos;

        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidget.id}`,
            {
                configs: useWidget.configs
            },
            { merge: true }
        );

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

function* setGeneralWidgetConfigsSaga({ object, widgetId }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];
        const _useWidgets = yield select(getUseWidgets); // no use
        const useWidget = {
            ..._useWidgets.filter((_useWidget) => {
                return _useWidget.id === widgetId;
            })[0]
        };

        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidget.id}`,
            {
                configs: object
            },
            { merge: true }
        );
    } catch (err) {
        console.log(err);
        yield put(setGeneralWidgetConfigsFailure(err));
    }
}

function* getGuestbookWidgetMessagesSaga({/* pageInd, */widgetId }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];
        const _useWidgets = yield select(getUseWidgets); // no use
        const useWidget = {
            ..._useWidgets.filter((_useWidget) => {
                return _useWidget.id === widgetId;
            })[0]
        };

        const snapshot = yield call(
            rsf.firestore.getCollection,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidget.id}/messages`
        );

        let messages = snapshot.map((message) => {
            return message.data();
        });

        yield put(getGuestbookWidgetMessagesSuccess(messages, useWidget.id));
    } catch (err) {
        console.log(err);
        yield put(getGuestbookWidgetMessagesFailure(err));
    }

}

function* setGuestbookWidgetMessageSaga({ message, widgetId }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];
        const _useWidgets = yield select(getUseWidgets); // no use
        const useWidget = {
            ..._useWidgets.filter((_useWidget) => {
                return _useWidget.id === widgetId;
            })[0]
        };

        yield call(
            rsf.firestore.addDocument,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidget.id}/messages`,
            {
                ...message,
                date: new Date().getTime()
            }
        );

        yield put(setGuestbookWidgetMessageSuccess(useWidget.id));
    } catch (err) {
        console.log(err);
        yield put(setGuestbookWidgetMessageFailure(err));
    }
}

export default function* widgetsRootSaga() {
    yield all([
        takeEvery(types.SET_ALBUM_WIDGET_IMAGES.REQUEST, setAlbumWidgetImagesSaga),
        takeEvery(types.SET_GENERAL_WIDGET_CONFIGS.REQUEST, setGeneralWidgetConfigsSaga),
        takeEvery(types.GET_GUESTBOOK_WIDGET_MESSAGES.REQUEST, getGuestbookWidgetMessagesSaga),
        takeEvery(types.SET_GUESTBOOK_WIDGET_MESSAGE.REQUEST, setGuestbookWidgetMessageSaga)
    ]);
}