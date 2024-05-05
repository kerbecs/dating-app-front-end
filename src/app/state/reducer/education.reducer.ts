import {createReducer, on} from "@ngrx/store";
import {educationAction} from "../action/education.action";

export const educationReducer = createReducer(new Array<string>(),
  on(educationAction,(state, action) => action.educationList))
