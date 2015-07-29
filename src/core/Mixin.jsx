export default (React) => {
  return {
    contextTypes: {
      frill: React.PropTypes.object,
    },

    childContextTypes: {
      frill: React.PropTypes.object,
    },

    componentWillMount: () => {
      // if component doesn't have frill
      if (!this.props.frill && (!this.context || !this.context.frill)) {
        throw new Error("Could not find frill on this.props or this.context");
      }
    },

    getChildContext: () => {
      // flush down to childrens and grandchildrens
      return {
        frill: this.getFrill(),
      };
    },

    getFrill: () => {
      // get frill context
      return this.props.frill || (this.context && this.context.frill);
    },

  };
}
