import React, { useReducer } from 'react';
import './App.scss';
import { AppContext, appContextInitialState, AppReducer } from './AppContext';
import {
  AuthContext,
  authContextInitialState,
  AuthReducer,
} from './AuthContext';
import RootContainer from './RootContainer';
import { BrowserRouter } from 'react-router-dom';

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
    <BrowserRouter>
      <AppContext.Provider value={{ appState, appDispatch }}>
        <AuthContext.Provider value={{ authState, authDispatch }}>
          <RootContainer />
        </AuthContext.Provider>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
