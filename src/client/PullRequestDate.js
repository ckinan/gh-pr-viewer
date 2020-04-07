import React from 'react';
import moment from 'moment';

const PullRequestDate = (props) => {
  return props.date ? (
    <div className="float-md-left pr-3">
      <strong>{props.label}</strong>:{' '}
      <span
        className="tooltipped tooltipped-s"
        aria-label={props.date ? new Date(props.date).toString() : '-'}
      >
        {props.date ? moment.utc(props.date).fromNow() : '-'}
      </span>
    </div>
  ) : (
    <></>
  );
};

export default PullRequestDate;
