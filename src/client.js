import Frill from './bootstrap';
import _extend from 'lodash/object/extend';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

// create a frill context
const frillContext = Frill.attach(Frill._Stores, Frill._Actions);

const data = JSON.parse(
  document.getElementById('initial-data').getAttribute('data-json')
);

Router.run(routes(), Router.HistoryLocation, (Handler) => {
  React.render(
    React.createElement(
      Handler, _extend({frill: frillContext}, data)
    ), document.getElementById('app')
  );
});
