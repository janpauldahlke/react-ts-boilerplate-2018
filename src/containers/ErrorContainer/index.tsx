import {connect} from 'react-redux';
import {RootState} from '../../RootState';

import GlobalMessage, { IGlobalMessageProps } from '../../components/message';

const mapStateToProps = (state: RootState) : IGlobalMessageProps => {
  return {
    ErrorStore: state.ErrorStore,
  } as IGlobalMessageProps;
};

export default connect<IGlobalMessageProps, IGlobalMessageProps>(mapStateToProps,{})(GlobalMessage);