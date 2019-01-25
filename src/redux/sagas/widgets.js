import { all, call, fork, put, take, takeEvery, select } from 'redux-saga/effects';
import firebase from 'firebase';

import rsf from '../rsf';
import {
	types,
	getWidgetTypesSuccess,
	getWidgetTypesFailure,
	getUseWidgetsSuccess,
	getUseWidgetsFailure,
	addUseWidgetSuccess,
	addUseWidgetFailure
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

function* getUseWidgetsSaga({ dashboardId }) {
	try {
		let useWidgets = [];
		const user = yield select(getUser);

		const useWidgetsSnapshot = yield call(
			rsf.firestore.getCollection,
			`users/${user.uid}/dashboards/${dashboardId}/use_widgets`
		);

		useWidgetsSnapshot.forEach((useWidget) => {
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

function* addUseWidgetSaga({ addedWidgetType, dashboardId }) {
	try {
		const user = yield select(getUser);

		// add widget
		const doc = yield call(
			rsf.firestore.addDocument,
			`users/${user.uid}/dashboards/${dashboardId}/use_widgets`,
			{
				alias: addedWidgetType.alias,
				name: addedWidgetType.name,
				theme: addedWidgetType.theme
			}
		);
		const addedWidget = yield call(
			rsf.firestore.getDocument,
			doc
		);

		// modify layout
		const dashboardSnapshot = yield call(
			rsf.firestore.getDocument,
			`users/${user.uid}/dashboards/${dashboardId}`
		);
		let dashboard = dashboardSnapshot.data();
		let layout = dashboard.layout;
		
		layout.push({
			i: addedWidget.id,
			x: 0,
			y: dashboard.height,
			...addedWidgetType.defaultLayout
		});
		
		yield call(
			rsf.firestore.setDocument,
			`users/${user.uid}/dashboards/${dashboardId}`,
			{
				layout,
				height: dashboard.height + addedWidgetType.defaultLayout.h
			},
			{ merge: true }
		);

		yield put(addUseWidgetSuccess());
	} catch (err) {
		yield put(addUseWidgetFailure(err));
	}
}

export default function* widgetsRootSaga() {
	yield all([
		takeEvery(types.GET_WIDGET_TYPES.REQUEST, getWidgetTypesSaga),
		takeEvery(types.GET_USE_WIDGETS.REQUEST, getUseWidgetsSaga),
		takeEvery(types.ADD_USE_WIDGET.REQUEST, addUseWidgetSaga)
	]);
}
