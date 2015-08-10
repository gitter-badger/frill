import React from 'react';
import {StoreWatchComponent} from 'frill-core';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import {RouteHandler} from 'react-router';
// import jwtDecode from 'jwt-decode';

/**
 * Page component - wraps up all pages
 * @extends {FrillCore.StoreWatchComponent}
 * @example <caption>Usage in React-Router</caption>
 * <Route handler={C.Page}>
 *   ...
 * </Route>
 */
class PageComponent extends new StoreWatchComponent(['Auth']) {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    /**
     * Name of component
     */
    this.name = 'App';

    if (this.props && this.props.token) {
      this.getFrill().action('Auth').authenticate(this.props.token);
      this.state = this.getInitialStateFromFrill();
    }

    if (canUseDOM) {
      // clear up initial-data from dom
      document.getElementById('initial-data').outerHTML = '';
    }
  }

  getInitialStateFromFrill() {
    super.getInitialStateFromFrill();
  }

  getStateFromFrill() {
    return {
      isLoggedIn: this.getFrill().store('Auth').isLoggedIn(),
    };
  }

  /**
   * render
   * @return {React DOM}
   * @see https://facebook.github.io/react/docs/component-specs.html#render
   */
  render() {
    return (
      <RouteHandler {...this.props}/>
    );
  }
}

/**
 * Exports PageComponent
 */
export default PageComponent;
