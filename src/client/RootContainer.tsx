import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import PublicView from './PublicView';
import ProtectedView from './ProtectedView';
import './App.scss';
import { AppContext } from './AppContext';

const RootContainer: React.FC = () => {
  // TODO: Should we use a global 'isLoading' state? Today I have one for the auth-check and another for the PR Rows
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Same here, we have a global 'loggedInUser' and this local state hook. Should we have only 1 state with that information?
  const [avatarUrl, setAvatarUrl] = useState('');
  const { state, dispatch } = useContext(AppContext);

  // TODO: Evaluate whether this fetch to gh-check-auth should belong here???
  useEffect(() => {
    fetch('/api/gh-fetch-user')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setAvatarUrl(response.avatarUrl);
        setIsLoading(false);
        dispatch({
          type: 'UPDATE_USER_LOGGED_IN',
          loggedInUser: response,
        });
      });
  }, []);

  return (
    <>
      <Header avatarUrl={avatarUrl} />
      {isLoading ? (
        <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
          <div className="blankslate">
            <h2>
              <span>Loading</span>
              <span className="AnimatedEllipsis"></span>
            </h2>
          </div>
        </div>
      ) : (state.loggedInUser && state.loggedInUser.login) ||
        state.loggedInUser.isLoginGhWebFlow === false ? (
        <>
          {/*
          TODO: Move this Warning message to the ProtectedView
          TODO: Create a separate component for Messages
          */}
          {state.loggedInUser.isLoginGhWebFlow === false ? (
            <div className="flash flash-warn">
              <strong>WARNING:</strong> You are using a Personal Access Token.
              Use this only for development or working locally. For
              public/production environment, use Authentication via Github Web
              Flow
            </div>
          ) : (
            <></>
          )}
          <ProtectedView />
        </>
      ) : (
        <PublicView />
      )}
      {/*
        TODO: Move ProtectedView and PublicView into a new component: Body. Logic to toggle views between them should be there
        */}
    </>
  );
};

export default RootContainer;
