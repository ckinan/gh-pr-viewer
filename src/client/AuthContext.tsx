import React from 'react';

interface IState {
  loggedInUser: any;
}

interface IAction {
  type: 'UPDATE_USER_LOGGED_IN';
  loggedInUser: IState;
}

export const AuthContext = React.createContext<any | null>(null);

export const authContextInitialState = {
  loggedInUser: {},
};

export const AuthReducer = (state: IState, action: IAction) => {
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
