declare type _Notification = {
  title: string,
  text: string,
};

declare type NotificationStore = {
  isLoading: boolean,
  isNotification: boolean,
  Notification: _Notification
};