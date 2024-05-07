import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {
    adminLoginReducer, merchantLoginReducer, getHolidayDatesReducer,
    getBanksReducer, getRecentRequestReducer, getBankByIdReducer,
    getNotificationsReducer, getNotificationcountReducer,
    getRouteReducer, getAdminDetailsReducer
} from "./redux/reducers/adminReducer";
import {
    getAllOfficerReducer, addOfficerReducer, getOfficerDetailsByIdReducer,
    updateOfficerReducer
} from "./redux/reducers/officerReducer";
import { composeWithDevTools } from "redux-devtools-extension"
import {
    getAllMerchantReducer, getMerchantDetailsByIdReducer, updateMerchantReducer, getTotalMerchantReducer,
    getTotalCountReducer, getRequestOfMerchantReducer, getAllRequestsReducer, getSingleRequestReducer,
    updateMerchantProfileReducer, getRequestsCountReducer, getAssignedRequestReducer,
    getTransitRequestReducer, merchantTypeWiseRequestReducer, recentRequestPerMerchantReducer,
    getTotalMerchantRequestCount, getPerDayRequestReducer
} from "./redux/reducers/merchantReducer";
import {
    getTruckByIdReducer, getTrucksListReducer, getUserByTruckReducer,
    RecentAssignedTrucksReducer, getTruckListByZoneReducer
} from './redux/reducers/truckReducer'
import { getAllRouteReducer, getRouteByIdReducer } from './redux/reducers/routeReducer'


const adminInfoFromStorage = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
const merchantInfoFromStorage = localStorage.getItem('merchantInfo') ? JSON.parse(localStorage.getItem('merchantInfo')) : null

const rootReducers = combineReducers({
    adminLogin: adminLoginReducer,
    holidayDatesList: getHolidayDatesReducer,
    merchantLogin: merchantLoginReducer,
    getRouteList: getRouteReducer,
    adminDetails: getAdminDetailsReducer,

    officerList: getAllOfficerReducer,
    addedOfficer: addOfficerReducer,
    officerDetails: getOfficerDetailsByIdReducer,
    updatedOfficer: updateOfficerReducer,

    merchantList: getAllMerchantReducer,
    merchantDetails: getMerchantDetailsByIdReducer,
    updatedMerchant: updateMerchantReducer,
    totalMerchant: getTotalMerchantReducer,
    totalCount: getTotalCountReducer,

    merchantRequests: getRequestOfMerchantReducer,
    requestList: getAllRequestsReducer,
    singlerequeststore: getSingleRequestReducer,
    profileList: updateMerchantProfileReducer,
    requestCount: getRequestsCountReducer,
    assignedReq: getAssignedRequestReducer,
    transitReq: getTransitRequestReducer,
    typeWiseReq: merchantTypeWiseRequestReducer,

    truckList: getTrucksListReducer,
    truckDetails: getTruckByIdReducer,
    user: getUserByTruckReducer,
    recentTrucks: RecentAssignedTrucksReducer,
    trucks: getTruckListByZoneReducer,

    bankList: getBanksReducer,
    bankDetails: getBankByIdReducer,
    routeList: getAllRouteReducer,
    routeDetails: getRouteByIdReducer,
    recentReqList: getRecentRequestReducer,
    recentReq: recentRequestPerMerchantReducer,
    totalMerchantRequestCounts: getTotalMerchantRequestCount,
    perDayRequest: getPerDayRequestReducer,
    notifications: getNotificationsReducer,
    newNotification: getNotificationcountReducer
})

const initialState = {
    adminLogin: { adminInfo: adminInfoFromStorage },
    holidayDatesList: { getHolidayDatesReducer },
    merchantLogin: { merchantInfo: merchantInfoFromStorage },
    getRouteList: { getRouteReducer },
    adminDetails: { getAdminDetailsReducer },

    officerList: { getAllOfficerReducer },
    addedOfficer: { addOfficerReducer },
    officerDetails: { getOfficerDetailsByIdReducer },
    updatedOfficer: { updateOfficerReducer },

    singlerequeststore: { getSingleRequestReducer },

    merchantList: { getAllMerchantReducer },
    merchantDetails: { getMerchantDetailsByIdReducer },
    updatedMerchant: { updateMerchantReducer },
    totalMerchant: { getTotalMerchantReducer },
    totalCount: { getTotalCountReducer },

    merchantRequests: { getTotalCountReducer },
    requestList: { getAllRequestsReducer },
    profileList: { updateMerchantProfileReducer },
    requestCount: { getRequestsCountReducer },
    assignedReq: { getAssignedRequestReducer },
    transitReq: { getTransitRequestReducer },
    typeWiseReq: { merchantTypeWiseRequestReducer },

    truckList: { getTrucksListReducer },
    truckDetails: { getTruckByIdReducer },
    user: { getUserByTruckReducer },
    recentTrucks: { RecentAssignedTrucksReducer },
    trucks: { getTruckListByZoneReducer },

    bankList: { getBanksReducer },
    bankDetails: { getBankByIdReducer },
    routeList: { getAllRouteReducer },
    routeDetails: { getRouteByIdReducer },
    recentReqList: { getRecentRequestReducer },
    recentReq: { recentRequestPerMerchantReducer },
    totalMerchantRequestCounts: { getTotalMerchantRequestCount },
    perDayRequest: { getPerDayRequestReducer },
    notifications: { getNotificationsReducer },
    newNotification: { getNotificationcountReducer }
}


const middleware = [thunk];


const store = createStore(rootReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store 