import React from 'react';
export const AppContext = React.createContext(null);

// TODO: Separate the Context : Auth Information <> App Information

export const appContextInitialState = {
  search: {
    user: '',
    searchType: 'author',
    pageInfo: {},
  },
  prs: [],
  prComponents: [],
  isLoading: false,
  count: 0,
};

// TODO: Revisit the responsibilities of this AppReducer action types

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COUNT':
      return {
        ...state,
        count: action.count,
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
    case 'UPDATE_SEARCH':
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};
