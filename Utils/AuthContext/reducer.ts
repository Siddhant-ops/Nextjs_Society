import { Reducer } from "react";
import { validateToken } from "../Helpers/auth";

function returnCookieValue(tokenCookie: string | null): string | null {
  if (tokenCookie) {
    if (validateToken(tokenCookie)) return tokenCookie;
    else return null;
  } else return null;
}

interface InitialState {
  user?: string | null;
}

interface ActionTypes {
  SET_USER: string;
  REMOVE_USER: string;
}

const actionTypes: ActionTypes = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
};

interface Action {
  type: string;
  user?: string;
}

const authReducer: Reducer<InitialState, Action> = (
  state: InitialState,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.REMOVE_USER:
      return {
        user: null,
      };

    default:
      return state;
  }
};

export { authReducer, actionTypes, returnCookieValue };
export type { InitialState, ActionTypes, Action };
