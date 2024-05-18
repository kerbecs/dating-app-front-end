import {createReducer, on} from "@ngrx/store";
import {languageAction} from "../action/language.action";

export const languageReducer = createReducer(new Array<string>(),
  on(languageAction, (state,action) => action.languageList))
