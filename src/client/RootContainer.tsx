import React, { useState, useContext, useEffect } from 'react';
import PublicView from './PublicView';
import ProtectedView from './ProtectedView';
import './App.scss';
import { AuthContext } from './AuthContext';
import { Route, useHistory, useLocation } from 'react-router-dom';
import Header from './Header';

const RootContainer: React.FC = () => {
  // TODO: Should we use a global 'isLoading' state? Today I have one for the auth-check and another for the PR Rows
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: Same here, we have a global 'loggedInUser' and this local state hook. Should we have only 1 state with that information?
  const { authState, authDispatch } = useContext(AuthContext);
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('/api/gh-fetch-user').then((response) => {
        return response.json();
      });

      authDispatch({
        type: 'UPDATE_USER_LOGGED_IN',
        loggedInUser: response,
      });

      if ((response && response.login) || response.isLoginGhWebFlow === false) {
        const newLocation =
          location.search.length > 0 ? `/app${location.search}` : '/app';
        history.replace(newLocation);
      } else {
        history.replace('/');
      }

      setIsLoading(false);
    }

    // TODO: This was commented in favor of using Github PAT
    // fetchUser();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header avatarUrl={authState.loggedInUser.avatarUrl} />
      {isLoading ? (
        <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
          <div className="blankslate">
            <h2>
              <span>Loading</span>
              <span className="AnimatedEllipsis"></span>
            </h2>
          </div>
        </div>
      ) : (
        <>
          <Route exact path="/">
            <PublicView />
          </Route>
          <Route path="/app">
            <ProtectedView />
          </Route>
        </>
      )}
    </>
  );
};

export default RootContainer;
