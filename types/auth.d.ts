/*
  using nullable union type here to be explicit against the compileroption strictNullChecks: true
*/
declare type Auth = {
  "access_token" : string | null,
  "token_type": string | null,
  "expires_in" : number | null,
  "username": string | null,
  "firstname" : string | null,
  "lastname": string | null,
  "memberid": string | null,
  "email": string | null,
  ".issued" : string | null,
  ".expires": string | null,
}

declare type AuthStore = {
  isLoading: boolean,
  isSuccess: boolean,
  Auth: Auth,
  errorMessage?: string
}