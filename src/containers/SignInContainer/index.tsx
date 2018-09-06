import { connect } from 'react-redux';
import { RootState } from '../../RootState';
import SignIn, {ISignProps} from '../../components/SignIn';
import AuthDuck from '../../ducks/authentication';
import ErrorDuck from '../../ducks/error';


const mapStateToProps = (state: RootState) : ISignProps=> {
  return {
    AuthStore: state.AuthStore
  } as ISignProps;
};

const mapDispatchToProps = (dispatch: any) : ISignProps => {
  return {
    getAuth: () => {
      dispatch(AuthDuck.getAuth());
    },
    throwErrorWithMessage: (msg: _Error) => {
      dispatch(ErrorDuck.throwErroWithMessage(msg));
    },
  } as ISignProps;
};

export default connect<ISignProps, ISignProps>(mapStateToProps, mapDispatchToProps)(SignIn);