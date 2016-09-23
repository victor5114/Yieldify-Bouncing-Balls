import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import startup from './startup.js';
import reducers from './app/reducers';
import App from './app/components/app.jsx';

/**
* Function startup runs before app.
* Can overload window object
*/
startup(window);

/**
* Load Store middleware
* Useful when we need to add async method to fetch remote information
*/
const createStoreWithMiddleware = applyMiddleware()(createStore);

/**
* Entrypoint application
*/
render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('#content')
);
