import React from 'react';
import Octicon, {
  Eye,
  GitCommit,
  Comment,
  Check,
  RequestChanges,
  Info,
} from '@primer/octicons-react';
import moment from 'moment';

const PullRequestTimelineItem = (props) => {
  return (
    <div className="TimelineItem TimelineItem--condensed">
      <div className="TimelineItem-badge">
        <Octicon
          icon={timelineItemConfig[props.type].icon(props.node)}
          className={timelineItemConfig[props.type].className(props.node)}
        />
      </div>
      <div className="TimelineItem-body">
        <img
          className="avatar mr-1"
          height="20"
          width="20"
          src={timelineItemConfig[props.type].avatarUrl(props.node)}
          alt="prItem"
        />
        <span
          className="tooltipped tooltipped-s"
          aria-label={
            timelineItemConfig[props.type].date(props.node)
              ? new Date(
                  timelineItemConfig[props.type].date(props.node)
                ).toString()
              : '-'
          }
        >
          {timelineItemConfig[props.type].date(props.node)
            ? moment
                .utc(timelineItemConfig[props.type].date(props.node))
                .fromNow()
            : '-'}
          {': '}
        </span>
        <span>{timelineItemConfig[props.type].text(props.node)}</span>
      </div>
    </div>
  );
};

const timelineItemConfig = {
  PullRequestCommit: {
    icon: () => {
      return GitCommit;
    },
    className: () => {
      return 'text-gray';
    },
    avatarUrl: (node) => {
      return node.commit.author.user.avatarUrl;
    },
    date: (node) => {
      return node.commit.committedDate;
    },
    text: (node) => {
      return `${node.commit.message} ${node.commit.abbreviatedOid}`;
    },
  },
  ReviewRequestedEvent: {
    icon: () => {
      return Eye;
    },
    className: () => {
      return 'text-gray';
    },
    avatarUrl: (node) => {
      return node.actor.avatarUrl;
    },
    date: (node) => {
      return node.createdAt;
    },
    text: (node) => {
      return `${node.actor.login} requested a review from ${node.requestedReviewer.login}`;
    },
  },
  IssueComment: {
    icon: () => {
      return Comment;
    },
    className: () => {
      return 'text-gray';
    },
    avatarUrl: (node) => {
      return node.author.avatarUrl;
    },
    date: (node) => {
      return node.updatedAt;
    },
    text: (node) => {
      return `${node.author.login} wrote a comment`;
    },
  },
  PullRequestReview: {
    icon: (node) => {
      if (node.state === 'APPROVED') {
        return Check;
      } else if (node.state === 'CHANGES_REQUESTED') {
        return RequestChanges;
      } else if (node.state === 'COMMENTED') {
        return Info;
      }
    },
    className: (node) => {
      if (node.state === 'APPROVED') {
        return 'text-green';
      } else if (node.state === 'CHANGES_REQUESTED') {
        return 'text-red';
      } else if (node.state === 'COMMENTED') {
        return 'text-gray';
      }
    },
    avatarUrl: (node) => {
      return node.author.avatarUrl;
    },
    date: (node) => {
      return node.submittedAt;
    },
    text: (node) => {
      if (node.state === 'APPROVED') {
        return `${node.author.login} approved these changes`;
      } else if (node.state === 'CHANGES_REQUESTED') {
        return `${node.author.login} requested changes`;
      } else if (node.state === 'COMMENTED') {
        return `${node.author.login} reviewed`;
      }
    },
  },
};

export default PullRequestTimelineItem;
