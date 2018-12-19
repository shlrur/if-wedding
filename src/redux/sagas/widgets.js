import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import {
	types,
	getWidgetTypesSuccess,
	getWidgetTypesFailure
} from '../actions/widgets';

import rsf from '../rsf';


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
	} catch (error) {
		yield put(getWidgetTypesFailure(error));
	}
}

export default function* widgetsRootSaga() {
	yield all([
		takeEvery(types.GET_WIDGET_TYPES.REQUEST, getWidgetTypesSaga)
	]);
}
