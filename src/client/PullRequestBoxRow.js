import React from 'react';
import Octicon, { Repo } from '@primer/octicons-react';

const PullRequestBoxRow = props => {
  return (
    <li className="Box-row">
      <div className="mb-2">
        <Octicon icon={Repo} className="text-gray-light" />
        <strong>
          <a
            href={props.pr.repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 text-gray"
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
          <strong>Created at</strong>: {new Date(props.pr.createdAt).toString()}
        </div>
        <div>
          <strong>Updated at</strong>: {new Date(props.pr.updatedAt).toString()}
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
    </li>
  );
};

export default PullRequestBoxRow;
