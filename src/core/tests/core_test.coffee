require("./spec_helper.coffee")
Core = require("../src/Core.coffee")
Context = require("../src/Context.coffee")

testReturn = "return test"

testStores =
  storeA:
    testMethod: ->
      return testReturn
  storeB: {}
  storeC: {}

testActions =
  actionA:
    testMethod: ->
      return testReturn
  actionB: {}
  actionC: {}

attachCtx = Core.attach(testStores, testActions)

describe 'src/Core.coffee', ->

  it "should return a valid context on attach", ->
    expect(attachCtx).to.be.an.instanceof(Context)

  it "should provide access to stores", ->
    expect(attachCtx.store("storeA")).to.exist
    expect(attachCtx.store("storeA").testMethod).to.be.a("function")
    expect(attachCtx.store("storeA").testMethod()).to.equal(testReturn)

  it "should provide access to actions", ->
    expect(attachCtx.action("actionA")).to.exist
    expect(attachCtx.action("actionA").testMethod).to.be.a("function")
    expect(attachCtx.action("actionA").testMethod()).to.equal(testReturn)

  it "should not have access to actions from store()", ->
    expect(attachCtx.store("actionA")).to.not.exist

  it "should not have access to stores from action()", ->
    expect(attachCtx.action("storeA")).to.not.exist
