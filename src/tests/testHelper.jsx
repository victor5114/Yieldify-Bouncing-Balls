/* eslint react/no-find-dom-node : "off" */
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai from 'chai';
import chaiJquery from 'chai-jquery';
import dirtyChai from 'dirty-chai';
import Canvas, { Image } from 'canvas';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import startup from '../startup';
import reducers from '../app/reducers';


const expect = chai.expect;
// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.Canvas = Canvas;
global.Image = Image;
global.navigator = 'node.js';

startup(global.window);

const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

// Build helper for simulating events
$.fn.simulate = function fn(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);
// Add dirty chai. Replace expression property by handy functions
chai.use(dirtyChai);

export { renderComponent, expect };
