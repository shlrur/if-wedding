import { combineReducers } from 'redux';

import login from './authentication';
import dashboard from './dashboard';
import widget from './widgets';

export default combineReducers({
    login,
    dashboard,
    widget
})
