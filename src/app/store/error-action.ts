import { createAction, props } from "@ngrx/store";

export const errorAction = createAction('error',props<{ code: string,message:string }>());