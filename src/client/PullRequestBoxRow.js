import React from 'react';
import Octicon, {
  GitMerge,
  GitPullRequest,
  Flame,
  Eye,
  GitCommit,
  Comment,
  Check,
  RequestChanges,
  Info,
} from '@primer/octicons-react';
import moment from 'moment';
import PullRequestTimelineItem from './PullRequestTimelineItem';

const PullRequestBoxRow = (props) => {
  return (
    <li className="Box-row">
      <div>
        <div className="d-table-cell">
          {props.pr.state === 'MERGED' ? (
            <Octicon icon={GitMerge} className="text-purple" />
          ) : props.pr.state === 'OPEN' ? (
            <Octicon icon={GitPullRequest} className="text-green" />
          ) : (
            <Octicon icon={GitPullRequest} className="text-red" />
          )}
        </div>
        <div className="d-table-cell pl-2">
          <div className="mb-1">
            <strong>
              <a
                href={props.pr.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray"
              >
                {props.pr.repository.nameWithOwner}
              </a>
              <a
                href={props.pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-gray-dark"
              >
                #{props.pr.number} {props.pr.title}
              </a>
            </strong>
          </div>

          <div className="d-table text-small text-gray-light mb-2">
            <div className="float-md-left pr-3">
              <strong>Created by</strong>: {props.pr.author.login}
            </div>
            <div className="float-md-left pr-3">
              <strong>Created at</strong>:{' '}
              <span
                className="tooltipped tooltipped-s"
                aria-label={new Date(props.pr.createdAt).toString()}
              >
                {moment.utc(props.pr.createdAt).fromNow()}
              </span>
            </div>
            <div className="float-md-left pr-3">
              <strong>Updated at</strong>:{' '}
              <span
                className="tooltipped tooltipped-s"
                aria-label={new Date(props.pr.updatedAt).toString()}
              >
                {moment.utc(props.pr.updatedAt).fromNow()}
              </span>
            </div>
            <div className="float-md-left pr-3">
              <strong>Closed at</strong>:{' '}
              <span
                className="tooltipped tooltipped-s"
                aria-label={
                  props.pr.closedAt
                    ? new Date(props.pr.closedAt).toString()
                    : '-'
                }
              >
                {props.pr.closedAt
                  ? moment.utc(props.pr.closedAt).fromNow()
                  : '-'}
              </span>
            </div>
            <div className="float-md-left">
              <strong>Merged at</strong>:{' '}
              <span
                className="tooltipped tooltipped-s"
                aria-label={
                  props.pr.mergedAt
                    ? new Date(props.pr.mergedAt).toString()
                    : '-'
                }
              >
                {props.pr.mergedAt
                  ? moment.utc(props.pr.mergedAt).fromNow()
                  : '-'}
              </span>
            </div>
          </div>

          {props.pr.timelineItems.nodes.map((node) => {
            return (
              <React.Fragment key={node.id}>
                {node.__typename === 'PullRequestCommit' ? (
                  <PullRequestTimelineItem
                    icon={GitCommit}
                    className="text-gray"
                    avatarUrl={node.commit.author.user.avatarUrl}
                    date={node.commit.committedDate}
                    text={`${node.commit.message} ${node.commit.abbreviatedOid}`}
                  />
                ) : node.__typename === 'ReviewRequestedEvent' ? (
                  <PullRequestTimelineItem
                    icon={Eye}
                    className="text-gray"
                    avatarUrl={node.actor.avatarUrl}
                    date={node.createdAt}
                    text={`${node.actor.login} requested a review from ${node.requestedReviewer.login}`}
                  />
                ) : node.__typename === 'IssueComment' ? (
                  <PullRequestTimelineItem
                    icon={Comment}
                    className="text-gray"
                    avatarUrl={node.author.avatarUrl}
                    date={node.updatedAt}
                    text={`${node.author.login} wrote a comment`}
                  />
                ) : node.__typename === 'PullRequestReview' &&
                  node.state === 'APPROVED' ? (
                  <PullRequestTimelineItem
                    icon={Check}
                    className="text-green"
                    avatarUrl={node.author.avatarUrl}
                    date={node.submittedAt}
                    text={`${node.author.login} approved these changes`}
                  />
                ) : node.__typename === 'PullRequestReview' &&
                  node.state === 'CHANGES_REQUESTED' ? (
                  <PullRequestTimelineItem
                    icon={RequestChanges}
                    className="text-red"
                    avatarUrl={node.author.avatarUrl}
                    date={node.submittedAt}
                    text={`${node.author.login} requested changes`}
                  />
                ) : node.__typename === 'PullRequestReview' &&
                  node.state === 'COMMENTED' ? (
                  <PullRequestTimelineItem
                    icon={Info}
                    className="text-gray"
                    avatarUrl={node.author.avatarUrl}
                    date={node.submittedAt}
                    text={`${node.author.login} reviewed`}
                  />
                ) : (
                  <PullRequestTimelineItem
                    icon={Info}
                    className="text-gray"
                    avatarUrl="-"
                    date="-"
                    text={`${node.__typename} event happened`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </li>
  );
};

export default PullRequestBoxRow;
