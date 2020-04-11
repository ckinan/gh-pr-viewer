import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from './AppContext.js';
import { useHistory, useParams } from 'react-router-dom';
import PullRequestBoxRow from './PullRequestBoxRow';

const SearchForm = () => {
  const [user, setUser] = useState('');
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const { userParam } = useParams();

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/${user}`);
  };

  const fetchPullRequests = async (user) => {
    dispatch({ type: 'START_LOADING' });
    let prComponents = [];

    if (user) {
      let prs = await fetch(
        `/.netlify/functions/gh-fetch-pull-requests?user=${user}`
      ).then(function (response) {
        return response.json();
      });

      for (const pr of prs) {
        prComponents.push(<PullRequestBoxRow pr={pr} key={pr.id} />);
      }

      dispatch({
        type: 'UPDATE_PRS',
        prs: prs,
      });
    }

    dispatch({
      type: 'UPDATE_PR_COMPONENTS',
      prComponents: prComponents,
    });
    dispatch({ type: 'STOP_LOADING' });
  };

  useEffect(() => {
    document.title = `${userParam ? userParam : ''} PRs`;
    fetchPullRequests(userParam);
    setUser(userParam);
  }, [userParam]);

  return (
    <>
      <div className="mr-2">
        <button className="btn BtnGroup-item" type="button">
          Created
        </button>
        <button className="btn BtnGroup-item" type="button">
          Involved
        </button>
        <button className="btn BtnGroup-item" type="button">
          Review requests
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="form-control ml-2 mb-3"
          type="text"
          placeholder="User"
          value={user}
          onChange={(e) => handleChange(e)}
        />
      </form>
    </>
  );
};

export default SearchForm;
