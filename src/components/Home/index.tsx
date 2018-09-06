import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IHomeProps extends RouteComponentProps<any> {

}

class Home extends React.Component<IHomeProps,{}> {

  render() {
    return(
      <div>You are now on home</div>
    );
  }
}

export default withRouter(Home);