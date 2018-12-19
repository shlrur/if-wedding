import { all, call, fork, put, take, takeEvery, select } from 'redux-saga/effects';

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
		const snapshot = yield call(rsf.firestore.getCollection, `users/${user.uid}/using_widgets`);

		let useWidgets;

		snapshot.forEach((useWidget) => {
			useWidgets = {
				...useWidgets,
				[useWidget.id]: useWidget.data()
			};
		});

		yield put(getUseWidgetsSuccess(useWidgets));
	} catch (err) {
		yield put(getUseWidgetsFailure(err));
	}
}

export default function* widgetsRootSaga() {
	yield all([
		takeEvery(types.GET_WIDGET_TYPES.REQUEST, getWidgetTypesSaga),
		takeEvery(types.GET_USE_WIDGETS.REQUEST, getUseWidgetsSaga)
	]);
}
