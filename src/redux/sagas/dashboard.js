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
        const user = yield select(getUser);

        const dashboardSnapshot = yield call(
            rsf.firestore.getDocument,
            firebase.firestore().collection(`dashboards`).where('owner', '==', user.uid)
        );
    } catch(err) {
        console.log(err);
    }
}

export default function* dashboardRootSaga() {
	yield all([
		takeEvery(types.GET_DASHBOARD.REQUEST, getDashboardSaga)
	]);
}
