import {PropTypes, Component as ReactComponent} from 'react';
import _isArray from 'lodash/lang/isArray';

class BaseComponent extends ReactComponent {

  constructor(props) {
    super(props);
  }

  _bind(methods, ...rest) {
    let _methods = methods;
    if (!_isArray(_methods)) {
      _methods = [methods].concat(rest);
    }

    _methods.forEach((method) => {
      if (!this[method]) {
        throw new Error(`Method '${method}' not implemented` +
          ` in your component.`);
      }
      this[method] = this[method].bind(this);
    });
  }

  componentWillMount() {
    // if component doesn't have frill
    if (!this.props.frill && (!this.context || !this.context.frill)) {
      throw new Error('Could not find frill on this.props or this.context');
    }
  }

  getChildContext() {
    // flush down to childrens and grandchildrens
    return {
      frill: this.getFrill(),
    };
  }

  getFrill() {
    // get frill context
    return this.props.frill || (this.context && this.context.frill);
  }

}

BaseComponent.contextTypes = {
  frill: PropTypes.object,
};

BaseComponent.childContextTypes = {
  frill: PropTypes.object,
};

export default BaseComponent;
