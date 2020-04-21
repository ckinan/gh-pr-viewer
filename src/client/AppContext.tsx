import React from 'react';

interface IState {
  search?: {
    user: string;
    searchType: string;
    pageInfo: any;
  };
  prs?: Array<any>;
  prComponents?: Array<any>;
  isLoading?: boolean;
  count?: number;
}

interface IAction extends IState {
  type:
    | 'UPDATE_COUNT'
    | 'UPDATE_PRS'
    | 'UPDATE_PR_COMPONENTS'
    | 'START_LOADING'
    | 'STOP_LOADING'
    | 'UPDATE_SEARCH';
}

export const AppContext = React.createContext<any | null>(null);

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

export const AppReducer = (state: IState, action: IAction) => {
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
