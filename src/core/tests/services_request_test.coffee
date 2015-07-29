require("./spec_helper.coffee")
serviceRequest = require("../src/services/request.coffee")
request = require("superagent")

describe 'src/services/request', ->

  # delete request.prefix before each test
  beforeEach (done) ->
    if request.prefix
      delete request.prefix
    done()

  it "should return a superagent function", ->
    _request = serviceRequest()
    expect(_request.prefix).to.not.exist
    expect(_request).to.equal(request)

  it "should be able to use 'prefix' option", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.prefix).to.exist
    expect(_request.prefix).to.be.a("object")

  it "'prefix' option should enable 'get', 'put', 'post', 'del', 'patch' methods", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.prefix).to.be.a("object")
    expect(_request.prefix.get).to.be.a("function")
    expect(_request.prefix.put).to.be.a("function")
    expect(_request.prefix.post).to.be.a("function")
    expect(_request.prefix.del).to.be.a("function")
    expect(_request.prefix.patch).to.be.a("function")

  it "get method in 'prefix' object should prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.prefix.get("/abc").url).to.not.equal("/abc")
    expect(_request.prefix.get("/abc").url).to.equal("/test/abc")

  it "get method NOT in 'prefix' object should NOT prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.get("/abc").url).to.equal("/abc")
    expect(_request.get("/abc").url).to.not.equal("/test/abc")

  it "put method in 'prefix' object should prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.prefix.put("/abc").url).to.not.equal("/abc")
    expect(_request.prefix.put("/abc").url).to.equal("/test/abc")

  it "put method NOT in 'prefix' object should NOT prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.put("/abc").url).to.equal("/abc")
    expect(_request.put("/abc").url).to.not.equal("/test/abc")

  it "post method in 'prefix' object should prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.prefix.post("/abc").url).to.not.equal("/abc")
    expect(_request.prefix.post("/abc").url).to.equal("/test/abc")

  it "post method NOT in 'prefix' object should NOT prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.post("/abc").url).to.equal("/abc")
    expect(_request.post("/abc").url).to.not.equal("/test/abc")

  it "del method in 'prefix' object should prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.prefix.del("/abc").url).to.not.equal("/abc")
    expect(_request.prefix.del("/abc").url).to.equal("/test/abc")

  it "del method NOT in 'prefix' object should NOT prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.del("/abc").url).to.equal("/abc")
    expect(_request.del("/abc").url).to.not.equal("/test/abc")

  it "patch method in 'prefix' object should prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.prefix.patch("/abc").url).to.not.equal("/abc")
    expect(_request.prefix.patch("/abc").url).to.equal("/test/abc")

  it "patch method NOT in 'prefix' object should NOT prefix url", ->
    _request = serviceRequest({prefix: "/test"})
    expect(_request.patch("/abc").url).to.equal("/abc")
    expect(_request.patch("/abc").url).to.not.equal("/test/abc")
