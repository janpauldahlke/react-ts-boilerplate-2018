declare type _Error = { // we need to write our own Error type like this, because there is already a interface Error here C:\Program Files\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib\lib.es5.d.ts
  title: string,
  text: string,
}

//renamed this because of conflicts with imported packages
declare type ErrorStore = {
  isLoading: boolean,
  isError: boolean,
  Error: _Error
}