import {createReducer, on} from "@ngrx/store";
import {reportReasonAction} from "../action/report-reason.action";

export const reportReasonReducer = createReducer(new Array<string>(),
  on(reportReasonAction, (state, action) => action.reportReasonList))
