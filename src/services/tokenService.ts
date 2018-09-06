// TODO think about how we verify login and is stillValid
// there should be a isTokenStillValid()

class TokenService  {
  //configure this file to your needs, consider it an example
  
  public static propName : string = 'Authentication';
  public static auth : Auth = {} as Auth;

  public setToken = (auth: Auth ) => {
    
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

  public isAuthenticated = () => {
    // there could be more logic here in an Authentication Verification
    // bring your own logic here
    const tokenString = localStorage.getItem(TokenService.propName);
    if(typeof tokenString === 'string' && tokenString.includes('bearer')) {
      return true;
    }
    return false;
  }
}

export default TokenService;