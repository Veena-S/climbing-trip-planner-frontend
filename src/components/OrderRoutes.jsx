import React, { useState, useContext } from "react";
import { TripContext, routeOrderAction } from "../store.js";

const UP = "up";
const DOWN = "down";

export default function OrderRoutes({ setShowPickRouteComp, 
                                      setShowOrderRoutesComp, setShowReviewComp}) {

  const { store, dispatch } = useContext(TripContext);
  let { newRouteData } = store.tripFormData;

  // state is an array
  const [preferredOrder, setpreferredOrder] = useState(newRouteData);

  const handleEditRoutes = () => {
    dispatch(routeOrderAction(preferredOrder));
    setShowPickRouteComp(true);
    setShowOrderRoutesComp(false);
    setShowReviewComp(false);
  }

  const handlePreview = () => {
    dispatch(routeOrderAction(preferredOrder));
    setShowPickRouteComp(false);
    setShowOrderRoutesComp(false);
    setShowReviewComp(true);
  }

  // order control (below) is either UP or DOWN
  const handleOrdering = (arrayIndex, orderControl) => {
    // perform shallow copy to avoid modifying state directly

    const newPreferredOrder = [...preferredOrder];

    switch (orderControl) {
      // allow route to be moved down in the priority
      case UP: //move the selected route up by one in the index
        // if alr at index 0, don't do anything
        if (arrayIndex === 0) return;

        // Since index >0, remove element from array
        const elementToMoveUp = newPreferredOrder.splice(arrayIndex, 1);

        // insert el back into newPreferredOrder but at (original Index -1)
        newPreferredOrder.splice(arrayIndex - 1, 0, ...elementToMoveUp);
        break;

      // allow route to be moved down in the priority
      case DOWN:
        console.log("managing DOWN");
        // if alr at the end of the array, don't do anything
        if (arrayIndex === newPreferredOrder.length - 1) return;

        // Since not at the end, remove element from array
        const elementToMoveDown = newPreferredOrder.splice(arrayIndex, 1);
        // insert el back into newPreferredOrder but at (original Index -1)
        newPreferredOrder.splice(arrayIndex + 1, 0, ...elementToMoveDown);
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
      // 1 to offset 0 indexing of arrays
      const startingIndex = index + 1;
      return (
        <div className="row">
          <div className="col">{startingIndex}</div>{" "}
          <div className="col">{route.name}</div>
          <div className="col">{route.difficulty}</div>
          <div className="col order-buttons">
            <button
              className="order-up-button "
              onClick={() => handleOrdering(index, UP)}
            >
              ⬆️
            </button>
            <button
              className="order-down-button "
              onClick={() => handleOrdering(index, DOWN)}
            >
              ⬇️
            </button>
          </div>
        </div>
      );
    });

  const handleButtonClick = () => {
    console.log(`add logic to switch screen`);
    dispatch(routeOrderAction({ preferredOrder }));
    // setShowPickRouteComp(true);
  };

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
            Edit
          </button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-sm btn-dark" onClick={handlePreview}>Review and submit</button>
        </div>
      </div>
    </div>
  );
}
