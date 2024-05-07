import axios from "axios"
import {
    GET_ALL_OFFICERS_REQUEST,
    GET_ALL_OFFICERS_SUCCESS,
    GET_ALL_OFFICERS_FAIL,
    ADD_OFFICER_REQUEST,
    ADD_OFFICER_SUCCESS,
    ADD_OFFICER_FAIL,
    GET_ONE_OFFICER_REQUEST,
    GET_ONE_OFFICER_SUCCESS,
    GET_ONE_OFFICER_FAIL,
    UPDATE_OFFICER_REQUEST,
    UPDATE_OFFICER_SUCCESS,
    UPDATE_OFFICER_FAIL,
    DELETE_OFFICER_REQUEST,
    DELETE_OFFICER_FAIL,
    UPDATE_ACTIVE_REQUEST,
    UPDATE_ACTIVE_FAIL
} from "../constants/Constant";
import { backend_uri_local, API_KEY } from '../../util/constant'
import { message } from 'antd'
import { logger } from "../../util/util";


const Success = (value) => {
    return message.success({
        content: `${value}!`,
        duration: 1,
    });
};

const Error = (value) => {
    return message.error({
        content: `${value}!`,
        duration: 2,
    });
};

export const getAllOfficers = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_OFFICERS_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/v1/user`, config);

        dispatch({
            type: GET_ALL_OFFICERS_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_OFFICERS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const addOfficer = (obj, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_OFFICER_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`,
                'Content-Type': 'multipart/form-data',
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/v1/user`, obj, config);

        dispatch({
            type: ADD_OFFICER_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '201') {
            Success(data.message).then(() => {
                navigate('/officer/listing')
            })
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '400') {
            Error(data.message)
        } else if (data.statuscode === '500') {
            Error(data.error)
        } else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: ADD_OFFICER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getOfficerDetailsById = (_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ONE_OFFICER_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/v1/user/${_id}`, config);

        dispatch({
            type: GET_ONE_OFFICER_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_ONE_OFFICER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateOfficer = (obj, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_OFFICER_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.put(`${backend_uri_local}/api/v1/user`, obj, config);
        logger("updated officer in action", data)

        dispatch({
            type: UPDATE_OFFICER_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '201') {
            Success(data.message).then(() => {
                navigate('/officer/listing')
            })
        } else if (data.statuscode === '404') {
            Error(data.message)
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '500') {
            Error(data.error)
        } else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: UPDATE_OFFICER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteOfficer = (_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_OFFICER_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.delete(`${backend_uri_local}/api/v1/user/${_id}`, config);

        dispatch({
            type: GET_ALL_OFFICERS_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: DELETE_OFFICER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}

export const updateActiveValue = (_id, obj, token) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ACTIVE_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.put(`${backend_uri_local}/api/v1/updateActiveValue/${_id}`, obj, config);

        dispatch({
            type: GET_ALL_OFFICERS_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: UPDATE_ACTIVE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}