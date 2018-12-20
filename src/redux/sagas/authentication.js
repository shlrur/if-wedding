import firebase from 'firebase';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import {
	types,
	loginSuccess,
	loginFailure,
	logoutSuccess,
	logoutFailure
} from '../actions/authentication'

import rsf from '../rsf'

const authProvider = new firebase.auth.GoogleAuthProvider();

function* loginSaga() {
	try {
		yield call(rsf.auth.signInWithPopup, authProvider);
		// successful login will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		console.error(error);
		yield put(loginFailure(error));
	}
}

function* logoutSaga() {
	try {
		yield call(rsf.auth.signOut);
		// successful logout will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		yield put(logoutFailure(error));
	}
}

function* registUser(user) {
	try {
		console.log(user.uid);
		const snapshot = yield call(rsf.firestore.getDocument, `users/${user.uid}`);

		if(!snapshot.exists) {
			yield call(
				rsf.firestore.setDocument,
				`users/${user.uid}/using_widgets/testDoc`,
				{
					name: 'test'
				}
			)
		}
		// yield call(
		// 	rsf.firestore.setDocument,
		// 	`users/${uid}test`
		// );
	} catch (err) {
		console.log(err);
	}
}

function* loginStatusWatcher() {
	// events on this channel fire when the user logs in or logs out
	const channel = yield call(rsf.auth.channel);

	while (true) {
		const { user } = yield take(channel);

		yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

		if (user) {
			yield registUser(user);

			yield put(loginSuccess(user));
		}
		else {
			yield put(logoutSuccess());
		}
	}
}

export default function* loginRootSaga() {
	yield fork(loginStatusWatcher);
	yield all([
		takeEvery(types.LOGIN.REQUEST, loginSaga),
		takeEvery(types.LOGOUT.REQUEST, logoutSaga)
	]);
}
