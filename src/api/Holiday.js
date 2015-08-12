import Joi from 'joi';
import Boom from 'boom';
import {merge as _merge} from 'lodash';
import {cloneDeep as _cloneDeep} from 'lodash';
import {isFunction as _isFunction} from 'lodash';
import {each as _each} from 'lodash';

let schemes = {};
let config = {};
const identifiers = [
  'index',
  'show',
  'save',
  'update',
  'destroy',
];

class Holiday {
  constructor(routeScheme, name, Model) {
    if (!routeScheme) {
      throw new Error('must specify a routeScheme');
    }
    if (!this.schemes[routeScheme]) {
      throw new Error(`routeScheme: ${routeScheme} does not exist`);
    }
    if (!name) {
      throw new Error('must specify a name');
    }
    if (!Model) {
      throw new Error('must give a valid model');
    }

    this.name = name;
    this.model = Model;
    this.modelSchema = {};
    this.handlers = {};
    this.currentScheme = {
      name: routeScheme,
      routeScheme: this.schemes[routeScheme],
    };

    this.config = _merge({
      auth: false,
      description: `REST API for ${this.name}`,
      notes: `REST API for ${this.name}`,
      tags: ['api'],
      validate: {
        // query: {},
        // params: {},
        // payload: {},
      },
      plugins: {
        'hapi-swagger': {
          responseMessages: [],
        },
      },
    }, this.config || {});

    this._setupHandlers();
  }

  get identifiers() {
    return identifiers;
  }

  get schemes() {
    return schemes;
  }

  set schemes(_schemes) {
    schemes = _schemes;
  }

  get config() {
    return config;
  }

  set config(_config) {
    config = _config;
  }

  static routeScheme(schemeName, routeScheme) {
    Holiday.define(schemeName, routeScheme);
  }

  static define(schemeName, routeScheme) {
    _each(identifiers, (identifier) => {
      if (!routeScheme[identifier]) {
        throw new Error(`must specify routeScheme.${identifier}`);
      }
      if (!_isFunction(routeScheme[identifier])) {
        throw new Error(`routeScheme.${identifier} must be a function`);
      }
    });

    schemes[schemeName] = routeScheme;
  }

  static configure(_config) {
    config = _config;
  }

  _setupHandlers() {
    _each(this.identifiers, (identifier) => {
      const schemeFn = this.currentScheme.routeScheme[identifier];
      // const injectFn = this.injects[identifier];
      this.handlers[identifier] = this._wrapHandler(schemeFn);
    });
  }

  _wrapHandler(schemeFn) {
    return (injectFn) => {
      return (request, reply) => {
        schemeFn(this.model, request, (err, result) => {
          if (injectFn && _isFunction(injectFn)) {
            return injectFn(err, result, reply);
          }
          return reply(err, result);
        });
      };
    };
  }

  // set specific validation
  validate() {
    return {
      save: (modelSchema) => {
        this.modelSchema.save = modelSchema;
      },
      update: (modelSchema) => {
        this.modelSchema.update = modelSchema;
      },
    };
  }

  // get all routes
  all() {
    const routes = [];
    _each(this.identifiers, (identifier) => {
      routes.push(this[identifier]());
    });
    return routes;
  }

