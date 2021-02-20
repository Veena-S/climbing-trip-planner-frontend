import './App.css';
import NavbarComponent from './components/NavbarComponent'
import HomePage from './components/HomePage'
import CreateNewTrip from './components/CreateNewTrip'
import NewTripHolder from './components/NewTripHolder'
import ViewAll from  './components/ViewAll'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { TripProvider } from "./store"

function App() {
  return (
    <TripProvider>
      <Router >
        <NavbarComponent/>
        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route path='/viewAll' component={ViewAll}/>
          {/* <Route path='/createNewTrip' component={CreateNewTrip}/> */}
          <Route path='/createNewTrip' component={NewTripHolder}/>
        </Switch>
      </Router>
    </TripProvider>
  );
}

export default App;
