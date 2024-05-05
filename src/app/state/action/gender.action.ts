import {createAction, props} from "@ngrx/store";

export const genderAction = createAction('gender action',props<{genderList: string[]}>())
