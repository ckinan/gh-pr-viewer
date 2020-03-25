import React from 'react';

class Body extends React.Component {
    render() {
        return (
            <div className="mx-auto my-3 p-1" style={{maxWidth: '900px'}}>
                <div id="login" className="blankslate">
                    <h3 className="mb-1">Welcome to Github Web Client</h3>
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
          );
    }
}

export default Body;
