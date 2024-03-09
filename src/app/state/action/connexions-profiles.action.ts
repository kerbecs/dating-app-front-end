import {createAction, props} from "@ngrx/store";
import {UserProfileDto} from "../../user-page/welcome-page/helper/user-profile-dto";

export const setConnexionsProfileAction = createAction('set-connexions-profiles-action', props<{connexionsProfiles: UserProfileDto[]}>())
export const removeConnexionsAction = createAction('remove-connexions-profiles-action', props<{userConnexionId : number, userId : number}>())
export const addConnexionAction = createAction('add-connexion-profile-action', props<UserProfileDto>())
