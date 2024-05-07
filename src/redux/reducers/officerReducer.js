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
} from "../constants/Constant";

const initialState = {
    officersList: []
}

export const getAllOfficerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_OFFICERS_REQUEST:
            return { ...state, loading: true }
        case GET_ALL_OFFICERS_SUCCESS:
            return { loading: false, officersList: action.payload }
        case GET_ALL_OFFICERS_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const addOfficerReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_OFFICER_REQUEST:
            return { loading: true }
        case ADD_OFFICER_SUCCESS:
            return { success: true, loading: false, addedOfficer: action.payload }
        case ADD_OFFICER_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const getOfficerDetailsByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ONE_OFFICER_REQUEST:
            return { loading: true }
        case GET_ONE_OFFICER_SUCCESS:
            return { success: true, loading: false, officerDetails: action.payload }
        case GET_ONE_OFFICER_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}

export const updateOfficerReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_OFFICER_REQUEST:
            return { loading: true }
        case UPDATE_OFFICER_SUCCESS:
            return { success: true, loading: false, updatedOfficer: action.payload }
        case UPDATE_OFFICER_FAIL:
            return { loading: true, error: action.payload }

        default: return state
    }
}