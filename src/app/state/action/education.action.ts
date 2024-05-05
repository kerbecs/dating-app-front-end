import {createAction, props} from "@ngrx/store";

export const educationAction = createAction('education action',props<{educationList : string[]}>())
