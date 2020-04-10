import React, { useState } from 'react';
import PullRequestBoxRow from './PullRequestBoxRow';
import PullRequestBoxHeader from './PullRequestBoxHeader';

const PullRequestBox = () => {
  const [prs, setPrs] = useState([]);
  const [prComponents, setPrComponents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPullRequests = async (user) => {
    setIsLoading(true);
    let prComponents = [];

    if (user) {
      let prs = await fetch(
        `/.netlify/functions/gh-fetch-pull-requests?user=${user}`
      ).then(function (response) {
        return response.json();
      });

      for (const pr of prs) {
        prComponents.push(<PullRequestBoxRow pr={pr} key={pr.id} />);
      }

      setPrs(prs);
    }

    setPrComponents(prComponents);
    setIsLoading(false);
  };

  return (
    <>
      <div className="Box">
        <PullRequestBoxHeader
          isLoading={isLoading}
          prs={prs}
          fetchPullRequests={fetchPullRequests}
        />

        {isLoading ? (
          <ul>
            <li className="Box-row text-center">
              <h2>
                <span>Loading</span>
                <span className="AnimatedEllipsis"></span>
              </h2>
            </li>
          </ul>
        ) : prComponents.length > 0 ? (
          <ul>{prComponents}</ul>
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
