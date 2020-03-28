import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import { checkAuth } from './CheckAuth';

export const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = checkAuth();

    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated === true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }