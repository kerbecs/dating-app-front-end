import {createAction, props} from "@ngrx/store";

export  const  languageAction = createAction('language action',props<{languageList: string[]}>())
