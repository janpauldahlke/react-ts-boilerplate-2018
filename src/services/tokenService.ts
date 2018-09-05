/* inspired by https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage */

class TokenService  {
  //configure this file to your needs, consider it an example

  public static propName : string = 'Authentication';
  public static auth : Auth = {} as Auth;

  public setToken = (auth: Auth ) => {
    
    let tokenstring: string = '';
    if(Object.keys(auth).length > 0) {
      tokenstring = `${auth.token_type} ${auth.access_token}`;
    }
    if(localStorage.getItem(TokenService.propName) === 'null' && tokenstring.length > 0) {
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