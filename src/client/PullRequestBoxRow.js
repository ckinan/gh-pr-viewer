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
              <>
                {node.__typename === 'PullRequestCommit' ? (
                  <div class="TimelineItem TimelineItem--condensed">
                    <div class="TimelineItem-badge">
                      <Octicon icon={GitCommit} className="text-gray" />
                    </div>
                    <div class="TimelineItem-body">
                      <img
                        className="avatar mr-1"
                        height="20"
                        width="20"
                        src={node.commit.author.user.avatarUrl}
                      />
                      <span
                        className="tooltipped tooltipped-s"
                        aria-label={
                          node.commit.committedDate
                            ? new Date(node.commit.committedDate).toString()
                            : '-'
                        }
                      >
                        {node.commit.committedDate
                          ? moment.utc(node.commit.committedDate).fromNow()
                          : '-'}
                        {': '}
                      </span>
                      {node.commit.message} {node.commit.abbreviatedOid}
                    </div>
                  </div>
                ) : node.__typename === 'ReviewRequestedEvent' ? (
                  <div class="TimelineItem TimelineItem--condensed">
                    <div class="TimelineItem-badge">
                      <Octicon icon={Eye} className="text-gray" />
                    </div>
                    <div class="TimelineItem-body">
                      <img
                        className="avatar mr-1"
                        height="20"
                        width="20"
                        src={node.actor.avatarUrl}
                      />
                      <span
                        className="tooltipped tooltipped-s"
                        aria-label={
                          node.createdAt
                            ? new Date(node.createdAt).toString()
                            : '-'
                        }
                      >
                        {node.createdAt
                          ? moment.utc(node.createdAt).fromNow()
                          : '-'}
                        {': '}
                      </span>
                      {node.actor.login} requested a review from{' '}
                      {node.requestedReviewer.login}
                    </div>
                  </div>
                ) : node.__typename === 'IssueComment' ? (
                  <div class="TimelineItem TimelineItem--condensed">
                    <div class="TimelineItem-badge">
                      <Octicon icon={Comment} className="text-gray" />
                    </div>
                    <div class="TimelineItem-body">
                      <img
                        className="avatar mr-1"
                        height="20"
                        width="20"
                        src={node.author.avatarUrl}
                      />
                      <span
                        className="tooltipped tooltipped-s"
                        aria-label={
                          node.updatedAt
                            ? new Date(node.updatedAt).toString()
                            : '-'
                        }
                      >
                        {node.updatedAt
                          ? moment.utc(node.updatedAt).fromNow()
                          : '-'}
                        {': '}
                      </span>
                      {node.author.login} wrote a comment
                    </div>
                  </div>
                ) : node.__typename === 'PullRequestReview' ? (
                  <div class="TimelineItem TimelineItem--condensed">
                    {node.state === 'APPROVED' ? (
                      <>
                        <div class="TimelineItem-badge">
                          <Octicon icon={Check} className="text-green" />
                        </div>
                        <div class="TimelineItem-body">
                          <img
                            className="avatar mr-1"
                            height="20"
                            width="20"
                            src={node.author.avatarUrl}
                          />
                          <span
                            className="tooltipped tooltipped-s"
                            aria-label={
                              node.submittedAt
                                ? new Date(node.submittedAt).toString()
                                : '-'
                            }
                          >
                            {node.submittedAt
                              ? moment.utc(node.submittedAt).fromNow()
                              : '-'}
                            {': '}
                          </span>
                          {node.author.login} approved these changes
                        </div>
                      </>
                    ) : node.state === 'CHANGES_REQUESTED' ? (
                      <>
                        <div class="TimelineItem-badge">
                          <Octicon icon={RequestChanges} className="text-red" />
                        </div>
                        <div class="TimelineItem-body">
                          <img
                            className="avatar mr-1"
                            height="20"
                            width="20"
                            src={node.author.avatarUrl}
                          />
                          <span
                            className="tooltipped tooltipped-s"
                            aria-label={
                              node.submittedAt
                                ? new Date(node.submittedAt).toString()
                                : '-'
                            }
                          >
                            {node.submittedAt
                              ? moment.utc(node.submittedAt).fromNow()
                              : '-'}
                            {': '}
                          </span>
                          {node.author.login} requested changes
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="TimelineItem-badge">
                          <Octicon icon={Info} className="text-gray" />
                        </div>
                        <div class="TimelineItem-body">
                          <img
                            className="avatar mr-1"
                            height="20"
                            width="20"
                            src={node.author.avatarUrl}
                          />
                          <span
                            className="tooltipped tooltipped-s"
                            aria-label={
                              node.submittedAt
                                ? new Date(node.submittedAt).toString()
                                : '-'
                            }
                          >
                            {node.submittedAt
                              ? moment.utc(node.submittedAt).fromNow()
                              : '-'}
                            {': '}
                          </span>
                          {node.author.login} reviewed
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div class="TimelineItem TimelineItem--condensed">
                    <img
                      className="avatar mr-1"
                      height="20"
                      width="20"
                      src={node.author.avatarUrl}
                    />
                    <div class="TimelineItem-badge">
                      <Octicon icon={Flame} className="text-red" />
                    </div>
                    <div class="TimelineItem-body">{node.__typename}</div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </li>
  );
};

export default PullRequestBoxRow;
