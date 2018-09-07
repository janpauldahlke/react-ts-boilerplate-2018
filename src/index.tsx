import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import * as ReduxThunk from 'redux-thunk';
import { ConnectedRouter as Router , connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { rootReducer, RootInitialState } from './RootState';
import Routes from './routes/routes';

import './index.css'; //contains a resets css

import registerServiceWorker, { unregister } from './registerServiceWorker';

const entryNode = document.getElementById('root') as HTMLElement;
const history = createBrowserHistory();
const store = createStore(
  connectRouter(history)(rootReducer),
  RootInitialState.getInitialState(),
  // this if enables redux devtools while in development
  //  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
  process.env.NODE_ENV === 'development' ?
    compose(
      applyMiddleware(ReduxThunk.default, routerMiddleware(history)),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    ) 
    :
    applyMiddleware(ReduxThunk.default, routerMiddleware(history))
);

if(entryNode) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} >
        <Routes />
      </Router>
    </Provider>,
    entryNode
  );
  //enables the lifereload feature in dev
  if(process.env.NODE_ENV === 'development') {
    registerServiceWorker();
  } else {
    unregister();
  }
}