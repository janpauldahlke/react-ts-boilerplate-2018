import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core';

import history from './store/history';
import store from './store';

import App from './containers/AppContainer';

import './index.css'; //contains a resets css
import registerServiceWorker, { unregister } from './registerServiceWorker';

const entryNode = document.getElementById('root') as HTMLElement;

if(entryNode) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} >
        <MuiThemeProvider theme={createMuiTheme()}>
          <App />
        </MuiThemeProvider>
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