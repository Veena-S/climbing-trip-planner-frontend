
import React from "react";


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

export default function DisplayTrip({tripData}) {
  console.log("DisplayTrip")
  console.log({...tripData});
  console.log(tripData.name);
  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-3">Trip Name: </div>
        <div className="col">{tripData.name}</div>
      </div>
      <div className="row">
        <div className="col-3">Trip Created By:  </div>
        <div className="col">{tripData.creator}</div>
      </div>
      <div className="row">
        <div className="col-3">Trip Start Date: </div>
        <div className="col">{new Date(tripData.startDate).toDateString()}</div>
        </div>
      <div className="row">
        <div className="col-3">Trip End Date:</div>
        <div className="col">{new Date(tripData.endDate).toDateString()}</div>
         </div>
      <div>
        <div className="row mb-4 mt-4">
          <div className="col">
            <h5>Routes</h5>
          </div>          
        </div>
        <div className="row m-3">
          <div className="col-2"><h6>Sl.No:</h6></div>
          <div className="col-4"><h6>Route</h6></div>
          <div className="col-2"><h6>Difficulty</h6></div>
          <div className="col-2"><h6>Preference</h6></div>
        </div>
        {tripData.routes !== undefined && ( tripData.routes.map((singleRoute, index) => (
          <div className="row m-3">
            <div className="col-2">{index + 1}</div>
            <div className="col-4">{singleRoute.name}</div>
            <div className="col-2">{singleRoute.difficulty}</div>
            <div className="col-2">{index+1}</div>
          </div>
        )))}
      </div>
    </div>
  );
}
