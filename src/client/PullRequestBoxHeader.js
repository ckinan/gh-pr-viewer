import React, { useState, useEffect } from 'react';
import Octicon, { GitPullRequest } from '@primer/octicons-react';

const PullRequestBoxHeader = ({fetchPullRequests, prs}) => {

  const [user, setUser] = useState('ckinan');

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPullRequests(user);
  };

  useEffect(() => {
    fetchPullRequests(user);
  }, []);

  return (
    <div className="Box-header">
      <h3 className="Box-title">
        <div className="mr-2">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Octicon icon={GitPullRequest} className="text-green mr-1" />
            Open
            <span className="Counter ml-1">{prs.length}</span>
            <input
              className="form-control ml-2"
              type="text"
              placeholder="User"
              value={user}
              onChange={(e) => handleChange(e)}
            />
          </form>
        </div>
      </h3>
    </div>
  );
}

export default PullRequestBoxHeader;
