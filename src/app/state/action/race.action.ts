import {createAction, props} from "@ngrx/store";

export const raceAction = createAction('race action', props<{raceList : string[]}>())
