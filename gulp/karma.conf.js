var webpack = require('webpack');
var webpackConfig = require('./webpack-config');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var _config = require('./config');

webpackConfig.cache = true;
webpackConfig.module.postLoaders = [{
  test: /\.js$/,
  exclude: /(-spec|node_modules|bower_components)/,
  loader: 'istanbul-instrumenter'
}];

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: _config.tests.src,
    preprocessors: {
      'specs.js': ['webpack', 'sourcemap'],
      'src/**/*-spec.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      plugins: [

        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          _: 'lodash'
        }),

        new BowerWebpackPlugin({
          excludes:  [
            /.*\.(less|map)/,
            /glyphicons-.*\.(eot|svg|ttf|woff)/,
            /bootstrap.*\.css/,
            /select2.*\.css/
          ]
        })
      ]
    },
    webpackServer: {
      noInfo: true // silence webpack
    },
    exclude: [
      '*.less',
      '*.html'
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: '../coverage-reports/',
      subdir: function (browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      reporters: [
        {type: 'text', file: 'text.txt'},
        {type: 'text-summary', file: 'text-summary.txt'},
        {type: 'html'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,

    // List plugins explicitly, since autoloading karma-webpack won't work here
    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-coverage'),
      require('karma-webpack'),
      require('karma-phantomjs-launcher')
    ]

  });
};