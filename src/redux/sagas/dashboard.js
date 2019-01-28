import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

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

function* modifyDashboardLayoutSaga({ layout }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // not use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // not use
        const dashboard = _dashboards[_selectedDashboardInd];
        const useWidgets = yield select(getUseWidgets);

        let modifiedLayout = [];
        let ind;

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
        }

        useWidgets.forEach((useWidget) => {
            for (ind = 0; ind < modifiedLayout.length; ind++) {
                if (useWidget.id === modifiedLayout[ind].i) {
                    useWidget.layout = { ...modifiedLayout[ind] };
                }
            }
        });

        console.log(dashboard);
        console.log(modifiedLayout);

        dashboard.layout = modifiedLayout;

        yield call(
            rsf.firestore.updateDocument,
            `users/${user.uid}/dashboards/${dashboard.id}`,
            'layout',
            modifiedLayout
            // {
            //     layout: modifiedLayout
            // },
            // { merge: true }
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
