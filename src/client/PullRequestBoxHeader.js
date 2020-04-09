import React, { useState, useEffect } from 'react';
import Octicon, { GitPullRequest } from '@primer/octicons-react';
import { useHistory, useLocation } from "react-router-dom";

const PullRequestBoxHeader = ({fetchPullRequests, prs}) => {

  const [user, setUser] = useState('ckinan');
  const [userQuery, setUserQuery] = useState('');
  const history = useHistory();
  const query = useQuery();

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserQuery(user);
    history.push(`/?user=${user}`);
  };

  useEffect(() => {
    setUserQuery(query.get('user'));
    setUser(query.get('user'));
  }, [query.get('user')]);

  useEffect(() => {
    fetchPullRequests(userQuery);
  }, [userQuery]);

  useEffect(() => {
    document.title = `${user} PRs`;
  }, [fetchPullRequests]);

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

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default PullRequestBoxHeader;
