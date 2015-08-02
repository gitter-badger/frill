import '../../../__test__/spec_helper.js';
import Action from '../Action';

const services = [
  'socket',
  'request',
];

const reservedNamespaces = [
  'setup',
];

const testServiceOptions = {
  key: 'value',
};

describe('#src/core/Action', () => {
  describe('class Action', () => {
    it('should execute setup() at construction if exists', () => {
      class testActionClass extends Action {
        constructor() {
          super();
        }
        setup() {
          this.isStartedSetup = true;
        }
      }

      const TestActionClass = new testActionClass();

      expect(TestActionClass.isStartedSetup).to.exist;
      expect(TestActionClass.isStartedSetup).to.equal(true);
    });
  });
  // describe('Action.addService', () => {});

});

//
//     it "should be accecible", ->
//       expect(Action.addService).to.be.a('function')
//
//     it "should be able to add a custom service", ->
//       Action.addService "newService", (opts) ->
//         return opts
//       expect(Action.prototype._services.newService).to.be.a("function")
//
//     it "should be able to access options from service", ->
//
//       expect(Action.prototype._services.newService(testServiceOptions)).to.equal(testServiceOptions)
//
//       # remove the new service (for other tests to work)
//       delete Action.prototype._services.newService
//
//     it "should not be able to add existing namespace", ->
//       services.forEach (service) ->
//         expect ->
//           Action.addService service, ->
//             return
//         .to.throw("Service: #{service} already exists.")
//
//     it "should not be able to add a non-function service", ->
//       expect ->
//         Action.addService "test-service", "aString"
//       .to.throw("A service must be a function.")
//
//     it "should not be able to add a service when the namespace is reserved", ->
//       reservedNamespaces.forEach (reserved) ->
//         expect ->
//           Action.addService reserved, ()->
//             return
//         .to.throw("Could not add service. '#{reserved}' is a reserved namespace.")
//
//   describe 'Action.use', ->
//
//     it "should be accecible", ->
//       expect(Action.use).to.be.a('function')
//
//     it "should contain a list of integrated services", ->
//       expect(Action.prototype._services).to.have.all.keys(services)
//
//     it "should not be able to use a service which does not exist", ->
//       expect ->
//         Action.use("serviceNotExisting")
//       .to.throw("The specified service doesn\'t exist.")
//
//     it "should not be able to use the 'request' service before using the 'use' method", ->
//       expect(Action.prototype.request).to.be.a('undefined')
//
//     it "should not be able to use the 'socket' service before using the 'use' method", ->
//       expect(Action.prototype.socket).to.be.a('undefined')
//
//     it "should be able to use the 'request' service", ->
//       Action.use("request", null)
//       expect(Action.prototype.request).to.be.a('function')
//
//     it "should be able to use the 'socket' service", ->
//       Action.use("socket", {url: "localhost"})
//       expect(Action.prototype.socket).to.be.a('object')
//
//     it "should not be able to start a service twice", ->
//       expect ->
//         Action.use("request", null)
//       .to.throw("The specified service name already exists and started. Please provide a different namespace.")
