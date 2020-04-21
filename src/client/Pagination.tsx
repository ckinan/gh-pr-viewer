import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import PullRequestBoxRow from './PullRequestBoxRow';

const Pagination: React.FC = () => {
  const { appState, appDispatch } = useContext(AppContext);

  const fetchPullRequests = async (actionType: string, cursor: string) => {
    appDispatch({ type: 'START_LOADING' });
    let prComponents = [];

    if (appState.search.user) {
      let response = await fetch(
        `/api/gh-fetch-pull-requests?user=${appState.search.user}&searchType=${appState.search.searchType}&paginationActionType=${actionType}&cursor=${cursor}`
      ).then(function (response) {
        return response.json();
      });

      for (const pr of response.edges) {
        prComponents.push(<PullRequestBoxRow pr={pr.node} key={pr.node.id} />);
      }

      appDispatch({
        type: 'UPDATE_PRS',
        prs: response.edges,
      });

      appDispatch({
        type: 'UPDATE_COUNT',
        count: response.issueCount,
      });

      appDispatch({
        type: 'UPDATE_SEARCH',
        search: {
          user: appState.search.user,
          searchType: appState.search.searchType,
          pageInfo: response.pageInfo,
        },
      });
    }

    appDispatch({
      type: 'UPDATE_PR_COMPONENTS',
      prComponents: prComponents,
    });

    appDispatch({ type: 'STOP_LOADING' });
  };

  const handlePagination = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    actionType: string,
    cursor: string
  ) => {
    e.preventDefault();
    fetchPullRequests(actionType, cursor);
  };

  return (
    <nav className="paginate-container" aria-label="Pagination">
      <div className="pagination">
        <button
          className="btn BtnGroup-item btn-outline"
          aria-disabled={!appState.search.pageInfo.hasPreviousPage}
          disabled={!appState.search.pageInfo.hasPreviousPage}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handlePagination(
              e,
              'previous',
              appState.search.pageInfo.startCursor
            )
          }
          type="button"
        >
          Previous
        </button>
        <button
          className="btn BtnGroup-item btn-outline"
          aria-disabled={!appState.search.pageInfo.hasNextPage}
          disabled={!appState.search.pageInfo.hasNextPage}
          onClick={(e) =>
            handlePagination(e, 'next', appState.search.pageInfo.endCursor)
          }
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
