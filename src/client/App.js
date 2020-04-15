import React, { useState, useEffect } from 'react';
import Header from './Header';
import PublicView from './PublicView';
import ProtectedView from './ProtectedView';
import './App.scss';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/.netlify/functions/gh-check-auth').then(
        function (response) {
          if (response.ok) {
            setIsAuthenticated(true);
          }
          setIsLoading(false);
          return response.json();
        }
      );
      setAvatarUrl(response.avatarUrl);
    };

    checkAuth();
  }, []);

  return (
    <div>
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
      ) : !!isAuthenticated ? (
        <ProtectedView />
      ) : (
        <PublicView />
      )}
    </div>
  );
};

export default App;
