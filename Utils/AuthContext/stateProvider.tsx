import { useContext } from "react";
import { createContext, useReducer } from "react";

export const stateContext = createContext(null);

export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <stateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </stateContext.Provider>
  );
};

export const useStateValue = () => useContext(stateContext);
