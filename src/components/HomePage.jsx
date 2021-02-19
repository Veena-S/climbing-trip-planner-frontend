import React, { useContext, useState } from 'react'
import { TripContext } from '../store.js'
import Card from './Card'
import moment from 'moment'
import { getTripStatus, TRIPS_STATUS } from "../utils/helperFns.js";


export default function HomePage() {
  const { store, dispatch } = useContext(TripContext)
  const { trips, currentTripId } = store;

  const tripCardsPastDisplay = () => {
    
    const tripCards = trips.map((trip) => (
      <div>
        {console.log(getTripStatus(trip.startDate, trip.endDate))  }
      {getTripStatus(moment(trip.startDate).format('lll'), moment(trip.endDate).format('lll')) === 2 ?
        <Card title={trip.name} body={moment(trip.startDate).format('ll')} ></Card> : ""
      }
      </div>
      ))
    return tripCards;
  }
  const tripCardsActiveDisplay = () => {
    const tripCards = trips.map((trip) => (
      <div>
      {getTripStatus(moment(trip.startDate).format('lll'), moment(trip.endDate).format('lll')) === 1 ?
        <Card title={trip.name} body={moment(trip.startDate).format('ll')} ></Card> : ""
      }
      </div>
      ))
    return tripCards;
  }
  const tripCardsUpcomingDisplay = () => {
    console.log(trips)
    const tripCards = trips.map((trip) => (
      <div>
      {getTripStatus(moment(trip.startDate).format('lll'), moment(trip.endDate).format('lll')) === 0 ?
        <Card title={trip.name} body={moment(trip.startDate).format('ll')} ></Card> : ""
      }
      </div>
      ))
    return tripCards;
  }
  return (
    <>
    <div className="container">
      <div className="btn-div">
      <button> Create new Trip</button>
      </div>
      <div className="container">
        <h2>Upcoming Trips</h2>
        <div className="row">
        {tripCardsUpcomingDisplay()}
        </div>
      </div>
      <div className="container">
        <h2>Active Trips</h2>
        <div className="row">
        {tripCardsActiveDisplay()}
        </div>
      </div>
      <div className="container">
        <h2>Past Trips</h2>
        <div className="row">
        {tripCardsPastDisplay()}
        </div>
      </div>
      </div>
    </>
  )
}
