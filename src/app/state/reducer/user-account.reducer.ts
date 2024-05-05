import {createReducer, on} from "@ngrx/store";
import {userAccountAction} from "../action/user-account.action";
import {UserAccountDto} from "../helper/user-account-dto";

export const userAccountReducer = createReducer<UserAccountDto | null>(null,
  on(userAccountAction, (state, action) => action));
