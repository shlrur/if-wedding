import { combineReducers } from 'redux';

import login from './authentication';
import dashboard from './dashboard';
import widgets from './widgets';

export default combineReducers({
  login
})
