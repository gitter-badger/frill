import BaseComponent from './BaseComponent';
import _each from 'lodash/collection/each';

export default class {
  constructor(storeNames) {
    return class StoreWatchMixin extends BaseComponent {

      constructor(props) {
        super(props);

        this.state = this._getInitialState();
      }

      componentDidMount() {
        const frill = this.props.frill || this.context.frill;

        // listen to stores and set state on change
        _each(storeNames, (store) => frill.store(store).on("change", this._setStateFromFrill.bind(this)));
      }

      componentWillUnmount() {
        const frill = this.props.frill || this.context.frill;
        // unlisten to stores and set state on change
        _each(storeNames, (store) => frill.store(store).removeListener("change", this._setStateFromFrill.bind(this)));
      }

      _setStateFromFrill() {
        // if getStateFromFrill is set
        if (this.getStateFromFrill) {
          this.setState(this.getStateFromFrill());
        }
      }

      _getInitialState() {
        if (this.getStateFromFrill) {
          return this.getStateFromFrill();
        }
        return {};
      }

    };
  }
};
