import { all, fork } from 'redux-saga/effects';

import authentication from './authentication';
import dashboards from './dashboard';
import widgets from './widgets';
import widgetConfig from './widgetConfig';

export default function* rootSaga() {
    yield all([
        fork(authentication),
        fork(dashboards),
        fork(widgets),
        fork(widgetConfig)
    ]);
}
