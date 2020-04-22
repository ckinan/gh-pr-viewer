import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom';

interface IProps {
  avatarUrl: string;
}

const Header: React.FC<IProps> = ({ avatarUrl }) => {
  const { authState, authDispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    fetch('/api/gh-logout').then((response) => {
      if (response.ok) {
        authDispatch({
          type: 'UPDATE_USER_LOGGED_IN',
          loggedInUser: {},
        });
        document.title = `gh-pr-viewer`;
        history.push(`/`);
      }
    });
  };

  return (
    <div className="Header">
      <div className="Header-item Header-item--full">
        <span>gh-pr-viewer</span>
      </div>
      {(authState.loggedInUser && authState.loggedInUser.login) ||
      authState.loggedInUser.isLoginGhWebFlow === false ? (
        <div className="Header-item mr-0">
          <details className="dropdown details-reset details-overlay d-inline-block">
            <summary aria-haspopup="true">
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
              <div className="dropdown-caret ml-1"></div>
            </summary>

            <ul className="dropdown-menu dropdown-menu-sw mt-2">
              <li>
                <a
                  className="dropdown-item text-small"
                  href={authState.loggedInUser.url}
                >
                  Signed in as <strong>{authState.loggedInUser.login}</strong>
                </a>
              </li>
              {authState.loggedInUser.isLoginGhWebFlow === true ? (
                <>
                  <li className="dropdown-divider" role="separator"></li>
                  <li>
                    <a
                      className="dropdown-item text-small"
                      onClick={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ) => handleLogout(e)}
                    >
                      Sign out
                    </a>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </details>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
