import React from 'react';
import Octicon, {
  GitMerge,
  GitPullRequest,
  Check,
  RequestChanges,
  Comment,
  PrimitiveDot,
} from '@primer/octicons-react';
import PullRequestTimelineItem from './PullRequestTimelineItem';
import PullRequestDate from './PullRequestDate';

class PullRequestBoxRow extends React.Component {
  state = {
    approved: 0,
    changesRequested: 0,
    commented: 0,
    awaiting: 0,
    reviewers: {},
  };

  componentDidMount() {
    let reviewers = {};

    for (let timelineItem of this.props.pr.timelineItems.nodes) {
      if (timelineItem.__typename === 'ReviewRequestedEvent') {
        reviewers[timelineItem.requestedReviewer.login] = 'AWAITING';
      } else if (
        timelineItem.__typename === 'PullRequestReview' &&
        timelineItem.author.login !== this.props.pr.author.login
      ) {
        if (
          timelineItem.state === 'APPROVED' ||
          timelineItem.state === 'CHANGES_REQUESTED'
        ) {
          reviewers[timelineItem.author.login] = timelineItem.state;
        } else if (
          timelineItem.state === 'COMMENTED' &&
          (!reviewers[timelineItem.author.login] ||
            !reviewers[timelineItem.author.login] === 'AWAITING')
        ) {
          reviewers[timelineItem.author.login] = 'COMMENTED';
        }
      }
    }

    let states = {
      APPROVED: 0,
      CHANGES_REQUESTED: 0,
      COMMENTED: 0,
      AWAITING: 0,
    };

    for (const key in reviewers) {
      states[reviewers[key]] += 1;
    }

    this.setState({
      approved: states.APPROVED,
      changesRequested: states.CHANGES_REQUESTED,
      commented: states.COMMENTED,
      awaiting: states.AWAITING,
      reviewers: reviewers,
    });
  }

  render() {
    return (
      <li className="Box-row">
        <div>
          <div className="d-table-cell">
            {this.props.pr.state === 'MERGED' ? (
              <Octicon icon={GitMerge} className="text-purple" />
            ) : this.props.pr.state === 'OPEN' ? (
              <Octicon icon={GitPullRequest} className="text-green" />
            ) : (
              <Octicon icon={GitPullRequest} className="text-red" />
            )}
          </div>
          <div className="d-table-cell pl-2">
            <div className="mb-1">
              <strong>
                <a
                  href={this.props.pr.repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray"
                >
                  {this.props.pr.repository.nameWithOwner}
                </a>
                <a
                  href={this.props.pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-gray-dark"
                >
                  #{this.props.pr.number} {this.props.pr.title}
                </a>
              </strong>
            </div>

            <div className="d-table text-small text-gray-light mb-1">
              <div className="float-md-left pr-3">
                <strong>Created by</strong>: {this.props.pr.author.login}
              </div>
              <PullRequestDate
                label="Created at"
                date={this.props.pr.createdAt}
              />
              <PullRequestDate
                label="Updated at"
                date={this.props.pr.updatedAt}
              />
              <PullRequestDate
                label="Closed at"
                date={this.props.pr.closedAt}
              />
              <PullRequestDate
                label="Merged at"
                date={this.props.pr.mergedAt}
              />
            </div>

            <div className="d-table text-small text-gray-light">
              <div className="float-md-left pr-3">
                <strong>
                  <Octicon icon={Check} className="text-green" /> Approved
                </strong>
                : <span>{this.state.approved}</span>
              </div>
              <div className="float-md-left pr-3">
                <strong>
                  <Octicon icon={RequestChanges} className="text-red" />{' '}
                  Requested Changes
                </strong>
                : <span>{this.state.changesRequested}</span>
              </div>
              <div className="float-md-left pr-3">
                <strong>
                  <Octicon icon={Comment} className="text-gray" /> Commented
                </strong>
                : <span>{this.state.commented}</span>
              </div>
              <div className="float-md-left pr-3">
                <strong>
                  <Octicon icon={PrimitiveDot} className="text-yellow" />{' '}
                  Awaiting
                </strong>
                : <span>{this.state.awaiting}</span>
              </div>
            </div>

            <details className="details-reset">
              <summary className="btn-link text-small">
                Events <span className="dropdown-caret" />
              </summary>
              {this.props.pr.timelineItems.nodes.map((node) => {
                return (
                  <PullRequestTimelineItem
                    key={node.id}
                    type={node.__typename}
                    node={node}
                  />
                );
              })}
            </details>
          </div>
        </div>
      </li>
    );
  }
}

export default PullRequestBoxRow;
