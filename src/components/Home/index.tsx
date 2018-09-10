import * as React from 'react';
import { Button } from '@material-ui/core';

//  instead of connecting, iam gonna use the unsafe pattern
//  it is way better here to connect the component via connect()(); from react-redux!
//  better do not copy this pattern, its a lazy man`s shortcut
import store from '../../store';
import AuthDuck from '../../ducks/authentication';

export interface IHomeProps {

}

class Home extends React.Component<IHomeProps,{}> {

  private logOut = () => {
    store.dispatch(AuthDuck.logOut() as any);
  }

  render(): JSX.Element {
    return(
      <div>
        <div>welcome to home</div>
        <div>there is nothing to see here, but you can</div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.logOut();
          }}
          >Log Out
        </Button>
      </div>
    );
  }
}

export default Home;