import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import IfApp from './components/IfApp';
import store from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '../assets/styles/main.css';

ReactDOM.render(
    <Provider store={store}>
        <IfApp />
    </Provider>,
    document.getElementById('app')
);

module.hot.accept();