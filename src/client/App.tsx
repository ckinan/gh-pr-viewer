import React, { useReducer } from 'react';
import './App.scss';
import { AppContext, initialState, AppReducer } from './AppContext';
import RootContainer from './RootContainer';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <RootContainer />
    </AppContext.Provider>
  );
};

export default App;
