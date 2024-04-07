// StateContext.js
import React from 'react';

const StateContext = React.createContext({
    topic: null,
    setTopic: () => {},
    info: null,
    setInfo: () => {},
    method: null,
    setMethod: () => {},
    answer: null,
    setAnswer: () => {},
    reviewMount: null,
    setReviewMount: () => {},
    topicsArray:null, 
    setTopicsArray: () => {},
    currName: null,
    setCurrName: () => {},
    currInfo: null,
    setCurrObj: () => {},
    currObj: null,
    setCurrInfo: () => {},
    ready: null,
    setReady: () => {},
    completed: null,
    setCompleted: () => {},
    mount: null,
    setMethod: () => {},
    methodMount: null,
    setMethodMount: () => {},
});

export default StateContext;