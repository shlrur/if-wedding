import { all, call, fork, put, take, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

import rsf from '../rsf';
import {
	types,
	getDashboardsSuccess,
    getDashboardsFailure,
    createDashboardSuccess,
    createDashboardFailure
} from '../actions/dashboards';
import { getUser } from './selector';

function* getDashboardsSaga() {
    try{
        let dashboards = [],
            selectedDashboardInd = -1,
            defaultDashboardId = null;
        const user = yield select(getUser);

        // const dashboardSnapshot = yield call(
        //     rsf.firestore.getDocument,
        //     firebase.firestore().collection(`dashboards`).where('owner', '==', user.uid)
        // );
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

            if(defaultDashboardId && d.id === defaultDashboardId) {
                selectedDashboardInd = ind;
            }
        });

        selectedDashboardInd = selectedDashboardInd === -1 ? dashboards.length-1 : selectedDashboardInd;

        yield put(getDashboardsSuccess(dashboards, selectedDashboardInd, defaultDashboardId));
    } catch(err) {
        console.log(err);
        yield put(getDashboardsFailure(err));
    }
}

function* createDashboardSaga({theme}) {
    try {
        const user = yield select(getUser);

        const dashboardDocRef = yield call(
            rsf.firestore.addDocument,
            `users/${user.uid}/dashboards`,
            {
                theme,
                created_dtts: new Date().getTime(),
                last_contact_dtts: new Date().getTime(),
                height: 0,
                layout: []
            }
        );
        
        const dashboardSnapshot = yield call(rsf.firestore.getDocument, dashboardDocRef);

        yield put(createDashboardSuccess(dashboardSnapshot.data()));
    } catch(err) {
        yield put(createDashboardFailure(err));
    }
}

export default function* dashboardRootSaga() {
	yield all([
        takeEvery(types.GET_DASHBOARDS.REQUEST, getDashboardsSaga),
        takeEvery(types.CREATE_DASHBOARD.REQUEST, createDashboardSaga)
	]);
}
