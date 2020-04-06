import React from 'react';
import Octicon, { GitPullRequest, GitMerge } from '@primer/octicons-react';

class PullRequestBoxHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'ckinan' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  keyPress = (e) => {
    if (e.keyCode == 13) {
      console.log('value', e.target.value);
      this.props.fetchPullRequests(this.state.value);
    }
  };

  componentDidMount() {
    this.props.fetchPullRequests(this.state.value);
  }

  render() {
    return (
      <div className="Box-header">
        <h3 className="Box-title">
          <div className="mr-2">
            {Object.keys(stateFilterConfig).map((state) => {
              return (
                <button
                  className="btn btn-invisible bg-gray"
                  type="button"
                  onClick={(e) => this.props.handleFilterByState(state)}
                  key={state}
                >
                  <Octicon
                    icon={stateFilterConfig[state].icon}
                    className={stateFilterConfig[state].octiconClass}
                  />
                  {stateFilterConfig[state].description}
                  <span className="Counter ml-1">
                    {this.props.isLoading
                      ? '0'
                      : this.props.prs.filter((pr) => {
                          return pr.state === state;
                        }).length}
                  </span>
                </button>
              );
            })}
            <input
              className="form-control ml-2"
              type="text"
              placeholder="User"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.keyPress}
            />
          </div>
        </h3>
      </div>
    );
  }
}

const stateFilterConfig = {
  OPEN: {
    description: 'Open',
    icon: GitPullRequest,
    octiconClass: 'text-green mr-1',
  },
  CLOSED: {
    description: 'Closed',
    icon: GitPullRequest,
    octiconClass: 'text-red mr-1',
  },
  MERGED: {
    description: 'Merged',
    icon: GitMerge,
    octiconClass: 'text-purple mr-1',
  },
};

export default PullRequestBoxHeader;
