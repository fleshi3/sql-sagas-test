import React from 'react';
import ReactDOM from 'react-dom';
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

// Create a redux store with rootReducer and middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Init the saga
sagaMiddleware.run(watcherSaga);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
