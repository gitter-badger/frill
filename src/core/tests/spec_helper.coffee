jsdom = require('jsdom').jsdom
global.document  = jsdom('<html><body></body></html>')
global.window    = document.defaultView
global.navigator = window.navigator

global.Promise = require 'bluebird'
global.React   = require 'react'
global.chai    = require 'chai'
global.expect  = chai.expect
chai.should()
global.sinon   = require 'sinon'

cheerio = require 'cheerio'
global.$$ = (html) -> cheerio.load html

beforeEach -> @sinon = sinon.sandbox.create()
afterEach ->
  @sinon.restore()
  document.body.innerHTML = ''
