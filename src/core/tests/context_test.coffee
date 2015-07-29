require("./spec_helper.coffee")
Context = require("../src/Context.coffee")
Dispatcher = require("../src/Dispatcher.coffee")
EventEmitter = require("eventemitter3")

testReturn = "return test"

testStores =
  storeA:
    testMethod: ->
      return testReturn
  storeB:
    testMethod: ->
      return testReturn
  storeC: {}

testActions =
  actionA:
    testMethod: ->
      return testReturn
  actionB:
    testMethod: ->
      return testReturn
  actionC: {}


Ctx = {}
describe 'src/Context.coffee', ->

  it 'should be able to create an instance with test stores/actions', ->
    expect ->
      Ctx = new Context(testStores, testActions)
    .to.not.throw()

  it 'should be a instance of EventEmitter', ->
    expect(Ctx).to.be.an.instanceof(EventEmitter);

  it 'should have an instance of a Dispatcher in Context.dispatcher', ->
    expect(Ctx.dispatcher).to.be.an.instanceof(Dispatcher);

  describe 'Stores', ->

    it 'should have test stores registered when created', ->
      expect(Ctx.stores).to.not.be.empty
      expect(Ctx.stores.storeA).to.not.be.empty
      expect(Ctx.stores.storeB).to.not.be.empty
      expect(Ctx.stores.storeC).to.not.be.empty

    it 'should be able to register a store after creation of Context', ->
      Ctx.registerStore("storeD", {});

      Ctx.registerStores({
        "storeE": {},
        "storeF": {}
        "storeG": {}
      });

      expect(Ctx.stores.storeD).to.not.be.empty
      expect(Ctx.stores.storeE).to.not.be.empty
      expect(Ctx.stores.storeF).to.not.be.empty
      expect(Ctx.stores.storeG).to.not.be.empty

    it 'should not be able to register a store with a same name', ->
      expect ->
        Ctx.registerStore("storeA", {});
      .to.throw("Store: 'storeA' already exists")

      expect ->
        Ctx.registerStores({
          storeA: {}
          storeB: {}
        });
      .to.throw()

    it 'should have access to stores', ->
      expect(Ctx.store("storeA")).to.not.be.empty
      expect(Ctx.store("storeA").testMethod).to.be.a('function')
      expect(Ctx.store("storeA").testMethod()).to.equal(testReturn)

      expect(Ctx.store("storeB")).to.not.be.empty
      expect(Ctx.store("storeB").testMethod).to.be.a('function')
      expect(Ctx.store("storeB").testMethod()).to.equal(testReturn)

    it 'should bind self to stores with a key named frill', ->
      expect(Ctx.store("storeA").frill).to.equal(Ctx)
      expect(Ctx.store("storeB").frill).to.equal(Ctx)
      expect(Ctx.store("storeC").frill).to.equal(Ctx)

  describe 'Actions', ->

    it 'should have test actions registered when created', ->
      expect(Ctx.actions).to.not.be.empty
      expect(Ctx.actions.actionA).to.not.be.empty
      expect(Ctx.actions.actionB).to.not.be.empty
      expect(Ctx.actions.actionC).to.not.be.empty

    it 'should be able to register an action after creation of Context', ->
      Ctx.registerAction("actionD", {});

      Ctx.registerActions({
        "actionE": {},
        "actionF": {}
        "actionG": {}
      });

      expect(Ctx.actions.actionD).to.not.be.empty
      expect(Ctx.actions.actionE).to.not.be.empty
      expect(Ctx.actions.actionF).to.not.be.empty
      expect(Ctx.actions.actionG).to.not.be.empty

    it 'should not be able to register an action with a same name', ->
      expect ->
        Ctx.registerAction("actionA", {});
      .to.throw("Action: 'actionA' already exists")

      expect ->
        Ctx.registerActions({
          actionA: {}
          actionB: {}
        });
      .to.throw()

    it 'should have access to actions', ->
      expect(Ctx.action("actionA")).to.not.be.empty
      expect(Ctx.action("actionA").testMethod).to.be.a('function')
      expect(Ctx.action("actionA").testMethod()).to.equal(testReturn)
      expect(Ctx.action("actionB")).to.not.be.empty
      expect(Ctx.action("actionB").testMethod).to.be.a('function')
      expect(Ctx.action("actionB").testMethod()).to.equal(testReturn)

    it 'should bind self to actions with a key named frill', ->
      expect(Ctx.action("actionA").frill).to.equal(Ctx)
      expect(Ctx.action("actionB").frill).to.equal(Ctx)
      expect(Ctx.action("actionC").frill).to.equal(Ctx)

    it 'should bind a dispatch method to actions', ->
      expect(Ctx.action("actionA").dispatch).to.exist
      expect(Ctx.action("actionA").dispatch).to.be.a('function')
      expect(Ctx.action("actionB").dispatch).to.exist
      expect(Ctx.action("actionB").dispatch).to.be.a('function')
      expect(Ctx.action("actionC").dispatch).to.exist
      expect(Ctx.action("actionC").dispatch).to.be.a('function')
