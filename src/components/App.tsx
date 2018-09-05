import * as React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme } from '@material-ui/core';

//import SignIn from './SignIn';
import SignIn from '../containers/SignInContainer';

export interface IAppProps {
  // your props here
  // also one can extend them
  // consider export interface IAppProps extends RouteComponentProps {..}
}

export interface IAppState {
  // your state
}

class App extends React.Component<IAppProps,IAppState> {

  // we try to avoid constructor and would use state like this

readonly state : IAppState= {
  //your state
};

  public render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={createMuiTheme()}>
          <SignIn />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
