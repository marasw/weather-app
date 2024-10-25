// sagas/index.js
import { all } from 'redux-saga/effects';
import authSaga from './authSaga';

// Root saga
function* rootSaga() {
    yield all([
        authSaga(), // Include the authSaga
    ]);
}

export default rootSaga;