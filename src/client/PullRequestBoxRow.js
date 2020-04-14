import React, { useState, useEffect } from 'react';
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

const PullRequestBoxRow = ({ pr }) => {
  const [approved, setApproved] = useState(0);
  const [changesRequested, setChangesRequested] = useState(0);
  const [commented, setCommented] = useState(0);
  const [awaiting, setAwaiting] = useState(0);
  const [reviewers, setReviewers] = useState({});

  useEffect(() => {
    let reviewers = {};

    for (let timelineItem of pr.timelineItems.nodes) {
      if (timelineItem.__typename === 'ReviewRequestedEvent') {
        reviewers[timelineItem.requestedReviewer.login] = 'AWAITING';
      } else if (
        timelineItem.__typename === 'PullRequestReview' &&
        timelineItem.author.login !== pr.author.login
      ) {
        if (
          timelineItem.state === 'APPROVED' ||
          timelineItem.state === 'CHANGES_REQUESTED'
        ) {
          reviewers[timelineItem.author.login] = timelineItem.state;
        } else if (
          timelineItem.state === 'COMMENTED' &&
          reviewers[timelineItem.author.login] === 'AWAITING'
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

    setApproved(states.APPROVED);
    setChangesRequested(states.CHANGES_REQUESTED);
    setCommented(states.COMMENTED);
    setAwaiting(states.AWAITING);
    setReviewers(reviewers);
  }, []);

  return (
    <li className="Box-row pt-2 pb-2">
      <div>
        <div className="d-table-cell">
          {pr.state === 'MERGED' ? (
            <Octicon icon={GitMerge} className="text-purple" />
          ) : pr.state === 'OPEN' ? (
            <Octicon icon={GitPullRequest} className="text-green" />
          ) : (
            <Octicon icon={GitPullRequest} className="text-red" />
          )}
        </div>
        <div className="d-table-cell pl-2">
          <div className="mb-1">
            <strong>
              <a
                href={pr.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray"
              >
                {pr.repository.nameWithOwner}
              </a>
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-gray-dark"
              >
                #{pr.number} {pr.title}
              </a>
            </strong>
          </div>

          <div className="d-table text-small text-gray-light mb-1">
            <div className="float-md-left pr-3">
              <strong>Created by</strong>: {pr.author.login}
            </div>
            <PullRequestDate label="Created at" date={pr.createdAt} />
            <PullRequestDate label="Updated at" date={pr.updatedAt} />
            <PullRequestDate label="Closed at" date={pr.closedAt} />
            <PullRequestDate label="Merged at" date={pr.mergedAt} />
          </div>

          <div className="d-table text-small text-gray-light">
            <div className="float-md-left pr-3">
              <strong>
                <Octicon icon={Check} className="text-green" /> Approved
              </strong>
              : <span>{approved}</span>
            </div>
            <div className="float-md-left pr-3">
              <strong>
                <Octicon icon={RequestChanges} className="text-red" /> Requested
                Changes
              </strong>
              : <span>{changesRequested}</span>
            </div>
            <div className="float-md-left pr-3">
              <strong>
                <Octicon icon={Comment} className="text-gray" /> Commented
              </strong>
              : <span>{commented}</span>
            </div>
            <div className="float-md-left pr-3">
              <strong>
                <Octicon icon={PrimitiveDot} className="text-yellow" /> Awaiting
              </strong>
              : <span>{awaiting}</span>
            </div>
          </div>

          <details className="details-reset">
            <summary className="btn-link text-small">
              Events <span className="dropdown-caret" />
            </summary>
            {pr.timelineItems.nodes.map((node) => {
              return <PullRequestTimelineItem key={node.id} node={node} />;
            })}
          </details>
        </div>
      </div>
    </li>
  );
};

export default PullRequestBoxRow;
