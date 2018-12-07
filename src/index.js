import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import IfApp from './components/IfApp';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <IfApp />
    </Provider>,
    document.getElementById('app')
);

module.hot.accept();