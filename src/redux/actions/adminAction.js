import axios from "axios"
import {
    ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL, MERCHANT_LOGIN_SUCCESS,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL,
    ADD_HOLIDAY_DATE_REQUESTS, ADD_HOLIDAY_DATE_FAIL,
    GET_HOLIDAY_DATE_REQUESTS, GET_HOLIDAY_DATE_SUCCESS, GET_HOLIDAY_DATE_FAIL,
    DELETE_HOLIDAY_DATE_REQUEST, DELETE_HOLIDAY_DATE_FAIL,
    ADD_BANKS_REQUESTS, ADD_BANKS_FAIL,
    GET_BANKS_REQUESTS, GET_BANKS_SUCCESS, GET_BANKS_FAIL,
    DELETE_BANKS_REQUESTS, DELETE_BANKS_FAIL,
    ASSIGN_TRUCK_REQUEST, ASSIGN_TRUCK_FAIL,
    ASSIGNED_TRUCK_REQUEST, ASSIGNED_TRUCK_FAIL,
    GET_RECENT_REQ_REQUESTS, GET_RECENT_REQ_SUCCESS, GET_RECENT_REQ_FAIL,
    GET_BANK_BYID_REQUESTS, GET_BANK_BYID_SUCCESS, GET_BANK_BYID_FAIL,
    UPDATE_BANK_REQUESTS, UPDATE_BANK_SUCCESS, UPDATE_BANK_FAIL,
    GET_NOTIFICATION_FAIL, GET_NOTIFICATION_REQUEST, GET_NOTIFICATION_SUCCESS,
    UPDATE_ADMIN_PROFILE_REQUESTS, UPDATE_ADMIN_PROFILE_FAIL, UPDATE_NOTIFICATION_COUNT_REQUEST, UPDATE_NOTIFICATION_COUNT_FAIL,
    GET_NOTIFICATION_COUNT_FAIL, GET_NOTIFICATION_COUNT_REQUEST, GET_NOTIFICATION_COUNT_SUCCESS,
    GET_ROUTE_SUCCESS, GET_ROUTE_REQUEST, GET_ROUTE_FAIL, GET_ALL_REQUESTS_SUCCESS,
    GET_ADMIN_DETAILS_REQ, GET_ADMIN_DETAILS_SUCCESS, GET_ADMIN_DETAILS_FAIL
} from "../constants/Constant";
import { backend_uri_local, API_KEY } from '../../util/constant'
import { message } from 'antd'
import Moment from "moment";
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


export const adminlogin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_LOGIN_REQUEST
        })

        const { data } = await axios.post(`${backend_uri_local}/api/admin/adminlogin`, { email, password });
        logger("data", data);

        if (data.statuscode === '400') {
            Error("You are Disabled")
        } else if (data.statuscode === '401') {
            Error("Invalid Email or Password")
        } else if (data.statuscode === '500') {
            Error("Invalid Email or Password")
        } else if (data.data.role === 'ADMIN') {
            dispatch({
                type: ADMIN_LOGIN_SUCCESS,
                payload: data
            })

            if (data.statuscode === '201') {
                Success(`Welcome Back ${data.data.admin_name}`)
            }

            localStorage.setItem('adminInfo', JSON.stringify(data))

        } else if (data.data.type === 'MERCHANT' || data.data.type === 'FINANCIAL INSTITUTION') {
            dispatch({
                type: MERCHANT_LOGIN_SUCCESS,
                payload: data
            })

            if (data.statuscode === '201') {
                Success(`Welcome Back ${data.data.business_name}`)
            }

            localStorage.setItem('merchantInfo', JSON.stringify(data))
        }
    } catch (error) {
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}

