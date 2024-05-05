import {createAction, props} from "@ngrx/store";

export const sexualOrientationAction = createAction('sexual orientation action', props<{sexualOrientationList : string[]}>())
