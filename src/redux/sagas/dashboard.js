import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

import rsf from '../rsf';
import {
    types,
    getDashboardsSuccess,
    getDashboardsFailure,
    createDashboardSuccess,
    createDashboardFailure,
    deleteDashboardSuccess,
    deleteDashboardFailure,
    modifyDashboardLayoutSuccess,
    modifyDashboardLayoutFailure
} from '../actions/dashboards';
import { getUser, getDashboards, getSelectedDashboardInd, getUseWidgets } from './selector';

function* getDashboardsSaga() {
    try {
        let dashboards = [],
            selectedDashboardInd = -1,
            defaultDashboardId = null;
        const user = yield select(getUser);

        const userSnapshot = yield call(
            rsf.firestore.getDocument,
            `users/${user.uid}`
        );
        const dashboardsSnapshot = yield call(
            rsf.firestore.getCollection,
            firebase.firestore().collection(`users/${user.uid}/dashboards`).orderBy('created_dtts')
        );

        defaultDashboardId = userSnapshot.data().default_dashboard_id;

        dashboardsSnapshot.forEach((d, ind) => {
            dashboards.push({
                id: d.id,
                ...d.data()
            });

            if (defaultDashboardId && d.id === defaultDashboardId) {
                selectedDashboardInd = ind;
            }
        });

        selectedDashboardInd = selectedDashboardInd === -1 ? dashboards.length - 1 : selectedDashboardInd;

        yield put(getDashboardsSuccess(dashboards, selectedDashboardInd, defaultDashboardId));
    } catch (err) {
        console.log(err);
        yield put(getDashboardsFailure(err));
    }
}

function* createDashboardSaga({ theme }) {
    try {
        const user = yield select(getUser);
        const now = new Date();

        const dashboardDocRef = yield call(
            rsf.firestore.addDocument,
            `users/${user.uid}/dashboards`,
            {
                alias: `dashboard ${now.getMonth() + 1}/${now.getDate()} ${now.toTimeString().split(' ')[0]}`,
                theme,
                created_dtts: now.getTime(),
                // last_contact_dtts: new Date().getTime(),
                height: 0,
                layout: []
            }
        );

        const dashboardSnapshot = yield call(rsf.firestore.getDocument, dashboardDocRef);

        yield put(createDashboardSuccess({ id: dashboardSnapshot.id, ...dashboardSnapshot.data() }));
    } catch (err) {
        yield put(createDashboardFailure(err));
    }
}

function* deleteDashboardSaga({ dashboard }) {
    try {
        const user = yield select(getUser);
        const useWidgets = yield select(getUseWidgets);
        const _dashboards = yield select(getDashboards); // not use
        const dashboards = [..._dashboards];

        let selectedDashboardInd;

        let ind, jnd;

        // delete widgets on firestore
        for (ind = 0; ind < useWidgets.length; ind++) {
            if (useWidgets[ind].name.indexOf('photoAlbum') !== -1) {
                // delete image files and documents in collection if widget is album
                const imageInfos = yield call(rsf.firestore.getCollection, `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidgets[ind].id}/image_infos`);

                for (jnd = 0; jnd < imageInfos.size; jnd++) {
                    const imageInfo = imageInfos.docs[jnd].data();

                    // delete files
                    yield call(rsf.storage.deleteFile, imageInfo.origin.filePath);
                    yield call(rsf.storage.deleteFile, imageInfo.thumbnail.filePath);

                    // delete image info documents
                    yield call(rsf.firestore.deleteDocument, `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidgets[ind].id}/image_infos/${imageInfos.docs[jnd].id}`);
                }
            } else if (useWidgets[ind].name.indexOf('guestBook') !== -1) {
                // delete collection of messages
                const messages = yield call(rsf.firestore.getCollection, `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidgets[ind].id}/messages`);
                let jnd;
                for (jnd = 0; jnd < messages.size; jnd++) {
                    yield call(rsf.firestore.deleteDocument, `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidgets[ind].id}/messages/${messages.docs[jnd].id}`);
                }
            }

            yield call(
                rsf.firestore.deleteDocument,
                `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${useWidgets[ind].id}`
            );
        }

        // delete dashboard on firestore
        yield call(
            rsf.firestore.deleteDocument,
            `users/${user.uid}/dashboards/${dashboard.id}`
        );

        // delete redux dashboard
        for (ind = 0; ind < dashboards.length; ind++) {
            if (dashboards[ind].id === dashboard.id) {
                break;
            }
        }

        if (ind === dashboards.length - 1) {
            selectedDashboardInd = ind - 1;
        } else {
            selectedDashboardInd = ind;
        }

        dashboards.splice(ind, 1);

        yield put(deleteDashboardSuccess(dashboards, selectedDashboardInd));

    } catch (err) {
        console.log(err);
        yield put(deleteDashboardFailure(err));
    }
}

function* modifyDashboardLayoutSaga({ layout }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // not use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // not use
        const dashboard = _dashboards[_selectedDashboardInd];
        const useWidgets = yield select(getUseWidgets);

        let modifiedLayout = [];
        let ind;
        let height = 0;

        for (ind = 0; ind < layout.length; ind++) {
            modifiedLayout.push({
                i: layout[ind].i,
                x: layout[ind].x,
                y: layout[ind].y,
                w: layout[ind].w,
                h: layout[ind].h,
                maxH: layout[ind].maxH,
                minH: layout[ind].minH
            });
            height += layout[ind].h;
        }

        useWidgets.forEach((useWidget) => {
            for (ind = 0; ind < modifiedLayout.length; ind++) {
                if (useWidget.id === modifiedLayout[ind].i) {
                    useWidget.layout = { ...modifiedLayout[ind] };
                }
            }
        });

        dashboard.layout = modifiedLayout;
        dashboard.height = height;

        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}/dashboards/${dashboard.id}`,
            {
                height: height,
                layout: modifiedLayout
            },
            { merge: true }
        );

        yield put(modifyDashboardLayoutSuccess());
    } catch (err) {
        console.log(err);
        yield put(modifyDashboardLayoutFailure());
    }
}

export default function* dashboardRootSaga() {
    yield all([
        takeEvery(types.GET_DASHBOARDS.REQUEST, getDashboardsSaga),
        takeEvery(types.CREATE_DASHBOARD.REQUEST, createDashboardSaga),
        takeEvery(types.DELETE_DASHBOARD.REQUEST, deleteDashboardSaga),
        takeEvery(types.MODIFY_DASHBOARD_LAYOUT.REQUEST, modifyDashboardLayoutSaga)
    ]);
}
