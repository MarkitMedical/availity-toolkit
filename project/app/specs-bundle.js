// DO NOT MODIFY OR DELETE THIS FILE

require('angular');
require('angular-mocks');
require('angular-sanitize');
require('angular-animate');
require('angular-ui-router');
require('availity-angular');
require('angular-mocks');

Error.stackTraceLimit = Infinity;

// DO NOT DELETE OR MODIFY THIS FILE ;)

/* eslint no-var:0 */
var context = require.context(__dirname, true, /[-|\.]spec\.js$/);
context.keys().forEach(function(path) {
  try {
    context(path);
  } catch (err) {
    /* eslint no-console:0 */
    console.error('Error in ' + path);
    console.error(err);
  }
});