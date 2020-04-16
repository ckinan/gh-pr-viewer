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
    fetch('/.netlify/functions/gh-check-auth')
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
      ) : Object.keys(state.loggedInUser).length > 0 ? (
        <ProtectedView />
      ) : (
        <PublicView />
      )}
    </>
  );
};

export default RootContainer;
