import React from 'react';
import {BaseComponent} from 'frill-core';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import {RouteHandler} from 'react-router';
// import jwtDecode from 'jwt-decode';

export default class Page extends BaseComponent {

  constructor(props) {
    super(props);
    this.name = 'App';
    if (props.token) {
      this.getFrill().action('Auth').login(props.token);
    }

    if (canUseDOM) {
      // clear up initial-data from dom
      document.getElementById('initial-data').outerHTML = '';
    }
  }

  render() {
    return (
      <RouteHandler {...this.props}/>
    );
  }
}
