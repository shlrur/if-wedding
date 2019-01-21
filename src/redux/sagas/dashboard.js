import { all, call, fork, put, take, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

import rsf from '../rsf';
import {
	types,
	getDashboardsSuccess,
	getDashboardsFailure
} from '../actions/dashboards';
import { getUser } from './selector';

function* getDashboardsSaga() {
    try{
        let dashboards = [];
        const user = yield select(getUser);

        // const dashboardSnapshot = yield call(
        //     rsf.firestore.getDocument,
        //     firebase.firestore().collection(`dashboards`).where('owner', '==', user.uid)
        // );
        const dashboardSnapshot = yield call(
            rsf.firestore.getCollection,
            `users/${user.uid}/dashboards`
        );

        // TODO: implement multi dashboard... some day...
        dashboardSnapshot.forEach((d) => {
            dashboards.push({
                id: d.id,
                ...d.data()
            });
        });

        yield put(getDashboardsSuccess(dashboards));
    } catch(err) {
        console.log(err);
        yield put(getDashboardsFailure(err));
    }
}

export default function* dashboardRootSaga() {
	yield all([
		takeEvery(types.GET_DASHBOARDS.REQUEST, getDashboardsSaga)
	]);
}
