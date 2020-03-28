import React from 'react';
import Header from './Header';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import LoginPage from './LoginPage';
import GhWebClientApp from './GhWebClientApp';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <PublicRoute path="/">
              <LoginPage />
            </PublicRoute>
            <PrivateRoute path="/app">
              <GhWebClientApp />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
