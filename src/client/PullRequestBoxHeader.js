import React from 'react';
import Octicon, { GitPullRequest, GitMerge } from '@primer/octicons-react';

const PullRequestBoxHeader = (props) => {
  return (
    <div className="Box-header">
      <h3 className="Box-title">
        <div className="mr-2">
          {Object.keys(stateFilterConfig).map((state) => {
            return (
              <button
                className="btn btn-invisible bg-gray"
                type="button"
                onClick={(e) => props.handleFilterByState(state)}
                key={state}
              >
                <Octicon
                  icon={stateFilterConfig[state].icon}
                  className={stateFilterConfig[state].octiconClass}
                />
                {stateFilterConfig[state].description}
                <span className="Counter ml-1">
                  {props.isLoading
                    ? '0'
                    : props.prs.filter((pr) => {
                        return pr.state === state;
                      }).length}
                </span>
              </button>
            );
          })}
        </div>
      </h3>
    </div>
  );
};

const stateFilterConfig = {
  OPEN: {
    description: 'Open',
    icon: GitPullRequest,
    octiconClass: 'text-green mr-1',
  },
  CLOSED: {
    description: 'Closed',
    icon: GitPullRequest,
    octiconClass: 'text-red mr-1',
  },
  MERGED: {
    description: 'Merged',
    icon: GitMerge,
    octiconClass: 'text-purple mr-1',
  },
};

export default PullRequestBoxHeader;
