import React from 'react';

const Header = ({ avatarUrl }) => {
  return (
    <div className="Header">
      <div className="Header-item Header-item--full">
        <span>Github Pull Request Viewer</span>
      </div>
      <div className="Header-item mr-0">
        {avatarUrl ? (
          <img
            className="avatar"
            height="20"
            alt="@octocat"
            src={avatarUrl}
            width="20"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
