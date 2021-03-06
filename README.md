# <img src="https://raw.githubusercontent.com/nanopx/frill/master/frill-logo.png" alt="frill" title="frill logo" height="200" />

Yet another FLUX starter kit

[![Circle CI](https://circleci.com/gh/nanopx/frill/tree/master.svg?style=shield&circle-token=ea6665c989599be6eddc9ba5f7d8d849b525f83a)](https://circleci.com/gh/nanopx/frill/tree/master)
[![Code Climate](https://codeclimate.com/github/nanopx/frill/badges/gpa.svg)](https://codeclimate.com/github/nanopx/frill)
[![Test Coverage](https://codeclimate.com/github/nanopx/frill/badges/coverage.svg)](https://codeclimate.com/github/nanopx/frill/coverage)
[![document coverage](https://rawgit.com/nanopx/frill/master/docs/badge.svg)](https://esdoc.org)
[![HAPI 9.0.2](http://img.shields.io/badge/hapi-9.0.2-brightgreen.svg "Latest Hapi.js")](http://hapijs.com)

[![dependencies](https://david-dm.org/nanopx/frill.svg)](https://david-dm.org/nanopx/frill)
[![devDependency Status](https://david-dm.org/nanopx/frill/dev-status.svg)](https://david-dm.org/nanopx/frill#info=devDependencies)

---

## Features

* Creating an isomorphic, FLUX application using [frill-core](https://github.com/nanopx/frill-core),  [React](http://facebook.github.io/react/) and [hapi](http://hapijs.com/)
* Creating REST API using [hapi-holiday](https://github.com/nanopx/hapi-holiday)
* Supports local authentication.
* Supports [JSON Web Tokens](http://jwt.io/) and OAuth for authentication using [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2).
* Watch and automatic builds using [gulp](http://gulpjs.com/), [webpack](https://github.com/webpack/webpack), and [Babel](https://babeljs.io/)
* Auto-reload using [Browsersync](http://www.browsersync.io/), and [nodemon](https://github.com/remy/nodemon)
* Documentation using [ESDoc](https://esdoc.org/) and [hapi-swagger](https://github.com/glennjones/hapi-swagger)
* Lints using [ESLint](http://eslint.org/), alternatively [JSHint](http://jshint.com/docs)
* Testing with [Mocha](mochajs.org), [Chai](chaijs.com), [Sinon.js](http://sinonjs.org/), and [jsdom](https://github.com/tmpvar/jsdom)
* Styles using [Stylus](https://learnboost.github.io/stylus/)
* Example of a model using [Sequelize](docs.sequelizejs.com/en/latest/)
* Deployments using [Shipit](https://github.com/shipitjs/shipit)
* and many more!

You can always implement anything yourself.


## Getting Started
Add [gulp](http://gulpjs.com/)
```bash
$ npm install -g gulp
```
then, clone or fork this repository:
```bash
$ git clone -b master --single-branch https://github.com/nanopx/frill.git MyNewApp
$ cd MyNewApp && npm install
```

### If you have your own repo...

Rename remote from `origin` to `upstream`
```bash
$ git remote rename origin upstream
```

Set `origin` to your repo
```bash
$ git remote add origin YOUR_REPO.git
```

Fetch updates from your repo
```bash
$ git fetch origin
```
> NOTE: If any conflicts occur, fix them using your editor

Set `master` branch's remote to `origin/master`
```bash
$ git branch master -u origin/master
```

Finally, push frill into your repo
```bash
$ git push
```

If your cloning from your existing frill repo, you'll need to add `upstream`
```bash
$ git remote add upstream https://github.com/nanopx/frill.git
```

## Building your app
```
$ npm run build
```
or
```
$ gulp build
```

building your app for release, use:
```
$ npm run build-release
```
or
```
$ gulp build --release
```

## Run app and watch for changes
```
$ npm run watch
```
or
```
$ gulp
```

## Run your app as a daemon
Start app
```
$ npm start
```
Stop app
```
$ npm stop
```
Restart app
```
$ npm restart
```

> See [forever](https://github.com/foreverjs/forever) for more information.

## Deploying your app

### Install [Shipit](https://github.com/shipitjs/shipit)
```
$ npm install -g shipit
```

Configure `deployments` inside `./config/default.js` to your environment, then

For production
```
$ shipit production deploy
```

For staging
```
$ shipit staging deploy
```

`shipit (environment) pwd`, `shipit (environment) start`, `shipit (environment) stop`, `shipit (environment) restart` is configured by default.

> See [Shipit](https://github.com/shipitjs/shipit) and [shipit-deploy](https://github.com/shipitjs/shipit-deploy) for more information.

## Testing your app
```
$ npm test
```
> exports `NODE_ENV=test` automatically

or
```
$ NODE_ENV=test gulp test
```
> **IMPORTANT:** You should always use `test` for your `NODE_ENV` environment variable to make sure that your production/development database will not be affected by tests

## Updating frill

Fetch changes from frill
```bash
$ git checkout master
$ git fetch upstream
$ git merge upstream/master
```
> NOTE: If any conflicts occur, fix them using your editor

Dont't forget to install new or updated packages into your app
```bash
$ npm install
```

## Directory structure
```
.
├─ /docs/                   # Documentation files for the project
├─ /node_modules/           # 3rd-party libraries and utilities
├─ /public/                 # The folder for compiled output and serving
├─ /src/                    # The source code of the application
│  ├─ /actions/             # Actions that allow to trigger a dispatch to stores
│  ├─ /api/                 # REST API /api/ endpoints
│  │  ├─ /auth/             # Authentications
│  │  │  └─ /strategies/    # Authentication strategies
│  │  ├─ /v1/               # Place your version 1 api routes here
│  │  └─ routes.js          # File to include all your API routes
│  ├─ /assets/              # Asset files should be placed here
│  │  └─ /images/           # Image files
│  ├─ /components/          # Place your Frill(or React) Components here
│  │   ├─ Error.jsx         # Error handling component
│  │   └─ Page.jsx          # A component which wraps around the app
│  ├─ /helpers/             # All helper methods/classes should be placed here
│  ├─ /models/              # Models to use inside API
│  ├─ /stores/              # Stores that allow to emit changes to components
│  ├─ /styles/              # CSS(Stylus) files should be placed here
│  ├─ /templates/           # Template files should be placed here
│  ├─ /bootstrap.js         # Bootstraps client and server codes
│  ├─ /client.js            # Entrypoint for Client bundle
│  ├─ /routes.jsx           # Routes for components (using React-Router)
│  └─ /server.js            # Entrypoint for server-side application
├─ /tasks/                  # Gulp task scripts
├─ /test/                   # Test scripts (using Mocha)
├─ .eslintrc                # Configuration for ESLint
├─ .codeclimate.yml         # Configuration for Code Climate
├─ esdoc.json               # Configuration for ESDoc
├─ app.js                   # Entrypoint for server-side without using gulp
├─ gulpfile.babel.js        # Used for configuring gulp (in ES6 syntax)
├─ package.json             # List of 3rd party libraries using NPM
├─ webpack.config.js        # Webpack configuration for bundling client scripts
├─ circle.yml               # Configuration for Circle CI
├─ shipitfile.js            # Enables ES6 syntax for shipitfile.babel.js
└─ shipitfile.babel.js      # Configuration for deployment tasks

```

## About [CircleCI](https://circleci.com) and [Code Climate](https://codeclimate.com)

> NOTE: If your're planning to use [Travis CI](https://travis-ci.org) or anything else, you might want to skip this part.

If you're using [CircleCI](https://circleci.com), then you must check the configuration inside `./circle.yml`.
By default, it uses `npm run test-cov` for testing, which executes tests and  measures the coverage of your code using [Istanbul](https://github.com/gotwarlost/istanbul), and sends statistics to [Code Climate](https://codeclimate.com) by running `npm run code-climate` after the test.

If you don't want to use [Code Climate](https://codeclimate.com), simply remove the following configurations inside `./circle.yml`.
```yml
test:
  override:
    - npm run test-cov
  post:
    - npm run code-climate
```

If you have decided to use both [CircleCI](https://circleci.com) and [Code Climate](https://codeclimate.com), don't forget to set the `CODECLIMATE_REPO_TOKEN` environment variable inside the CircleCI's repo settings.

## Questions or Bugs?
Please send us an [issue](https://github.com/nanopx/frill/issues).

## License
MIT
