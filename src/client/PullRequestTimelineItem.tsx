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

interface IProps {
  node: any;
}

const PullRequestTimelineItem: React.FC<IProps> = ({ node }) => {
  return (
    <div className="TimelineItem TimelineItem--condensed text-small">
      <div className="TimelineItem-badge">
        <Octicon
          icon={timelineItemConfig[node.__typename].icon(node)}
          className={timelineItemConfig[node.__typename].className(node)}
        />
      </div>
      <div className="TimelineItem-body">
        <img
          className="avatar mr-1"
          height="20"
          width="20"
          src={timelineItemConfig[node.__typename].avatarUrl(node)}
          alt="prItem"
        />
        <span
          className="tooltipped tooltipped-s"
          aria-label={
            timelineItemConfig[node.__typename].date(node)
              ? new Date(
                  timelineItemConfig[node.__typename].date(node)
                ).toString()
              : '-'
          }
        >
          {timelineItemConfig[node.__typename].date(node)
            ? moment
                .utc(timelineItemConfig[node.__typename].date(node))
                .fromNow()
            : '-'}
          {': '}
        </span>
        <span>{timelineItemConfig[node.__typename].text(node)}</span>
      </div>
    </div>
  );
};

const timelineItemConfig: any = {
  PullRequestCommit: {
    icon: () => {
      return GitCommit;
    },
    className: () => {
      return 'text-gray';
    },
    avatarUrl: (node: any) => {
      return node.commit.author.avatarUrl;
    },
    date: (node: any) => {
      return node.commit.committedDate;
    },
    text: (node: any) => {
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
    avatarUrl: (node: any) => {
      return node.actor.avatarUrl;
    },
    date: (node: any) => {
      return node.createdAt;
    },
    text: (node: any) => {
      return `${node.actor.login} requested a review from ${
        node.requestedReviewer ? node.requestedReviewer.login : '(unknown)'
      }`;
    },
  },
  IssueComment: {
    icon: () => {
      return Comment;
    },
    className: () => {
      return 'text-gray';
    },
    avatarUrl: (node: any) => {
      return node.author ? node.author.avatarUrl : '';
    },
    date: (node: any) => {
      return node.updatedAt;
    },
    text: (node: any) => {
      return `${node.author ? node.author.login : '(unknown)'} wrote a comment`;
    },
  },
  PullRequestReview: {
    icon: (node: any) => {
      if (node.state === 'APPROVED') {
        return Check;
      } else if (node.state === 'CHANGES_REQUESTED') {
        return RequestChanges;
      } else if (node.state === 'COMMENTED') {
        return Info;
      } else if (node.state === 'PENDING') {
        return Eye;
      }
    },
    className: (node: any) => {
      if (node.state === 'APPROVED') {
        return 'text-green';
      } else if (node.state === 'CHANGES_REQUESTED') {
        return 'text-red';
      } else if (node.state === 'COMMENTED') {
        return 'text-gray';
      }
    },
    avatarUrl: (node: any) => {
      return node.author.avatarUrl;
    },
    date: (node: any) => {
      return node.updatedAt;
    },
    text: (node: any) => {
      if (node.state === 'APPROVED') {
        return `${node.author.login} approved these changes`;
      } else if (node.state === 'CHANGES_REQUESTED') {
        return `${node.author.login} requested changes`;
      } else if (node.state === 'COMMENTED') {
        return `${node.author.login} reviewed`;
      } else if (node.state === 'PENDING') {
        return `${node.author.login} has a pending review`;
      }
    },
  },
};

export default PullRequestTimelineItem;
