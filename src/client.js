import Frill from './bootstrap';
import _extend from 'lodash/object/extend';
import React from 'react';
import Router from 'react-router';
import routerContainer from './helpers/routerContainer';
import _routes from './routes';
const routes = _routes();

// create a frill context
const frillContext = Frill.attach(Frill._Stores, Frill._Actions);

const data = JSON.parse(
  document.getElementById('initial-data').getAttribute('data-json')
);

const router = Router.create({
  routes: routes,
  location: Router.HistoryLocation,
});

routerContainer.set(router);

router.run((Handler) => {
  React.render(
    React.createElement(
      Handler, _extend({frill: frillContext}, data)
    ), document.getElementById('app')
  );
});
