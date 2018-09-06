import * as React from 'react';
import {
  MuiThemeProvider,
  createMuiTheme } from '@material-ui/core';

import SignIn from '../containers/SignInContainer';
import Message from '../components/message';

export interface IAppProps {
  ErrorStore?: ErrorStore;
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
          <Message ErrorStore={this.props.ErrorStore}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
