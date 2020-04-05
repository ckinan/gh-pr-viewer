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

export default PullRequestTimelineItem;
