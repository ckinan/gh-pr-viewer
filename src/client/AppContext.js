import React from 'react';
export const AppContext = React.createContext();

export const initialState = {
  prs: [],
  prComponents: [],
  isLoading: false,
  count: 0,
  pageInfo: {
    startCursor: '',
    hasPreviousPage: false,
    hasNextPage: false,
    endCursor: '',
  },
};

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
    case 'UPDATE_PAGE_INFO':
      return {
        ...state,
        pageInfo: action.pageInfo,
      };
    default:
      return state;
  }
};
