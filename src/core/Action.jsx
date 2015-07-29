import _isFunction from 'lodash/lang/isFunction';
import _contains from 'lodash/collection/contains';
import request from './services/request';
import socketio from './services/socket';

// read default services
const services = {
  request: request,
  socketio: socketio,
};

const reservedNamespaces = [
  "setup"
];

class Action {

  constructor() {
    this._services = services;
    if (this.setup && _isFunction(this.setup)) {
      this.setup();
    }
    return this;
  }

  // static get services() {
  //   console.log('getter!', this._services);
  //   return this._services;
  // }
  //
  // static set services(name, service) {
  //   console.log('setter!', this._services);
  //   return this._services;
  // }

  // Add a custom service
  static addService(namespace, serviceFunction) {
    if (this.services()[namespace]) {
      throw new Error(`Service: ${namespace} already exists`);
    }

    if (_contains(reservedNamespaces, namespace)) {
      throw new Error(`Could not add service, ${namespace} is a reserved namespace`);
    }

    if (!_isFunction(serviceFunction)) {
      throw new TypeError('A service must be a function');
    }

    this._services[namespace] = serviceFunction;

  }

  // Use a service
  static use(serviceName, opts) {
    console.log(this.services);
    if (this.services[serviceName]) {
      throw new Error('The specified service doesn\'t exist');
    }

    if (this[serviceName]) {
      throw new Error('The specified service name already exists and started, ' +
        'please provide a different namespace');
    }

    this[serviceName] = this._services[serviceName](opts || {});
  }
}

export default Action;
