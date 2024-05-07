import {
    ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL,
    MERCHANT_LOGIN_REQUEST, MERCHANT_LOGIN_SUCCESS, MERCHANT_LOGIN_FAIL,
    GET_HOLIDAY_DATE_REQUESTS, GET_HOLIDAY_DATE_SUCCESS, GET_HOLIDAY_DATE_FAIL,
    GET_BANKS_REQUESTS, GET_BANKS_SUCCESS, GET_BANKS_FAIL,
    GET_RECENT_REQ_REQUESTS, GET_RECENT_REQ_SUCCESS, GET_RECENT_REQ_FAIL,
    GET_BANK_BYID_REQUESTS, GET_BANK_BYID_SUCCESS, GET_BANK_BYID_FAIL,
    GET_NOTIFICATION_FAIL, GET_NOTIFICATION_REQUEST, GET_NOTIFICATION_SUCCESS,
    UPDATE_ADMIN_PROFILE_REQUESTS, UPDATE_ADMIN_PROFILE_SUCCESS, UPDATE_ADMIN_PROFILE_FAIL,
    GET_NOTIFICATION_COUNT_REQUEST, GET_ASSIGNED_REQ_COUNT_FAIL, GET_NOTIFICATION_COUNT_SUCCESS,
    GET_ROUTE_SUCCESS, GET_ROUTE_REQUEST, GET_ROUTE_FAIL,
    GET_ADMIN_DETAILS_REQ, GET_ADMIN_DETAILS_SUCCESS, GET_ADMIN_DETAILS_FAIL
} from "../constants/Constant";



export const adminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return { loading: true }
        case ADMIN_LOGIN_SUCCESS:
            return { loading: false, adminInfo: action.payload }
        case ADMIN_LOGIN_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const merchantLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case MERCHANT_LOGIN_REQUEST:
            return { loading: true }
        case MERCHANT_LOGIN_SUCCESS:
            return { loading: false, merchantInfo: action.payload }
        case MERCHANT_LOGIN_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}


export const getHolidayDatesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_HOLIDAY_DATE_REQUESTS:
            return { loading: true }
        case GET_HOLIDAY_DATE_SUCCESS:
            return { loading: false, holidayDatesLists: action.payload }
        case GET_HOLIDAY_DATE_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getBanksReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BANKS_REQUESTS:
            return { loading: true }
        case GET_BANKS_SUCCESS:
            return { loading: false, banksList: action.payload }
        case GET_BANKS_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getRecentRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_RECENT_REQ_REQUESTS:
            return { loading: true }
        case GET_RECENT_REQ_SUCCESS:
            return { loading: false, recentReqList: action.payload }
        case GET_RECENT_REQ_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getBankByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BANK_BYID_REQUESTS:
            return { loading: true }
        case GET_BANK_BYID_SUCCESS:
            return { loading: false, bankDetails: action.payload }
        case GET_BANK_BYID_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getNotificationsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_REQUEST:
            return { loading: true }
        case GET_NOTIFICATION_SUCCESS:
            return { loading: false, notifications: action.payload }
        case GET_NOTIFICATION_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getNotificationcountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_COUNT_REQUEST:
            return { loading: true }
        case GET_NOTIFICATION_COUNT_SUCCESS:
            return { loading: false, newNotification: action.payload }
        case GET_ASSIGNED_REQ_COUNT_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }

}

export const getRouteReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ROUTE_REQUEST:
            return { loading: true }
        case GET_ROUTE_SUCCESS:
            return { loading: false, getRouteList: action.payload }
        case GET_ROUTE_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}

export const getAdminDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ADMIN_DETAILS_REQ:
            return { loading: true }
        case GET_ADMIN_DETAILS_SUCCESS:
            return { loading: false, adminDetails: action.payload }
        case GET_ADMIN_DETAILS_FAIL:
            return { loading: true, error: action.payload }
        default: return state
    }
}