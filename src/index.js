import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';

import IfApp from './IfApp';
import rootReducer from './redux/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const rootElement = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <IfApp />
    </Provider>,
    rootElement
);

module.hot.accept();