import * as React from 'react';
import { Route, Redirect} from 'react-router-dom';
import TokenService from '../services/tokenService';

const tokenService = new TokenService();

const PrivateRoute = ({component: Component, ...rest} : any ) => (
  <Route {...rest}
    render={(props) => {
      console.log('privateRoute render', tokenService.isAuthenticated());
        return(
          tokenService.isAuthenticated() ?
          <Component {...props} /> :
          <Redirect to="/login" />
        );
    }}
  />
);

export default PrivateRoute;