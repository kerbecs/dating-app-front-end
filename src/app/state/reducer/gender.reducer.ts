import {createReducer, on} from "@ngrx/store";
import {genderAction} from "../action/gender.action";

export const genderReducer = createReducer(new Array<string>(),
  on(genderAction, (state, action) => action.genderList))
