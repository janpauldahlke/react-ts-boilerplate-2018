// thanks to https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

import { RootState } from "../RootState";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    //do error handling here
    console.log('error on saveState');
  }
};