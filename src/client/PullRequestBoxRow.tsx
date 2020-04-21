import React, { useState, useEffect } from 'react';
import Octicon, { GitPullRequest } from '@primer/octicons-react';
import PullRequestTimelineItem from './PullRequestTimelineItem';
import PullRequestDate from './PullRequestDate';
import ReviewerState from './ReviewerState';

interface IProps {
  pr: any;
}

const PullRequestBoxRow: React.FC<IProps> = ({ pr }) => {
  const [approved, setApproved] = useState<number>(0);
  const [changesRequested, setChangesRequested] = useState<number>(0);
  const [commented, setCommented] = useState<number>(0);
  const [awaiting, setAwaiting] = useState<number>(0);
  const [reviewers, setReviewers] = useState<any>({});

  useEffect(() => {
    let reviewers: any = {};

    // TODO: Abstract this logic. Typename should be the key.
    for (let timelineItem of pr.timelineItems.nodes) {
      if (
        timelineItem.__typename === 'ReviewRequestedEvent' &&
        timelineItem.requestedReviewer
      ) {
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

    let states: any = {
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
          <Octicon icon={GitPullRequest} className="text-green" />
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

          {/** TODO: Consider the scenario where a reviewer is excluded from the list */}
          <div className="d-table text-small text-gray-light">
            <ReviewerState type="APPROVED" count={approved} />
            <ReviewerState type="CHANGES_REQUESTED" count={changesRequested} />
            <ReviewerState type="COMMENTED" count={commented} />
            <ReviewerState type="AWAITING" count={awaiting} />
          </div>

          <details className="details-reset">
            <summary className="btn-link text-small">
              Events ({pr.timelineItems.nodes.length})
              <span className="dropdown-caret ml-1" />
            </summary>
            {pr.timelineItems.nodes.map((node: any) => {
              return <PullRequestTimelineItem key={node.id} node={node} />;
            })}
          </details>
        </div>
      </div>
    </li>
  );
};

export default PullRequestBoxRow;
