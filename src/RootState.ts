import { combineReducers } from 'redux';
import AuthDuck from './ducks/authentication';
import NotificationDuck from './ducks/notification';

export class RootState {
  public AuthStore: AuthStore;
  public NotificationStore : NotificationStore;
}

//import your initialState from your ducks
export class RootInitialState {
  public static getInitialState() : RootState {
    const state: RootState = {
      AuthStore: AuthDuck.getInitialAuthStore(),
      NotificationStore: NotificationDuck.InitialNotificationStore,
    };
    return state;
  }
}

//register the reduxstore part on Rootstate
export const rootReducer = combineReducers({
  AuthStore: AuthDuck.reducer,
  NotificationStore: NotificationDuck.reducer,
} as any); // https://github.com/reduxjs/redux/issues/2709
 