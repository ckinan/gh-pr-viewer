import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import * as serviceWorker from './client/serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/**
       * TODO: Create /app root for ProtectedView and exact / for PublicView
       */}
      <Route exact path="/" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
