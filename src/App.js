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

  return (
    <StateContext.Provider value={{ 
      info: sharedInfo, setInfo: setSharedInfo,
      method: sharedMethod, setMethod: setSharedMethod,
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
