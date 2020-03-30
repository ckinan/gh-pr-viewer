import React from 'react';
import Header from './Header';
import PublicView from './PublicView';
import ProtectedView from './ProtectedView';

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
        {!!this.state.isAuthenticated ? <ProtectedView /> : <PublicView />}
      </div>
    );
  }
}

export default App;
