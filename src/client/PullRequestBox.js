import React from 'react';
import PullRequestBoxRow from './PullRequestBoxRow';
import Octicon, { GitPullRequest, GitMerge } from '@primer/octicons-react';

class PullRequestBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prList: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    let prs = await fetch('/.netlify/functions/gh-fetch-pull-requests').then(
      function(response) {
        return response.json();
      }
    );

    let prList = [];
    for (const pr of prs) {
      prList.push(<PullRequestBoxRow pr={pr} key={pr.id} />);
    }

    this.setState({ prList: prList });
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <>
        <div className="Box">
          <div className="Box-header">
            <h3 className="Box-title">
              <div className="mr-2">
                <button className="btn btn-invisible bg-gray" type="button">
                  <Octicon icon={GitPullRequest} className="text-green mr-1" />
                  Open
                  <span className="Counter ml-1">
                    {this.state.isLoading
                      ? '0'
                      : this.state.prList.filter(comp => {
                          return comp.props.pr.state === 'OPEN';
                        }).length}
                  </span>
                </button>
                <button className="btn btn-invisible bg-gray" type="button">
                  <Octicon icon={GitPullRequest} className="text-red mr-1" />
                  Closed
                  <span className="Counter ml-1">
                    {this.state.isLoading
                      ? '0'
                      : this.state.prList.filter(comp => {
                          return comp.props.pr.state === 'CLOSED';
                        }).length}
                  </span>
                </button>
                <button className="btn btn-invisible bg-gray" type="button">
                  <Octicon icon={GitMerge} className="text-purple mr-1" />
                  Merged
                  <span className="Counter ml-1">
                    {this.state.isLoading
                      ? '0'
                      : this.state.prList.filter(comp => {
                          return comp.props.pr.state === 'MERGED';
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
          ) : (
            <ul>{this.state.prList}</ul>
          )}
        </div>
      </>
    );
  }
}

export default PullRequestBox;
