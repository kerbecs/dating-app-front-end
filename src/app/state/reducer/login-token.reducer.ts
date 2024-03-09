import {createReducer, on} from "@ngrx/store";
import {getTokenFromStorage, removeTokenFromStorage, saveTokenInStorage} from "../action/login-token.actions";

export const loginTokenReducer = createReducer('',
  on(saveTokenInStorage, (state, action) => {
    localStorage.setItem('token',action.token);
    return action.token;
  }),
  on(getTokenFromStorage, (state) => {
    const token : string | null = localStorage.getItem('token');
    return token ?? '';
  }),
  on(removeTokenFromStorage, (state) => {
    localStorage.removeItem('token')
    return '';
  })
);
