import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const Pagination = () => {
  const { state } = useContext(AppContext);

  return (
    <nav className="paginate-container" aria-label="Pagination">
      <div className="pagination">
        <span
          className="previous_page"
          aria-disabled={!state.pageInfo.hasPreviousPage}
        >
          Previous
        </span>
        <a
          className="next_page"
          rel="next"
          href="#url"
          aria-label="Next Page"
          aria-disabled={!state.pageInfo.hasNextPage}
        >
          Next
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
