import * as React from 'react';
import { RouteComponentProps, Link, withRouter} from 'react-router-dom';
//import { ConditionalRoute } from '../routes/conditionalRoute';
import TokenService from '../services/tokenService';
import {
  MuiThemeProvider,
  createMuiTheme } from '@material-ui/core';


import Message from '../components/message';

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

  //think
  /*
    would it be enought to ask in lifecycle to ask app for beeing loggedin and else, redirect to login?
    its poorly out of scope of react router, but it might be a sloution
  */
 componentWillMount () {
   const tokenService = new TokenService();
   const isAuth = tokenService.isAuthenticated();
    
   if(isAuth) {
     this.props.history.push('/home');
   }
   this.props.history.push('/login');
 }

  public render() {

    console.log('render', renderCounter++);
    return (
      
      <div className="App">
        <MuiThemeProvider theme={createMuiTheme()}>
          
             <Link to="/login">Login</Link>
             <Link to="/home">Home</Link>
           
          <Message {...this.props}/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);

//sammlung von links: durcharbeiten
// https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-router-using-typescript-and-react-router-4
