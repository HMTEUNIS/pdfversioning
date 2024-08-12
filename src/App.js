import './App.css';
import Lib from './Lib';
function App() {
  return (
    <div className="App">
      < div className='sidenav'>
        <span>Sex And Boundries</span>
        <span className='navOption button'>About</span>
        <span className='navOption button'>Resources</span>
        <span className='navOption button'>Contact</span>
      </div>
      <div className="rightside">
        <Lib />
      </div>
    </div>
  );
}

export default App;
