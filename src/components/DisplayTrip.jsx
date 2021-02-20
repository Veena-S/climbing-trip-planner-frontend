
import React from "react";

export default function DisplayTrip({tripData}) {
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
        {tripData.routes.map((singleRoute, index) => (
          <div className="row">
            <div className="col">{index + 1}</div>
            <div className="col">{singleRoute.name}</div>
            <div className="col">{singleRoute.difficulty}</div>
            <div className="col">{singleRoute.order}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
