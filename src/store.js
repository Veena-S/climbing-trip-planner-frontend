import React, { useState, useContext, useEffect, useReducer} from 'react'
import axios from 'axios'

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState ={
  trips: [], // TripId: TripData, including respective routes array
  uniqueRouteNames: [],
  tripFormData: {
   newTripData:{},
   newRouteData:[],// [{name, difficulty}]
  }
}

// just like the todo app, define each action we want to do on the
// data we defined above
const ADD_TRIP = "ADD_TRIP";
const REMOVE_TRIP = "REMOVE_TRIP";
const ADD_ROUTE = "ADD_ROUTE";
const LOAD_TRIPS = "LOAD_TRIPS";
const SELECT_TRIP = "SELECT_TRIP";
const LOAD_ROUTE_NAMES = "LOAD_ROUTE_NAMES";
const LOAD_ROUTES = "LOAD_ROUTES"
const ADD_ROUTE_NAME = "ADD_ROUTE_NAME";
const CREATE_NEW_TRIP = 'CREATE_NEW_TRIP';
const CREATE_ROUTE_NEW_TRIP = "CREATE_ROUTE_NEW_TRIP";
const MANAGE_ROUTE_ORDER = 'MANAGE_ROUTE_ORDER'
const RESET_NEW_TRIP_DATA = "RESET_NEW_TRIP_DATA";

// define the matching reducer function
export function tripReducer(state, action){
  switch(action.type){
    case ADD_TRIP:
      return {...state, trips: [...state.trips, action.payload.trip]};
      
    case REMOVE_TRIP:
      // let cart = state.filter((_item, i) => action.payload.cartIttemIndex !== i);
      // return {...state, cart};
      let currentTrips = [...state.trips];
      // delete currentTrips[action.payload.tripId]
      return {...state, trips: [...currentTrips]}

    case ADD_ROUTE:
      let trips = [...state.trips];
      const tripIndex = trips.findIndex((currTrip) => {
        if(currTrip.tripId === action.payload.route.tripId){
          return true;
        }
        return false;
      })
      let currRoutes = trips[tripIndex].routes
      if(undefined === currRoutes){
        trips[tripIndex] = [action.payload.route];
      }
      else{
        trips[tripIndex].push(action.payload.route);
      }
      return {...state, trips:[...state.trips]};

    case LOAD_TRIPS:
      return {...state, trips: action.payload.trips};

    case LOAD_ROUTE_NAMES:
      return {...state, uniqueRouteNames: [...new Set(action.payload.routeNames)]};
    
    case LOAD_ROUTES:
      let routes = {}
      action.payload.routes.forEach(route => {
        if (routes.hasOwnProperty(route.tripId)) {
          routes[route.tripId].push(route) 
        } else {
          routes[route.tripId] = [route]
        }
      });
      return { ...state, routes };

    case ADD_ROUTE_NAME:
      let routeNames = [...state.uniqueRouteNames];
      routeNames.push(action.payload.routeName);
      return {...state, uniqueRouteNames: [...new Set(routeNames)]};

    case SELECT_TRIP:
      const currentTripIndex = action.payload.currentTripIndex;
      return {...state, currentTripIndex};

    case CREATE_NEW_TRIP:
        const newTripData  = {...action.payload.trip};
        let newRouteData = [];
        if(state.tripFormData.newRouteData !== undefined){
          newRouteData = [...state.tripFormData.newRouteData];
        }
        return {...state, tripFormData:{newTripData, newRouteData}};

    case CREATE_ROUTE_NEW_TRIP:
      if(action.payload.newRoutesList !== undefined)
      {
        return{...state, 
        tripFormData:{newTripData: {...state.tripFormData.newTripData},
                      newRouteData:[...action.payload.newRoutesList],}};
      }
      break;
    case MANAGE_ROUTE_ORDER:
      if(action.payload.newRoutesList !== undefined){
        return{...state, 
        tripFormData:{newTripData: {...state.tripFormData.newTripData},
                      newRouteData:[...action.payload.newRoutesList],}};
      }
      break;
      
    case RESET_NEW_TRIP_DATA:
      return {...state, tripFormData: {}};

    default:
      return state;
  }
}

// The following action-generating functions are commonly referred to
// as "action creators". They accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.
export function addTripAction(trip) {
  return {
    type: ADD_TRIP,
    payload: {
      trip
    }
  };
}

export function removeTripAction(tripId) {
  return {
    type: REMOVE_TRIP,
    payload: {
      tripId
    }
  };
}

export function addRouteAction(route) {
  return {
    type: ADD_ROUTE,
    payload:{
      route
    }
  };
}
export function loadRoutesAction(routes) {
  return {
    type: LOAD_ROUTES,
    payload: {
      routes,
    },
  };
}

export function loadTripsAction(trips) {
  return {
    type: LOAD_TRIPS,
    payload: {
      trips
    }
  };
}

export function loadUniqueRouteNamesAction(routeNames){
  return {
    type: LOAD_ROUTE_NAMES,
    payload:{
      routeNames
    }
  }
}

export function addNewRouteNameAction(routeName){
  return {
    type: ADD_ROUTE_NAME,
    payload:{
      routeName
    }
  }
}

export function selectTripAction(tripIndex) {
  return {
    type: SELECT_TRIP,
    payload: {
      tripIndex
    }
  };
}

export function createNewTripAction(trip) {
  console.log(trip);
  console.log({...trip})
  return {
    type: CREATE_NEW_TRIP,
    payload: {
      trip
    }
  };
}

export function createRoutesForNewTrip(newRoutesList){
  return{
    type: CREATE_ROUTE_NEW_TRIP,
    payload:{
      newRoutesList
    }
  }
}
export function routeOrderAction(newRoutesList){
  return{
    type: MANAGE_ROUTE_ORDER,
    payload:{
      newRoutesList
    }
  }
}

export function resetNewTripFormAction(){
  return {
    type: RESET_NEW_TRIP_DATA,
    payload: {},
  }
}

/****************************
 ****************************
 ***  Provider Code
 ****************************
 **************************** 
 */

 // In this section we extract out the provider HOC

 // export the whole context
export const TripContext = React.createContext(null);

// create the provider to use below
const { Provider } = TripContext;


// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function TripProvider({children}) {

  // create the dispatch function in one place and put in into context
  // where it will be accessible to all of the children
  const [store, dispatch] = useReducer(tripReducer, initialState);
  // surround the children elements with
  // the context provider we created above
  return (<Provider value={{ store, dispatch }}>
      {children}
    </Provider>)
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Requests
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the
// code that makes requests to the backend
//
// these functions must be passed the dispatch from the current context

// place the hard coded backend URL in this file only
const BACKEND_URL = 'http://localhost:3004';

export function loadTrips(dispatch){
  axios.get(BACKEND_URL+'/trips').then((result) => {
    dispatch(loadTripsAction(result.data.trips));
  });
}

export function loadUniqueRouteNames(dispatch){
  axios.get(BACKEND_URL + '/route-names').then((result) => {
    dispatch(loadUniqueRouteNamesAction(result.data.routeNames));
  })
}
export function loadRoutes(dispatch) {
  axios.get(BACKEND_URL+'/routes').then((result) => {
    dispatch(loadRoutesAction(result.data.routes));
  });
}

export function createTrip(dispatch, trip){
  return new Promise((resolve, reject) => {
    axios.post(BACKEND_URL+'/trip', trip).then((result) => {
      dispatch(addTripAction(result.data.trip));
      dispatch(loadRoutesAction(result.data.routes))
      resolve(result.data.trip.id);
    });
  });
}