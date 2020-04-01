import React from 'react';
import PullRequestBox from './PullRequestBox';

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
        <PullRequestBox />
      </div>
    );
  }
}

export default ProtectedView;
