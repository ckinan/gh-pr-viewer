import React from 'react';
import PullRequestBox from './PullRequestBox';

const ProtectedView = () => {
  return (
    <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
      <PullRequestBox />
    </div>
  );
}

export default ProtectedView;
