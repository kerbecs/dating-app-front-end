import {createReducer, on} from "@ngrx/store";
import {preferenceAction} from "../action/preference.action";

export const preferenceReducer = createReducer(new Array<string>(),
  on(preferenceAction, (state, action) => action.preferenceList))
