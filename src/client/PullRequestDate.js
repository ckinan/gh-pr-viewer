import React from 'react';
import moment from 'moment';

const PullRequestDate = ({label, date}) => {
  return date ? (
    <div className="float-md-left pr-3">
      <strong>{label}</strong>:{' '}
      <span
        className="tooltipped tooltipped-s"
        aria-label={date ? new Date(date).toString() : '-'}
      >
        {date ? moment.utc(date).fromNow() : '-'}
      </span>
    </div>
  ) : (
    <></>
  );
};

export default PullRequestDate;
