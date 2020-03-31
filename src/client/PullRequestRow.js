import React from 'react';

const PullRequestRow = props => {
  return (
    <li className="Box-row" key={props.pr.id}>
      <div className="text-small text-gray-light">
        <svg
          className="octicon octicon-repo"
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
        <span className="author">
          <a
            href={props.repo.owner.html_url}
            className="url fn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.repo.owner.login}
          </a>
        </span>
        <span className="path-divider">/</span>
        <strong>
          <a
            href={props.repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.repo.name}
          </a>
        </strong>
      </div>
      <a href={props.pr.html_url} target="_blank" rel="noopener noreferrer">
        {' '}
        #{props.pr.number}: {props.pr.title} ({props.pr.state})
      </a>
      <div className="text-small text-gray-light">
        <span>
          <strong>Created at</strong>:{' '}
          {new Date(props.pr.created_at).toString()}
        </span>
        <span>
          <strong>Updated at</strong>:{' '}
          {new Date(props.pr.updated_at).toString()}
        </span>
        <span>
          <strong>Closed at</strong>:{' '}
          {props.pr.closed_at ? new Date(props.pr.closed_at).toString() : '-'}
        </span>
        <span>
          <strong>Merged at</strong>:{' '}
          {props.pr.merged_at ? new Date(props.pr.merged_at).toString() : '-'}
        </span>
      </div>
    </li>
  );
};

export default PullRequestRow;
