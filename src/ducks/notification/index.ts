import { Action } from 'redux';

/* wouldnt it be smarter jsut top pass an argument with _error object*/

//enum
enum NotificationActions {
  THROW_NOTIFICATION = 'THROW_NOTIFICATION',
  THROW_NOTIFICATION_WITH_MESSAGE = 'THROW_NOTIFICATION_WITH_MESSAGE',
  RESET_NOTIFICATION_STORE = 'RESET_NOTIFICATION_STORE',
}

//actiontype
type throwNotificationActionType = { type: string };
type throwNotificationWithMessageActionType = { type: string, error: _Notification };
type resetNotificationStoreActionType = { type: string};

export default class NotificationDuck {
  //action creatr
  public static throwNotificationAction = () : throwNotificationActionType  => ({
    type: NotificationActions.THROW_NOTIFICATION
  })
  public static throwNotificationWithMessageAction = (error: _Notification) : throwNotificationWithMessageActionType => ({
    type: NotificationActions.THROW_NOTIFICATION_WITH_MESSAGE,
    error
  }) 
  public static resetNotificationStoreAction = () : resetNotificationStoreActionType => ({
    type: NotificationActions.RESET_NOTIFICATION_STORE
  })

  //reducer functions
  public static throwNotificationActionReducerFunction(state: NotificationStore) : NotificationStore {
    let newState = Object.assign({}, state);
    newState = {
      isNotification: true,
      isLoading: false,
      Notification : {} as _Notification
    };
    return newState;
  }

  public static throwNotificationWithMessageActionReducerFuncrion(state: NotificationStore, action: throwNotificationWithMessageActionType) : NotificationStore {
    let newState = Object.assign({}, state);
    newState = {
      isNotification: true,
      isLoading: false,
      Notification : {
        ...action.error
      }
    };
    return newState;
  }

  public static resetNotificationStoreActionReducerFunction(state: NotificationStore) : NotificationStore {
    let newState = Object.assign({}, state);
    newState = {
      isNotification: false,
      isLoading: false,
      Notification: {} as _Notification
    };
    return newState;
  }

  //reducer
  public static reducer = (state: NotificationStore = NotificationDuck.InitialNotificationStore, action: Action<any>) => {
    switch(action.type) {
      case NotificationActions.THROW_NOTIFICATION:
        return NotificationDuck.throwNotificationActionReducerFunction(state);
      case NotificationActions.THROW_NOTIFICATION_WITH_MESSAGE:
        return NotificationDuck.throwNotificationWithMessageActionReducerFuncrion(state, action as throwNotificationWithMessageActionType);
      case NotificationActions.RESET_NOTIFICATION_STORE:
        return NotificationDuck.resetNotificationStoreActionReducerFunction(state);  
      default:
        return state;
    }
  }
  
  //store
  public static InitialNotification : _Notification = {
    title: 'Oops',
    text: 'Something went wrong',
  };
  public static InitialNotificationStore : NotificationStore = {
    isLoading: false,
    isNotification: false,
    Notification: NotificationDuck.InitialNotification,
  };

  // finally: thunk
  public static throwNotification() {
    return(dispatch: any) => {
      dispatch(NotificationDuck.throwNotificationAction());
    };
  }
  public static throwNotificationWithMessage(err: _Notification) {
    return(dispatch: any) => {
      dispatch(NotificationDuck.throwNotificationWithMessageAction(err));
    };
  }
  public static resetNotificationStore() {
    return(dispatch: any) => {
      dispatch(NotificationDuck.resetNotificationStoreAction());
    };
  }
}

