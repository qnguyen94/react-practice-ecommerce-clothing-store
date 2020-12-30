import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'; // redux saga, replace thunk

// Import sagas
import rootSaga from './root-saga'

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware(); // Setup saga middleware. Can take in an object of configurations

const middlewares = [sagaMiddleware]; // Include saga into middleware array

//Allow logger only in development
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

//Store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Run sagas after applyMiddleware called
// Run each individual sagas or use root saga
sagaMiddleware.run(rootSaga);

//Convert store into a persisting version of itself using persistStore
export const persistor = persistStore(store);