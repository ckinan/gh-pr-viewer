import React, { useContext, useEffect } from 'react';
import PullRequestBox from './PullRequestBox';
import SearchForm from './SearchForm';
import Pagination from './Pagination';
import { AuthContext } from './AuthContext';

const ProtectedView: React.FC = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  return (
    <>
      {authState.loggedInUser.isLoginGhWebFlow === false ? (
        <div className="flash flash-warn">
          <strong>WARNING:</strong> You are using a Personal Access Token. Use
          this only for development or working locally. For public/production
          environment, use Authentication via Github Web Flow
        </div>
      ) : (
        <></>
      )}
      <div className="mx-auto my-3" style={{ maxWidth: '1024px' }}>
        <SearchForm />
        <PullRequestBox />
        <Pagination />
      </div>
    </>
  );
};

export default ProtectedView;
