import React, { useState, useContext, useEffect } from "react";
import {
  TripContext,
  loadUniqueRouteNames,
  createRoutesForNewTrip,
} from "../store.js";
import { ROUTE_DIFFICULTIES } from "../utils/helperFns.js";

/**
 * Component to add a new route or to update an existing route
 */
export default function PickRoute({
  setShowCreateNewTripComp,
  setShowPickRouteComp,
  setShowOrderRoutesComp,
}) {
  const { store, dispatch } = useContext(TripContext);
  let { uniqueRouteNames, tripFormData } = store;
  const [newRouteName, setNewRouteName] = useState("");
  const [newRouteDisable, setNewRouteDisable] = useState(false);
  const [selectedRouteName, setSelectedRouteName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [routesAdded, setRoutesAdded] = useState({});
  const [routesTakenFromPrevData, setRoutesTakenFromPrevData] = useState(false);
  const defaultSelectValue = "Choose...";

  useEffect(() => {
    setShowCreateNewTripComp(false);
    // Get all the unique roots from database
    loadUniqueRouteNames(dispatch);
    // If data is already present in the new trip form,
    // Use that to fill the components
    if (
      tripFormData.newRouteData !== undefined &&
      tripFormData.newRouteData.length !== 0
    ) {
      let existingAddedRoutes = {};
      tripFormData.newRouteData.forEach((routeData) => {
        existingAddedRoutes[routeData.name] = routeData.difficulty;
      });
      setRoutesAdded({ ...existingAddedRoutes });
      setRoutesTakenFromPrevData(true);
    }
  }, []);

  const handleNewRouteName = (event) => {
    setNewRouteName(event.target.value);
  };

  const handleSelectRouteName = (event) => {
    setSelectedRouteName(event.target.value);
    if (event.target.value !== defaultSelectValue) {
      setNewRouteDisable(true);
      setNewRouteName("");
    } else {
      setNewRouteDisable(false);
    }
  };

  const handleSelectedDifficulty = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleAddRoute = () => {
    let addedRoutes = { ...routesAdded };
    // Currently text box to enter new route is disabled.
    if (newRouteDisable && selectedRouteName !== defaultSelectValue) {
      addedRoutes[selectedRouteName] = selectedDifficulty;
    } else {
      // It's new route
      if (newRouteName !== "") {
        addedRoutes[newRouteName] = selectedDifficulty;
      }
    }
    setRoutesAdded({ ...addedRoutes });
    setSelectedRouteName(defaultSelectValue);
    setNewRouteName("");
    setNewRouteDisable(false);

    console.log(JSON.stringify(addedRoutes));
  };

  // To delete a recently added route from the list
  const handleDeleteRoute = (routeName) => {
    let modifiedRoutes = { ...routesAdded };
    delete modifiedRoutes[routeName];
    setRoutesAdded({ ...modifiedRoutes });
  };

  const makeListOfAddedRoutes = () => {
    const newTripRoutes = [];
    Object.keys(routesAdded).forEach((routeName) => {
      newTripRoutes.push({
        name: routeName,
        difficulty: routesAdded[routeName],
      });
    });
    return newTripRoutes;
  };

  const handleEditTrip = () => {
    dispatch(createRoutesForNewTrip(makeListOfAddedRoutes()));
    setShowCreateNewTripComp(true);
    setShowPickRouteComp(false);
    setShowOrderRoutesComp(false);
  };

  const handleContinueOrderRoutes = () => {
    dispatch(createRoutesForNewTrip(makeListOfAddedRoutes()));
    setShowOrderRoutesComp(true);
    setShowCreateNewTripComp(false);
    setShowPickRouteComp(false);
  };

  uniqueRouteNames = [defaultSelectValue, ...uniqueRouteNames];
  console.log(uniqueRouteNames);

  return (
    <div className="container m-4 ml-auto">
      <div className="row input-group m-3">
        <div className="col-3">
          <label htmlFor="select-route">Select a route: </label>
        </div>
        <div className="col">
          <select
            id="select-route"
            class="form-select form-select-sm"
            aria-label=".form-select-sm"
            value={selectedRouteName}
            onChange={handleSelectRouteName}
          >
            {/* <option selected>Choose...</option> */}
            {uniqueRouteNames.map((routeName, index) => (
              <option
                key={`option-${Number(index)}`}
                selected={index === 0}
                value={routeName}
              >
                {routeName}
              </option>
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
          <input
            type="text"
            value={newRouteName}
            disabled={newRouteDisable}
            onChange={handleNewRouteName}
          />
        </div>
      </div>

      <div className="row input-group m-3">
        <div className="col-3">
          <label htmlFor="select-route">Select route difficulty: </label>
        </div>
        <div className="col">
          <select
            id="select-route"
            class="form-select form-select-sm"
            aria-label=".form-select-sm"
            value={selectedDifficulty}
            onChange={handleSelectedDifficulty}
          >
            <option selected>Choose...</option>
            {ROUTE_DIFFICULTIES.map((difficulty, index) => (
              <option key={`option-diff-${Number(index)}`} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row m-3">
        <div className="col">
          <button
            type="button"
            className="btn btn-sm btn-dark"
            onClick={handleAddRoute}
          >
            Add Route
          </button>
        </div>
      </div>

      <div className="row m-3">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={handleEditTrip}
          >
            ⬅️ Edit Trip
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={handleContinueOrderRoutes}
          >
            Choose Routes Order ➡️
          </button>
        </div>
      </div>

      <div className="container mt-5">
        <h5 className="mb-4 text-center">Selected Routes</h5>
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
          <div className="col-2">
            <h6>Delete</h6>
          </div>
        </div>

        {Object.keys(routesAdded).map((newRoute, index) => (
          <div className="row m-3 justify-content-center">
            <div className="col-2">{index + 1}</div>
            <div className="col-4">{newRoute}</div>
            <div className="col-2">{routesAdded[newRoute]}</div>
            <div className="col-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteRoute(newRoute)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
