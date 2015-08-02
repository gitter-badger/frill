import _isFunction from 'lodash/lang/isFunction';
import _contains from 'lodash/collection/contains';
import request from './services/request';
import socket from './services/socket';

// read default services
let services = {
  request: request,
  socket: socket,
};

const reservedNamespaces = [
  "setup"
];

class Action {

  constructor() {
    // this._services = services;
    if (this.setup && _isFunction(this.setup)) {
      // this.setup = this.setup.bind(this);
      this.setup();
    }
    return this;
  }

  get services() {
    return services
  }

  set services(_service) {
    const {namespace, serviceFunction} = _service;
    services[namespace] = serviceFunction;
  }

  initializeService({namespace, service}) {
    // TODO check arguments
    this[namespace] = service;
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
  use(serviceName, opts) {
    const _services = this.services;
    if (!_services[serviceName]) {
      throw new Error('The specified service doesn\'t exist');
    }

    if (this[serviceName]) {
      throw new Error('The specified service name already exists and started, ' +
        'please provide a different namespace');
    }

    this.initializeService({
      namespace: serviceName,
      service: _services[serviceName](opts || {})
    });
  }
}

export default Action;
