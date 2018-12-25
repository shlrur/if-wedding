import { all, call, fork, put, take, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

import rsf from '../rsf';
import {
	types,
	getDashboardSuccess,
	getDashboardFailure
} from '../actions/dashboard';
import { getUser } from './selector';

function* getDashboardSaga() {
    try{
        let dashboard;
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
            dashboard = {
                id: d.id,
                ...d.data()
            }
        });

        yield put(getDashboardSuccess(dashboard));
    } catch(err) {
        console.log(err);
    }
}

export default function* dashboardRootSaga() {
	yield all([
		takeEvery(types.GET_DASHBOARD.REQUEST, getDashboardSaga)
	]);
}
