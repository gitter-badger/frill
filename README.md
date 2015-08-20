# <img src="frill-logo.png" alt="frill" title="frill logo" height="200" />

Yet another FLUX starter kit

[![Circle CI](https://circleci.com/gh/nanopx/frill/tree/master.svg?style=shield&circle-token=ea6665c989599be6eddc9ba5f7d8d849b525f83a)](https://circleci.com/gh/nanopx/frill/tree/master)
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
* Lints using [ESLint](http://eslint.org/)
* Testing with [Mocha](mochajs.org), [Chai](chaijs.com), [Sinon.js](http://sinonjs.org/), and [jsdom](https://github.com/tmpvar/jsdom)
* Styles using [Stylus](https://learnboost.github.io/stylus/)
* Example of a model using [Sequelize](docs.sequelizejs.com/en/latest/)
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


## Run your app
```
$ npm start
```
or
```
$ gulp
```

## Building your app
```
$ npm run build
```
or
```
$ gulp build
```

## Testing your app
```
$ npm test
```
or
```
$ NODE_ENV=test gulp test
```
> **IMPORTANT:** You should always use 'test' for your NODE_ENV environment variable to make sure that your production/development database will not be affected by tests

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
├─ esdoc.json               # Configuration for ESDoc
├─ app.js                   # Entrypoint for server-side without using gulp
├─ gulpfile.babel.js        # Used for configuring gulp (in ES6 syntax)
├─ package.json             # List of 3rd party libraries using NPM
└─ webpack.config.js        # Webpack configuration for bundling client scripts
```

## License
MIT
