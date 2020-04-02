import React from 'react';
import Octicon, { GitMerge, GitPullRequest } from '@primer/octicons-react';

const PullRequestBoxRow = props => {
  return (
    <li className="Box-row">
      <div>
        <div class="d-table-cell">
          {props.pr.state == 'MERGED' ? (
            <Octicon icon={GitMerge} className="text-purple" />
          ) : props.pr.state == 'OPEN' ? (
            <Octicon icon={GitPullRequest} className="text-green" />
          ) : (
            <Octicon icon={GitPullRequest} className="text-red" />
          )}
        </div>
        <div class="d-table-cell pl-2">
          <div className="mb-2">
            <strong>
              <a
                href={props.pr.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray"
              >
                {props.pr.repository.nameWithOwner}
              </a>
              <a
                href={props.pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-gray-dark"
              >
                #{props.pr.number} {props.pr.title} ({props.pr.state})
              </a>
            </strong>
          </div>

          <div className="text-small text-gray-light">
            <div>
              <strong>Created at</strong>:{' '}
              {new Date(props.pr.createdAt).toString()}
            </div>
            <div>
              <strong>Updated at</strong>:{' '}
              {new Date(props.pr.updatedAt).toString()}
            </div>
            <div>
              <strong>Closed at</strong>:{' '}
              {props.pr.closedAt ? new Date(props.pr.closedAt).toString() : '-'}
            </div>
            <div>
              <strong>Merged at</strong>:{' '}
              {props.pr.mergedAt ? new Date(props.pr.mergedAt).toString() : '-'}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PullRequestBoxRow;
