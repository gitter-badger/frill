/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * gulpfile.jsx
 * ---------------------------------------------------------------
 */
"use strict";

/**
 * Module dependencies
 */
import gulp from 'gulp';
import path from 'path';
import includeAll from 'include-all';
import _argv from 'minimist';
import {each as _each} from 'lodash';
let argv = _argv;
argv = _argv(process.argv.slice(2));

/**
 * Load all gulp plugins.
 */
const $ = require('gulp-load-plugins')();
// $ = $ || {};
$.runSequence = require('run-sequence');
$.del = require('del');
$.webpack = require('webpack');
$.sourceStream = require('vinyl-source-stream');

/**
 * Invoke task
 */
const invokeConfigFn = (tasks) => {
  path._gulpfileDir = __dirname;
  // for(const taskName in tasks) {
  _each(tasks, (fn, taskName) => {
    if (fn) {
      fn(gulp, $, argv, path);
    }
    return;
  });
};

/**
 * Load task
 */
const loadTasks = (relPath) => {
  return includeAll({
    dirname: path.resolve(__dirname, relPath),
    filter: /(.+)\.js(x?)$/
  }) || {};
};

/**
 * Load task directory
 */
const taskConfigurations = loadTasks('./tasks');

/**
 * Create default task
 */
if (!taskConfigurations.default) {
  taskConfigurations.default = (gulp) => {
    gulp.task("default", () => $.util.log('Could not find "default" task.'));
    return;
  };
}

/**
 * Invoke tasks
 */
invokeConfigFn(taskConfigurations);
