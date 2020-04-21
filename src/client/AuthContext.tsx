import React from 'react';

export const AuthContext = React.createContext(null);

export const authContextInitialState = {
  loggedInUser: {},
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_LOGGED_IN':
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      };
    default:
      return state;
  }
};
