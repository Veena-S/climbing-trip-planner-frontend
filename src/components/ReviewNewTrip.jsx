import React, { useContext, useEffect, useState } from "react";
import { TripContext, createTrip, resetNewTripFormAction } from "../store.js";
import DisplayTrip from "./DisplayTrip.jsx";

export default function ReviewNewTrip({
  setShowOrderRoutesComp,
  setShowReviewComp,
}) {
  const { store, dispatch } = useContext(TripContext);
  const { newTripData, newRouteData } = store.tripFormData;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const displayTripData = {
    name: newTripData.name,
    creator: newTripData.creator,
    startDate: newTripData.startDate,
    endDate: newTripData.endDate,
    routes: [...newRouteData],
  };

  const handleEdit = () => {
    setShowOrderRoutesComp(true);
    setShowReviewComp(false);
  };

  const handleSubmit = () => {
    createTrip(dispatch, displayTripData).then((tripId) => {
      console.log(`New trip Id: ${tripId}`);
      setSubmitSuccess(true);
      // dispatch(resetNewTripFormAction());
    });
  };

  return (
    <div className="container m-3 p-3 form-container">
      <div className="row m-3 form-progress-toggle">
        <div className="col">
          <button
            type="button"
            className="btn btn-sm toggle-btns"
            onClick={handleEdit}
          >
            ⬅️ Order routes
          </button>
          {/* </div>
        <div className="col"> */}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col text-center">
          <h4>New Trip Details</h4>
        </div>
      </div>
      <DisplayTrip tripData={displayTripData}></DisplayTrip>
      <div className="mt-4">
        {submitSuccess && (
          <div
            class="alert alert-secondary mt-4 alert-dismissible fade show"
            role="alert"
          >
            New trip registered successfully!!!
            {/* <button type="button" className="btn btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
          </div>
        )}
      </div>
      <div className="row">
        <div className="col horizontal-centre-ing">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
