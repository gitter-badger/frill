import React from 'react';
import {BaseComponent} from 'frill-core';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import {RouteHandler} from 'react-router';
// import jwtDecode from 'jwt-decode';

/**
 * Page component - wraps up all pages
 * @extends {FrillCore.BaseComponent}
 * @example <caption>Usage in React-Router</caption>
 * <Route handler={C.Page}>
 *   ...
 * </Route>
 */
class PageComponent extends BaseComponent {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    /**
     * Name of component
     */
    this.name = 'App';

    if (props.token) {
      this.getFrill().action('Auth').login(props.token);
    }

    if (canUseDOM) {
      // clear up initial-data from dom
      document.getElementById('initial-data').outerHTML = '';
    }
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