export const   forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })

        const { data } = await axios.post(`${backend_uri_local}/api/admin/forgotpassword`, { email });

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data
        })
        if (data.statuscode === '201') {
            Success('Reset Password Link is sent on your Email')
        } else if (data.statuscode === '401') {
            Error('Something Wrong')
        } else if (data.statuscode === '400') {
            Error('Email does not exists!')
        } else if (data.statuscode === '500') {
            Error('Invalid user')
        }

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const changePassword = (password, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: CHANGE_PASSWORD_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.patch(`${backend_uri_local}/api/admin/change_password`, { password }, config);
        logger("data", data);
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: data
        })
        if (data.statuscode === '201') {
            Success(data.message).then(() => {
                navigate('/')
            })
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '400') {
            Error(data.message)
        } else if (data.status === '500') {
            Error(data.message)
        } else if (data.statuscode === '402') {
            Error('Token is Expired. Click Again on forgot-password')
        }
    } catch (error) {
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const addHolidayDate = (date, holidayName, token) => async (dispatch) => {
    try {
        dispatch({ type: ADD_HOLIDAY_DATE_REQUESTS })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.post(`${backend_uri_local}/api/admin/addholidaydate`, { date: date, name: holidayName }, config)

        dispatch({ type: GET_HOLIDAY_DATE_SUCCESS, payload: data.dateList })

        if (data.statuscode === '201') {
            Success(data.message)
        } else if (data.statuscode === '401') {
            Error(data.message)
        }
        else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: ADD_HOLIDAY_DATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getHolidayDate = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_HOLIDAY_DATE_REQUESTS })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/admin/getholidaydate`, config)
        dispatch({ type: GET_HOLIDAY_DATE_SUCCESS, payload: data.dateList })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_HOLIDAY_DATE_FAIL, payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteHolidayDate = (_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_HOLIDAY_DATE_REQUEST
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.delete(`${backend_uri_local}/api/admin/deleteholidaydate/${_id}`, config);

        dispatch({
            type: GET_HOLIDAY_DATE_SUCCESS,
            payload: data.dateList
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: DELETE_HOLIDAY_DATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}

export const addBank = (obj, token) => async (dispatch) => {
    try {
        dispatch({ type: ADD_BANKS_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/admin/addbank`, obj, config)

        dispatch({
            type: GET_BANKS_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '201') {
            Success(data.message)
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: ADD_BANKS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getBanks = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_BANKS_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/admin/banks`, config)

        dispatch({
            type: GET_BANKS_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_BANKS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getBankById = (_id, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_BANK_BYID_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/admin/bank/${_id}`, config)
        logger("data", data);

        dispatch({
            type: GET_BANK_BYID_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_BANK_BYID_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateBank = (_id, obj, token, navigate) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BANK_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.put(`${backend_uri_local}/api/admin/bank/${_id}`, obj, config)
        if (data.statuscode === '201') {
            Success(data.message).then(() => {
                navigate('/admin/master-banks')
            })
        }
        dispatch({
            type: UPDATE_BANK_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: UPDATE_BANK_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deleteBank = (_id, token) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BANKS_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.delete(`${backend_uri_local}/api/admin/bank/${_id}`, config)

        dispatch({
            type: GET_BANKS_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: DELETE_BANKS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// change truck 
export const changeTruck = (token, req_ID, truckID, adminID,merchantid) => async (dispatch) => {
    console.log("startcheccnge truck")
    try {
        console.log("inside try")
        dispatch({ type: ASSIGN_TRUCK_REQUEST })
console.log("inside dispatch")
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        console.log("inside config")

        const { data } = await axios.post(`${backend_uri_local}/api/admin/changetruck`, { req_ID: req_ID, truckID: truckID }, config)
        logger("response of change truck", data)
console.log("response of change truck", data)
        if (data.statuscode === '201') {
            // const socket = io(`${backend_uri_local}`);
            // const messageObject = {
            //     message: `Admin Changed the Truck on Your Request`,
            //     requester: "Admin",
            //     ID: merchantid,
            //     adminID:adminID,
            //     req_ID: req_ID,
            //     role: 'Merchant'
            // };
            // socket.emit("newMessage", messageObject)
            Success(data.message)
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '404') {
            Error(data.message)
        } else if (data.statuscode === '400') {
            Error(data.message)
        } else if (data.statuscode === '500') {
            Error(data.error.message)
        } else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

        dispatch({ type: GET_ALL_REQUESTS_SUCCESS, payload: data.data })
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: ASSIGN_TRUCK_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// Assign Truck
export const AssignTruck = (token, req_ID, truckID) => async (dispatch) => {
    try {
        dispatch({ type: ASSIGNED_TRUCK_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/admin/assigntruck`, { req_ID: req_ID, truckID: truckID }, config)
        logger("response of assign  truck", data)

        if (data.statuscode === '201') {
            Success(data.message)
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '404') {
            Error(data.message)
        } else if (data.statuscode === '400') {
            Error(data.message)
        } else if (data.statuscode === '500') {
            Error(data.error.message)
        }
        else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

        dispatch({ type: GET_ALL_REQUESTS_SUCCESS, payload: data.data })

    } catch (error) {
        dispatch({
            type: ASSIGNED_TRUCK_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const recentRequest = (startDate, endDate, token) => async (dispatch) => {
    try {
        let recentRequest;
        dispatch({ type: GET_RECENT_REQ_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/allrequest`, config)

        if (startDate && endDate) {
            recentRequest = data.data.filter(user => {
                let itemDate = user.pickup_datetime.slice(0, user.pickup_datetime.indexOf(','));
                itemDate = Moment(itemDate).format('YYYY-MM-DD')
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end;
            });
        }

        dispatch({
            type: GET_RECENT_REQ_SUCCESS,
            payload: recentRequest
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_RECENT_REQ_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getNotification = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_NOTIFICATION_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/notification/getNotifications`, config)
        // adminSocket.emit("new message", data);
        dispatch({
            type: GET_NOTIFICATION_SUCCESS,
            payload: data.data
        })
        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_NOTIFICATION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const updateAdminProfile = (obj, token) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADMIN_PROFILE_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.put(`${backend_uri_local}/api/admin/update/admin_profile`, obj, config)

        dispatch({
            type: GET_ADMIN_DETAILS_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '500') {
            Error(data.message)
        } else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: UPDATE_ADMIN_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getNotificationCount = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_NOTIFICATION_COUNT_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/notification/getcount`, config)

        dispatch({ type: GET_NOTIFICATION_COUNT_SUCCESS, payload: data.data })

    } catch (error) {
        dispatch({
            type: GET_NOTIFICATION_COUNT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message

        })
    }
}

export const updateNotification = (token, ID) => async (dispatch) => {
    try {
        logger("ID", ID);
        dispatch({ type: UPDATE_NOTIFICATION_COUNT_REQUEST })
        const config = { headers: { 'Authorization': `Bearer ${token}`, 'authorizationkey': `${API_KEY}` } }
        const { data } = await axios.put(`${backend_uri_local}/api/notification/update/${ID}`, config)
        dispatch({ type: GET_NOTIFICATION_COUNT_SUCCESS, payload: data.data })

    } catch (error) {
        dispatch({
            type: UPDATE_NOTIFICATION_COUNT_FAIL, payload: error.response &&
                error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const getRoute = (_id, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_ROUTE_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.post(`${backend_uri_local}/api/admin/allroutes`, { _id }, config)
        logger("Data in action file", data.result)

        if (data.statuscode === '500') {
            Error(data.error.message)
        }
        else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
        dispatch({ type: GET_ROUTE_SUCCESS, payload: data.result })
    } catch (error) {
        dispatch({
            type: GET_ROUTE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getAdminDetails = (_id, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMIN_DETAILS_REQ })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/admin/admindetails/${_id}`, config)
        logger("admin details in action file", data)

        dispatch({ type: GET_ADMIN_DETAILS_SUCCESS, payload: data.data })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_ADMIN_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}