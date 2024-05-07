import axios from "axios"
import {
    ADD_TRUCK_REQUEST, ADD_TRUCK_FAIL,
    GET_TRUCK_REQUEST, GET_TRUCK_SUCCESS, GET_TRUCK_FAIL,
    GET_TRUCK_BYID_REQUEST, GET_TRUCK_BYID_SUCCESS, GET_TRUCK_BYID_FAIL,
    UPDATE_TRUCK_REQUEST, UPDATE_TRUCK_SUCCESS, UPDATE_TRUCK_FAIL,
    DELETE_TRUCK_REQUEST, DELETE_TRUCK_FAIL,
    GET_USER_BY_TRUCK_REQUEST, GET_USER_BY_TRUCK_SUCCESS, GET_USER_BY_TRUCK_FAIL,
    GET_RECENT_ASSIGN_TRUCKS_REQUEST, GET_RECENT_ASSIGN_TRUCKS_SUCCESS, GET_RECENT_ASSIGN_TRUCKS_FAIL,
    UPDATE_USER_ACTIVE_REQUEST, UPDATE_USER_ACTIVE_FAIL,
    GET_TRUCK_BY_ZONE_REQUEST, GET_TRUCK_BY_ZONE_SUCCESS, GET_TRUCK_BY_ZONE_FAIL
} from '../constants/Constant'
import { backend_uri_local, API_KEY } from '../../util/constant'
import { message } from 'antd'
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


// trucklist api
export const getTrucksList = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRUCK_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/truck/trucklist`, config);
        logger("data ///////////////", data);

        dispatch({
            type: GET_TRUCK_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_TRUCK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}



export const addTruck = (obj, token) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_TRUCK_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.post(`${backend_uri_local}/api/truck/addtruck`, obj, config);

        dispatch({
            type: GET_TRUCK_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '201') {
            Success(data.message)
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
            type: ADD_TRUCK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })

    }
}

export const getTruckById = (_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRUCK_BYID_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/truck/truckbyid/${_id}`, config);

        dispatch({
            type: GET_TRUCK_BYID_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_TRUCK_BYID_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateTruck = (_id, obj, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_TRUCK_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        axios.put(`${backend_uri_local}/api/truck/updatetruck/${_id}`, obj, config).then((res) => {
            Success('Updated Successfully').then(() => {
                navigate('/truck')
            })
            dispatch({
                type: UPDATE_TRUCK_SUCCESS,
                payload: res.data
            })
            logger("response", res)
            if (res.statuscode === '402') {
                localStorage.removeItem('adminInfo');
                window.location.href = '/platinumsecurity';
            }
        }).catch((error) => {
            dispatch({
                type: UPDATE_TRUCK_FAIL,
                payload: error
            })
        })
    } catch (error) {
        dispatch({
            type: UPDATE_TRUCK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
        Error('Something Wrong')
    }
}

export const deleteTruck = (_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_TRUCK_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.delete(`${backend_uri_local}/api/truck/deletetruck/${_id}`, config);

        logger("response of delete truck", data)

        dispatch({
            type: GET_TRUCK_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: DELETE_TRUCK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}

export const getUserByTruck = (truckName, token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_BY_TRUCK_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/truck/get_user_by_truck`, { truckName }, config);
        logger("users in action", data)

        dispatch({
            type: GET_USER_BY_TRUCK_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_USER_BY_TRUCK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getRecentAssignedTrucks = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_RECENT_ASSIGN_TRUCKS_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/truck/recentAssignTruck`, config);
        console.log("truck action file ",data.data)

        dispatch({
            type: GET_RECENT_ASSIGN_TRUCKS_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_RECENT_ASSIGN_TRUCKS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateUserActiveValue = (_id, obj, token) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_ACTIVE_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.put(`${backend_uri_local}/api/truck/updateActiveValue/${_id}`, obj, config);

        dispatch({
            type: GET_TRUCK_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: UPDATE_USER_ACTIVE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getTruckListByZone = (zone, token) => async (dispatch) => {
    logger("zone", zone)
    try {
        dispatch({
            type: GET_TRUCK_BY_ZONE_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.post(`${backend_uri_local}/api/truck/gettruckbyzone`, { zone }, config);
        logger("data", data)

        dispatch({
            type: GET_TRUCK_BY_ZONE_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_TRUCK_BY_ZONE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
