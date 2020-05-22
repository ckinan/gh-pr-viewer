import React, { useContext, useEffect } from 'react';
import PullRequestBox from './PullRequestBox';
import SearchForm from './SearchForm';
import Pagination from './Pagination';
import { AuthContext } from './AuthContext';

const ProtectedView: React.FC = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  return (
    <>
      {
        // TODO: This was commented in favor of using Github PAT
        //authState.loggedInUser.isLoginGhWebFlow === false ?
        <div className="flash flash-warn">
          <p>
            <strong>NOTE:</strong> Just type your Github username (or from
            someone else) in the text box below and submit and your OPEN Pull
            Requests should be listed. "Clone" of{' '}
            <a href="https://github.com/pulls">Github PRs View</a>, but with
            some variations. Find the repo{' '}
            <a href="https://github.com/ckinan/gh-pr-viewer">here</a>
          </p>
        </div>
        //: (
        //  <></>
        //)
      }
      <div className="mx-auto my-3" style={{ maxWidth: '1024px' }}>
        <SearchForm />
        <PullRequestBox />
        <Pagination />
      </div>
    </>
  );
};

export default ProtectedView;
