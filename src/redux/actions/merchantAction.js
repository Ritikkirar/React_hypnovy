import axios from "axios"
import {
    GET_ALL_MERCHANT_REQUEST, GET_ALL_MERCHANT_SUCCESS, GET_ALL_MERCHANT_FAIL,
    ADD_MERCHANT_REQUEST, ADD_MERCHANT_SUCCESS, ADD_MERCHANT_FAIL,
    GET_ONE_MERCHANT_REQUEST, GET_ONE_MERCHANT_SUCCESS, GET_ONE_MERCHANT_FAIL,
    UPDATE_MERCHANT_REQUEST, UPDATE_MERCHANT_SUCCESS, UPDATE_MERCHANT_FAIL,
    DELETE_MERCHANT_REQUEST, DELETE_MERCHANT_FAIL,
    GET_TOTAL_MERCHANT_REQUEST, GET_TOTAL_MERCHANT_SUCCESS, GET_TOTAL_MERCHANT_FAIL,
    UPDATE_ACTIVE_REQUEST, UPDATE_ACTIVE_FAIL,
    GET_TOTAL_COUNT_REQUEST, GET_TOTAL_COUNT_SUCCESS, GET_TOTAL_COUNT_FAIL,
    ADD_REQUEST, ADD_REQ_SUCCESS, ADD_REQ_FAIL,
    GET_ALL_MERCHANT_REQ_REQUEST, GET_ALL_MERCHANT_REQ_SUCCESS, GET_ALL_MERCHANT_REQ_FAIL,
    GET_ALL_REQUESTS, GET_ALL_REQUESTS_SUCCESS, GET_ALL_REQUESTS_FAIL,
    GET_SINGLE_REQ_REQUESTS, GET_SINGLE_REQ_SUCCESS, GET_SINGLE_REQ_FAIL,
    EDIT_REQUEST, EDIT_REQ_FAIL, EDIT_REQ_SUCCESS,
    UPDATE_MERCHANT_PROFILE_REQUEST, UPDATE_MERCHANT_PROFILE_FAIL,
    GET_TOTAL_REQ_COUNT_REQUEST, GET_TOTAL_REQ_COUNT_SUCCESS, GET_TOTAL_REQ_COUNT_FAIL,
    GET_ASSIGNED_REQ_COUNT_REQUEST, GET_ASSIGNED_REQ_COUNT_SUCCESS, GET_ASSIGNED_REQ_COUNT_FAIL,
    GET_TRANSIT_REQUEST, GET_TRANSIT_SUCCESS, GET_TRANSIT_FAIL,
    GET_TYPE_WISE_REQ_REQUEST, GET_TYPE_WISE_REQ_SUCCESS, GET_TYPE_WISE_REQ_FAIL,
    GET_RECENT_REQ_PER_MERCHANT_REQUESTS, GET_RECENT_REQ_PER_MERCHANT_SUCCESS, GET_RECENT_REQ_PER_MERCHANT_FAIL,
    GET_TOTAL_MERCHANT_COUNT_REQUEST, GET_TOTAL_MERCHANT_COUNT_SUCCESS, GET_TOTAL_MERCHANT_COUNT_FAIL,
    GET_PER_DAY_REQ_REQUEST, GET_PER_DAY_REQ_SUCCESS, GET_PER_DAY_REQ_FAIL,
    ADD_NOTIFICATION_FAIL, ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_REQUEST,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL
} from "../constants/Constant";
import { backend_uri_local, API_KEY } from '../../util/constant'
import { message } from 'antd'
import Moment from "moment";
import { logger } from "../../util/util";
import { io } from 'socket.io-client';

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




// ADMIN DASHBOARD ACTIONS 

