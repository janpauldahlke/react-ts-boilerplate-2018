import * as React from 'react';
import { RouteComponentProps, Redirect, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../routes/protectedRoutes';

import Message from '../components/message';
import Home from '../components/Home';
import SignIn from '../containers/SignInContainer';

export interface IAppProps extends RouteComponentProps<any> {
  NotificationStore?: NotificationStore;
  AuthStore?: AuthStore;
  throwNotificationWithMessage?: (msg: _Notification) => void;
  resetNotificationStore?: () => void;
}

export interface IAppState {
  // your state
}

class App extends React.Component<IAppProps, IAppState> {

  // we try to avoid constructor and would use state like this

  readonly state: IAppState = {
    //your state
  };
  private renderRoutesOrSignIn() {
    if ((this.props.AuthStore && this.props.AuthStore.isSuccess)) {
      return (
        <Switch>
          <ProtectedRoute path="/home" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Redirect to="/" />
        </Switch>
      );
    }
  }

  render(): JSX.Element {

    return (
      <div className="App">
          {this.renderRoutesOrSignIn()}
          <Message {...this.props} />
         
      </div>
    );
  }
}

export default App;
