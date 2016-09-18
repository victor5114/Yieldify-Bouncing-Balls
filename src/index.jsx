import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import startup from './startup.js';
import reducers from './reducers';
import CanvasBall from './containers/canvasBall.jsx';

startup();

const createStoreWithMiddleware = applyMiddleware()(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <CanvasBall />
  </Provider>
  , document.querySelector('#content')
);
