
import {

    GET_ALL_MERCHANT_REQUEST, GET_ALL_MERCHANT_SUCCESS, GET_ALL_MERCHANT_FAIL,
    ADD_MERCHANT_REQUEST, ADD_MERCHANT_SUCCESS, ADD_MERCHANT_FAIL,
    GET_ONE_MERCHANT_REQUEST, GET_ONE_MERCHANT_SUCCESS, GET_ONE_MERCHANT_FAIL,
    UPDATE_MERCHANT_REQUEST, UPDATE_MERCHANT_SUCCESS, UPDATE_MERCHANT_FAIL,
    GET_TOTAL_MERCHANT_REQUEST, GET_TOTAL_MERCHANT_SUCCESS, GET_TOTAL_MERCHANT_FAIL,
    GET_TOTAL_COUNT_REQUEST, GET_TOTAL_COUNT_SUCCESS, GET_TOTAL_COUNT_FAIL,
    GET_ALL_MERCHANT_REQ_REQUEST, GET_ALL_MERCHANT_REQ_SUCCESS, GET_ALL_MERCHANT_REQ_FAIL,
    GET_ALL_REQUESTS, GET_ALL_REQUESTS_SUCCESS, GET_ALL_REQUESTS_FAIL,
    GET_SINGLE_REQ_REQUESTS, GET_SINGLE_REQ_SUCCESS, GET_SINGLE_REQ_FAIL,
    UPDATE_MERCHANT_PROFILE_REQUEST, UPDATE_MERCHANT_PROFILE_SUCCESS, UPDATE_MERCHANT_PROFILE_FAIL,
    GET_TOTAL_REQ_COUNT_REQUEST, GET_TOTAL_REQ_COUNT_SUCCESS, GET_TOTAL_REQ_COUNT_FAIL,
    GET_ASSIGNED_REQ_COUNT_REQUEST, GET_ASSIGNED_REQ_COUNT_SUCCESS, GET_ASSIGNED_REQ_COUNT_FAIL,
    GET_TRANSIT_REQUEST, GET_TRANSIT_SUCCESS, GET_TRANSIT_FAIL,
    GET_TYPE_WISE_REQ_REQUEST, GET_TYPE_WISE_REQ_SUCCESS, GET_TYPE_WISE_REQ_FAIL,
    GET_RECENT_REQ_PER_MERCHANT_REQUESTS, GET_RECENT_REQ_PER_MERCHANT_SUCCESS, GET_RECENT_REQ_PER_MERCHANT_FAIL,
    GET_TOTAL_MERCHANT_COUNT_REQUEST, GET_TOTAL_MERCHANT_COUNT_SUCCESS, GET_TOTAL_MERCHANT_COUNT_FAIL,
    GET_PER_DAY_REQ_REQUEST, GET_PER_DAY_REQ_SUCCESS, GET_PER_DAY_REQ_FAIL
} from "../constants/Constant";


let initialState = {
    merchantsList: []
}


