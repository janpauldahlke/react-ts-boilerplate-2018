import { combineReducers } from 'redux';
import AuthDuck from './ducks/authentication';
import ErrorDuck from './ducks/error';

export class RootState {
  public AuthStore: AuthStore;
  public ErrorStore : ErrorStore;
}

//import your initialState from your ducks
export class RootInitialState {
  public static getInitialState() : RootState {
    const state: RootState = {
      AuthStore: AuthDuck.InitialAuthStore,
      ErrorStore: ErrorDuck.InitialErrorStore,
    };
    return state;
  }
}

//register the reduxstore part on Rootstate
export const rootReducer = combineReducers({
  AuthStore: AuthDuck.reducer,
  ErrorStore: ErrorDuck.reducer,
} as any); // https://github.com/reduxjs/redux/issues/2709