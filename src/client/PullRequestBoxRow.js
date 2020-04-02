import React from 'react';

const PullRequestBoxRow = props => {
  return (
    <li className="Box-row">
      <div className="mb-2">
        <svg
          className="octicon octicon-repo text-gray-light"
          viewBox="0 0 12 16"
          version="1.1"
          width="12"
          height="16"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
          ></path>
        </svg>
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
