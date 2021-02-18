import logo from './logo.svg';
import './App.css';
import './NavbarComponent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* Naming below is to avoid clashes w bootstrap's use of 'navbar' as a reserved word */}
        <NavbarComponent/>  hello 
        <p>
          HI TEST Edit <code>src/App.js</code> and save to reload
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
