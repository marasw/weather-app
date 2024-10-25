// sagas/authSaga.js
import { takeLatest, put, call } from 'redux-saga/effects';
import { loginUser, loginUserSuccess, loginUserFailure } from '../state/authSlice';
import { authenticateUser } from '../api/auth';

// Saga to handle user login
function* handleLogin(action) {
    try {
        const { username, password } = action.payload;
        // Call the authenticateUser API function with the username and password
        const user = yield call(authenticateUser, username, password);
        // Dispatch the loginUserSuccess action with the user data
        yield put(loginUserSuccess(user));
    } catch (error) {
        // If there is an error, dispatch the loginUserFailure action with the error message
        yield put(loginUserFailure(error.message));
    }
}

// Watcher saga
function* authSaga() {
    // Listen for the loginUser action and call the handleLogin saga when dispatched
    yield takeLatest(loginUser.type, handleLogin);
}

export default authSaga;