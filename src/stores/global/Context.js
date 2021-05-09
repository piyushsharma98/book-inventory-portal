/** @context.jsx
 *  This component is a wrapper which will provide
 *  the Global Context to other needy components
 *  */

import React, { useReducer } from "react";
import { isEmpty } from "lodash";
import reducer from "./reducer";
import { updateUserState } from "./actions";

// Creating global context
export const Context = React.createContext(reducer());

const GlobalContextProvider = (props) => {
  const { user } = props;

  const [state, dispatch] = useReducer(reducer, reducer());

  if (isEmpty(state.user) && !isEmpty(user)) {
    updateUserState(user, dispatch);
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default GlobalContextProvider;
