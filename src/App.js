import logo from './assets/logo.svg';
import StateContext from './StateContext';
import Subject from './components/subject';
import FactCheck from './components/factCheck';
import FeedbackForU from './components/feedbackForU';
import EndScene from './components/endScene';
import './css/App.css';
import { useState } from 'react';

function App() {
  const [sharedInfo, setSharedInfo] = useState();
  const [sharedMethod, setSharedMethod] = useState();
  const [sharedOpenAI, setSharedOpenAI] = useState();
  const [sharedAnswer, setSharedAnswer] = useState();

  return (
    <StateContext.Provider value={{ 
      info: sharedInfo, setInfo: setSharedInfo,
      method: sharedMethod, setMethod: setSharedMethod,
      openAI: sharedOpenAI, setOpenAI: setSharedOpenAI,
      answer: sharedAnswer, setAnswer: setSharedAnswer,
      }}>
    <div className="App">
      <header className="App-header">
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
