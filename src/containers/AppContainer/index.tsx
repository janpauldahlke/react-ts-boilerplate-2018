import { connect } from 'react-redux';
import { RootState } from '../../RootState';

import NotificationDuck from '../../ducks/notification';
import { withRouter } from 'react-router-dom';

import App, {IAppProps} from '../../components/App';

//this connects app to the reduxstore to catch errors very high

const mapStateToProps = (state: RootState) : {} => {
  return {
    NotificationStore: state.NotificationStore,
    AuthStore: state.AuthStore,
  };
};

const mapDispatchToProps = (dispatch: any) : IAppProps => {
  return {
    throwNotificationWithMessage: (msg: _Notification) => {
      dispatch(NotificationDuck.throwNotificationWithMessage(msg));
    },
    resetNotificationStore: () => {
      dispatch(NotificationDuck.resetNotificationStore());
    },
  } as IAppProps;
};

export default withRouter(
  connect<{}, IAppProps>
  (mapStateToProps, mapDispatchToProps)(App) as any);
