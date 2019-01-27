import { all, call, put, takeEvery, select } from 'redux-saga/effects';
// import firebase from 'firebase';

import rsf from '../rsf';
import {
    types,
    getDashboardsSuccess,
    getDashboardsFailure,
    createDashboardSuccess,
    createDashboardFailure,
    modifyDashboardLayoutSuccess,
    modifyDashboardLayoutFailure
} from '../actions/dashboards';
import { getUser } from './selector';

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
            `users/${user.uid}/dashboards`
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
                alias: `dashboard ${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`,
                theme,
                created_dtts: now.getTime(),
                // last_contact_dtts: new Date().getTime(),
                height: 0
            }
        );

        const dashboardSnapshot = yield call(rsf.firestore.getDocument, dashboardDocRef);

        yield put(createDashboardSuccess(dashboardSnapshot.data()));
    } catch (err) {
        yield put(createDashboardFailure(err));
    }
}

function* modifyDashboardLayoutSaga({ layout }) {
    try {
        const user = yield select(getUser);
        const dashboards = yield select(getDashboards);
        const selectedDashboardInd = yield select(getSelectedDashboardInd);
        const dashboard = dashboards[selectedDashboardInd];

        let modifiedLayout = [];
        let _i;

        for(_i=0 ; _i<layout.length ; _i++) {
            modifiedLayout.push({
                i: layout[_i].i,
                x: layout[_i].x,
                y: layout[_i].y,
                w: layout[_i].w,
                h: layout[_i].h,
                maxH: layout[_i].maxH,
                minH: layout[_i].minH
            });
        }

        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}/dashboards/${dashboard.id}`,
            {
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
        takeEvery(types.MODIFY_DASHBOARD_LAYOUT.REQUEST, modifyDashboardLayoutSaga)
    ]);
}
