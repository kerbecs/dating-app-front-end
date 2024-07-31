import {createReducer, on} from "@ngrx/store";
import {UserDataDto} from "../helper/user-data-dto";
import {userDataAction} from "../action/user-data.action";

export const userDataReducer  = createReducer<UserDataDto | null>(null,
  on(userDataAction, (state, action) => action))
