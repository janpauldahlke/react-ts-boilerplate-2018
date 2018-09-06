import { connect } from 'react-redux';
import { RootState } from '../../RootState';

import ErrorDuck from '../../ducks/error';

import App, {IAppProps} from '../../components/App';

//this connects app to the reduxstore to catch errors very high

const mapStateToProps = (state: RootState) : {} => {
  return {
    ErrorStore: state.ErrorStore,
    AuthStore: state.AuthStore,
  };
};

const mapDispatchToProps = (dispatch: any) : IAppProps => {
  return {
    throwErroWithMessage: (msg: _Error) => {
      dispatch(ErrorDuck.throwErroWithMessage(msg));
    },
    resetErrorStore: () => {
      dispatch(ErrorDuck.resetErrorStore());
    },
  } as IAppProps;
};


/* export default withRouter(
  connect<{}, IAppProps>
  (mapStateToProps, mapDispatchToProps)(App) as any); */
export default connect<{}, IAppProps>(mapStateToProps, mapDispatchToProps)(App);