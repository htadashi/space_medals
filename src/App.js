import logo from './logo.svg';
import './App.css';
import MinterComponent from './components/MinterComponent';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MinterComponent />
      </header>
    </div>
  );
}

export default App;
