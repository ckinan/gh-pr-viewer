import React from 'react';
import Header from './Header';

function App() {
  return (
    <div>
      <Header />

      <div className="mx-auto my-3 p-1" style={{maxWidth: '900px'}}>

        <div id="login" className="blankslate">
          <h3 className="mb-1">Welcome to gh-web-client</h3>
          <p>You need to login with your Github account to see your content.</p>
          <a href="/#" id="loginBtn" className="btn btn-primary my-3">Login</a>
        </div>

        <div id="main">
          <div className="pagehead">
            <h1>Pull Requests</h1>
          </div>

          <div className="Box Box--condensed">
            <div className="Box-header">
              <h3 className="Box-title">
                PRs
              </h3>
            </div>
            <ul id="pr-list">
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
