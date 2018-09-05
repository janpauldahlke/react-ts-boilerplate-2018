import { combineReducers } from 'redux';
import AuthDuck from './ducks/AuthenticationDuck';

export class RootState {
  public AuthStore: AuthStore;
}

//import your initialState from your ducks
export class RootInitialState {
  public static getInitialState() : RootState {
    const state: RootState = {
      AuthStore: AuthDuck.InitialAuthStore,
    };
    return state;
  }
}

//register the reduxstore part on Rootstate
export const rootReducer = combineReducers({
  AuthStore: AuthDuck.reducer,
} as any); // https://github.com/reduxjs/redux/issues/2709