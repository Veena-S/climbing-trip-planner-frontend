// This file holds the helper functions that will be used across the source code
import moment from 'moment';

export const TRIPS_STATUS = Object.freeze({
  UPCOMING_TRIP: 0,
  ACTIVE_TRIP: 1,
  PAST_TRIP: 2,
});

export function getTripStatus(tripStartDate, tripEndDate){
  let todayDate = new Date();
  // If todays'date is Before trips start date, it is an upcoming trip
  if((moment(todayDate).isBefore(tripStartDate)) && (moment(tripStartDate).isBefore(tripEndDate)))
  {
    return TRIPS_STATUS.UPCOMING_TRIP;
  }
  // If todays is date is after trip start date, but before end date, it is a currently active trip
  else if((moment(tripStartDate).isBefore(todayDate)) && (moment(todayDate).isBefore(tripEndDate)))
  {
    return TRIPS_STATUS.ACTIVE_TRIP;
  }
  // if both start and end dates are before todays date, it's a past trip
   else if((moment(tripStartDate).isBefore(todayDate)) && (moment(tripEndDate).isBefore(todayDate)))
  {
    return TRIPS_STATUS.PAST_TRIP;
  }
}