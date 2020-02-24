import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
if (process.env.NODE_ENV === 'development') {
  require('./localSecrets'); // this will mutate the process.env object with your secrets.
}
// require('./mainApp')       // run your app after you're sure the env variables are set.

ReactDOM.render(
  <Provider store={store}>
    {/* rest of your app goes here! */}
    <h1>Hello, world!</h1>
  </Provider>,
  document.getElementById('app')
);