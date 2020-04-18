import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { useHistory, useParams, useLocation } from 'react-router-dom';

const Header = ({ avatarUrl }) => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('/api/gh-logout').then((response) => {
      if (response.ok) {
        dispatch({
          type: 'UPDATE_USER_LOGGED_IN',
          loggedInUser: {},
        });
        document.title = `Github Pull Request Viewer`;
        history.push(`/`);
      }
    });
  };

  return (
    <div className="Header">
      <div className="Header-item Header-item--full">
        <span>Github Pull Request Viewer</span>
      </div>
      {Object.keys(state.loggedInUser).length > 0 ? (
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
                  href={state.loggedInUser.url}
                >
                  Signed in as <strong>{state.loggedInUser.login}</strong>
                </a>
              </li>
              {state.loggedInUser.isLoginGhWebFlow === true ? (
                <>
                  <li className="dropdown-divider" role="separator"></li>
                  <li>
                    <a
                      className="dropdown-item text-small"
                      onClick={(e) => handleLogout(e)}
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
