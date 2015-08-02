import {jsdom} from 'jsdom';
import Promise from 'bluebird';
import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import cheerio from 'cheerio';

global.document = jsdom('<html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.Promise = Promise;
global.React = React;
global.chai = chai;
global.expect = chai.expect;
chai.should();
global.sinon = sinon;
global.$$ = (html) => cheerio.load(html);

console.log(beforeEach);

beforeEach(() => {
  global.sandbox = sinon.sandbox.create();
});

afterEach(() => {
  global.sandbox.restore();
  document.body.innerHTML = '';
});
