import { connect } from 'react-redux';
import { RootState } from '../../RootState';

import App from '../../components/App';

//this connects app to the reduxstore to catch errors very high

const mapStateToProps = (state: RootState) : {} => {
  return {
    ErrorStore: state.ErrorStore
  };
};

export default connect<{}, {}>(mapStateToProps, {})(App);