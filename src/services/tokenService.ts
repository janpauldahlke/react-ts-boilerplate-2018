import { RootState } from "../RootState";

class TokenService {

  public isAuthenticated = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === 'null') {
        return false;
      } else {
        const authObject : RootState = serializedState ? JSON.parse(serializedState) as RootState : {} as RootState;
        if  ( authObject.AuthStore.Auth.access_token &&
              authObject.AuthStore.Auth.access_token.length > 0
            ) {
              return true;
            }
            return false;
      }
      
    } catch (e) {
      console.log('error in isAuthenticated service');
      return false;
    }
  }
}

export default TokenService;