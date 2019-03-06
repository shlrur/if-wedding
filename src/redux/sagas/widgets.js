import { all, call, put, takeEvery, select } from 'redux-saga/effects';
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
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];

        const useWidgetsSnapshot = yield call(
            rsf.firestore.getCollection,
            `users/${user.uid}/dashboards/${dashboardId}/use_widgets`
        );

        let ind;
        useWidgetsSnapshot.forEach((useWidget) => {
            // search layout
            for (ind = 0; ind < dashboard.layout.length; ind++) {
                if (dashboard.layout[ind].i === useWidget.id) {
                    break;
                }
            }

            useWidgets.push({
                id: useWidget.id,
                layout: dashboard.layout[ind],
                ...useWidget.data()
            });
        });

        yield put(getUseWidgetsSuccess(useWidgets));
    } catch (err) {
        console.log(err);
        yield put(getUseWidgetsFailure(err));
    }
}

function* addUseWidgetSaga({ addedWidgetType }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];
        const widgetLayout = { ...addedWidgetType.defaultLayout };
        const _useWidgets = yield select(getUseWidgets); // no use
        const useWidgets = [..._useWidgets];

        // add widget
        const preAddedWidget = yield call(
            rsf.firestore.addDocument,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets`,
            {
                alias: addedWidgetType.alias,
                name: addedWidgetType.name,
                theme: addedWidgetType.theme,
                configs: addedWidgetType.defaultConfigs
            }
        );
        const addedWidget = yield call(
            rsf.firestore.getDocument,
            preAddedWidget
        );

        widgetLayout.x = 0;
        widgetLayout.y = dashboard.height;
        widgetLayout.i = addedWidget.id;

        // set dashboard
        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}/dashboards/${dashboard.id}`,
            {
                layout: [...dashboard.layout, widgetLayout],
                height: dashboard.height + widgetLayout.h
            },
            { merge: true }
        );
        dashboard.layout = [...dashboard.layout, widgetLayout];
        dashboard.height += widgetLayout.h;

        // add widget into props.useWidgets
        useWidgets.push({
            id: addedWidget.id,
            layout: widgetLayout,
            ...addedWidget.data()
        });

        yield put(addUseWidgetSuccess(useWidgets));
    } catch (err) {
        console.log(err);
        yield put(addUseWidgetFailure(err));
    }
}

function* deleteUseWidgetSaga({ widget }) {
    try {
        const user = yield select(getUser);
        const _dashboards = yield select(getDashboards); // no use
        const _selectedDashboardInd = yield select(getSelectedDashboardInd); // no use
        const dashboard = _dashboards[_selectedDashboardInd];
        const layout = [...dashboard.layout];
        const _useWidgets = yield select(getUseWidgets); // no use
        const useWidgets = [..._useWidgets];

        let ind;

        if (widget.name.indexOf('photoAlbum') !== -1) {
            // delete images if widget is album
            for (ind = 0; ind < widget.configs.showingImageInfos.length; ind++) {
                yield call(rsf.storage.deleteFile, widget.configs.showingImageInfos[ind].origin.filePath);
                yield call(rsf.storage.deleteFile, widget.configs.showingImageInfos[ind].thumbnail.filePath);
            }
        } else if (widget.name.indexOf('guestBook') !== -1) {
            // delete collection of messages
            const messages = yield call(rsf.firestore.getCollection, `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widget.id}/messages`);

            for (ind = 0; ind < messages.size; ind++) {
                yield call(rsf.firestore.deleteDocument, `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widget.id}/messages/${messages.docs[ind].id}`);
            }
        }

        // delete widget in use_widgets
        yield call(
            rsf.firestore.deleteDocument,
            `users/${user.uid}/dashboards/${dashboard.id}/use_widgets/${widget.id}`
        );

        // set dashboard height and layout
        useWidgets.sort((a, b) => { return a.layout.y - b.layout.y; });
        layout.sort((a, b) => { return a.y - b.y; });

        let deletedWidgetInd = -1;
        for (ind = 0; ind < useWidgets.length; ind++) {
            if (deletedWidgetInd !== -1) {
                // after found
                layout[ind].y -= widget.layout.h;
            }

            if (useWidgets[ind].id === widget.id) {
                // find
                deletedWidgetInd = ind;
            }
        }

        useWidgets.splice(deletedWidgetInd, 1);
        layout.splice(deletedWidgetInd, 1);

        // set dashboard
        yield call(
            rsf.firestore.setDocument,
            `users/${user.uid}/dashboards/${dashboard.id}`,
            {
                layout,
                height: dashboard.height - widget.layout.h
            },
            { merge: true }
        );
        dashboard.layout = layout;
        dashboard.height -= widget.layout.h;

        yield put(deleteUseWidgetSuccess(useWidgets));
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
