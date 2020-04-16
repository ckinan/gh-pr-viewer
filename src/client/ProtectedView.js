import React from 'react';
import PullRequestBox from './PullRequestBox';
import SearchForm from './SearchForm';
import Pagination from './Pagination';

const ProtectedView = () => {
  return (
    <div className="mx-auto my-3" style={{ maxWidth: '900px' }}>
      <SearchForm />
      <PullRequestBox />
      <Pagination />
    </div>
  );
};

export default ProtectedView;
