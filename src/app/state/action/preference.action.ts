import {createAction, props} from "@ngrx/store";

export const preferenceAction = createAction('preference action', props<{preferenceList: string[]}>())
