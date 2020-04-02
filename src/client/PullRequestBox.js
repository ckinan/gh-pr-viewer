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
