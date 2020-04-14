import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from './AppContext.js';
import { useHistory, useParams } from 'react-router-dom';
import PullRequestBoxRow from './PullRequestBoxRow';

const SearchForm = () => {
  const [user, setUser] = useState('');
  const [searchType, setSearchType] = useState('author');
  const { state, dispatch } = useContext(AppContext);
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
      let response = await fetch(
        `/.netlify/functions/gh-fetch-pull-requests?user=${user}&searchType=${searchType}`
      ).then(function (response) {
        return response.json();
      });

      for (const pr of response.edges) {
        prComponents.push(<PullRequestBoxRow pr={pr.node} key={pr.node.id} />);
      }

      dispatch({
        type: 'UPDATE_PRS',
        prs: response.edges,
      });

      dispatch({
        type: 'UPDATE_COUNT',
        count: response.issueCount,
      });

      dispatch({
        type: 'UPDATE_PAGE_INFO',
        pageInfo: response.pageInfo,
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
  }, [userParam, searchType]);

  const handleSearchType = (e, searchType) => {
    e.preventDefault();
    setSearchType(searchType);
  };

  return (
    <div className="d-flex mb-3 flex-column flex-md-row p-2 p-md-0">
      <div className="d-flex d-sm-block">
        <button
          className={`flex-1 btn BtnGroup-item btn-outline ${
            searchType === 'author'
              ? 'bg-blue text-white'
              : 'bg-gray-light text-gray'
          } `}
          type="button"
          onClick={(e) => handleSearchType(e, 'author')}
        >
          Created
        </button>
        <button
          className={`flex-1 btn BtnGroup-item btn-outline ${
            searchType === 'involves-author'
              ? 'bg-blue text-white'
              : 'bg-gray-light text-gray'
          } `}
          type="button"
          onClick={(e) => handleSearchType(e, 'involves-author')}
        >
          Involves{' '}
          <span
            class="tooltipped tooltipped-s tooltipped-no-delay"
            aria-label="Involved but not as author"
          >
            ?
          </span>
        </button>
        <button
          className={`flex-1 btn BtnGroup-item btn-outline ${
            searchType === 'review-requested'
              ? 'bg-blue text-white'
              : 'bg-gray-light text-gray'
          } `}
          type="button"
          onClick={(e) => handleSearchType(e, 'review-requested')}
        >
          Review requests
        </button>
      </div>

      <form
        className="flex-auto ml-0 ml-md-3 mt-3 mt-md-0"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="form-control width-full"
          type="text"
          placeholder="User"
          value={user}
          onChange={(e) => handleChange(e)}
        />
      </form>
    </div>
  );
};

export default SearchForm;
