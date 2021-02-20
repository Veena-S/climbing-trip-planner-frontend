// Component to display the details of a trip.
// Invoked when a trip card is pressed and also to review all the data filled up
// for a new trip
// It will be read only. Update Button can be provided if it's an upcoming trip

import React, { useContext } from "react";
import { TripContext } from "../store.js";
import DisplayTrip from './DisplayTrip.jsx'
import { getTripStatus, TRIPS_STATUS } from "../utils/helperFns.js";

export default function TripDetails() {
  const { store, dispatch } = useContext(TripContext);
  const { trips, currentTripIndex } = store;
  console.log(trips, 'hi')
  const tripData = trips[currentTripIndex];
  // console.log(tripData)
  // let isUpcomingTrip = ( TRIPS_STATUS.UPCOMING_TRIP === getTripStatus(tripData.startDate, tripData.endDate));

  const handleUpdateTrip = () => {
    // To Do:
  }

  return (
    <div className="container m-3 p-3">
      <DisplayTrip tripData={tripData}></DisplayTrip>
      <div>
        {/* {isUpcomingTrip && (
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-sm btn-primary" onClick={handleUpdateTrip}>
                Update Trip
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
