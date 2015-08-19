import {jsdom} from 'jsdom';
import Promise from 'bluebird';
import React from 'react/addons';
import chai from 'chai';
import sinon from 'sinon';
import cheerio from 'cheerio';
import Hapi from 'hapi';
import {mockSession} from './baseHelper';
import Authentication from 'bell';
import Strategies from '../src/api/auth/strategies';

const TEST_SERVER_PORT = 6000;
const server = new Hapi.Server();

server.connection({port: TEST_SERVER_PORT});

// register session
mockSession(server);

// register Authentication strategies
server.register([
  Authentication,
], () => {
  // use JsonWebTokens (you shouldn't remove this)
  Strategies.jwtStrategy(server);
  // use Local strategy
  Strategies.localStrategy(server);
});

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
global.server = server;

beforeEach(() => {
  global.sandbox = sinon.sandbox.create();
});

afterEach(() => {
  global.sandbox.restore();
  document.body.innerHTML = '';
});
