import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/tokenService';

const ProtectedRoute = ({component: Component, ...rest} : any ) => (
  <Route {...rest}
    render={(props) => {
      
      return(
         TokenService.isAuthenticated() ?
          <Component {...props} /> :
          <Redirect to="/" />
        );
    }}
  />
);

export default ProtectedRoute;