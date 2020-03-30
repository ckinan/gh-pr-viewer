import React from 'react';

class GhWebClientApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prList: [],
    };
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    let that = this;
    fetch('/.netlify/functions/gh-fetch-repos')
      .then(function (response) {
        return response.json();
      })
      .then((repos) => {
        that.setState({ isPublicOnly: false });

        repos.forEach(function (repo, index) {
          fetch('/.netlify/functions/gh-fetch-pulls?repo=' + repo.full_name)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              let prList = data.map((pr) => {
                return (
                  <li className="Box-row" key={pr.id}>
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
                          href={repo.owner.html_url}
                          className="url fn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {repo.owner.login}
                        </a>
                      </span>
                      <span className="path-divider">/</span>
                      <strong>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {repo.name}
                        </a>
                      </strong>
                    </div>
                    <a
                      href={pr.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      #{pr.number}: {pr.title} ({pr.state})
                    </a>
                    <div className="text-small text-gray-light">
                      <span>
                        <strong>Created at</strong>:{' '}
                        {new Date(pr.created_at).toString()}
                      </span>
                      <span>
                        <strong>Updated at</strong>:{' '}
                        {new Date(pr.updated_at).toString()}
                      </span>
                      <span>
                        <strong>Closed at</strong>:{' '}
                        {pr.closed_at ? new Date(pr.closed_at).toString() : '-'}
                      </span>
                      <span>
                        <strong>Merged at</strong>:{' '}
                        {pr.merged_at ? new Date(pr.merged_at).toString() : '-'}
                      </span>
                    </div>
                  </li>
                );
              });
              that.setState({ prList: [...that.state.prList, ...prList] });
            });
        });
      })
      .catch(function (err) {
        that.setState({ isPublicOnly: true });
        console.warn('Could not get repos.', err);
      });
  }

  render() {
    return (
      <div className="mx-auto my-3 p-1" style={{ maxWidth: '900px' }}>
        <div id="main">
          <div className="pagehead">
            <h1>Pull Requests</h1>
          </div>

          <div className="Box Box--condensed">
            <div className="Box-header">
              <h3 className="Box-title">PRs</h3>
            </div>
            <ul id="pr-list">{this.state.prList}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default GhWebClientApp;
