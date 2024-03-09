import {createReducer, on} from "@ngrx/store";
import {UserProfileDto} from "../../user-page/welcome-page/helper/user-profile-dto";
import {setConnexionsProfileAction} from "../action/connexions-profiles.action";

export const connexionsProfilesReducer = createReducer(new Array<UserProfileDto>(),
  on(setConnexionsProfileAction, (value, action) => action.connexionsProfiles)
)
