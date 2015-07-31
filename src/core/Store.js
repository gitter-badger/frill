import _isFunction from 'lodash/lang/isFunction';
import _isString from 'lodash/lang/isString';
import _isObject from 'lodash/lang/isObject';
import _each from 'lodash/collection/each';
import EventEmitter from 'eventemitter3';

class Store extends EventEmitter {
  constructor() {
    super();

    // list of actionTypes and handlers
    this._actions = {};

  }

  set actions(actions) {
    this.bindActions(actions);
  }

  // bind multiple actions
  bindActions(actions) {

    if (!_isObject(actions)) {
      throw new TypeError('actions must be an object');
    }

    // bind each actions
    _each(actions, (handler, actionType) => this.bindAction(actionType, handler));

  }

  // bind one action
  bindAction(actionType, handler) {
    if (!handler) {
      throw new Error(`Action handler for ${actionType} must be properly set. Must specify a method name, or a function.`);
    }

    if (_isString(handler)) {
      if (!this[handler]) {
        throw new Error(`Action handler for ${actionType} must be properly set. Method name '${handler}' doesn't exist.`);
      }
      handler = this[handler];
    }

    if (!_isFunction(handler)) {
      throw new Error('Action handler must be a function.');
    }

    // if action type already exists, push it into an array
    if (this._actions[actionType]) {
      this._actions[actionType].push(handler);
    } else {
      // create a new array with the handler
      this._actions[actionType] = [handler];
    }

  }

  // small helper for notifying changes
  change(props) {
    this.emit('change', props);
  }

  waitFor(stores, fn) {
    if (!this.dispatcher) {
      throw new Error('Dispatcher not set on store. Something went wrong.');
    }
    this.dispatcher.waitForStores(this, stores, fn.bind(this));
  }

  // handle actions by actionType
  __handleAction__(action) {

    if (!action) {
      throw new Error('Must give a valid action.');
    }

    if (!action.type) {
      throw new Error('Must give a valid action.');
    }

    if (!action.payload) {
      action.payload = null;
    }

    // handler to execute. From actions or an empty function
    const handler = this._actions[action.type] || function(){};

    // execute handlers one at a time
    _each(handler, (handlerFn) => handlerFn.call(this, action.payload, action.type));
    return true;
  }

}

export default Store;
