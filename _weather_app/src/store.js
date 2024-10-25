// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import authReducer from './state/authSlice';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with the middleware and reducers
const store = configureStore({
  reducer: {
    auth: authReducer, // Add your authSlice reducer to the store
  },
  middleware: [sagaMiddleware],
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;