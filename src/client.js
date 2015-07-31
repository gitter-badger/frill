import './bootstrap';
import _extend from 'lodash/object/extend';
import React from 'react';
import ReactRouter from 'react-router';
import _routes from './routes';
// import Logger from './core/Logger';
// import Configs from './../config/';

// Config = Configs[process.env.NODE_ENV]
// defaultConfig = Configs['default']
// Config = _extend defaultConfig, Config

// Frill.Log = new Logger(Config, false)

// TODO: make a new method for this inside Frill.
Frill.isClient = true;
Frill.isServer = false;

// use socket service
// Frill.Action.use('socket', {url: 'http://localhost:3000'});

// create a frill context
const frillContext = Frill.attach(Frill._Stores, Frill._Actions);

const data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(React.createElement(Handler, _extend({frill: frillContext}, data)), document.getElementById('app'));
});