export const getAllMerchantReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MERCHANT_REQUEST:
            return { loading: true }
        case GET_ALL_MERCHANT_SUCCESS:
            return { ...state, loading: false, merchantsList: action.payload }
        case GET_ALL_MERCHANT_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const AddMerchantReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MERCHANT_REQUEST:
            return { loading: true }
        case ADD_MERCHANT_SUCCESS:
            return { ...state, loading: false, merchantsList: action.payload }
        case ADD_MERCHANT_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getMerchantDetailsByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ONE_MERCHANT_REQUEST:
            return { loading: true }
        case GET_ONE_MERCHANT_SUCCESS:
            return { ...state, success: true, loading: false, merchantDetails: action.payload }
        case GET_ONE_MERCHANT_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const updateMerchantReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MERCHANT_REQUEST:
            return { loading: true }
        case UPDATE_MERCHANT_SUCCESS:
            return { ...state, success: true, loading: false, merchantsList: action.payload }
        case UPDATE_MERCHANT_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getTotalMerchantReducer = (state = [], action) => {
    switch (action.type) {
        case GET_TOTAL_MERCHANT_REQUEST:
            return { loading: true }
        case GET_TOTAL_MERCHANT_SUCCESS:
            return { ...state, loading: false, totalMerchants: action.payload }
        case GET_TOTAL_MERCHANT_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getTotalCountReducer = (state = [], action) => {
    switch (action.type) {
        case GET_TOTAL_COUNT_REQUEST:
            return { loading: true }
        case GET_TOTAL_COUNT_SUCCESS:
            return { ...state, loading: false, totalCounts: action.payload }
        case GET_TOTAL_COUNT_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getRequestOfMerchantReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_MERCHANT_REQ_REQUEST:
            return { loading: true }
        case GET_ALL_MERCHANT_REQ_SUCCESS:
            return { ...state, success: true, loading: false, merchantrequestlist: action.payload }
        case GET_ALL_MERCHANT_REQ_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getAllRequestsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_REQUESTS:
            return { loading: true }
        case GET_ALL_REQUESTS_SUCCESS:
            return { ...state, success: true, loading: false, requestslist: action.payload }
        case GET_ALL_REQUESTS_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}


export const getSingleRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SINGLE_REQ_REQUESTS:
            return { loading: true }
        case GET_SINGLE_REQ_SUCCESS:
            return { ...state, success: true, loading: false, singlerequest: action.payloadone, requestusers: action.payloadtwo }
        case GET_SINGLE_REQ_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const updateMerchantProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_MERCHANT_PROFILE_REQUEST:
            return { loading: true }
        case UPDATE_MERCHANT_PROFILE_SUCCESS:
            return { ...state, success: true, loading: false, profileList: action.payload }
        case UPDATE_MERCHANT_PROFILE_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getRequestsCountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TOTAL_REQ_COUNT_REQUEST:
            return { loading: true }
        case GET_TOTAL_REQ_COUNT_SUCCESS:
            return { ...state, success: true, loading: false, requestCount: action.payload }
        case GET_TOTAL_REQ_COUNT_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getAssignedRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ASSIGNED_REQ_COUNT_REQUEST:
            return { loading: true }
        case GET_ASSIGNED_REQ_COUNT_SUCCESS:
            return { ...state, success: true, loading: false, assignedReq: action.payload }
        case GET_ASSIGNED_REQ_COUNT_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getTransitRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TRANSIT_REQUEST:
            return { loading: true }
        case GET_TRANSIT_SUCCESS:
            return { ...state, success: true, loading: false, transitReq: action.payload }
        case GET_TRANSIT_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const merchantTypeWiseRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TYPE_WISE_REQ_REQUEST:
            return { loading: true }
        case GET_TYPE_WISE_REQ_SUCCESS:
            return { ...state, success: true, loading: false, typeWiseReq: action.payload }
        case GET_TYPE_WISE_REQ_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const recentRequestPerMerchantReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_RECENT_REQ_PER_MERCHANT_REQUESTS:
            return { loading: true }
        case GET_RECENT_REQ_PER_MERCHANT_SUCCESS:
            return { ...state, success: true, loading: false, recentReq: action.payload }
        case GET_RECENT_REQ_PER_MERCHANT_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}


export const getTotalMerchantRequestCount = (state = {}, action) => {
    switch (action.type) {
        case GET_TOTAL_MERCHANT_COUNT_REQUEST:
            return { loading: true }
        case GET_TOTAL_MERCHANT_COUNT_SUCCESS:
            return { ...state, success: true, loading: false, totalMerchantRequestCounts: action.payload }
        case GET_TOTAL_MERCHANT_COUNT_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getPerDayRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PER_DAY_REQ_REQUEST:
            return { loading: true }
        case GET_PER_DAY_REQ_SUCCESS:
            return { ...state, success: true, loading: false, perDayRequest: action.payload }
        case GET_PER_DAY_REQ_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}
