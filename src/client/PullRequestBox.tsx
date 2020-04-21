import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import PullRequestBoxHeader from './PullRequestBoxHeader';

const PullRequestBox: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      <div className="Box">
        <PullRequestBoxHeader />

        {/**
         * TODO: Re-evaluate a global isLoading
         */}
        {state.isLoading ? (
          <ul>
            <li className="Box-row text-center">
              <h2>
                <span>Loading</span>
                <span className="AnimatedEllipsis"></span>
              </h2>
            </li>
          </ul>
        ) : state.prComponents.length > 0 ? (
          /**
           * TODO: prComponents should be generated here, in PRBox
           */
          <ul>{state.prComponents}</ul>
        ) : (
          <div className="blankslate">
            <h3 className="mb-1">No results matched your search.</h3>
            <p>
              You may need to select other filters to show your pull requests or
              you may not have any pull requests at all
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PullRequestBox;
