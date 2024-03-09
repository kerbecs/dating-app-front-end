import {createReducer, on} from "@ngrx/store";
import {getUserLocation} from "../action/user-location.actions";

export const userLocationReducer = createReducer({x : 0, y : 0},
  on(getUserLocation,
    (state, action) => action));
