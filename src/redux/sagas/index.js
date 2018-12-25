import { all, fork } from 'redux-saga/effects';

import authentication from './authentication';
import dashboards from './dashboard';
import widgets from './widgets';

export default function * rootSaga () {
  yield all([
    fork(authentication),
    fork(dashboards),
    fork(widgets)
  ])
}