export const getAllMerchant = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_MERCHANT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/merchant/allmerchant`, config);

        dispatch({
            type: GET_ALL_MERCHANT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_ALL_MERCHANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const addMerchant = (obj, token, navigate) => async (dispatch) => {
    try {

        dispatch({
            type: ADD_MERCHANT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/merchant/merchant`, obj, config);

        dispatch({
            type: ADD_MERCHANT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '201') {
            Success(data.message).then(() => {
                navigate('/customer/listing')
            })
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '500') {
            Error(data.message)
        } else if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: ADD_MERCHANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getMerchantDetailsById = (ID, token) => async (dispatch) => {
    logger("merchant action id ", ID)
    try {
        dispatch({
            type: GET_ONE_MERCHANT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/merchant/get_merchant_byid/${ID}`, config);
        logger("merchant details action file", data.data)
        dispatch({
            type: GET_ONE_MERCHANT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_ONE_MERCHANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateMerchant = (id, obj, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_MERCHANT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        axios.put(`${backend_uri_local}/api/merchant/update_merchant/${id}`, obj, config).then((res) => {
            Success('Updated Successfully!').then(() => {
                navigate('/customer/listing')
            })
            dispatch({
                type: UPDATE_MERCHANT_SUCCESS,
                payload: res.data
            })
            if (res.statuscode === '402') {
                localStorage.removeItem('adminInfo');
                window.location.href = '/platinumsecurity';
            }
        }).catch((error) => {
            dispatch({
                type: UPDATE_MERCHANT_FAIL,
                payload: error
            })
        })
    } catch (error) {
        dispatch({
            type: UPDATE_MERCHANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteMerchant = (_id, token) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_MERCHANT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.delete(`${backend_uri_local}/api/merchant/delete_merchant/${_id}`, config);
        logger("delete response", data);

        dispatch({
            type: GET_ALL_MERCHANT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: DELETE_MERCHANT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }

}

export const getTotalMerchants = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TOTAL_MERCHANT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/merchant/totalMerchant`, config);

        dispatch({
            type: GET_TOTAL_MERCHANT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_TOTAL_MERCHANT_FAIL,
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

        const { data } = await axios.put(`${backend_uri_local}/api/merchant/updateActiveValue/${_id}`, obj, config);

        dispatch({
            type: GET_ALL_MERCHANT_SUCCESS,
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

export const getTotalCount = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TOTAL_COUNT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/merchant/totalcount`, config);

        dispatch({
            type: GET_TOTAL_COUNT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_TOTAL_COUNT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getAllRequests = (token) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/allrequest`, config);

        dispatch({
            type: GET_ALL_REQUESTS_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_REQUESTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getRequestsCount = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TOTAL_REQ_COUNT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/get_all_requests_count`, config)

        dispatch({
            type: GET_TOTAL_REQ_COUNT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_TOTAL_REQ_COUNT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getAssignedRequest = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ASSIGNED_REQ_COUNT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/get_assigned_req`, config)


        dispatch({
            type: GET_ASSIGNED_REQ_COUNT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_ASSIGNED_REQ_COUNT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getTransitRequest = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TRANSIT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/get_transit_req`, config)

        dispatch({
            type: GET_TRANSIT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_TRANSIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const merchantTypeWiseRequest = (token) => async (dispatch) => {
    try {
        dispatch({
            type: GET_TYPE_WISE_REQ_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/get_typewise_req`, config)

        dispatch({
            type: GET_TYPE_WISE_REQ_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_TYPE_WISE_REQ_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


// MERCHANT DASHBOARD ACTIONS 

export const addRequest = (formdata, token, navigate, iddata) => async (dispatch) => {
    try {
        dispatch({ type: ADD_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/request/addrequest`, formdata, config);

        logger("data", data);

        dispatch({
            type: ADD_REQ_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '201') {
            const socket = io(`${backend_uri_local}`);
            const obj = {
                message: `${iddata.business_name} has created a new request`,
                requester: "Merchant",
                ID: iddata.ID,
                adminID: iddata.adminID,
                req_ID: iddata.req_ID,
            };
            socket.emit("newMessage", obj)
            logger("response of create request obj", obj)
            Success('Request Created Successfully!').then(() => {
                navigate('/requests')
            })

        }
        else if (data.statuscode === '200') {
            const socket = io(`${backend_uri_local}`);
            const obj = {
                message: `${iddata.business_name} has created a new request But truck Not assigned yet Kindly Assign the Truck`,
                requester: "Merchant",
                ID: iddata.ID,
                adminID: iddata.adminID,
                req_ID: iddata.req_ID,
            };

            socket.emit("newMessage", obj)
            logger("response of create request obj", obj)
            Success('Request Created Successfully!').then(() => {
                navigate('/requests')
            })
        }
        else if (data.statuscode === '202') {
            const socket = io(`${backend_uri_local}`);
            const obj = {
                message: `${iddata.business_name} has created a new request But Officers Not Assigned to The Truck`,
                requester: "Merchant",
                ID: iddata.ID,
                adminID: iddata.adminID,
                req_ID: iddata.req_ID,
            };

            socket.emit("newMessage", obj)
            logger("response of create request obj", obj)
            Success('Request Created Successfully!').then(() => {
                navigate('/requests')
            })
        }
        else if (data.statuscode === '203') {
            const socket = io(`${backend_uri_local}`);
            const obj = {
                message: `${iddata.business_name} has created a new request But Officers Not Login Yet`,
                requester: "Merchant",
                ID: iddata.ID,
                adminID: iddata.adminID,
                req_ID: iddata.req_ID,
            };

            socket.emit("newMessage", obj)
            logger("response of create request obj", obj)
            Success('Request Created Successfully!').then(() => {
                navigate('/requests')
            })
        }

        else if (data.statuscode === '400') {
            Error(data.message)
        }
        else if (data.statuscode === '401') {
            Error(data.message)
        }
        else if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }
        return data.data
    } catch (error) {
        dispatch({
            type: ADD_REQ_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getAllMerchantRequest = (ID, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_MERCHANT_REQ_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        const { data } = await axios.get(`${backend_uri_local}/api/merchant/allrequests/${ID}`, config);
        console.log("data in merchant action",data);
        dispatch({
            type: GET_ALL_MERCHANT_REQ_SUCCESS,
            payload: data.allrequests
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_MERCHANT_REQ_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getSingleRequest = (ID, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_REQ_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/singlerequest/${ID}`, config)
        logger("singlerequest in action file", data)
        dispatch({ type: GET_SINGLE_REQ_SUCCESS, payloadone: data.request, payloadtwo: data.users })

        if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_SINGLE_REQ_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const editSingleRequest = (id, obj, token, navigate) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_REQUEST })
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }
        logger("request Id action File", id)
        logger(`${backend_uri_local}/api/request/editrequest/${id}`)
        const { data } = await axios.put(`${backend_uri_local}/api/request/editrequest/${id}`, obj, config)
        logger("Data in merchant action file", data)
        dispatch({
            type: EDIT_REQ_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === "201") {
            Success("Updated Successfully!").then(() => {
                const merchantInfo = localStorage.getItem("merchantInfo")
                if (merchantInfo) {
                    navigate("/requests")
                }
                else {
                    navigate("/admin/requests")
                }
            });
        } else if (data.statuscode === '402') {
            localStorage.removeItem("merchantInfo");
            window.location.href = "/platinumsecurity";
        }
    } catch (error) {
        dispatch({
            type: EDIT_REQ_FAIL,
            payload: error
        })
    }
}

export const filterRequestPerMerchant = (ID, searchKey, rate, zone, startDate, endDate, token) => async (dispatch) => {
    let filteredRequest;
    dispatch({ type: GET_ALL_MERCHANT_REQ_REQUEST });

    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/merchant/allrequests/${ID}`, config);
        filteredRequest = data.allrequests

        //searchkey
        if (searchKey && rate === "all" && zone === "all") {
            filteredRequest = data.allrequests.filter((user) =>
                user.req_ID.includes(searchKey)
            );
        }
        //date
        else if (startDate && endDate && !searchKey && rate === "all" && zone === "all") {
            filteredRequest = data.allrequests.filter(user => {
                const itemDate = Moment(user.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end;
            });
        }
        //rate
        else if (rate !== "all" && !searchKey && zone === "all" && !startDate && !endDate) {
            filteredRequest = data.allrequests.filter((user) =>
                user.charge_type.includes(rate)
            );
        }
        //zone
        else if (zone !== "all" && !searchKey && rate && !startDate && !endDate) {
            filteredRequest = data.allrequests.filter((user) =>
                user.zone.includes(zone)
            );
        }
        //rate & date
        else if (rate !== "all" && startDate && endDate && zone === "all" && !searchKey) {
            filteredRequest = data.allrequests.filter(user => {
                const itemDate = Moment(user.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return user.charge_type.includes(rate)
                    && itemDate >= start && itemDate <= end;
            });
        }
        //zone & date
        else if (zone !== "all" && startDate && endDate && rate === "all" && !searchKey) {
            filteredRequest = data.allrequests.filter(user => {
                const itemDate = Moment(user.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return user.zone.includes(zone) && itemDate >= start && itemDate <= end;
            });
        }
        //rate & zone
        else if (rate !== "all" && zone !== "all" && !searchKey && !startDate && !endDate) {
            filteredRequest = data.allrequests.filter((user) =>
                user.charge_type.includes(rate) && user.zone.includes(zone)
            );
        }
        //rate & zone & date
        else if (rate !== "all" && zone !== "all" && startDate && endDate && !searchKey) {
            filteredRequest = data.allrequests.filter(user => {
                const itemDate = Moment(user.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return user.zone.includes(zone) && user.charge_type.includes(rate)
                    && itemDate >= start && itemDate <= end;
            });
        }

        dispatch({
            type: GET_ALL_MERCHANT_REQ_SUCCESS,
            payload: filteredRequest
        });

        if (data.statuscode === '402') {
            localStorage.removeItem('adminInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_MERCHANT_REQ_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const updateMerchantProfile = (_id, obj, token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_MERCHANT_PROFILE_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }


        let { data } = await axios.put(`${backend_uri_local}/api/merchant/updateProfile/${_id}`, obj, config)
        logger("data", data);

        let formData = Object.fromEntries(obj)

        if (data.statuscode === '201') {
            const socket = io(`${backend_uri_local}`);
            const messageObject = {
                message: `${formData.business_name} has Changed their Personal Information`,
                requester: "Merchant",
                ID: _id,
            };
            socket.emit("newMessage", messageObject)
            Success('Updated Successfully!')
        } else if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }

        dispatch({
            type: GET_ONE_MERCHANT_SUCCESS,
            payload: data.data,
        })

    } catch (error) {
        dispatch({
            type: UPDATE_MERCHANT_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const recentRequestPerMerchant = (ID, startDate, endDate, token) => async (dispatch) => {
    logger("startDate, endDate", startDate, endDate);
    try {
        let recentRequest;
        dispatch({ type: GET_RECENT_REQ_PER_MERCHANT_REQUESTS })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/merchant/allrequests/${ID}`, config);


        if (startDate && endDate) {
            recentRequest = data.allrequests.filter(user => {
                let itemDate = user.pickup_datetime.slice(0, user.pickup_datetime.indexOf(','))
                itemDate = Moment(itemDate).format('YYYY-MM-DD')
                logger("itemDate", itemDate);
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                logger("start,end", start, end);
                return itemDate >= start && itemDate <= end;
            });
        }

        dispatch({
            type: GET_RECENT_REQ_PER_MERCHANT_SUCCESS,
            payload: recentRequest
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_RECENT_REQ_PER_MERCHANT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const totalMerchantRequestCount = (ID, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_TOTAL_MERCHANT_COUNT_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.get(`${backend_uri_local}/api/request/allMerchantRequest/${ID}`, config);

        dispatch({
            type: GET_TOTAL_MERCHANT_COUNT_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: GET_TOTAL_MERCHANT_COUNT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getPerDayRequest = (start, end, id, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_PER_DAY_REQ_REQUEST })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/merchant/countRequest`, { start, end, id }, config);

        dispatch({
            type: GET_PER_DAY_REQ_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }

    } catch (error) {
        dispatch({
            type: GET_PER_DAY_REQ_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const addNotification = (obj, token, navigate) => async (dispatch) => {
    try {
        logger("obj", obj);
        dispatch({
            type: ADD_NOTIFICATION_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'authorizationkey': `${API_KEY}`
            }
        }

        const { data } = await axios.post(`${backend_uri_local}/api/notification/createNotification`, obj, config);
        // const socket = io(`${backend_uri_local}`);
        // socket.emit("newMessage", data)

        dispatch({
            type: ADD_NOTIFICATION_SUCCESS,
            payload: data.data
        })

        if (data.statuscode === '201') {
            Success('Added Successfully!').then(() => {
                navigate('/customer/listing')
            })
        } else if (data.statuscode === '401') {
            Error('Already Exists')
        } else if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }
    } catch (error) {
        dispatch({
            type: ADD_NOTIFICATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const changeMerchantPassword = (password, token, navigate) => async (dispatch) => {
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

        const { data } = await axios.patch(`${backend_uri_local}/api/merchant/change_merchant_password`, { password }, config);

        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: data
        })

        if (data.statuscode === '201') {
            Success('Password Reset Successfully').then(() => {
                navigate('/')
            })
        } else if (data.statuscode === '401') {
            Error(data.message)
        } else if (data.statuscode === '400') {
            Error('Something Wrong')
        } else if (data.status === '500') {
            Error('Something Wrong')
        } else if (data.statuscode === '402') {
            localStorage.removeItem('merchantInfo');
            window.location.href = '/platinumsecurity';
        }
    }
    catch (error) {
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
