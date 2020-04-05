import React from 'react';
import Octicon, { GitPullRequest, GitMerge } from '@primer/octicons-react';

const StateFilterButton = (props) => {
  console.log(stateFilterConfig);
  return (
    <button
      className="btn btn-invisible bg-gray"
      type="button"
      onClick={(e) => props.handleFilterByState(props.state)}
    >
      <Octicon
        icon={stateFilterConfig[props.state].icon}
        className={stateFilterConfig[props.state].octiconClass}
      />
      {stateFilterConfig[props.state].description}
      <span className="Counter ml-1">
        {props.isLoading
          ? '0'
          : props.prs.filter((pr) => {
              return pr.state === props.state;
            }).length}
      </span>
    </button>
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

export default StateFilterButton;
