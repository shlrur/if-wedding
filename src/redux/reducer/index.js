import { combineReducers } from 'redux';

import authentication from './authentication';
import dashboard from './dashboard';
import widget from './widgets';

export default combineReducers({
    authentication,
    dashboard,
    widget
})
