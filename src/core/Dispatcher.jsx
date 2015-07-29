import _clone from 'lodash/lang/clone';
import _isArray from 'lodash/lang/isArray';
import _mapValues from 'lodash/object/mapValues';
import _forOwn from 'lodash/object/forOwn';
import _intersection from 'lodash/array/intersection';
import _keys from 'lodash/object/keys';
import _map from 'lodash/collection/map';
import _each from 'lodash/collection/forEach';
import _size from 'lodash/collection/size';
import _findKey from 'lodash/object/findKey';
import _uniq from 'lodash/array/uniq';

const defaultDispatchInterceptor = (action, dispatch) => {
  return {dispatch, action};
};

export default class Dispatcher {

  constructor(stores) {
    this.stores = {};
    this.currentDispatch = null;
    this.currentActionType = null;
    this.waitingToDispatch = [];
    this.dispatchInterceptor = defaultDispatchInterceptor;
    this._boundDispatch = this._dispatch.bind(this);
    _each(stores, (key) => {
      if (stores[key]) {
        this.addStore(key, stores[key]);
      }
    });

  }

  addStore(name, store) {
    store.dispatcher = this;
    this.stores[name] = store;
  }

  dispatch(action) {
    this.dispatchInterceptor(action, this._boundDispatch);
  }

  _dispatch(action) {
    if (!action || !action.type) {
      throw new Error('Can only dispatch actions with a \'type\' property');
    }

    if (this.currentDispatch) {
      const complaint = `Cannot dispatch an action ('${action.type}') while` +
        ` another action ('${this.currentActionType}') is being dispatched`;
      throw new Error(complaint);
    }

    this.waitingToDispatch = _clone(this.stores);
    this.currentActionType = action.type;

    this.currentDispatch = _mapValues(this.stores, () => {
      return {
        resolved: false,
        waitingOn: [],
        waitCallback: null,
      };
    });

    try {
      this.doDispatchLoop(action);
    } finally {
      this.currentActionType = null;
      this.currentDispatch = null;
    }
  }

  doDispatchLoop(action) {
    let wasHandled = false;
    let removeFromDispatchQueue = [];
    let dispatchedThisLoop = [];
    let dispatch;
    let canBeDispatchedTo;

    _forOwn(this.waitingToDispatch, (value, key) => {
      dispatch = this.currentDispatch[key];
      canBeDispatchedTo = !dispatch.waitingOn.length ||
        !_intersection(dispatch.waitingOn, _keys(this.waitingToDispatch)).length;

      if (canBeDispatchedTo) {

        if (dispatch.waitCallback) {
          stores = _map(dispatch.waitingOn, (key) => {
            return this.stores[key];
          });

          const fn = dispatch.waitCallback;
          dispatch.waitCallback = null;
          dispatch.waitingOn = [];
          dispatch.resolved = true;
          fn.apply(null, stores);
          wasHandled = true;

        } else {

          dispatch.resolved = true;

          handled = this.stores[key].__handleAction__(action);

          if (handled) {
            wasHandled = true;
          }
        }
        dispatchedThisLoop.push(key);

        if (this.currentDispatch[key].resolved) {
          removeFromDispatchQueue.push(key);
        }

      }


    });

    if (_keys(this.waitingToDispatch).length && !dispatchedThisLoop.length) {
      let storesWithCircularWaits = _keys(this.waitingToDispatch).join(', ');
      throw new Error(`Indirect circular wait detected among: ${storesWithCircularWaits}`);
    }

    _each(removeFromDispatchQueue, (key) => {
      this.waitingToDispatch[key] = null;
    });

    if (_size(this.waitingToDispatch)) {
      this.doDispatchLoop(action);
    }

    if (!wasHandled && console && console.warn) {
      console.warn(`An action of type ${action.type} was dispatched, but no store handled it`);
    }
  }

  waitForStores(store, stores, fn) {

    if (!this.currentDispatch) {
      throw new Error('Cannot wait unless an action is being dispatched');
    }

    const waitingStoreName = _findKey(this.stores, (val) => {
      return val == store;
    });

    if (stores.indexOf(waitingStoreName) > -1) {
      throw new Error('A store cannot wait on itself');
    }

    const dispatch = this.currentDispatch[waitingStoreName];

    if (dispatch.waitingOn.length) {
      throw new Error(`${waitingStoreName} already waiting on stores`);
    }

    if (!_isArray(stores)) {
      stores = [stores];
    }

    _each(stores, (storeName) => {
      const storeDispatch = this.currentDispatch[storeName];

      if (!this.stores[storeName]) {
        throw new Error(`Cannot wait for non-existent store ${storeName}`);
      }

      if (storeDispatch.waitingOn.indexOf(waitingStoreName) > -1) {
        throw new Error(`Circular wait detected between ${waitingStoreName} and ${storeName}`);
      }

    });

    dispatch.resolved = false;
    dispatch.waitingOn = _uniq(dispatch.waitingOn.concat(stores));
    dispatch.waitCallback = fn;
  }

  setDispatchInterceptor(fn) {
    if (fn) {
      this.dispatchInterceptor = fn;
    } else {
      this.dispatchInterceptor = defaultDispatchInterceptor;
    }
  }
}
