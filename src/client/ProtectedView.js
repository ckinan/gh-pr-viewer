import React from 'react';
import PullRequestView from './PullRequestView';

class ProtectedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prList: [],
    };
  }

  render() {
    return (
      <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
        <PullRequestView />
      </div>
    );
  }
}

export default ProtectedView;
