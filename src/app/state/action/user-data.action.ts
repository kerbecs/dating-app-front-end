import {createAction, props} from "@ngrx/store";
import {UserDataDto} from "../helper/user-data-dto";

export const userDataAction = createAction('user data action',props<UserDataDto>())
