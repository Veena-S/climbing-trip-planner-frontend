import React, {useContext, useEffect, useState} from 'react'
import { TripContext, resetNewTripFormAction} from "../store.js";
import CreateNewTrip from './CreateNewTrip.jsx'
import PickRoute from './PickRoute.jsx'
import OrderRoutes from './OrderRoutes.jsx'
import ReviewNewTrip from './ReviewNewTrip.jsx';

export default function NewTripHolder() {
  const { store, dispatch } = useContext(TripContext);
  const [showCreateNewTripComp, setShowCreateNewTripComp] = useState(true);
  const [showPickRouteComp, setShowPickRouteComp] = useState(false);
  const [showOrderRoutesComp, setShowOrderRoutesComp ] = useState(false);
  const [showReviewComp, setShowReviewComp ] = useState(false);

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
          <OrderRoutes setShowPickRouteComp={setShowPickRouteComp} setShowOrderRoutesComp={setShowOrderRoutesComp} setShowReviewComp={setShowReviewComp}></OrderRoutes>
        </div> )
      }
      {showReviewComp && (
        <div>
          <ReviewNewTrip setShowOrderRoutesComp={setShowOrderRoutesComp} 
          setShowReviewComp={setShowReviewComp}></ReviewNewTrip>
        </div>
      )}
      <div>
        <div className="row">
          <div className="col">

          </div>
        </div>
      </div>

    </div>
  );
}
