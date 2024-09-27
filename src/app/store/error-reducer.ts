import { createReducer, on } from "@ngrx/store";
import { errorAction } from "./error-action";
import { error } from "./error-state";

const _errorUpdate = createReducer(error, on(errorAction, (state,action) => {
  return {
    ...state,
    code : action.code,
    message: action.message
  };
}))

export function errorUpdate(state: any, action: any) {
  return _errorUpdate(state, action);
  // return createReducer(error, on(errorAction, (state) => {
  //   return {
  //     ...state,
  //     error: {
  //       code: action.code,
  //       message: action.message
  //     }
  //   };
  // }))
}