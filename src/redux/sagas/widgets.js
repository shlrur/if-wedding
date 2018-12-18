import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import {
	types
} from '../actions/widgets';

import rsf from '../rsf';


function* getWidgetTypesSaga() {
	try {
		yield call(rsf.auth.signInWithPopup, authProvider);
		// successful login will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		console.error(error);
		yield put(loginFailure(error));
	}
}

export default function* widgetsRootSaga() {
	yield all([
		takeEvery(types.WIDGET_TYPES.GET, getWidgetTypesSaga)
	]);
}
