# <img src="frill-logo.png" alt="frill" title="frill logo" height="200" />

Yet another FLUX starter kit

**WIP**

[![document coverage](https://rawgit.com/nanopx/frill/master/docs/badge.svg)](https://esdoc.org) ![dependencies](https://david-dm.org/nanopx/frill.svg) [![Circle CI](https://circleci.com/gh/nanopx/frill/tree/master.svg?style=shield&circle-token=ea6665c989599be6eddc9ba5f7d8d849b525f83a)](https://circleci.com/gh/nanopx/frill/tree/master)
---

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

### Directory structure
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
