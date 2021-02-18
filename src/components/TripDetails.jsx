// Component to display the details of a trip.
// Invoked when a trip card is pressed and also to review all the data filled up
// for a new trip
// It will be read only. Update Button can be provided if it's an upcoming trip

import React, { useState, useContext } from "react";
import { TripContext } from "../store.js";
import { getTripStatus, TRIPS_STATUS } from "../utils/helperFns.js";

/**
 *
 * @param {Object} tripData - Expects this data contains both the trip details and
 *                            data on related routes.
 * Expected structure:
 * tripData = {
 *    id: <trip_id>,
 *    name: <trip_name>,
 *    creator: <trip_creator>
 *    startDate: <start_date>
 *    endDate: <end_date>
 *    ....
 *    // routes will be an array of route objects associated with the trip
 *    routes: [ routeObj1, routeObj2...]
 * }
 *
 * Structure of route Obj
 * route = { id: <id>, name: <>, difficulty: <>, order: <>}
 */
export default function TripDetails() {
  const { store, dispatch } = useContext(TripContext);
  const { trips, currentTripId } = store;
  let isTripIdValid = trips.hasOwnProperty(currentTripId);
  if(!isTripIdValid){
    return(
      <div className="container m-3 p-3 text-center">
        Please select or add a trip
      </div>
    )
  }

  const tripData = trips[currentTripId];

  let isUpcomingTrip = ( TRIPS_STATUS.UPCOMING_TRIP === getTripStatus(tripData.startDate, tripData.endDate));

  return (
    <div className="container m-3 p-3">
      <div className="row">{tripData.name}</div>
      <div className="row">{tripData.creator}</div>
      <div className="row">{tripData.startDate}</div>
      <div className="row">{tripData.endDate}</div>
      <div>
        <div className="row">Routes</div>
        <div className="row">
          <div className="col">Sl.No:</div>
          <div className="col">Route</div>
          <div className="col">Difficulty</div>
          <div className="col">Preference</div>
        </div>
        {tripData.routes.map((singleRoute, index) => (
          <div className="row">
            <div className="col">{index + 1}</div>
            <div className="col">{singleRoute.name}</div>
            <div className="col">{singleRoute.difficulty}</div>
            <div className="col">{singleRoute.order}</div>
          </div>
        ))}
      </div>
      <div>
        {isUpcomingTrip && (
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-sm btn-primary">
                Update Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
