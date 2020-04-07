import React from 'react';
import Octicon, { GitPullRequest } from '@primer/octicons-react';

class PullRequestBoxHeader extends React.Component {
  state = {
    user: 'ckinan',
  };

  handleChange = (e) => {
    this.setState({ user: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchPullRequests(this.state.user);
  };

  componentDidMount() {
    this.props.fetchPullRequests(this.state.user);
  }

  render() {
    return (
      <div className="Box-header">
        <h3 className="Box-title">
          <div className="mr-2">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <Octicon icon={GitPullRequest} className="text-green mr-1" />
              Open
              <span className="Counter ml-1">{this.props.prs.length}</span>
              <input
                className="form-control ml-2"
                type="text"
                placeholder="User"
                value={this.state.user}
                onChange={(e) => this.handleChange(e)}
              />
            </form>
          </div>
        </h3>
      </div>
    );
  }
}

export default PullRequestBoxHeader;
