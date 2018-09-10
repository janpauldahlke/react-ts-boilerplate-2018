import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from "../RootState";

const ProtectedRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest}
    render={(props) => {
      return (
        rest.isAuthenticated ?
          <Component {...props} /> :
          <Redirect to="/" />
      );
    }}
  />
);
const mapStateToProps = (state: RootState): { isAuthenticated: boolean } => {
  return {
    isAuthenticated: state.AuthStore && state.AuthStore.isSuccess
  };
};
// export protectede route that is connected to the Authstore of the Rootstore
export default connect(mapStateToProps)(ProtectedRoute);