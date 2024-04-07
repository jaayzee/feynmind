// StateContext.js
import React from 'react';

const StateContext = React.createContext({
  info: null,
  setInfo: () => {},
  method: null,
  setMethod: () => {},
});

export default StateContext;