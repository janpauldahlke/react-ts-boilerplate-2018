import { connect } from 'react-redux';
import { RootState } from '../../RootState';
import SignIn, {ISignProps} from '../../components/SignIn';
import AuthDuck from '../../ducks/authentication';
import NotifactionDuck from '../../ducks/notification';


const mapStateToProps = (state: RootState) : ISignProps=> {
  return {
    AuthStore: state.AuthStore
  } as ISignProps;
};

const mapDispatchToProps = (dispatch: any) : ISignProps => {
  return {
    getAuth: ()  => {
      dispatch(AuthDuck.getAuth());
    },
    throwNotificationWithMessage: (msg: _Notification) => {
      dispatch(NotifactionDuck.throwNotificationWithMessage(msg));
    },
  } as ISignProps;
};

export default connect<ISignProps, ISignProps>(mapStateToProps, mapDispatchToProps)(SignIn);