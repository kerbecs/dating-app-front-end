import {createAction, props} from "@ngrx/store";

export const reportReasonAction = createAction('report reason action', props<{reportReasonList: string[]}>())
