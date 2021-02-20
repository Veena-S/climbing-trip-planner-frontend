import React, { useState, useContext } from "react";
import { TripContext, routeOrderAction } from "../store.js";

const UP = "up";
const DOWN = "down";

const handleOrdering = (arrayIndex, orderControl) => {
  switch (orderControl) {
    case UP:
    // i want to insert the arr el into the position before the current el
  }
};

export default function OrderRoutes({
  setShowCreateNewTripComp,
  setShowPickRouteComp,
  setShowOrderRoutesComp,
}) {
  const { store, dispatch } = useContext(TripContext);
  let { tripFormData } = store;

  const [preferredOrder, setpreferredOrder] = useState([
    { name: "a", difficulty: 1.2 },
    { name: "b", difficulty: 1.1 },
    { name: "c", difficulty: 2 },
  ]);

  const handleEditRoutes = () => {
    dispatch(routeOrderAction(preferredOrder));
    setShowCreateNewTripComp(false);
    setShowPickRouteComp(true);
    setShowOrderRoutesComp(false);
  };

  // order control (below) is either UP or DOWN
  const handleOrdering = (arrayIndex, orderControl) => {
    // perform shallow copy to avoid modifying state directly

    const newPreferredOrder = [...preferredOrder];

    switch (orderControl) {
      case UP: //move the selected route up by one in the index
        console.log("managing UP");
        // if alr at index 0, don't do anything
        if (arrayIndex === 0) return;

        // Since index >0, remove element from array
        const elementToMoveUp = newPreferredOrder.splice(arrayIndex, 1);
        console.log(
          `newPreferredOrder after splicing (to remove from array) is:`
        );
        console.log(newPreferredOrder);

        // insert el back into newPreferredOrder but at (original Index -1)
        newPreferredOrder.splice(arrayIndex - 1, 1, ...elementToMoveUp);
        console.group(
          `newPreferredOrder after splicing (to add back into array) is:`
        );
        console.group(newPreferredOrder);
        break;

      case DOWN:
        // if alr at the end of the array, don't do anything
        if (arrayIndex === newPreferredOrder.length - 1) return;

        // Since not at the end, remove element from array
        const elementToMoveDown = newPreferredOrder.splice(arrayIndex, 1);
        // insert el back into newPreferredOrder but at (original Index -1)
        newPreferredOrder.splice(arrayIndex + 1, 1, ...elementToMoveDown);
        break;

      default:
        return;
    }
    setpreferredOrder(newPreferredOrder);
  };
  // display routes; default display is random, subsequent display depends on how user prioriritise it

  const DisplayedRoutes = () =>
    preferredOrder.map((route, index) => {
      // return preferredOrder.map((route, index) => {
      return (
        <div className="row">
          {/* <div className="col">{route.id}</div> */}
          <div className="col">{route.name}</div>
          <div className="col">{route.difficulty}</div>
          <div className="col">
            <button
              className="order-up-button"
              onClick={() => handleOrdering(index, UP)}
            >
              Up
            </button>
            <button
              className="order-down-button"
              onClick={() => handleOrdering(index, DOWN)}
            >
              Down
            </button>
          </div>
        </div>
      );
    });

  return (
    <div className=" container order-routes-container">
      <div className="row">
        <div className="col table-headers">No.</div>
        <div className="col table-headers">Route</div>
        <div className="col table-headers">Difficulty</div>
        <div className="col table-headers">Preference</div>
      </div>
      <DisplayedRoutes />

      {/* // To add the Back button for editing routes */}
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={handleEditRoutes}
          >
            Edit Routes
          </button>
        </div>
      </div>
    </div>
  );
}
