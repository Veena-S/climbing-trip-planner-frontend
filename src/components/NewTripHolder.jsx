import React, { useContext, useState } from "react";
import { TripContext } from "../store.js";
import CreateNewTrip from "./CreateNewTrip.jsx";
import PickRoute from "./PickRoute.jsx";
import OrderRoutes from "./OrderRoutes.jsx";

export default function NewTripHolder() {
  const { store, dispatch } = useContext(TripContext);
  const [showCreateNewTripComp, setShowCreateNewTripComp] = useState(true);
  const [showPickRouteComp, setShowPickRouteComp] = useState(false);
  const [showOrderRoutesComp, setShowOrderRoutesComp] = useState(false);

  return (
    <div className="container">
      {showCreateNewTripComp && (
        <div>
          <CreateNewTrip
            setShowPickRouteComp={setShowPickRouteComp}
          ></CreateNewTrip>
        </div>
      )}
      {showPickRouteComp && (
        <div>
          <PickRoute
            setShowCreateNewTripComp={setShowCreateNewTripComp}
            setShowPickRouteComp={setShowPickRouteComp}
            setShowOrderRoutesComp={setShowOrderRoutesComp}
          ></PickRoute>
        </div>
      )}
      {showOrderRoutesComp && (
        <div>
          <OrderRoutes
            setShowCreateNewTripComp={setShowCreateNewTripComp}
            setShowPickRouteComp={setShowPickRouteComp}
            setShowOrderRoutesComp={setShowOrderRoutesComp}
          ></OrderRoutes>
        </div>
      )}
    </div>
  );
}
