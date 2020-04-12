import React, { useReducer } from 'react';
import PullRequestBox from './PullRequestBox';
import SearchForm from './SearchForm';
import { AppContext, initialState, AppReducer } from './AppContext.js';
import Pagination from './Pagination';

const ProtectedView = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="mx-auto my-3" style={{ maxWidth: '900px' }}>
        <SearchForm />
        <PullRequestBox />
        <Pagination />
      </div>
    </AppContext.Provider>
  );
};

export default ProtectedView;
