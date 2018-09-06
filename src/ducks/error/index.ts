import { Action } from 'redux';

/* wouldnt it be smarter jsut top pass an argument with _error object*/

//enum
enum ErrorActions {
  THROW_ERROR = 'THROW_ERROR',
  THROW_ERROR_WITH_MESSAGE = 'THROW_ERROR_WITH_MESSAGE',
  RESET_ERROR_STORE = 'RESET_ERROR_STORE',
}

//actiontype
type throwErrorActionType = { type: string };
type throwErrorWithMessageActionType = { type: string, error: _Error };
type resetErrorStoreActionType = { type: string};

export default class ErrorDuck {
  //action creatr
  public static throwErrorAction = () : throwErrorActionType  => ({
    type: ErrorActions.THROW_ERROR
  })
  public static throwErrorWithMessageAction = (error: _Error) : throwErrorWithMessageActionType => ({
    type: ErrorActions.THROW_ERROR_WITH_MESSAGE,
    error
  }) 
  public static resetErrorStoreAction = () : resetErrorStoreActionType => ({
    type: ErrorActions.RESET_ERROR_STORE
  })

  //reducer functions
  public static throwErrorActionReducerFunction(state: ErrorStore) : ErrorStore {
    let newState = Object.assign({}, state);
    newState = {
      isError: true,
      isLoading: false,
      Error : {} as _Error
    };
    return newState;
  }

  public static throwErrorWithMessageActionReducerFuncrion(state: ErrorStore, action: throwErrorWithMessageActionType) : ErrorStore {
    let newState = Object.assign({}, state);
    newState = {
      isError: true,
      isLoading: false,
      Error : action.error
    };
    return newState;
  }

  public static resetErrorStoreActionReducerFunction(state: ErrorStore) : ErrorStore {
    let newState = Object.assign({}, state);
    newState = {
      isError: false,
      isLoading: false,
      Error: {} as _Error
    };
    return newState;
  }

  //reducer
  public static reducer = (state: ErrorStore = ErrorDuck.InitialErrorStore, action: Action<any>) => {
    switch(action.type) {
      case ErrorActions.THROW_ERROR:
        return ErrorDuck.throwErrorActionReducerFunction(state);
      case ErrorActions.THROW_ERROR_WITH_MESSAGE:
        return ErrorDuck.throwErrorWithMessageActionReducerFuncrion(state, action as throwErrorWithMessageActionType);
      case ErrorActions.RESET_ERROR_STORE:
        return ErrorDuck.resetErrorStoreActionReducerFunction(state);  
      default:
        return state;
    }
  }
  
  //store
  public static InitialError : _Error = {
    title: 'Oops',
    text: 'Something went wrong',
  };
  public static InitialErrorStore : ErrorStore = {
    isLoading: false,
    isError: false,
    Error: ErrorDuck.InitialError,
  };

  // finally: thunk
  public static throwError() {
    return(dispatch: any) => {
      dispatch(ErrorDuck.throwErrorAction());
    };
  }
  public static throwErroWithMessage(err: _Error) {
    return(dispatch: any) => {
      dispatch(ErrorDuck.throwErrorWithMessageAction(err));
    };
  }
  public static resetErrorStore() {
    return(dispatch: any) => {
      dispatch(ErrorDuck.resetErrorStoreAction());
    };
  }
}

