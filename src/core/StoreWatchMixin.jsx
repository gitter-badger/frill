import _each from 'lodash/collection/each';

export default () => {
  const storeNames = Array.prototype.slice.call(arguments);

  return {
    componentDidMount: () => {
      const frill = this.props.frill || this.context.frill;
      // listen to stores and set state on change
      _each(storeNames, (store) => frill.store(store).on("change", this._setStateFromFrill));
    },

    componentWillUnmount: () => {
      const frill = this.props.frill || this.context.frill;
      // unlisten to stores and set state on change
      _each(storeNames, (store) => frill.store(store).removeListener("change", this._setStateFromFrill));
    },

    _setStateFromFrill: () => {
      // set state only when mounted
      if (this.isMounted()) {
        // if getStateFromFrill is set
        if (this.getStateFromFrill) {
          this.setState(this.getStateFromFrill());
        }
      }
    },

    getInitialState: () => {
      if (this.getStateFromFrill) {
        return this.getStateFromFrill();
      }
      return {};
    }
  };
}
