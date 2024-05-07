import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
} from "react-pro-sidebar";
import { useSelector } from 'react-redux'
import { FiAirplay, FiUsers, FiLayers, FiMap, FiActivity, FiUser, FiLock, FiLogOut } from "react-icons/fi";
import { BsBank2 } from 'react-icons/bs'
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";


const Sidebar = ({ menuCollapse }) => {
  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const merchantLogin = useSelector((state) => state.merchantLogin)
  const { merchantInfo } = merchantLogin

  const location = useLocation()

  const isActive = (path) => {
    // return location.pathname === path;
    // return paths.includes(location.pathname);
    // return paths.some((path) => location.pathname.startsWith(path));
    if (path === '/') {
      return location.pathname === path;
    } else {
      return location.pathname.startsWith(path);
    }
  }


  return (

    <div id="header" >
      {/* collapsed props to change menu size using menucollapse state */}
      {adminInfo ? (
        <ProSidebar collapsed={menuCollapse}>
          <SidebarContent>
            <Menu iconShape="square">

              <MenuItem icon={<FiAirplay />} className={isActive('/') ? 'active mb-3' : 'mb-3'}>
                <NavLink to="/" /> Dashboard
              </MenuItem>

              <MenuItem className={menuCollapse === true ? "d-none ms-3 menu-title" : "d-block ms-3 menu-title"}>
                Management
              </MenuItem>

              <MenuItem icon={<FiUsers />}
                className={isActive('/customer/listing') || isActive('/customer/add') || location.pathname.startsWith('/customer/edit') || location.pathname.startsWith('/customer-request-list') ? 'active' : ''}>
                <NavLink to="/customer/listing" />Customers
              </MenuItem>

              <MenuItem icon={<FiUsers />}
                className={isActive('/officer/listing') || isActive('/officer/add') || location.pathname.startsWith('/officer/edit') ? 'active' : ''}>
                <NavLink to="/officer/listing" />Officers
              </MenuItem>

              <MenuItem icon={<FiLayers />}
                className={isActive('/admin/requests') || location.pathname.startsWith('/merchant/requests/view') || location.pathname.startsWith('/merchant/requests/edit') ? 'active' : ''}>
                <NavLink to="/admin/requests" /> Requests
              </MenuItem>

              <MenuItem icon={<FiLayers />}
                className={isActive('/truck') || location.pathname.startsWith('/truck/edit') || location.pathname.startsWith('/truck/view') ? 'active mb-3' : 'mb-3'}>
                <NavLink to="/truck" />Trucks
              </MenuItem>

              <MenuItem icon={<BsBank2 />}
                className={isActive('/admin/master-banks') || location.pathname.startsWith('/admin/bank/editBank') ? 'active mb-3' : 'mb-3'}>
                <NavLink to="/admin/master-banks" />Master Banks
              </MenuItem>

              <MenuItem className={menuCollapse === true ? "d-none ms-3 menu-title" : "d-block ms-3 menu-title"}>
                Settings
              </MenuItem>

              <MenuItem icon={<FiMap />}
                className={isActive('/admin/route') || isActive('admin/route/add') || location.pathname.startsWith('/admin/route/routeEdit') ? 'active' : ''}>
                <NavLink to='/admin/route' /> Routes
              </MenuItem>

              <MenuItem icon={<FiActivity />} className={isActive('/manage/date') ? 'active mb-3' : 'mb-3'}>
                <NavLink to='/manage/date' />Holiday Dates
              </MenuItem>

            </Menu>
          </SidebarContent>
        </ProSidebar>
      )
        : merchantInfo ? (
          <ProSidebar collapsed={menuCollapse}>
            <SidebarContent>
              <Menu iconShape="square">

                <MenuItem icon={<FiAirplay />} className={isActive('/') ? 'active' : ''}>
                  <NavLink to="/" /> Dashboard
                </MenuItem>

                <MenuItem className={menuCollapse === true ? "d-none ms-3 menu-title" : "d-block ms-3 menu-title"}>
                  Management
                </MenuItem>

                <MenuItem icon={<FiLayers />} 
                className={isActive('/requests') || isActive('/requests/create') || location.pathname.startsWith('/requests/edit') || location.pathname.startsWith('/requests/view') ? 'active' : ''}>
                  <NavLink to="/requests" /> Requests
                </MenuItem>

                <MenuItem className={menuCollapse === true ? "d-none ms-3 menu-title" : "d-block ms-3 menu-title"}>
                  Settings
                </MenuItem>

                <MenuItem icon={<FiUser />} className={isActive('/merchant/profile') ? 'active' : ''}>
                  <NavLink to="/merchant/profile" /> Profile
                </MenuItem>

                <MenuItem icon={<FiMap />} className={isActive('/merchant/pickuplocation') ? 'active' : ''}>
                  <NavLink to="/merchant/pickuplocation" />  Pickup Locations
                </MenuItem>

                <MenuItem icon={<FiMap />} className={isActive('/merchant/depositlocation') ? 'active' : ''}>
                  <NavLink to="/merchant/depositlocation" /> Deposit Locations
                </MenuItem>

                <MenuItem icon={<FiLock />} className={isActive('/merchant/password') ? 'active' : ''}>
                  <NavLink to="/merchant/password" /> Change Password
                </MenuItem>

                <MenuItem icon={<FiLogOut />} onClick={() => { localStorage.clear(); window.location.reload() }}>
                  <NavLink to="/" />Logout
                </MenuItem>
              </Menu>
            </SidebarContent>
          </ProSidebar>
        ) : null
      }
    </div >

  );
};

export default Sidebar;