import {
    applyMiddleware,
    compose,
    createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancers = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

const store = createStore(
    reducer,
    enhancers
);

sagaMiddleware.run(rootSaga);

export default store;
