import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from '../containers/AppContainer';
import SignIn from '../containers/SignInContainer';
import Home from '../components/Home';

import PrivateRoute from './privateRoutes';

export default class Routes extends React.Component<{},{}> {

  render() : JSX.Element {
    
    return(
      <div>
       <Switch>
       <Route exact path="/" component={App} />
        <Route path="/login" component={SignIn} />
        <PrivateRoute path="/home" component={Home} />
       </Switch>
      </div>
    );
  }
}

