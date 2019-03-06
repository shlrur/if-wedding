import { all, call, put, takeEvery, select } from 'redux-saga/effects';

import rsf from '../rsf';
import {
    types,
    getAlbumWidgetImagesSuccess,
    getAlbumWidgetImagesFailure,
    addAlbumWidgetImagesSuccess,
    addAlbumWidgetImagesFailure,
    setGeneralWidgetConfigsFailure,
    setGuestbookWidgetMessageSuccess,
    setGuestbookWidgetMessageFailure,
    getGuestbookWidgetMessagesSuccess,
    getGuestbookWidgetMessagesFailure
} from '../actions/widgetConfig';
import { getUser, getDashboards, getSelectedDashboardInd } from './selector';

function* getAlbumWidgetImagesSaga({ widgetId }) {
    try{
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];

        const snapshot = yield call(
            rsf.firestore.getCollection,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widgetId}/image_infos`
        );

        let imageInfos = [];

        snapshot.forEach((message) => {
            imageInfos = [
                ...imageInfos,
                { ...message.data(), id: message.id }
            ];
        });

        // do this need an index for order?
        // imageInfos.sort((a, b) => { return b.date - a.date; });

        yield put(getAlbumWidgetImagesSuccess(imageInfos, widgetId));
    } catch (err) {
        console.log(err);
        yield put(getAlbumWidgetImagesFailure(err));
    }
}

function* addAlbumWidgetImagesSaga({ addingImages, widgetId }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];

        let i, j;
        let time, promises = [], tasks = [];
        let uniqFilePaths;
        let uploadedFileInfos = [];
        let addDocumentSnapshot;

        for (i = 0; i < addingImages.length; i++) {
            time = new Date();
            uniqFilePaths = [`${user.uid}/${dashboard.id}/${widgetId}/${time.getTime()}`, `${user.uid}/${dashboard.id}/${widgetId}/${time.getTime()}_thumbnail`];

            tasks = [];
            tasks[0] = yield call(rsf.storage.uploadFile, uniqFilePaths[0], addingImages[i].origin);
            tasks[1] = yield call(rsf.storage.uploadFile, uniqFilePaths[1], addingImages[i].thumbnail);

            promises = [];
            for (j = 0; j < 2; j++) {
                let taskInd = j;

                promises[j] = new Promise((resolve) => {
                    tasks[taskInd].task.on('state_changed', (snapshot) => {
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    }, (error) => {
                        throw (error);
                    }, () => {
                        tasks[taskInd].task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            resolve({
                                filePath: uniqFilePaths[taskInd],
                                fileUrl: downloadURL
                            });
                        });
                    });
                });
            }

            const uploadInfos = yield Promise.all(promises);

            uploadedFileInfos.push({
                origin: uploadInfos[0],
                thumbnail: uploadInfos[1],
                isShowing: true
            });

            addDocumentSnapshot = yield call(
                rsf.firestore.addDocument,
                `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widgetId}/image_infos`,
                uploadedFileInfos[i]
            );

            uploadedFileInfos[i].id = addDocumentSnapshot.id;
        }

        yield put(addAlbumWidgetImagesSuccess(uploadedFileInfos, widgetId));
    } catch (err) {
        console.log(err);
        yield put(addAlbumWidgetImagesFailure(err));
    }
}

function* setGeneralWidgetConfigsSaga({ object, widgetId }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];

        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widgetId}`,
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

        const snapshot = yield call(
            rsf.firestore.getCollection,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widgetId}/messages`
        );

        let messages = [];

        snapshot.forEach((message) => {
            messages = [
                ...messages,
                { ...message.data(), id: message.id }
            ];
        });

        messages.sort((a, b) => { return b.date - a.date; });

        yield put(getGuestbookWidgetMessagesSuccess(messages, widgetId));
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
        const now = new Date().getTime();
        const setMessage = {
            ...message,
            date: now
        };

        const docRef = yield call(
            rsf.firestore.addDocument,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widgetId}/messages`,
            setMessage
        );

        yield put(setGuestbookWidgetMessageSuccess({
            ...setMessage,
            id: docRef.id
        }, widgetId));
    } catch (err) {
        console.log(err);
        yield put(setGuestbookWidgetMessageFailure(err));
    }
}

export default function* widgetsRootSaga() {
    yield all([
        takeEvery(types.GET_ALBUM_WIDGET_IMAGES.REQUEST, getAlbumWidgetImagesSaga),
        takeEvery(types.ADD_ALBUM_WIDGET_IMAGES.REQUEST, addAlbumWidgetImagesSaga),
        takeEvery(types.SET_GENERAL_WIDGET_CONFIGS.REQUEST, setGeneralWidgetConfigsSaga),
        takeEvery(types.GET_GUESTBOOK_WIDGET_MESSAGES.REQUEST, getGuestbookWidgetMessagesSaga),
        takeEvery(types.SET_GUESTBOOK_WIDGET_MESSAGE.REQUEST, setGuestbookWidgetMessageSaga)
    ]);
}