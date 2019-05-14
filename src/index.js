import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Redux + React-Redux + Redux-Sagas
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

// Redux + Sagas imports
import {rootReducer} from './redux';
import {watcherSaga} from './sagas';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// DevTools middlware
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Create a redux store with rootReducer and middleware
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    reduxDevTools,
  ),
);

// Init the saga
sagaMiddleware.run(watcherSaga);

// Init React
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
