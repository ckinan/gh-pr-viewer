import React from 'react';
import Header from './Header';
import LoginPage from './LoginPage';
import GhWebClientApp from './GhWebClientApp';

class App extends React.Component {

  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    let that = this;

    fetch('/.netlify/functions/gh-check-auth').then(function(response) {
      if(response.ok) {
        that.setState({isAuthenticated: true});
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        {!!this.state.isAuthenticated ? <GhWebClientApp /> : <LoginPage />}
      </div>
    );
  }
}

export default App;
