import firebase from 'firebase';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import {
	types,
	loginSuccess,
	loginFailure,
	logoutSuccess,
	logoutFailure
} from '../actions/authentication';

import rsf from '../rsf';

function* loginSaga({ providerName }) {
	let authProvider = new firebase.auth.GoogleAuthProvider();

	switch (providerName) {
		case 'google':
			authProvider = new firebase.auth.GoogleAuthProvider();
			break;
		case 'facebook':
			authProvider = new firebase.auth.FacebookAuthProvider();
			break;
		case 'twitter':
			authProvider = new firebase.auth.TwitterAuthProvider();
			break;
		case 'github':
			authProvider = new firebase.auth.GithubAuthProvider();
			break;
	}

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
		// create user document
		yield call(
			rsf.firestore.setDocument,
			`users/${user.uid}`,
			{
				last_login_dtts: new Date().getTime()
			}
		);

		// create dashboard document
		const dashboardRef = yield call(
			rsf.firestore.addDocument,
			`users/${user.uid}/dashboards`,
			{
				last_contact_dtts: new Date().getTime()
			}
		);

		// create dummy widget for saving dashboard
		yield call(
			rsf.firestore.setDocument,
			`users/${user.uid}/dashboards/${dashboardRef.id}/use_widgets/dummy_widget`,
			{
				des: 'fake widget'
			}
		);
	} catch (err) {
		console.log(err);
	}
}

function* updateUser(user) {
	try {
		yield call(
			rsf.firestore.setDocument,
			`users/${user.uid}`,
			{
				last_login_dtts: new Date().getTime()
			},
			{ merge: true });
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
			const snapshot = yield call(rsf.firestore.getDocument, `users/${user.uid}`);

			if (snapshot.exists) {
				yield updateUser(user);
			} else {
				yield registUser(user);
			}

			const userInfoSnapshot = yield call(rsf.firestore.getDocument, `users/${user.uid}`);

			user = { ...user, ...userInfoSnapshot.data() };

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