  // GET all records
  index(merge = {}, injectFn = null) {
    let _injectFn = injectFn;
    if (!_injectFn) {
      _injectFn = (err, result, reply) => {
        if (err) {
          return reply(
            Boom.badRequest(err.message || err.msg || 'Bad Request')
          );
        }
        reply(result || Boom.notFound(`${this.name} not found`));
      };
    }
    const cfg = _cloneDeep(this.config);
    return _merge({
      method: ['GET'],
      path: `/${this.name}`,
      config: _merge(cfg, {
        description: `Get all records for ${this.name}`,
        notes: `Parameters limit and offset should be implemented`,
        validate: {
          query: {
            limit: Joi.number()
            .description('limit of records to fetch'),
            offset: Joi.number()
            .description('offset of records to fetch'),
          },
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              {code: 200, message: ''},
              {code: 400, message: 'Bad Request'},
              {code: 404, message: `${this.name} not found`},
            ],
          },
        },
      }),
      handler: this.handlers.index(_injectFn),
    }, merge);
  }

  // GET one
  show(merge = {}, injectFn = null) {
    let _injectFn = injectFn;
    if (!_injectFn) {
      _injectFn = (err, result, reply) => {
        if (err) {
          return reply(
            Boom.badRequest(err.message || err.msg || 'Bad Request')
          );
        }
        reply(result || Boom.notFound(`${this.name} not found`));
      };
    }
    const cfg = _cloneDeep(this.config);
    return _merge({
      method: ['GET'],
      path: `/${this.name}/{id}`,
      config: _merge(cfg, {
        description: `Get one record from ${this.name}`,
        notes: `Get one record from ${this.name}`,
        validate: {
          params: {
            id: Joi.number().description(`an id of ${this.name}`),
          },
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              {code: 200, message: ''},
              {code: 400, message: 'Bad Request'},
              {code: 404, message: `${this.name} not found`},
            ],
          },
        },
      }),
      handler: this.handlers.show(_injectFn),
    }, merge);
  }

  // POST one
  save(merge = {}, injectFn = null) {
    let _injectFn = injectFn;
    if (!_injectFn) {
      _injectFn = (err, result, reply) => {
        if (err) {
          return reply(
            Boom.badRequest(err.message || err.msg || 'Bad Request')
          );
        }
        if (!result) {
          reply(Boom.badRequest(`Unable to save data in ${this.name}`));
        }
        reply(result).code(201);
      };
    }
    const cfg = _cloneDeep(this.config);
    return _merge({
      method: ['POST'],
      path: `/${this.name}`,
      config: _merge(cfg, {
        description: `Create a new record into ${this.name}`,
        notes: `Validations for ${this.name} should be implemented`,
        validate: {
          payload: this.modelSchema.save || {},
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              {code: 201, message: ''},
              {code: 400, message: 'Bad Request'},
              {code: 400, message: `Unable to save data in ${this.name}`},
            ],
          },
        },
      }),
      handler: this.handlers.save(_injectFn),
    }, merge);
  }

  // PUT one
  update(merge = {}, injectFn = null) {
    let _injectFn = injectFn;
    if (!_injectFn) {
      _injectFn = (err, result, reply) => {
        if (err) {
          return reply(
            Boom.badRequest(err.message || err.msg || 'Bad Request')
          );
        }
        reply(result || Boom.notFound(`${this.name} not found`));
      };
    }
    const cfg = _cloneDeep(this.config);
    return _merge({
      method: ['PUT'],
      path: `/${this.name}/{id}`,
      config: _merge(cfg, {
        description: `Update one record from ${this.name}`,
        notes: `Validations for ${this.name} should be implemented`,
        validate: {
          params: {
            id: Joi.number().required()
            .description(`an id of ${this.name}`),
          },
          payload: this.modelSchema.update || {},
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              {code: 200, message: ''},
              {code: 400, message: 'Bad Request'},
              {code: 404, message: `${this.name} not found`},
            ],
          },
        },
      }),
      handler: this.handlers.update(_injectFn),
    }, merge);
  }

  // DELETE one
  destroy(merge = {}, injectFn = null) {
    let _injectFn = injectFn;
    if (!_injectFn) {
      _injectFn = (err, result, reply) => {
        if (err) {
          return reply(
            Boom.notFound(err.message || err.msg || 'Not found')
          );
        }
        reply().code(204);
      };
    }
    const cfg = _cloneDeep(this.config);
    return _merge({
      method: ['DELETE'],
      path: `/${this.name}/{id}`,
      config: _merge(cfg, {
        description: `Update one record from ${this.name}`,
        notes: `Update one record from ${this.name}`,
        validate: {
          params: {
            id: Joi.number()
            .description(`an id of ${this.name}`),
          },
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              {code: 204, message: ''},
              {code: 404, message: `${this.name} not found`},
            ],
          },
        },
      }),
      handler: this.handlers.destroy(_injectFn),
    }, merge);
  }
}

export default Holiday;
