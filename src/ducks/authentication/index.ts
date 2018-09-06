import  { Action } from 'redux';
import axios, { AxiosInstance } from 'axios';

// a service to persist successful auth to localstorage
import TokenService from '../../services/tokenService';

//to be able to dispatch Errors to the Errorcomponent
import ErrorDuck from '../error';

/* 
  Follow this pattern!
  * axios (instancefactory)
  * action enum
  * action types
  * action creators
  * reducer functions
  * mainreducer
  * thunk
  * initialStore
 */

//axios instance
const ax = () : AxiosInstance => {
  const baseURL = process.env.REACT_APP_EXAMPLE;

  return axios.create({
    baseURL,          //condense key:value
    timeout: 5000,
    headers : {
      //your headers here
    }
  });
};
//------------------------------

//action enum
enum AuthActions {
  GET_AUTH = 'GET_AUTH',
  GET_AUTH_SUCCESS = 'GET_AUTH_SUCCESS',
  GET_AUTH_FAILURE = 'GET_AUTH_FAILURE', 
}
  //------------------------------

//action Types
type getAuthActionType = { type: string };
type getAuthSuccessActionType = { type: string, auth: Auth};
type getAuthFailureActionType = { type: string, error: Error}; //will error work here as type?
//------------------------------

//let the class begin
export default class AuthDuck {
  
  //action creators
  public static getAuthAction = () : getAuthActionType => ({
    type: AuthActions.GET_AUTH,
  })
  public static getAuthSuccessAction = (auth: Auth) : getAuthSuccessActionType => ({
    type: AuthActions.GET_AUTH_SUCCESS,
    auth
  })
  public static getAuthFailureAction = (error: Error) : getAuthFailureActionType => ({
    type: AuthActions.GET_AUTH_FAILURE,
    error
  })
  //---------------------------

  //reducer functions
  public static getAuthReducerFunction(state: AuthStore) : AuthStore {
    //react tipp: return a new object of state, respect its immutability do not JSON hack state
    let newState = Object.assign({}, state);
    newState = {
      isLoading: true,
      isSuccess: false,
      Auth: {} as Auth
    };
    return newState;
  }

  public static getAuthSuccessReducerFunction(state: AuthStore, action: getAuthSuccessActionType) : AuthStore {
    let newState = Object.assign({}, state);
    newState = {
      isLoading: false,
      isSuccess: true,
      Auth : action.auth
    };
    return newState;
  }

  public static getAuthFailureReducerFunction(state: AuthStore, action : getAuthFailureActionType) : AuthStore {
    let newState = Object.assign({}, state);
    newState = {
      isLoading: false,
      isSuccess: false,
      Auth : {} as Auth,
      errorMessage: action.error.message
    };
    return newState;
  }
  //---------------------------

  //mainreducer, maybe you will write the initialStore before this?
  public static reducer = (state: AuthStore = AuthDuck.InitialAuthStore, action: Action<any>) => {
    switch(action.type) {
      case AuthActions.GET_AUTH:
        return AuthDuck.getAuthReducerFunction(state);
      case AuthActions.GET_AUTH_SUCCESS:
        return AuthDuck.getAuthSuccessReducerFunction(state, action as getAuthSuccessActionType);
      case AuthActions.GET_AUTH_FAILURE:
        return AuthDuck.getAuthFailureReducerFunction(state, action as getAuthFailureActionType);    
      default:
        return state;
    }
  }
  //---------------------------

  // thunk
  public static getAuth() {
    return function(dispatch: any) : Promise<void> {
      //we dispatch here to be set the state to loading
      dispatch(AuthDuck.getAuthAction());
      //we make use of the axios instance
      return ax().get('/Authentication')
        .then((res) => {
          //use the tokenService to persist
          const tokenService : TokenService= new TokenService();
          tokenService.setToken(res.data as Auth);
          //inside here we dispatch SuccessActino
          dispatch(AuthDuck.getAuthSuccessAction(res.data));
         })
        .catch((err: Error) => {
          //inside here we dispatch FailureAction
          //improve this by error component //done
          dispatch(ErrorDuck.throwErroWithMessage({text: err.message, title: 'getAuth Error'}));
        });
    };
  }
  //---------------------------

  //initialState
  public static InitialAuth : Auth = {
    access_token: null, // or better undefined or string if InitialAuth.access_token
    token_type: null,
    expires_in: null,
    username: null,
    firstname: null,
    lastname: null,
    memberid: null,
    email: null,
    ".issued": null,
    ".expires": null,
  };

  public static InitialAuthStore: AuthStore = {
    isLoading: false,
    isSuccess: false,
    Auth: AuthDuck.InitialAuth,
  };
   //---------------------------

}

