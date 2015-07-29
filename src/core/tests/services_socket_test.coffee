require("./spec_helper.coffee")
socketRequest = require("../src/services/socket.coffee")
socket = require("socket.io-client")

describe 'src/services/socket', ->

  it 'should throw an error when options.url not specified', ->
    expect ->
      socket = socketRequest()
    .to.throw("You must specify option.url to use the socket service.")

  it 'should not throw an error when options.url specified', ->
    expect ->
      socket = socketRequest url: "localhost"
    .to.not.throw()

  it 'should return a initialized socket.io-client instance', ->
    _socket = socketRequest url: "localhost"
    expect(_socket.emit).to.be.an("function")
    expect(_socket.on).to.be.an("function")
