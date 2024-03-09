import {createAction, props} from "@ngrx/store";

export const saveTokenInStorage = createAction('save-token-in-storage', props<{token : string}>())
export const getTokenFromStorage = createAction('get-token-from-storage')
export const removeTokenFromStorage = createAction('remove-token-from-storage')
export const invalidateToken = createAction('invalidate-token')
