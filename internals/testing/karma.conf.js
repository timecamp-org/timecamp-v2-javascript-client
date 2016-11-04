const webpackConfig = require('../webpack/webpack.test.babel');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

module.exports = (config) => {
  config.set({
    port: 3000,
    frameworks: ['mocha'],
    reporters: ['coverage', 'mocha'],
    browsers: process.env.TRAVIS // eslint-disable-line no-nested-ternary
      ? ['ChromeTravis']
      : process.env.APPVEYOR
        ? ['IE'] : ['Chrome_wo_sec'],

    autoWatch: false,
    singleRun: true,

    client: {
      captureConsole: true,
      mocha: {
        grep: argv.grep,
      },
    },

    files: [
      '../../node_modules/pouchdb/dist/pouchdb.js',
      {
        pattern: './test-bundler.js',
        watched: false,
        served: true,
        included: true,
      },
    ],

    preprocessors: {
      ['./test-bundler.js']: ['webpack', 'sourcemap'], // eslint-disable-line no-useless-computed-key
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },

    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
      Chrome_wo_sec: {
        base: 'Chrome',
        flags: ['--disable-web-security'], // '--disable-web-security','--user-data-dir=$HOME/foo/bar'
      },
    },

    coverageReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reporters: [
        { type: 'lcov', subdir: 'lcov' },
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
      ],
    },

  });
};
