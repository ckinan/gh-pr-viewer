import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import PublicView from './PublicView';
import ProtectedView from './ProtectedView';
import './App.scss';
import { AppContext } from './AppContext.js';

const RootContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    fetch('/api/gh-check-auth')
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
      ) : Object.keys(state.loggedInUser).length > 0 ||
        state.loggedInUser.isLoginGhWebFlow === false ? (
        <>
          {state.loggedInUser.isLoginGhWebFlow === false ? (
            <div class="flash flash-warn">
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
    </>
  );
};

export default RootContainer;
