// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

// If we need to use Chai, we'll have already chaiEnzyme loaded
import chai from 'chai';

// Include all .js files under `app`, except app.js, reducers.js, and routes.js.
// This is for isparta code coverage
const context = require.context('../../test', true, /.*\.js$/);
context.keys().forEach(context);
