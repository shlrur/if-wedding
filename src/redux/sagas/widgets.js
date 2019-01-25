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
import { getUser, getDashboards, getSelectedDashboardInd } from './selector';


function* getWidgetTypesSaga({ theme }) {
	try {
		const snapshot = yield call(
			rsf.firestore.getCollection,
			firebase.firestore().collection('widget_types').where('theme', '==', theme)
		);

		let widgetTypes = [];

		snapshot.forEach((widgetType) => {
			widgetTypes.push({
				id: widgetType.id,
				...widgetType.data()
			});
		});

		yield put(getWidgetTypesSuccess(widgetTypes));
	} catch (err) {
		yield put(getWidgetTypesFailure(err));
	}
}

function* getUseWidgetsSaga() {
	try {
		let useWidgets = [];
		const user = yield select(getUser);
		const dashboards = yield select(getDashboards);
		const selectedDashboardInd = yield select(getSelectedDashboardInd);
		const dashboard = dashboards[selectedDashboardInd];

		// const snapshot = yield call(
		// 	rsf.firestore.getCollection,
		// 	firebase.firestore().collection(`use_widgets`).where('owner', '==', user.uid)
		// );

		const widgetSnapshot = yield call(
			rsf.firestore.getCollection,
			`users/${user.uid}/dashboards/${dashboard.id}/use_widgets`
		);

		widgetSnapshot.forEach((useWidget) => {
			useWidgets.push({
				id: useWidget.id,
				...useWidget.data()
			});
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
			`users/${user.uid}/use_widgets`,
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
