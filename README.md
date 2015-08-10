# <img src="frill-logo.png" alt="frill" title="frill logo" height="200" />

Yet another FLUX starter kit

[![document coverage](https://rawgit.com/nanopx/frill/master/docs/badge.svg)](https://esdoc.org)
---

### Directory structure
```
.
├── /public/                    # The folder for compiled output and serving
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Actions that allow to trigger a dispatch to stores
│   ├── /api/                   # REST API /api/ endpoints
│   │   ├── /auth/
│   │   ├── /v1/
│   │   ├── index.js
│   │   └── routes.js
│   ├── /assets/
│   │   └── /images/
│   ├── /components/
│   │   ├── index.js
│   │   ├── index.js
│   │   └── routes.js
│   ├── /helpers/
│   ├── /models/
│   ├── /stores/
│   ├── /styles/
│   ├── /templates/
│   ├── /bootstrap.js
│   ├── /app.js
│   └── /server.js
├── /tasks/
├── .eslintrc
├── app.js
├── gulpfile.babel.js
├── package.json
└── webpack.config.js
```

## Getting Started
Add [gulp](http://gulpjs.com/)
```bash
$ npm install -g gulp
```
then, clone or fork this repository:
```bash
$ git clone -b master --single-branch \
      https://github.com/nanopx/frill.git MyNewApp
$ cd MyNewApp && npm install
```
**WIP**
