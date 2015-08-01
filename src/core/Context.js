import _each from 'lodash/collection/each';
import _extend from 'lodash/object/extend';
import EventEmitter from 'eventemitter3';
import Dispatcher from './Dispatcher';

/**
 * Creates a context with a group of actions and stores.
 * @extends {EventEmitter}
 * @access public
 * @example
 * let Context = new Context();
 */
class Context extends EventEmitter {

  constructor(stores, actions) {

    super();

    this.stores = {};
    this.actions = {};
    this.dispatcher = new Dispatcher();

    // object to bind with actions
    this.actionDispatchBinder = {
      frill: this,
      dispatch: (actionType, payload) => {
        try {
          this.emit('dispatch', actionType, payload);
        } finally {
          this.dispatcher.dispatch({type: actionType, payload: payload});
        }
      }
    };

    // register stores and actions to context
    this.registerStores(stores);
    this.registerActions(actions);

    // give access to store from components
    this.store = (storeName) => this.stores[storeName];

    // give access to actions from components
    this.action = (actionName) => this.actions[actionName];

    return this;
  }

  // register multiple stores
  registerStores(stores) {
    _each(stores, (store, name) => {
      this.registerStore(name, store);
    });
  }

  // register a single store
  registerStore(name, store) {
    if (this.stores[name]) {
      throw new Error(`Store: '${name}' already exists`);
    }

    store.frill = this;

    this.stores[name] = store;
    this.dispatcher.addStore(name, store);
  }


  // register multiple actions
  registerActions(actions) {
    _each(actions, (action, name) => this.registerAction(name, action));
  }

  // register an action object
  registerAction(name, action) {
    if (this.actions[name]) {
      throw new Error(`Action: '${name}' already exists`);
    }

    this.actions[name] = _extend(action, this.actionDispatchBinder);
  }

  setDispatchInterceptor(fn) {
    this.dispatcher.setDispatchInterceptor(fn);
  }
}

export default Context;
