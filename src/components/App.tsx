import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  MuiThemeProvider,
  createMuiTheme } from '@material-ui/core';

import Message from '../components/message';
import SignIn from '../containers/SignInContainer';

export interface IAppProps extends RouteComponentProps<any> {
  ErrorStore?: ErrorStore;
  AuthStore?: AuthStore;
  throwErroWithMessage?: (msg: _Error) => void;
  resetErrorStore?: () => void;
}

let renderCounter = 0;
export interface IAppState {
  // your state
}

class App extends React.Component<IAppProps,IAppState> {

  // we try to avoid constructor and would use state like this

readonly state : IAppState= {
  //your state
};

  public render() {
    console.log('render', renderCounter++, this.props);
    
    return (
      
      <div className="App">
        <MuiThemeProvider theme={createMuiTheme()}>
          <SignIn />
          <Message {...this.props}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
