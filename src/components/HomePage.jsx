import React, { useContext, useState, useEffect } from "react";
import {
  loadRoutes,
  TripContext,
  loadTrips,
  loadTripsAction,
} from "../store.js";
import Card from "./Card";
import moment from "moment";
import { getTripStatus, TRIPS_STATUS } from "../utils/helperFns.js";
import TripDetails from "./TripDetails";
import { Modal, Button } from "react-bootstrap";

export default function HomePage() {
  const { store, dispatch } = useContext(TripContext);
  const { trips, routes } = store;
  const [displayCardDetails, setdisplayCardDetails] = useState(false);
  const [tripId, setTripId] = useState(0);
  const [selectedTripCardName, setSelectedTripCardName] = useState("");
  const [selectedTripCreator, setSelectedTripCreator] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [routeDetails, setRouteDetails] = useState([]);
  useEffect(() => {
    loadTrips(dispatch);
  }, []);
  useEffect(() => {
    loadRoutes(dispatch);
  }, []);

  const handleDisplay = (trip) => {
    let selectedRouteArray = routes[trip.id];
    const routeList = [];
    const selectedCard = selectedRouteArray.map((route) =>
      routeList.push({
        name: route.name,
        difficulty: route.difficulty,
      })
    );
    console.log(routeList);
    setRouteDetails(routeList);
    setdisplayCardDetails(true);
    setSelectedTripCardName(trip.name);
    setSelectedTripCreator(trip.creator);
    setSelectedStartDate(trip.startDate);
    setSelectedEndDate(trip.endDate);
  };
  const handleDisplayClose = () => {
    setdisplayCardDetails(false);
    setSelectedTripCardName("");
    setSelectedTripCreator("");
    setSelectedStartDate("");
    setSelectedEndDate("");
  };

  const tripCardSelectionModal = () => {
    return (
      <Modal show={displayCardDetails} onHide={handleDisplayClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTripCardName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Trip Creator: {selectedTripCreator}
          <br />
          Start Date: {moment(selectedStartDate).format("ll")}
          <br />
          End Date: {moment(selectedEndDate).format("ll")}
          <br />
          Routes:
          {routeDetails.map((route, i) => (
            <li>
              {route.name} Difficulty: {route.difficulty}
            </li>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDisplayClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const tripCardsPastDisplay = () => {
    const tripCards = trips.map((trip) => (
      <div key={trip.id}>
        {getTripStatus(
          moment(trip.startDate).format("lll"),
          moment(trip.endDate).format("lll")
        ) === 2 ? (
          <Card
            title={trip.name}
            body={moment(trip.startDate).format("ll")}
            onClick={() => {
              handleDisplay(trip);
            }}
          >
            {" "}
          </Card>
        ) : (
          ""
        )}
      </div>
    ));
    return tripCards;
  };
  const tripCardsActiveDisplay = () => {
    const tripCards = trips.map((trip) => (
      <div key={trip.id}>
        {getTripStatus(
          moment(trip.startDate).format("lll"),
          moment(trip.endDate).format("lll")
        ) === 1 ? (
          <Card
            title={trip.name}
            body={moment(trip.startDate).format("ll")}
            onClick={() => {
              handleDisplay(trip);
            }}
          >
            {" "}
          </Card>
        ) : (
          ""
        )}
      </div>
    ));
    return tripCards;
  };
  const tripCardsUpcomingDisplay = () => {
    const tripCards = trips.map((trip) => (
      <div key={trip.id}>
        {getTripStatus(
          moment(trip.startDate).format("lll"),
          moment(trip.endDate).format("lll")
        ) === 0 ? (
          <Card
            title={trip.name}
            body={moment(trip.startDate).format("ll")}
            onClick={() => {
              handleDisplay(trip);
            }}
          >
            {" "}
          </Card>
        ) : (
          ""
        )}
      </div>
    ));
    return tripCards;
  };

  return (
    <>
      <div className="container">
        <div className="container upcoming-trips-container">
          <h2>Upcoming Trips</h2>
          <div className="row">{tripCardsUpcomingDisplay()}</div>
        </div>
        <div className="container active-trips-container">
          <h2>Active Trips</h2>
          <div className="row">{tripCardsActiveDisplay()}</div>
        </div>
        <div className="container past-trips-container">
          <h2>Past Trips</h2>
          <div className="row">
            {tripCardsPastDisplay()}
            {tripCardSelectionModal()}
          </div>
        </div>
      </div>
    </>
  );
}
