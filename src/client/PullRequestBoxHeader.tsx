import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const PullRequestBoxHeader: React.FC = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="Box-header">
      <h3 className="Box-title">
        <div className="mr-2">
          Found
          <span className="Counter ml-1">
            {state.isLoading ? (
              <span className="AnimatedEllipsis"></span>
            ) : (
              state.count
            )}
          </span>
        </div>
      </h3>
    </div>
  );
};

export default PullRequestBoxHeader;
