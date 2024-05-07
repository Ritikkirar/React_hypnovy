import {
    GET_TRUCK_REQUEST, GET_TRUCK_SUCCESS, GET_TRUCK_FAIL,
    GET_TRUCK_BYID_REQUEST, GET_TRUCK_BYID_SUCCESS, GET_TRUCK_BYID_FAIL,
    GET_USER_BY_TRUCK_REQUEST, GET_USER_BY_TRUCK_SUCCESS, GET_USER_BY_TRUCK_FAIL,
    GET_RECENT_ASSIGN_TRUCKS_REQUEST, GET_RECENT_ASSIGN_TRUCKS_SUCCESS, GET_RECENT_ASSIGN_TRUCKS_FAIL,
    GET_TRUCK_BY_ZONE_REQUEST, GET_TRUCK_BY_ZONE_SUCCESS, GET_TRUCK_BY_ZONE_FAIL
} from '../constants/Constant'

const initialState = {
    trucksList: []
}

export const getTrucksListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRUCK_REQUEST:
            return { loading: true }
        case GET_TRUCK_SUCCESS:
            return { ...state, loading: false, trucksList: action.payload }
        case GET_TRUCK_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getTruckByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TRUCK_BYID_REQUEST:
            return { loading: true }
        case GET_TRUCK_BYID_SUCCESS:
            return { ...state, loading: false, truckDetails: action.payload }
        case GET_TRUCK_BYID_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getUserByTruckReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_BY_TRUCK_REQUEST:
            return { loading: true }
        case GET_USER_BY_TRUCK_SUCCESS:
            return { ...state, loading: false, users: action.payload }
        case GET_USER_BY_TRUCK_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const RecentAssignedTrucksReducer = (state = [], action) => {
    switch (action.type) {
        case GET_RECENT_ASSIGN_TRUCKS_REQUEST:
            return { loading: true }
        case GET_RECENT_ASSIGN_TRUCKS_SUCCESS:
            return { ...state, loading: false, recentTrucks: action.payload }
        case GET_RECENT_ASSIGN_TRUCKS_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getTruckListByZoneReducer = (state = [], action) => {
    switch (action.type) {
        case GET_TRUCK_BY_ZONE_REQUEST:
            return { loading: true }
        case GET_TRUCK_BY_ZONE_SUCCESS:
            return { ...state, loading: false, trucks: action.payload }
        case GET_TRUCK_BY_ZONE_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}