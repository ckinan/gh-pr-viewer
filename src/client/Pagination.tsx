import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import PullRequestBoxRow from './PullRequestBoxRow';

const Pagination = () => {
  const { state, dispatch } = useContext(AppContext);

  const fetchPullRequests = async (actionType, cursor) => {
    dispatch({ type: 'START_LOADING' });
    let prComponents = [];

    if (state.search.user) {
      let response = await fetch(
        `/api/gh-fetch-pull-requests?user=${state.search.user}&searchType=${state.search.searchType}&paginationActionType=${actionType}&cursor=${cursor}`
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
        type: 'UPDATE_SEARCH',
        search: {
          user: state.search.user,
          searchType: state.search.searchType,
          pageInfo: response.pageInfo,
        },
      });
    }

    dispatch({
      type: 'UPDATE_PR_COMPONENTS',
      prComponents: prComponents,
    });

    dispatch({ type: 'STOP_LOADING' });
  };

  const handlePagination = (e, actionType, cursor) => {
    e.preventDefault();
    fetchPullRequests(actionType, cursor);
  };

  return (
    <nav className="paginate-container" aria-label="Pagination">
      <div className="pagination">
        <button
          className="btn BtnGroup-item btn-outline"
          aria-disabled={!state.search.pageInfo.hasPreviousPage}
          disabled={!state.search.pageInfo.hasPreviousPage}
          onClick={(e) =>
            handlePagination(e, 'previous', state.search.pageInfo.startCursor)
          }
          type="button"
        >
          Previous
        </button>
        <button
          className="btn BtnGroup-item btn-outline"
          aria-disabled={!state.search.pageInfo.hasNextPage}
          disabled={!state.search.pageInfo.hasNextPage}
          onClick={(e) =>
            handlePagination(e, 'next', state.search.pageInfo.endCursor)
          }
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
