# Instant-Data React-Typescript-Boilerplate

It is created via the CLI-Tool ```create-react-app <your-appname> --scripts-version=react-scripts-ts``` and customized to our needs

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

### Material-UI and Decorators

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


### Environment

There is the possibility to provide ENV variables. use the `.env` file for this.
Please note, they need to follow the naming convention of `REACT_APP_` `EXAMPLE=FOOBAR`.
Inside the project one can consume them by `proccess.env.REACT_APP_EXAMPLE`. 
At a new start its set to the seedings path, so one might want to change it there.


### HTTP Requests

Please use axios for your requests. It supports Promises and also async/await.
[https://github.com/axios/axios](https://github.com/axios/axios)
Also make sure the allow crossorigin-access on your server.


### Ducks

We follow the 'Ducks'-Pattern to structure our application. Get insights on this specc here
[https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) 
The pattern is to have all these inside one duck:
* axios (instancefactory)
* action enum
* action types
* action creators
* reducer functions
* mainreducer
* thunk
* initialStore


### ErrorComponent

There is a rudimental example prepared in this boilerplate, that shows usage and consumption of a high level
message or error-component.
Import the ErrorDuck inside the Ducks that you want the Errors to be catched.
dispatch them in the thunk-part in the `.catch((err) => {})`


### Store

Use the folder `src/store` to configure the store of redux according to your needs. There is also the possibilty to subscribe parts of the store to your localStorage. 

### Services

Anything you want to consume repetitive belongs to the services. Another word could be globalHelpers.<b>

