import React from 'react';
import PullRequestBoxRow from './PullRequestBoxRow';
import PullRequestBoxHeader from './PullRequestBoxHeader';

class PullRequestBox extends React.Component {
  state = {
    prs: [],
    prComponents: [],
    isLoading: true,
  };

  fetchPullRequests = async (user) => {
    this.setState({ isLoading: true });

    let prs = await fetch(
      `/.netlify/functions/gh-fetch-pull-requests?user=${user}`
    ).then(function (response) {
      return response.json();
    });

    this.setState({ prs: prs });
    this.setState({ isLoading: false });

    let prComponents = [];
    for (const pr of this.state.prs) {
      prComponents.push(<PullRequestBoxRow pr={pr} key={pr.id} />);
    }

    this.setState({ prComponents: prComponents });
  };

  render() {
    return (
      <>
        <div className="Box">
          <PullRequestBoxHeader
            handleFilterByState={this.handleFilterByState}
            isLoading={this.state.isLoading}
            prs={this.state.prs}
            fetchPullRequests={this.fetchPullRequests}
          />

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
            <div className="blankslate">
              <h3 className="mb-1">No results matched your search.</h3>
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
