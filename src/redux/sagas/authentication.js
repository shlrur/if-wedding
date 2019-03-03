import firebase from 'firebase';
import { all, call, fork, put, take, takeEvery, select } from 'redux-saga/effects';

import rsf from '../rsf';
import {
    types,
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    setWeddingInformationSuccess,
    setWeddingInformationFailure
} from '../actions/authentication';
import { getUser } from './selector';

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
                created_dtts: new Date().getTime(),
                last_login_dtts: new Date().getTime(),
                default_dashboard_id: null,
                weddingInformation: {
                    groom: {
                        firstName: '',
                        familyName: '',
                        kinshipTerms: '',
                        fatherName: '',
                        motherName: '',
                        phoneNumber: ''
                    },
                    bride: {
                        firstName: '',
                        familyName: '',
                        kinshipTerms: '',
                        fatherName: '',
                        motherName: '',
                        phoneNumber: ''
                    },
                    greetingText: '',
                    weddingPlace: null
                }
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
            { merge: true }
        );

        yield put(setWeddingInformationSuccess());
    } catch (err) {
        console.log(err);
        yield put(setWeddingInformationFailure());
    }
}

function* loginStatusWatcher() {
    // events on this channel fire when the user logs in or logs out
    const channel = yield call(rsf.auth.channel);

    while (true) {
        let { user } = yield take(channel);

        // yield firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

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

function* setWeddingInformationSaga({ information }) {
    try {
        const user = yield select(getUser);

        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}`,
            { weddingInformation: information },
            { merge: true }
        );
    } catch (err) {
        console.log(err);
    }
}

export default function* loginRootSaga() {
    yield fork(loginStatusWatcher);
    yield all([
        takeEvery(types.LOGIN.REQUEST, loginSaga),
        takeEvery(types.LOGOUT.REQUEST, logoutSaga),
        takeEvery(types.SET_WEDDING_INFORMATION.REQUEST, setWeddingInformationSaga)
    ]);
}
