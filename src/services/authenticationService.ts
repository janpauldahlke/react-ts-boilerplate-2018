import { RootState } from "../RootState";

const authenticationHeader = (state: RootState) : string  => {

  try {
    if(state.AuthStore && state.AuthStore.Auth) {
      return `${state.AuthStore.Auth.token_type} ${state.AuthStore.Auth.access_token}`;
    }
  } catch(err) {
    console.log(err); // throw message
  }
  return '';
};

export default authenticationHeader;
