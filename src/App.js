import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import Login from './components/LoginScreen/Login';
import ForgotPassword from './components/LoginScreen/ForgotPassword';
import ResetPassword from './components/LoginScreen/ResetPassword';

import Home from './Screens/AdminScreen/Home';
import Customer from './Screens/AdminScreen/Management/Customer/Customer';
import Officer from './Screens/AdminScreen/Management/Officer/Officer';
import AddOfficer from './Screens/AdminScreen/Management/Officer/AddOfficer';
import EditOfficer from './Screens/AdminScreen/Management/Officer/EditOfficer';
import AddCustomer from './Screens/AdminScreen/Management/Customer/AddCustomer';
import EditCustomer from './Screens/AdminScreen/Management/Customer/EditCustomer';
import Truck from './Screens/AdminScreen/Management/Truck/Truck';
import Requests from './Screens/AdminScreen/Management/Requests/Requests';
import ChangeAdminPassword from './Screens/AdminScreen/Settings/ChangePassword';
// import ManagePrice from './Screens/AdminScreen/Settings/ManagePrice'
import MangeDate from './Screens/AdminScreen/Settings/MangeDate';
import EditTruck from './Screens/AdminScreen/Management/Truck/EditTruck';
import MasterBanks from './Screens/AdminScreen/Management/Master Banks/MasterBanks';
import EditBank from './Screens/AdminScreen/Management/Master Banks/EditBank'
import RouteScreen from './Screens/AdminScreen/Settings/RouteScreen';
import AddRouteScreen from './Screens/AdminScreen/Settings/AddRouteScreen';
import EditRoute from './Screens/AdminScreen/Settings/EditRoute';
import RequestView from './Screens/AdminScreen/Management/Requests/RequestView';
import TruckView from './Screens/AdminScreen/Management/Truck/TruckView';
import AdminEditRequest from './Screens/AdminScreen/Management/Requests/EditRequest';

import MerchantDashboard from './Screens/MerchantScreen/MerchantDashboard';
import RequestsScreen from './Screens/MerchantScreen/Requests/RequestsScreen';
import CreateRequest from './Screens/MerchantScreen/Requests/CreateRequest';
import ChangePassword from './Screens/MerchantScreen/Settings/ChangePassword'
import MerchantProfile from './Screens/MerchantScreen/Settings/MerchantProfile';
import PickupLocation from './Screens/MerchantScreen/Address/PickupLocation';
import DepositLocation from './Screens/MerchantScreen/Address/DepositLocation';
import ViewRequest from './Screens/MerchantScreen/Requests/ViewRequest';
import EditRequest from './Screens/MerchantScreen/Requests/EditRequest';
import { logger } from '../src/util/util'
import './App.css'
import AllAssignedTrucks from './Screens/AdminScreen/Management/Truck/AllAssignedTrucks';
import CustomerRequestList from './Screens/AdminScreen/Management/Requests/CustomerRequestList';




const App = () => {
  const [menuCollapse, setMenuCollapse] = useState(false)
  const [visible, setVisible] = useState(false)
  const handle = useFullScreenHandle();

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin
  const adminToken = adminInfo && adminInfo.data.token
  const adminID = adminInfo && adminInfo.data._id

  const merchantLogin = useSelector((state) => state.merchantLogin)
  const { merchantInfo } = merchantLogin
  const merchantToken = merchantInfo && merchantInfo.data.token
  const merchantID = merchantInfo && merchantInfo.data._id

  logger("adminInfo in app.js", adminInfo);
  logger("merchantInfo in app.js", merchantInfo);
  logger("adminToken", adminToken);


  return (
    <>
      <FullScreen handle={handle}>
        {adminInfo ? (
          <>
            <Topbar menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse} handle={handle} />
            <Sidebar menuCollapse={menuCollapse} />
            <Routes>
              <Route path="/" element={<Home token={adminToken} />} />
              <Route path='/customer/listing' element={<Customer visible={visible} setVisible={setVisible} token={adminToken} />} />
              <Route path='/customer/add' element={<AddCustomer token={adminToken} />} />
              <Route path='/customer/edit/:id' element={<EditCustomer token={adminToken} />} />
              <Route path='/officer/listing' element={<Officer visible={visible} setVisible={setVisible} token={adminToken} />} />
              <Route path='/officer/add' element={<AddOfficer token={adminToken} />} />
              <Route path='/officer/edit/:id' element={<EditOfficer token={adminToken} />} />
              <Route path='/admin/requests' element={<Requests visible={visible} setVisible={setVisible} token={adminToken} adminID={adminID}/>} />
              <Route path='/customer-request-list/:id' element={<CustomerRequestList visible={visible} setVisible={setVisible} token={adminToken} adminID={adminID}/>} />             
              <Route path='/merchant/requests/view/:id' element={<RequestView token={adminToken} />} />
              <Route path='/merchant/requests/edit/:id' element={<AdminEditRequest token={adminToken} />} />
              <Route path='/truck' element={<Truck visible={visible} setVisible={setVisible} token={adminToken} />} />
              <Route path='/truck/edit/:id' element={<EditTruck token={adminToken} />} />
              <Route path='/truck/view/:id' element={<TruckView token={adminToken} />} />
              <Route path='/truck/all' element={<AllAssignedTrucks token={adminToken} />} />
              <Route path='/admin/master-banks' element={<MasterBanks token={adminToken} />} />
              <Route path='/admin/bank/editBank/:id' element={<EditBank token={adminToken} />} />
              <Route path='/admin/change_password' element={<ChangeAdminPassword token={adminToken} />} />
              <Route path='/manage/date' element={<MangeDate token={adminToken} />} />
              <Route path='/admin/route' element={<RouteScreen token={adminToken} />} />
              <Route path="/admin/route/add" element={<AddRouteScreen token={adminToken} />} />
              <Route path="/admin/route/routeEdit/:id" element={<EditRoute token={adminToken} />} />
            </Routes>
          </>
        ) : merchantInfo ? (
          <>
            <Topbar menuCollapse={menuCollapse} merchantID={merchantID} setMenuCollapse={setMenuCollapse} handle={handle} />
            <Sidebar menuCollapse={menuCollapse} />
            <Routes>
              <Route path="/" element={<MerchantDashboard menuCollapse={menuCollapse} token={merchantToken} ID={merchantID} />} />
              <Route path="/requests" element={<RequestsScreen visible={visible} setVisible={setVisible} token={merchantToken} ID={merchantID} />} />
              <Route path='/requests/create' element={<CreateRequest token={merchantToken} ID={merchantID} />} />
              <Route path='/requests/edit/:id' element={<EditRequest token={merchantToken} ID={merchantID} />} />
              <Route path='/requests/view/:id' element={<ViewRequest token={merchantToken} ID={merchantID} />} />
              <Route path='/merchant/password' element={<ChangePassword token={merchantToken} />} />
              <Route path='/merchant/profile' element={<MerchantProfile token={merchantToken} ID={merchantID} />} />
              <Route path='/merchant/pickuplocation' element={<PickupLocation token={merchantToken} ID={merchantID} />} />
              <Route path='/merchant/depositlocation' element={<DepositLocation token={merchantToken} ID={merchantID} />} />
            </Routes>
          </>

        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        )
        }
      </FullScreen>
    </>
  )
}

export default App