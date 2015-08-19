import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import Components from './components';

/**
 * Routes for components
 * @returns {React DOM}
 */
const componentRoutes = () => {
  return (
    <Route handler={Components.Page}>
      <Route name="app" path="/" handler={Components.App}>
        <DefaultRoute name="top" handler={Components.Top} />
        <Route name="login" handler={Components.Login} />
      </Route>
      <NotFoundRoute name="Error" handler={Components.Error}/>
    </Route>
  );
};

export default componentRoutes;
