import { createStore, applyMiddleware, compose } from "redux";
import * as ReduxThunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import history from "./history";
import { loadState, saveState } from "./localStorage";
import { rootReducer, RootInitialState, RootState } from "../RootState";

let persistedState = RootInitialState.getInitialState();
persistedState = { ...loadState() };
const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  //  this if enables redux devtools while in development
  //  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  process.env.NODE_ENV === "development"
    ? compose(
        applyMiddleware(ReduxThunk.default, routerMiddleware(history)),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      )
    : applyMiddleware(ReduxThunk.default, routerMiddleware(history))
);

//import throttle becuase json.parse / json serialize is expensive
/*store.subscribe(
  throttle(() => {
    //  this is how to bind only parts of the store to the localStorage
    const storage = store.getState() as RootState;
    const AuthStore = storage.AuthStore;

    if (
      JSON.stringify(AuthStore.isSuccess) !=
      JSON.stringify(persistedState.AuthStore.isSuccess)
    ) {
      persistedState.AuthStore = AuthStore;
      saveState({
        AuthStore // es6 condensation
      } as RootState);
    }
  }, 300)
); */

store.subscribe(() => {
  //  this is how to bind only parts of the store to the localStorage
  const storage = store.getState() as RootState;
  const AuthStore = storage.AuthStore;

  saveState({
    AuthStore // es6 condensation
  } as RootState);
});

export default store;
