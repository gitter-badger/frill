import React from 'react';
import {BaseComponent} from 'frill-core';

/**
 * Error component - handles error with status code
 * @extends {FrillCore.BaseComponent}
 * @example <caption>Usage in React-Router</caption>
 * <NotFoundRoute name="Error" handler={C.Error}/>
 */
class ErrorComponent extends BaseComponent {
  /**
   * Constructor
   * @param {any} props
   */
  constructor(props) {
    super(props);

    /**
     * Name of component
     */
    this.name = 'Error';
  }

  /**
   * render
   * @return {React DOM}
   * @see https://facebook.github.io/react/docs/component-specs.html#render
   */
  render() {
    const status = this.props.status;
    return (
      <div>
        <a href="/">Back to top</a>
        <div>CODE: {status.statusCode}</div>
        <div>ERROR: {status.error}</div>
        <div>MESSAGE: {status.message}</div>
      </div>
    );
  }
}

/**
 * Exports ErrorComponent
 */
export default ErrorComponent;
