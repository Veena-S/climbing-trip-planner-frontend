import './App.css';
import NavbarComponent from './components/NavbarComponent'
import HomePage from './components/HomePage'
import CreateNewTrip from './components/CreateNewTrip'
import ViewAll from  './components/ViewAll'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {TripProvider} from "./store";
import PickRoute from './components/PickRoute';

function App() {
  return (
    <TripProvider>
      <Router >
        <NavbarComponent/>
        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route path='/viewAll' component={ViewAll}/>
          <Route path='/createNewTrip' component={CreateNewTrip}/>
        </Switch>
      </Router>
       <PickRoute></PickRoute>
    </TripProvider>
  );
}

export default App;
