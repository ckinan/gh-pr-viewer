import React, { useReducer } from 'react';
import PullRequestBox from './PullRequestBox';
import SearchForm from './SearchForm';
import { AppContext, initialState, AppReducer } from './AppContext.js';

const ProtectedView = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="mx-auto my-3" style={{ maxWidth: '900px' }}>
        <SearchForm />
        <PullRequestBox />
      </div>
    </AppContext.Provider>
  );
};

export default ProtectedView;
