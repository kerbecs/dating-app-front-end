import {createAction, props} from "@ngrx/store";

export const getUserLocation = createAction('user location', props<{x : number, y : number}>());
