import {createAction, props} from "@ngrx/store";
import {storeType} from "../store";
import {UserDataDto} from "../helper/user-data-dto";

export const userDataAction = createAction('user data action',props<UserDataDto>())
