import React from 'react';
import Octicon, {
  Check,
  RequestChanges,
  Comment,
  PrimitiveDot,
} from '@primer/octicons-react';

interface IProps {
  type: string;
  count: number;
}

const ReviewerState: React.FC<IProps> = ({ type, count }) => {
  return (
    <>
      <div className="float-md-left pr-3">
        <strong>
          <Octicon
            icon={CONFIG[type].icon}
            className={CONFIG[type].className}
          />
          <span className="ml-1">{CONFIG[type].text}</span>
        </strong>
        : <span>{count}</span>
      </div>
    </>
  );
};

export default ReviewerState;

const CONFIG: any = {
  APPROVED: {
    icon: Check,
    className: 'text-green',
    text: 'Approved',
  },
  CHANGES_REQUESTED: {
    icon: RequestChanges,
    className: 'text-red',
    text: 'Requested Changes',
  },
  COMMENTED: {
    icon: Comment,
    className: 'text-gray',
    text: 'Commented',
  },
  AWAITING: {
    icon: PrimitiveDot,
    className: 'text-yellow',
    text: 'Awaiting',
  },
};
