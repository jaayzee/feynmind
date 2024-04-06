import logo from './assets/logo.svg';
import Subject from './components/subject';
import FactCheck from './components/factCheck';
import FeedbackForU from './components/feedbackForU';
import EndScene from './components/endScene';
import './css/App.css';

function App() {
  return (
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
  );
}

export default App;
