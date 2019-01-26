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
	addUseWidgetFailure,
	deleteUseWidgetSuccess,
	deleteUseWidgetFailure
} from '../actions/widgets';
import { getUser, getUseWidgets, getDashboards, getSelectedDashboardInd } from './selector';


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
		const useWidgets = yield select(getUseWidgets);

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

		const dashboards = yield select(getDashboards);
		const selectedDashboardInd = yield select(getSelectedDashboardInd);

		dashboards[selectedDashboardInd].layout = layout;
		dashboards[selectedDashboardInd].height = dashboard.height + addedWidgetType.defaultLayout.h;

		yield put(addUseWidgetSuccess([
			{ id: addedWidget.id, ...addedWidget.data() },
			...useWidgets
		]));
	} catch (err) {
		console.log(err);
		yield put(addUseWidgetFailure(err));
	}
}

function* deleteUseWidgetSaga({ widget }) {
	try {
		const user = yield select(getUser);
		const dashboards = yield select(getDashboards);
		const selectedDashboardInd = yield select(getSelectedDashboardInd);
		const useWidgets = yield select(getUseWidgets);

		const dashboard = dashboards[selectedDashboardInd];

		let layout = dashboard.layout;
		let targetWidgetInd = -1;
		let deletedHeight = 0;
		let i;

		for(i=0 ; i<layout.length ; i++) {
			if(targetWidgetInd !== -1) {
				layout[i].y -= deletedHeight;
			}

			if(layout[i].i === widget.id) {
				targetWidgetInd = i;
				deletedHeight = layout[i].h;
			}
		}

		layout.splice(targetWidgetInd, 1);
		
		dashboard.height -= deletedHeight;

		yield call(
			rsf.firestore.setDocument,
			`users/${user.uid}/dashboards/${dashboard.id}`,
			{
				layout,
				height: dashboard.height
			},
			{ merge: true }
		);

		yield call(
			rsf.firestore.deleteDocument,
			`users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widget.id}`
		)

		for(i=0 ; i<useWidgets.length ; i++) {
			if(useWidgets[i].id === widget.id) {
				break;
			}
		}
		useWidgets.splice(i, 1);

		yield put(deleteUseWidgetSuccess());
	} catch (err) {
		console.log(err);
		yield put(deleteUseWidgetFailure(err));
	}
}

export default function* widgetsRootSaga() {
	yield all([
		takeEvery(types.GET_WIDGET_TYPES.REQUEST, getWidgetTypesSaga),
		takeEvery(types.GET_USE_WIDGETS.REQUEST, getUseWidgetsSaga),
		takeEvery(types.ADD_USE_WIDGET.REQUEST, addUseWidgetSaga),
		takeEvery(types.DELETE_USE_WIDGET.REQUEST, deleteUseWidgetSaga)
	]);
}
