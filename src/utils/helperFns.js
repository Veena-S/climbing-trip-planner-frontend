/ This file holds the helper functions that will be used across the source code		 // This file holds the helper functions that will be used across the source code
 import moment from 'moment';		 import moment from 'moment';

 
  export const ROUTE_DIFFICULTIES = [1, 2, 3, 4, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6,		
   5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15];		

    /**		
    * Status that defines the state of a trip		
    * Status defined are Past, Active or Upcoming		
    */		
 export const TRIPS_STATUS = Object.freeze({		 export const TRIPS_STATUS = Object.freeze({
   UPCOMING_TRIP: 0,		   UPCOMING_TRIP: 0,
   ACTIVE_TRIP: 1,		   ACTIVE_TRIP: 1,
   PAST_TRIP: 2,		   PAST_TRIP: 2,
 });		 });

 
  /**		
  * 		
  * @param {Date/String} tripStartDate - Start date of the trip		
  * @param {Date/String} tripEndDate - End date of the trip		
  */		
 export function getTripStatus(tripStartDate, tripEndDate){		 export function getTripStatus(tripStartDate, tripEndDate){
   let todayDate = new Date();		   let todayDate = new Date();
   // If todays'date is Before trips start date, it is an upcoming trip		   // If todays'date is Before trips start date, it is an upcoming trip
  if((moment(todayDate).isBefore(tripStartDate)))		  if((moment(todayDate).isBefore(tripStartDate)))
  {		  {
    return TRIPS_STATUS.UPCOMING_TRIP;		    return TRIPS_STATUS.UPCOMING_TRIP;
  }		  }
  // If todays is date is after trip start date, but before end date, it is a currently active trip		  // If todays is date is after trip start date, but before end date, it is a currently active trip
  else if((moment(tripStartDate).isBefore(todayDate)) && (moment(todayDate).isBefore(tripEndDate)))		  else if((moment(tripStartDate).isBefore(todayDate)) && (moment(todayDate).isBefore(tripEndDate)))
  {		  {
    return TRIPS_STATUS.ACTIVE_TRIP;		    return TRIPS_STATUS.ACTIVE_TRIP;
  }		  }
  // if both start and end dates are before todays date, it's a past trip		  // if both start and end dates are before todays date, it's a past trip
   else if((moment(tripStartDate).isBefore(todayDate)) && (moment(tripEndDate).isBefore(todayDate)))		   else if((moment(tripStartDate).isBefore(todayDate)) && (moment(tripEndDate).isBefore(todayDate)))
  {		  {
    return TRIPS_STATUS.PAST_TRIP;		    return TRIPS_STATUS.PAST_TRIP;
  }		  }
}