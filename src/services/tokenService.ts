/* inspired by https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage */

class TokenService  {
  //configure this file to your needs, consider it an example
  
  public static propName : string = 'Authentication';
  public static auth : Auth = {} as Auth;

  public setToken = (auth: Auth ) => {
    console.log('setting Token', auth);
    let tokenstring: string = '';
    if(Object.keys(auth).length > 0) {
      console.log('authObject > ', Object.keys(auth).length > 0);
      tokenstring = `${auth.token_type} ${auth.access_token}`;
      localStorage.setItem(TokenService.propName, tokenstring);
    }
    return null;
  }

  public getToken = () => {
    if(localStorage.getItem(TokenService.propName) !== 'null' ) {
      return localStorage.getItem(TokenService.propName);
    }
    return null;
  }

  public deleteToken = () => {
    if(localStorage.getItem(TokenService.propName) !== 'null') {
      localStorage.removeItem(TokenService.propName);
    }
  }
}

export default TokenService;