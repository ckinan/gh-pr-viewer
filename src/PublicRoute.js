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


export const PublicRoute = ({ children, ...rest }) => {
    const isAuthenticated = checkAuth();

    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated === false ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/app",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }