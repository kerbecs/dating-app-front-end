import {createAction, props} from "@ngrx/store";
import {UserAccountDto} from "../helper/user-account-dto";

export const userAccountAction = createAction('user-account-action', props<UserAccountDto>())
