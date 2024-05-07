import {
  GET_ALL_ROUTE_REQUEST,
  GET_ALL_ROUTE_SUCCESS,
  GET_ALL_ROUTE_FAIL,
  GET_ONE_ROUTE_REQUEST,
  GET_ONE_ROUTE_SUCCESS,
  GET_ONE_ROUTE_FAIL
} from "../constants/Constant";

const initialState = {
  routeList: [],
}; 

export const getAllRouteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROUTE_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_ROUTE_SUCCESS:
      return { loading: false, routeList: action.payload };
    case GET_ALL_ROUTE_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};

export const getRouteByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ONE_ROUTE_REQUEST:
      return { loading: true };
    case GET_ONE_ROUTE_SUCCESS:
      return { ...state, loading: false, routeDetails: action.payload };
    case GET_ONE_ROUTE_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};