import logo from './logo.svg';
import './App.css';
import { Login } from './Components/Login/Login';
import { Hedaer } from './Components/Header/Hedaer';

function App() {
  return (
    <div className="App">
      <Hedaer />
      <Login />
    </div>
  );
}

export default App;
