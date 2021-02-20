
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
  console.log(tripData);
  return (
    <div>
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
        {tripData.routes !== undefined && ( tripData.routes.map((singleRoute, index) => (
          <div className="row">
            <div className="col">{index + 1}</div>
            <div className="col">{singleRoute.name}</div>
            <div className="col">{singleRoute.difficulty}</div>
            <div className="col">{singleRoute.order}</div>
          </div>
        )))}
      </div>
    </div>
  );
}
