import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';

// watcher saga: watches for actions dispatched to store, starts workerSaga
export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

// function that takes api request and returns a promise for response
const fetchDog = () => {
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breeds/image/random',
  });
};

// worker saga: makes the api call when watcher saga sees action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;
    // dispatch a successful action to the store with new dog
    yield put({type: 'API_CALL_SUCCESS', dog});
  } catch (error) {
    // dispatch a failure action to the store with new error
    yield put({type: 'API_CALL_FAILURE', error});
  }
}
