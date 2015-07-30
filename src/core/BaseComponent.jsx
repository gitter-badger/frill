import {Component as ReactComponent} from 'react';

export default (React) => {
  return class BaseComponent extends ReactComponent {

    constructor(props) {
      super(props);

      this.contextTypes = {
        frill: React.PropTypes.object,
      };

      this.childContextTypes = {
        frill: React.PropTypes.object,
      };

    }

    componentWillMount() {
      // if component doesn't have frill
      if (!this.props.frill && (!this.context || !this.context.frill)) {
        throw new Error("Could not find frill on this.props or this.context");
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

  };
}
