import React, { useContext, useEffect, useState } from "react";
import { TripContext, createTrip, resetNewTripFormAction } from "../store.js";
import DisplayTrip from './DisplayTrip.jsx'

export default function ReviewNewTrip({setShowOrderRoutesComp, setShowReviewComp}) {
  const { store, dispatch } = useContext(TripContext);
  const { tripFormData } = store;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [displayTripData, setDisplayTripData] = useState({
    name: tripFormData.newTripData.name,
    creator: tripFormData.newTripData.creator, 
    startDate: tripFormData.newTripData.startDate, 
    endDate: tripFormData.newTripData.endDate, 
    routes: [...tripFormData.newRouteData],
  });

  const handleEdit = () => {
    setShowOrderRoutesComp(true);
    setShowReviewComp(false);
  }

  const handleSubmit = () => {
    // createTrip(dispatch, tripData).then((tripId) => {
    //   console.log(`New trip Id: ${tripId}`);
    //   setSubmitSuccess(true);
    // })
    dispatch(resetNewTripFormAction());
  }

  return (
    <div className="container m-3 p-3">
      {/* <DisplayTrip tripData={displayTripData}></DisplayTrip> */}
      <div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-sm btn-secondary" onClick={handleEdit}>Edit</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-sm btn-dark" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        {submitSuccess && (
          <div class="alert alert-success" role="alert">
            New trip registered successfully!!!
          </div>
        )}
      </div>
    </div>
  );
}
