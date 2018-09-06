import * as React from 'react';
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";
import TokenService from '../services/tokenService';
import SignIn from '../containers/SignInContainer';

const tokenService = new TokenService();
const AUTHENTICATED : boolean= tokenService.isAuthenticated();
//credits to
//https://stackoverflow.com/questions/42309708/create-own-react-route-class-in-typescript/47441101#47441101

type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>;

const PrivateRoute : React.StatelessComponent<RouteProps> = ( { component: Component, ...rest } :any ) => {
  const renderFN = (Component?: RouteComponent) => (props: RouteProps) => {
    if(!Component) {
      return null;
    }

    if(AUTHENTICATED) {
      return <Component {...props} />;
    }

    const redirectProps = {
      to: {
        pathname : '/',
        state: { from : props.location},
        component : <SignIn {...rest}/>
      },
    };
    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderFN(Component) } />;
};

export default PrivateRoute;