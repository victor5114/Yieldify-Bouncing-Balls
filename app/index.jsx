import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './app.jsx';
import startup from './startup.js';
import reducers from './reducers';

startup();

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container')
);
