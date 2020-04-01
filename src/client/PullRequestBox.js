import React from 'react';
import PullRequestBoxRow from './PullRequestBoxRow';

class PullRequestBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prList: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    let repos = await fetch('/.netlify/functions/gh-fetch-repos').then(function(
      response
    ) {
      return response.json();
    });

    let prList = [];
    for (const repo of repos) {
      let prs = await fetch(
        '/.netlify/functions/gh-fetch-pulls?repo=' + repo.full_name
      ).then(function(response) {
        return response.json();
      });

      for (const pr of prs) {
        prList.push(<PullRequestBoxRow pr={pr} repo={repo} key={pr.id} />);
      }
    }

    this.setState({ prList: prList });
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <>
        <div className="pagehead">
          <h1>Pull Requests</h1>
        </div>

        <div className="Box Box--condensed">
          <div className="Box-header">
            <h3 className="Box-title">
              {this.state.isLoading ? '' : this.state.prList.length} Pull
              Requests
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
