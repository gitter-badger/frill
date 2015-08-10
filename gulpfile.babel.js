/**
 * Frill
 * @author nanopx(@nanopx)
 *
 * ---------------------------------------------------------------
 * gulpfile.jsx
 * ---------------------------------------------------------------
 */

/**
 * Module dependencies
 */
import gulp from 'gulp';
import path from 'path';
import includeAll from 'include-all';
import _argv from 'minimist';
import {each as _each} from 'lodash';
import {isFunction as _isFunction} from 'lodash';
import _$ from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
let argv = _argv;
argv = _argv(process.argv.slice(2));
const $ = _$();

/**
 * Load all gulp plugins without 'gulp-' prefix.
 */
$.runSequence = runSequence;
$.del = del;
$.webpack = webpack;
$.browserSync = browserSync.create();

/**
 * Invoke task
 */
const invokeConfigFn = (tasks) => {
  path._gulpfileDir = __dirname;
  // for(const taskName in tasks) {
  _each(tasks, (fn) => {
    if (_isFunction(fn)) {
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
    filter: /(.+)\.js(x?)$/,
  }) || {};
};

/**
 * Load task directory
 */
const taskConfig = loadTasks('./tasks');

/**
 * Create default task
 */
if (!taskConfig.default) {
  taskConfig.default = (_gulp) => {
    _gulp.task('default', () => $.util.log('Could not find "default" task.'));
    return;
  };
}

/**
 * Invoke tasks
 */
invokeConfigFn(taskConfig);
