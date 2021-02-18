import React, { useState, useContext, useEffect } from "react";
import { TripContext, loadUniqueRouteNames } from "../store.js";
import { ROUTE_DIFFICULTIES } from "../utils/helperFns.js";

/**
 * Component to add a new route or to update an existing route
 */
export default function PickRoute() {

  const { store, dispatch } = useContext(TripContext);
  const [newRouteName, setNewRouteName] = useState('');
  const [newRouteDisable, setNewRouteDisable] = useState(false);
  const [selectedRouteName, setSelectedRouteName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [routesAdded, setRoutesAdded] = useState({});
  const defaultSelectValue = "Choose...";

  // Get all the unique roots from database
  // useEffect(() => {loadUniqueRouteNames(dispatch)}, []);
  let {uniqueRouteNames} = store;

  const handleNewRouteName = (event) => {
    setNewRouteName(event.target.value);
  }


  const handleSelectRouteName = (event) => {
    setSelectedRouteName(event.target.value);
    if(event.target.value !== defaultSelectValue){
      setNewRouteDisable(true);
    }
    else{
      setNewRouteDisable(false);
    }
  }

  const handleSelectedDifficulty = (event) =>{
    setSelectedDifficulty(event.target.value)
  }

  const handleAddRoute = () =>{
    let addedRoutes = {...routesAdded};
    // Currently text box to enter new route is disabled.
    if(newRouteDisable && (selectedRouteName !== defaultSelectValue )){
      addedRoutes[selectedRouteName] = selectedDifficulty;
    }
    else{ // It's new route
    if(newRouteName !== "" ){
        addedRoutes[newRouteName] = selectedDifficulty;
      }
    }
    setRoutesAdded({...addedRoutes});
    setSelectedRouteName(defaultSelectValue);
    setNewRouteName('');
    setNewRouteDisable(false);

    console.log(JSON.stringify(addedRoutes))
  }

  // uniqueRouteNames.push('Route1');
  // uniqueRouteNames.push('Route2');
  
  uniqueRouteNames = [defaultSelectValue, "Route-1", ...uniqueRouteNames];
  console.log(uniqueRouteNames);

  return (
    <div className="container m-4 ml-auto">

      <div className="row input-group m-3">        
        <div className="col-3">
          <label htmlFor="select-route">Select a route: </label>
        </div>
        <div className="col">
          <select id="select-route" class="form-select form-select-sm" aria-label=".form-select-sm" value={selectedRouteName} onChange={handleSelectRouteName}>
            {/* <option selected>Choose...</option> */}
            {uniqueRouteNames.map((routeName, index) =>
              (
                <option key={`option-${Number(index)}`} selected={(index === 0)}  value={routeName}>{routeName}</option>
              ))}
          </select>
        </div>
      </div>
      <div className="row m-3">
        <div className="col">OR</div>
      </div>
      <div className="row m-3">
        <div className="col-3">
          <label>Enter a new route: </label>
        </div>
        <div className="col">
          <input type="text" value={newRouteName} disabled={newRouteDisable} onChange={handleNewRouteName}/>
        </div>
      </div>

      <div className="row input-group m-3">        
        <div className="col-3">
          <label htmlFor="select-route">Select difficulty of route: </label>
        </div>
        <div className="col">
          <select id="select-route" class="form-select form-select-sm" aria-label=".form-select-sm" value={selectedDifficulty} onChange={handleSelectedDifficulty}>
            <option selected>Choose...</option>
            {ROUTE_DIFFICULTIES.map((difficulty, index) =>
              (
                <option key={`option-diff-${Number(index)}`}  value={difficulty}>{difficulty}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="row m-3">
        <div className="col">
          <button type="button" className="btn btn-sm btn-dark" onClick={handleAddRoute}>Add Route</button>
        </div>
      </div>
      
      <div className="mt-5">
        <h5 className="mb-4">Routes included in the trip</h5>
      <div className="row m-3 justify-content-center">
        <div className="col-2">
          <h6>No:</h6>
        </div>
        <div className="col-4">
          <h6>Route Names</h6>
        </div>
        <div className="col-2">
          <h6>Difficulty</h6>
        </div>
        </div>
        
        {Object.keys(routesAdded).map((newRoute, index) =>(
          <div className="row m-3 justify-content-center">
            <div className="col-2">
              {index + 1}
            </div>
            <div className="col-4">
              {newRoute}
            </div>
            <div className="col-2">
              {routesAdded[newRoute]}
            </div>
          </div>
        ))}
      
      </div>
    </div>
  )
}