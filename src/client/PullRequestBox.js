import React from 'react';
import PullRequestBoxRow from './PullRequestBoxRow';
import Octicon, { GitPullRequest, GitMerge } from '@primer/octicons-react';

class PullRequestBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: [],
      prComponents: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    let prs = await fetch('/.netlify/functions/gh-fetch-pull-requests').then(
      function(response) {
        return response.json();
      }
    );

    this.setState({ prs: prs });
    this.setState({ isLoading: false });
    this.handleFilterByState('OPEN');
  }

  handleFilterByState(state) {
    let prComponents = [];
    for (const pr of this.state.prs) {
      if (pr.state === state) {
        prComponents.push(<PullRequestBoxRow pr={pr} key={pr.id} />);
      }
    }

    this.setState({ prComponents: prComponents });
  }

  render() {
    return (
      <>
        <div className="Box">
          <div className="Box-header">
            <h3 className="Box-title">
              <div className="mr-2">
                <button
                  className="btn btn-invisible bg-gray"
                  type="button"
                  onClick={() => this.handleFilterByState('OPEN')}
                >
                  <Octicon icon={GitPullRequest} className="text-green mr-1" />
                  Open
                  <span className="Counter ml-1">
                    {this.state.isLoading
                      ? '0'
                      : this.state.prs.filter(pr => {
                          return pr.state === 'OPEN';
                        }).length}
                  </span>
                </button>
                <button
                  className="btn btn-invisible bg-gray"
                  type="button"
                  onClick={() => this.handleFilterByState('CLOSED')}
                >
                  <Octicon icon={GitPullRequest} className="text-red mr-1" />
                  Closed
                  <span className="Counter ml-1">
                    {this.state.isLoading
                      ? '0'
                      : this.state.prs.filter(pr => {
                          return pr.state === 'CLOSED';
                        }).length}
                  </span>
                </button>
                <button
                  className="btn btn-invisible bg-gray"
                  type="button"
                  onClick={() => this.handleFilterByState('MERGED')}
                >
                  <Octicon icon={GitMerge} className="text-purple mr-1" />
                  Merged
                  <span className="Counter ml-1">
                    {this.state.isLoading
                      ? '0'
                      : this.state.prs.filter(pr => {
                          return pr.state === 'MERGED';
                        }).length}
                  </span>
                </button>
              </div>
            </h3>
          </div>

          {this.state.isLoading ? (
            <ul>
              <li className="Box-row text-center">
                <h2>
                  <span>Loading</span>
                  <span className="AnimatedEllipsis"></span>
                </h2>
              </li>
            </ul>
          ) : this.state.prComponents.length > 0 ? (
            <ul>{this.state.prComponents}</ul>
          ) : (
            <div class="blankslate">
              <img
                src="https://ghicons.github.com/assets/images/light/Pull%20Request.png"
                alt=""
                class="mb-3"
              />
              <h3 class="mb-1">
                You don't seem to have any pull requests to show...
              </h3>
              <p>
                You may need to select other filters to show your pull requests
                or you may not have any pull requests at all
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default PullRequestBox;
