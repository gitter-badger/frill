import _isFunction from 'lodash/lang/isFunction';
import _contains from 'lodash/collection/contains';
import request from './services/request';
import socketio from './services/socket';

// read default services
let services = {
  request: request,
  socketio: socketio,
};

const reservedNamespaces = [
  "setup"
];

class Action {

  constructor() {
    // this._services = services;
    if (this.setup && _isFunction(this.setup)) {
      this.setup();
    }
    return this;
  }

  static get services() {
    return services
  }

  static set services(_service) {
    const {namespace, serviceFunction} = _service;
    services[namespace] = serviceFunction;
  }

  static set initializedServices(_service) {
    // TODO check arguments
    const {namespace, serviceInstance} = _service;
    this[namespace] = serviceInstance;
  }


  // Add a custom service
  static addService(namespace, serviceFunction) {
    let _services = this.services;
    if (_services[namespace]) {
      throw new Error(`Service: ${namespace} already exists`);
    }

    if (_contains(reservedNamespaces, namespace)) {
      throw new Error(`Could not add service, ${namespace} is a reserved namespace`);
    }

    if (!_isFunction(serviceFunction)) {
      throw new TypeError('A service must be a function');
    }

    _services = {
      namespace: namespace,
      serviceFunction: serviceFunction,
    }

  }

  // Use a service
  static use(serviceName, opts) {
    const _services = this.services;
    if (!_services[serviceName]) {
      throw new Error('The specified service doesn\'t exist');
    }

    if (this[serviceName]) {
      throw new Error('The specified service name already exists and started, ' +
        'please provide a different namespace');
    }

    this.initializedServices = {
      namespace: serviceName,
      serviceInstance: _services[serviceName](opts || {}),
    }
  }
}

export default Action;
