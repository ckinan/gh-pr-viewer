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

export const PublicRoute = ({ children, ...rest }) => {
    const isAuthenticated = false;

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