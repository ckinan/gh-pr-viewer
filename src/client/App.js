import React, { useReducer } from 'react';
import './App.scss';
import { AppContext, initialState, AppReducer } from './AppContext.js';
import RootContainer from './RootContainer';

const App = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <RootContainer />
    </AppContext.Provider>
  );
};

export default App;
