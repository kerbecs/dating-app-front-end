import {createReducer, on} from "@ngrx/store";
import {raceAction} from "../action/race.action";

export const raceReducer = createReducer(new Array<string>(),
  on(raceAction, (state, action) => action.raceList));
