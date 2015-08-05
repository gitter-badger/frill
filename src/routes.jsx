import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import C from './components';

export default () => {
  return (
    <Route name="app" path="/" handler={C.App}>
      <DefaultRoute name="top" handler={C.Top} />
      <Route name="toptwo" handler={C.TopTwo} />
      <NotFoundRoute name="NotFound" handler={C.NotFound}/>
    </Route>
  );
};
