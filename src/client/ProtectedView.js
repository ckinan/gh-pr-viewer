import React from 'react';
import PullRequestBox from './PullRequestBox';

class ProtectedView extends React.Component {
  render() {
    return (
      <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
        <PullRequestBox />
      </div>
    );
  }
}

export default ProtectedView;
