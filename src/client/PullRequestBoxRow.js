import React from 'react';
import Octicon, {
  GitMerge,
  GitPullRequest,
  Flame,
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

          <div className="d-table text-small text-gray-light">
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
              <div class="TimelineItem TimelineItem--condensed mt-2">
                <div class="TimelineItem-badge">
                  <Octicon icon={Flame} className="text-red" />
                </div>
                <div class="TimelineItem-body">{node.__typename}</div>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
};

export default PullRequestBoxRow;
