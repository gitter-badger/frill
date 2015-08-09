import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import C from './components';

/**
 * Routes for components
 * @returns {React DOM}
 */
const componentRoutes = () => {
  return (
    <Route handler={C.Page}>
      <Route name="app" path="/" handler={C.App}>
        <DefaultRoute name="top" handler={C.Top} />
        <Route name="login" handler={C.Login} />
      </Route>
      <NotFoundRoute name="Error" handler={C.Error}/>
    </Route>
  );
};

export default componentRoutes;
