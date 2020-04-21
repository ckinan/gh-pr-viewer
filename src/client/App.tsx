import React, { useReducer } from 'react';
import './App.scss';
import { AppContext, appContextInitialState, AppReducer } from './AppContext';
import {
  AuthContext,
  authContextInitialState,
  AuthReducer,
} from './AuthContext';
import RootContainer from './RootContainer';

const App: React.FC = () => {
  const [appState, appDispatch] = useReducer(
    AppReducer,
    appContextInitialState
  );
  const [authState, authDispatch] = useReducer(
    AuthReducer,
    authContextInitialState
  );

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      <AuthContext.Provider value={{ authState, authDispatch }}>
        <RootContainer />
      </AuthContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
