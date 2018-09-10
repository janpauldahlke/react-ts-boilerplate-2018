# Instant-Data React-Typescript-Boilerplate

It is created via the CLI-Tool ```create-react-app <your-appname> --scripts-version=react-scripts-ts``` and customized to our needs.

## Prequisites

Installed node and npm Version 8 or higher.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run seed` Authentication seed

To make the boilerplate work from scratch, and to simulate the flow of Auth, we put a JSON-Server.
You should remove the complete seed folder, or better add it to your .gitignore, when you got the workflow
To make use of it simply `npm run seed`. You will get served at `json-server --port 4000 --watch -- seed/db.json`.


## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  seed/
    /* a helper fake backend for firsttimers */  
  src/
    index.tsx
    components/
      App.tsx
    containers/
      /* your connected containers here */
    ducks/
      /* your ducks here */
    services/
      /* put all your global helpers inside here */
    store/
      history.ts
      index.ts
      localStorage.ts
  types/
    /*your types go here */  
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.
They will not be included in the production build so you can use them for things like documentation.


## Debugging and DevTools

We strongly suggest you to install and use theses BrowserExtensions.  
* [redux-devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [react-devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## Material-UI and Decorators

The experimental feature for Decorators is activated in the tsconfig.json. By this it is possible to use
the withStyle decorator in combination with `compose` of the `recompose package`. 
Example usage is:

`
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

@(compose(withStyles(styles)) as any)
class Example extends React.Component<IExampleProps, IExampleState> {...}
`

To make use of themes in material-ui we need to wrap the content inside a
```
<MuiThemeProvider theme={createMuiTheme()}>
  //any content here
</MuiThemeProvider>
```
[https://material-ui.com/customization/themes/](https://material-ui.com/customization/themes/)


## Environment

There is the possibility to provide ENV variables. use the `.env` file for this.
Please note, they need to follow the naming convention of `REACT_APP_` `EXAMPLE=FOOBAR`.
Inside the project one can consume them by `proccess.env.REACT_APP_EXAMPLE`. 
At a new start its set to the seedings path, so one might want to change it there.


## HTTP Requests

Please use axios for your requests. It supports Promises and also async/await.
[https://github.com/axios/axios](https://github.com/axios/axios)
Also make sure the allow crossorigin-access on your server.


## Ducks

We follow the 'Ducks'-Pattern to structure our application. Get insights on this specc here
[https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) 
The pattern is to have all these inside one duck:

* action enum
* action types
* action creators
* reducer functions
* mainreducer
* thunk
* initialStore


## Message Component

There is a rudimental example prepared in this boilerplate, that shows usage and consumption of a high level
message or notification-component.
Import the NofictationDuck inside the Ducks that you want the Errorsto  to be catched.
dispatch them in the thunk-part in the
```
import NotificationDuck from '~/src/ducks/notification';

your.action()
  .then(() => /* success */)
  .catch((err) => {
      dispatch(NotificationDuck.throwNotificationWithError({text: 'your text', title: 'your title'}))
  })
  ```
But you can also connect them directly to components. Please keep in mind to reset the NotificationStore, with the `RESET_NOTIFICATION_STORE` action! 


## Store

Use the folder `src/store` to configure the store of redux according to your needs. There is also the possibilty to subscribe parts of the store to your localStorage. To do so check the `index.ts` and have a brief look at the store subscribe pattern.

```
store.subscribe(throttle(() => {
  const storage = store.getState() as RootState;
  const AuthStore = storage.AuthStore;

  saveState({
    AuthStore
  } as RootState);
}, 300));
```
Please make use of the `throttle` lodash-helper. `JSON.parse()/JSON.stringyfy` are expensive in Javascript.

## Services

Anything you want to consume repetitive belongs to the services. Another word could be globalHelpers.  

* apicontroller -> an axois instance the can be configured. import it into your ducks to make `http`-verbs.
* authenticationService -> can be used in conjunction with apicontroller inside of ducks to verify auth-Status

inside your duck - an example usage in thunk
```
import axios from '../../services/apicontroller';

public static getAuth() {
    return function (dispatch: any, getState:() => RootState): Promise<void> {
      dispatch(AuthDuck.getAuthAction());

      //return the axois object with header, pass the state by `getState()` to auth and GET the route with `get('/yourRoute')`

      return axios(getState()).get('/Authentication')
        .then((res) => {
          dispatch(AuthDuck.getAuthSuccessAction(res.data));
         })
        .catch((err: Error) => {
          /**
        });
    };
  }
```


