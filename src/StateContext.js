// StateContext.js
import React from 'react';

const StateContext = React.createContext({
  info: null,
  setInfo: () => {},
  method: null,
  setMethod: () => {},
  openAI: null,
  setOpenAI: () => {},
  answer: null,
  setAnswer: () => {},
});

export default StateContext;