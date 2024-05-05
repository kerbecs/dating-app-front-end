import {createReducer, on} from "@ngrx/store";
import {sexualOrientationAction} from "../action/sexual-orientation.action";

export const sexualOrientationReducer = createReducer(new Array<string>(),
  on(sexualOrientationAction, (state, action) => {
    return action.sexualOrientationList;
})
)
