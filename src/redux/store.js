import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'; // Import redux persist

import rootReducer from './root-reducer';

const middlewares = [];

//Allow logger only in development
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger);
}

//Store
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//Convert store into a persisting version of itself using persistStore
export const persistor = persistStore(store);