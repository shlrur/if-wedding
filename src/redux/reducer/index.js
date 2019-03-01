import { combineReducers } from 'redux';

import authentication from './authentication';
import dashboard from './dashboard';
import widget from './widgets';
import widgetConfig from './widgetConfig';

export default combineReducers({
    authentication,
    dashboard,
    widget,
    widgetConfig
});
