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

const PullRequestTimelineItem = (props) => {
  return (
    <div className="TimelineItem TimelineItem--condensed">
      <div className="TimelineItem-badge">
        <Octicon icon={props.icon} className={props.className} />
      </div>
      <div className="TimelineItem-body">
        <img
          className="avatar mr-1"
          height="20"
          width="20"
          src={props.avatarUrl}
          alt="prItem"
        />
        <span
          className="tooltipped tooltipped-s"
          aria-label={props.date ? new Date(props.date).toString() : '-'}
        >
          {props.date ? moment.utc(props.date).fromNow() : '-'}
          {': '}
        </span>
        {props.text}
      </div>
    </div>
  );
};

const timelineItemConfig = {
  PullRequestCommit: {
    icon: GitCommit,
    className: 'text-gray',
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
    icon: Eye,
    className: 'text-gray',
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
    icon: Comment,
    className: 'text-gray',
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
    icon: Comment,
    className: 'text-gray',
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
};

export default PullRequestTimelineItem;
