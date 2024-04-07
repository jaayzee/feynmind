import logo from './assets/logo.svg';
import StateContext from './StateContext';
import Subject from './components/subject';
import FactCheck from './components/factCheck';
import FeedbackForU from './components/feedbackForU';
import EndScene from './components/endScene';
import './css/App.css';
import { useState } from 'react';
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser:true, // This is the default and can be omitted
});

function App() {
  const [sharedSearch, setSharedSearch] = useState();
  const [sharedInfo, setSharedInfo] = useState();
  const [sharedMethod, setSharedMethod] = useState();
  const [sharedOpenAI, setSharedOpenAI] = useState(openai);
  const [sharedAnswer, setSharedAnswer] = useState();
  const [sharedReviewMount, setSharedReviewMount] = useState(true);
  const [sharedCurrName, setSharedCurrName] = useState();
  const [sharedCurrInfo, setSharedCurrInfo] = useState();
  const [sharedTopicsArray, setSharedTopicsArray] = useState([]);
  const [sharedReady, setSharedReady] = useState(false);
  const [sharedCompleted, setSharedCompleted] = useState(false);
  const [sharedMount, setSharedMount] = useState(true);
  const [sharedMethodMount, setSharedMethodMount] = useState(false);

  return (
    <StateContext.Provider value={{ 
      search: sharedSearch, setSearch:setSharedSearch,
      info: sharedInfo, setInfo: setSharedInfo,
      method: sharedMethod, setMethod: setSharedMethod,
      openAI: sharedOpenAI, setOpenAI: setSharedOpenAI,
      answer: sharedAnswer, setAnswer: setSharedAnswer,
      reviewMount: sharedReviewMount, setReviewMount: setSharedReviewMount,
      currName: sharedCurrName, setCurrName: setSharedCurrName,
      currInfo: sharedCurrInfo, setCurrInfo: setSharedCurrInfo,
      topicsArray: sharedTopicsArray, setTopicsArray: setSharedTopicsArray,
      ready: sharedReady, setReady: setSharedReady,
      completed: sharedCompleted, setCompleted: setSharedCompleted,
      mount: sharedMount, setMount: setSharedMount,
      methodMount: sharedMethodMount, setMethodMount: setSharedMethodMount,
      }}>
    <div className="App">
      <header className="App-header">
        <h1> 
        STUDEYN
        </h1>
        <div>
          <Subject/>
          <FactCheck/>
          <FeedbackForU/>
          <EndScene/>
        </div>
      </header>
    </div>
    </StateContext.Provider>
  );
}

export default App;
