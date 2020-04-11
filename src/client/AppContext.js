import React from 'react';
export const AppContext = React.createContext();

export const initialState = {
  prs: [],
  prComponents: [],
  isLoading: false,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_PRS':
      return {
        ...state,
        prs: action.prs,
      };
    case 'UPDATE_PR_COMPONENTS':
      return {
        ...state,
        prComponents: action.prComponents,
      };
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
