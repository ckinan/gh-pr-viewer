import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from './AppContext';
import { useHistory, useLocation } from 'react-router-dom';
import PullRequestBoxRow from './PullRequestBoxRow';
import { AuthContext } from './AuthContext';

const SearchForm: React.FC = () => {
  // TODO: Understand when we can use useState VS useContext for this type of data
  const [user, setUser] = useState<string>('');
  const [searchType, setSearchType] = useState<string | null>('author');
  const { appState, appDispatch } = useContext(AppContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const history = useHistory();
  const query = useQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/app?user=${user}&searchType=${searchType}`);
  };

  // TODO: This fetch should be reusable (this is also used in Pagination component)
  const fetchPullRequests = async (
    userParam: string,
    searchTypeParam: string | null
  ) => {
    appDispatch({ type: 'START_LOADING' });
    let prComponents = [];

    if (userParam) {
      let response = await fetch(
        `/api/gh-fetch-pull-requests?user=${userParam}&searchType=${searchTypeParam}`
      ).then(function (response) {
        return response.json();
      });

      // TODO: This component generation should belong to the PullRequestBox, not here
      //       SearchForm should just update the results data in the context, but should not know anything about PRBoxes at all
      for (const pr of response.edges) {
        prComponents.push(<PullRequestBoxRow pr={pr.node} key={pr.node.id} />);
      }

      // TODO: Should we really need to separate PRS, COUNTS, PAGE_INFO?
      //       Maybe worth it storing all them together within the response body AS IS to avoid complexity
      appDispatch({
        type: 'UPDATE_PRS',
        prs: response.edges,
      });

      appDispatch({
        type: 'UPDATE_COUNT',
        count: response.issueCount,
      });

      appDispatch({
        type: 'UPDATE_PAGE_INFO',
        pageInfo: response.pageInfo,
      });

      appDispatch({
        type: 'UPDATE_SEARCH',
        search: {
          user: userParam,
          searchType: searchTypeParam,
          pageInfo: response.pageInfo,
        },
      });
    }

    appDispatch({
      type: 'UPDATE_PR_COMPONENTS',
      prComponents: prComponents,
    });

    // TODO: Think about a way to have one single global isLoading functionality
    appDispatch({ type: 'STOP_LOADING' });
  };

  useEffect(() => {
    const userParam = query.get('user') ? query.get('user') : '';
    if (!userParam) {
      history.replace(
        `/app?user=${authState.loggedInUser.login}&searchType=${searchType}`
      );
    } else {
      const searchTypeParam = query.get('searchType')
        ? query.get('searchType')
        : 'author';

      document.title = `${userParam} PRs`;

      fetchPullRequests(userParam, searchTypeParam);

      setUser(userParam);
      setSearchType(searchTypeParam);
    }
  }, [query.get('user'), query.get('searchType')]);

  const handleSearchType = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    searchType: string
  ) => {
    e.preventDefault();
    setSearchType(searchType);
    history.replace(`/app?user=${user}&searchType=${searchType}`);
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
            className="tooltipped tooltipped-s tooltipped-no-delay"
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
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <input
          className="form-control width-full"
          type="text"
          placeholder="User"
          value={user}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </form>
    </div>
  );
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default SearchForm;
