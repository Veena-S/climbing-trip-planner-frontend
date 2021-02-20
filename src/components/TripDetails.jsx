// Component to display the details of a trip.
// Invoked when a trip card is pressed and also to review all the data filled up
// for a new trip
// It will be read only. Update Button can be provided if it's an upcoming trip

import React, { useContext } from "react";
import { TripContext } from "../store.js";
import DisplayTrip from './DisplayTrip.jsx'
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
  const { trips, currentTripIndex } = store;

  const tripData = trips[currentTripIndex];

  let isUpcomingTrip = ( TRIPS_STATUS.UPCOMING_TRIP === getTripStatus(tripData.startDate, tripData.endDate));

  const handleUpdateTrip = () => {
    // To Do:
  }

  return (
    <div className="container m-3 p-3">
      <DisplayTrip tripData={tripData}></DisplayTrip>
      <div>
        {isUpcomingTrip && (
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-sm btn-primary" onClick={handleUpdateTrip}>
                Update Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
