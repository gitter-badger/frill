import React from 'react';
import {RouteHandler} from 'react-router';

export default class Page extends React.Component {

  constructor() {
    super();
    this.name = 'App';
  }

  render() {
    return (
      <RouteHandler {...this.props}/>
    );
  }
}
