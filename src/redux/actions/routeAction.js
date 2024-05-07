import axios from "axios";
import {
  GET_ALL_ROUTE_REQUEST,
  GET_ALL_ROUTE_SUCCESS,
  GET_ALL_ROUTE_FAIL,
  ADD_ROUTE_REQUEST,
  ADD_ROUTE_SUCCESS,
  ADD_ROUTE_FAIL,
  GET_ONE_ROUTE_REQUEST,
  GET_ONE_ROUTE_SUCCESS,
  GET_ONE_ROUTE_FAIL,
  UPDATE_ROUTE_REQUEST,
  UPDATE_ROUTE_SUCCESS,
  UPDATE_ROUTE_FAIL,
  DELETE_ROUTE_REQUEST,
  DELETE_ROUTE_FAIL,
} from "../constants/Constant";
import { backend_uri_local, API_KEY } from "../../util/constant";
import { message } from "antd";
import { logger } from "../../util/util";

const Success = (value) => {
  return message.success({
    content: `${value}!`,
    duration: 2,
  });
};

const Error = (value) => {
  return message.error({
    content: `${value}!`,
    duration: 2,
  });
};

export const getAllRoutes = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ROUTE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        authorizationkey: `${API_KEY}`,
      },
    };

    const { data } = await axios.get(`${backend_uri_local}/api/admin/get-all`, config);
    logger("data in action file==>", data)

    dispatch({
      type: GET_ALL_ROUTE_SUCCESS,
      payload: data.data,
    });

    if (data.statuscode === "402") {
      localStorage.removeItem("adminInfo");
      window.location.href = "/platinumsecurity";
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_ROUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addRoute = (obj, token, navigate) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ROUTE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        authorizationkey: `${API_KEY}`,
      },
    };

    const { data } = await axios.post(`${backend_uri_local}/api/admin/add`, obj, config);

    dispatch({
      type: ADD_ROUTE_SUCCESS,
      payload: data.data,
    });
    if (data.statuscode === "201") {
      Success(data.message).then(() => {
        navigate("/admin/route");
      });
    } else if (data.statuscode === "401") {
      Error(data.message);
    } else if (data.statuscode === "402") {
      localStorage.removeItem("adminInfo");
      window.location.href = "/platinumsecurity";
    } else if (data.statuscode === "422") {
      Error(data.message);
    }
  } catch (error) {
    dispatch({
      type: ADD_ROUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRouteDetailsById = (_id, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ONE_ROUTE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        authorizationkey: `${API_KEY}`,
      },
    };

    const { data } = await axios.get(`${backend_uri_local}/api/admin/routebyid/${_id}`, config);

    dispatch({
      type: GET_ONE_ROUTE_SUCCESS,
      payload: data.data,
    });

    if (data.statuscode === "402") {
      localStorage.removeItem("adminInfo");
      window.location.href = "/platinumsecurity";
    }
  } catch (error) {
    dispatch({
      type: GET_ONE_ROUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateRoute = (_id, obj, token, navigate) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROUTE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        authorizationkey: `${API_KEY}`,
      },
    };

    axios.put(`${backend_uri_local}/api/admin/updateRoute/${_id}`, obj, config)
      .then((res) => {
        Success("Updated Successfully").then(() => {
          navigate("/admin/route");
        });
        dispatch({
          type: UPDATE_ROUTE_SUCCESS,
          payload: res.data,
        });

        if (res.statuscode === "402") {
          localStorage.removeItem("adminInfo");
          window.location.href = "/platinumsecurity";
        }
      }).catch((error) => {
        dispatch({
          type: UPDATE_ROUTE_FAIL,
          payload: error,
        });
      });
  } catch (error) {
    dispatch({
      type: UPDATE_ROUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    Error("Something Wrong");
  }
};

export const deleteRoute = (_id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROUTE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        authorizationkey: `${API_KEY}`,
      },
    };

    const { data } = await axios.delete(`${backend_uri_local}/api/admin/deleteRoute/${_id}`, config);

    dispatch({
      type: GET_ALL_ROUTE_SUCCESS,
      payload: data.data,
    });

    if (data.statuscode === "402") {
      localStorage.removeItem("adminInfo");
      window.location.href = "/platinumsecurity";
    }
  } catch (error) {
    dispatch({
      type: DELETE_ROUTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
