// Karma configuration
// Generated on Tue Sep 18 2018 11:14:25 GMT+0100 (BST)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine-ajax', 'jasmine', 'fixture'],

    // list of files / patterns to load in the browser
    files: [
      {
        included: true,
        pattern: 'app/data/**/*.json',
        served: true
      },
      {
        included: true,
        pattern: 'app/fixtures/**/*.html',
        served: true
      },
      'app/scripts/**/*.js'
    ],

    jsonFixturesPreprocessor: {
      variableName: '__json__'
    },

    preprocessors: {
      'app/data/**/*.json': ['json_fixtures'],
      'app/fixtures/**/*.html': ['html2js'],
      'app/scripts/**/*.js': ['babel']
    },

    // list of files / patterns to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
