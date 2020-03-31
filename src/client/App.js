import React from 'react';
import Header from './Header';
import PublicView from './PublicView';
import ProtectedView from './ProtectedView';

class App extends React.Component {
  state = {
    isAuthenticated: false,
    isLoading: true,
  };

  async componentDidMount() {
    let that = this;

    await fetch('/.netlify/functions/gh-check-auth').then(function(response) {
      if (response.ok) {
        that.setState({ isAuthenticated: true, isLoading: false });
      } else {
        that.setState({ isLoading: false });
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.isLoading ? (
          <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
            <div className="blankslate">
              <h2>
                <span>Loading</span>
                <span className="AnimatedEllipsis"></span>
              </h2>
            </div>
          </div>
        ) : !!this.state.isAuthenticated ? (
          <ProtectedView />
        ) : (
          <PublicView />
        )}
      </div>
    );
  }
}

export default App;
