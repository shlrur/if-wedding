import { all, call, fork, put, take, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

import rsf from '../rsf';
import {
	types,
	getWidgetTypesSuccess,
	getWidgetTypesFailure,
	getUseWidgetsSuccess,
	getUseWidgetsFailure
} from '../actions/widgets';
import { getUser } from './selector';


function* getWidgetTypesSaga() {
	try {
		const snapshot = yield call(rsf.firestore.getCollection, 'widget_types');

		let widgetTypes;

		snapshot.forEach((widgetType) => {
			widgetTypes = {
				...widgetTypes,
				[widgetType.id]: widgetType.data()
			};
		});

		yield put(getWidgetTypesSuccess(widgetTypes));
	} catch (err) {
		yield put(getWidgetTypesFailure(err));
	}
}

function* getUseWidgetsSaga() {
	try {
		const user = yield select(getUser);
		console.log(firebase);
		console.log(rsf);
		const snapshot = yield call(
			rsf.firestore.getCollection,
			firebase.firestore().collection(`using_widgets`).where('owner', '==', user.uid)
		);

		let useWidgets;

		snapshot.forEach((useWidget) => {
			useWidgets = {
				...useWidgets,
				[useWidget.id]: useWidget.data()
			};
		});

		yield put(getUseWidgetsSuccess(useWidgets));
	} catch (err) {
		console.log(err);
		yield put(getUseWidgetsFailure(err));
	}
}

function* addUseWidgetsSaga({ addedWidget }) {
	try {
		const user = yield select(getUser);

		console.log(user.uid);
		const doc = yield call(
			rsf.firestore.addDocument,
			`users/${user.uid}/using_widgets`,
			addedWidget
		);

		console.log(doc);
	} catch (err) {

	}
}

export default function* widgetsRootSaga() {
	yield all([
		takeEvery(types.GET_WIDGET_TYPES.REQUEST, getWidgetTypesSaga),
		takeEvery(types.GET_USE_WIDGETS.REQUEST, getUseWidgetsSaga),
		takeEvery(types.ADD_USE_WIDGET.REQUEST, addUseWidgetsSaga)
	]);
}
