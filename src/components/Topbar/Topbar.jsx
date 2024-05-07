import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import { BiBell } from "react-icons/bi";
import { FiMenu, FiMaximize, FiMinimize } from "react-icons/fi";
import Biglogo from "../../images/logo.png";
import Smalllogo from "../../images/platinum.png";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import useWindowDimensions from "../../util/hooks";
import avatar from '../../images/avatar.png'
import { getNotificationCount, updateNotification, updateAdminProfile, getAdminDetails } from '../../redux/actions/adminAction'
import noNotifications from '../../images/no-notification.png'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { backend_uri_local } from "../../util/constant";
import io from 'socket.io-client';
import axios from "axios";
import { logger } from "../../util/util";
import { getMerchantDetailsById } from "../../redux/actions/merchantAction";


const Topbar = ({ menuCollapse, setMenuCollapse, handle }) => {
  const [show, setShow] = useState(false);
  const [admin_images, setSelectedFile] = useState(null);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const token = adminInfo && adminInfo.data.token;
  logger("token in topbar", token);

  const merchantLogin = useSelector((state) => state.merchantLogin);
  const { merchantInfo } = merchantLogin;

  const { newNotification } = useSelector((state) => state.newNotification);
  const { adminDetails } = useSelector((state) => state.adminDetails)
  const { merchantDetails } = useSelector((state) => state.merchantDetails)

  logger("adminDetails", adminDetails);

  let setcount = newNotification ? newNotification.length : 0;
  // let setMerchantcount = newNotification && newNotification.find((d) => d.role === 'Merchant') ? newNotification.length : 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const menuIconClick = () => {
    let val = document.getElementById("content");
    let value = document.getElementById("header");
    let menu = document.getElementsByClassName("pro-menu-item")
    if (menuCollapse) {
      setMenuCollapse(false);
      val.classList.remove("mystyle");
      value.classList.remove("toggle");
    } else {
      setMenuCollapse(true);
      val.classList.add("mystyle");
      value.classList.add("toggle");
      // Close toggle menu when menu item is clicked
      for (let i = 0; i < menu.length; i++) {
        menu[i].addEventListener('click', function () {
          value.classList.remove("toggle");
          setMenuCollapse(false);
        }, false);
      }
    }
  };

  useEffect(() => {
    const socket = io.connect(`${backend_uri_local}`);
    socket.on('connect', () => {
      logger('Connected to the server');
    });

    socket.on('poonam', (data) => {
      logger("data  new notification found ", data);

      dispatch(getNotificationCount(token));
      // setcount(count + 1);
    });

    socket.on('disconnect', () => {
      logger('Disconnected from the server');
    });
    return () => {
      socket.disconnect();
    };
  }, [newNotification, dispatch, token]);


  useEffect(() => {
    dispatch(getNotificationCount(token));
  }, [dispatch, token]);


  useEffect(() => {
    if (adminInfo) {
      dispatch(getAdminDetails(adminInfo.data._id, token))
    } else if (merchantInfo) {
      dispatch(getMerchantDetailsById(merchantInfo.data._id, merchantInfo.data.token))
    }
  }, [dispatch, token])


  const logoutHandler = () => {
    swal({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (adminInfo) {
          localStorage.removeItem('adminInfo')
        } else {
          localStorage.removeItem('merchantInfo')
        }
        navigate("/");
        window.location.reload();
      } else {
        swal("Back to Home");
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("_id", adminInfo.data._id)
    formData.append("admin_images", admin_images)
    dispatch(updateAdminProfile(formData, token))
    handleClose()
  }

  const handleViewNotifications = async (ID, req_ID) => {
    logger("ID topbar ,req_ID", ID, req_ID);
    dispatch(updateNotification(token, ID))
    const { data } = await axios.get(`${backend_uri_local}/api/notification/request/${req_ID}`)
    logger("data request data by request id", data.data._id);
    navigate(`/merchant/requests/view/${data.data._id}`)
  }


  return (
    <>
      <div className="navbar-custom">
        <div className="main-topbar d-flex justify-content-between">
          <div className="left-menu d-flex " style={{ fontSize: "24px" }}>
            <div className="m-2">
              {width < 800 ? (
                <Link to="/" className="">
                  {menuCollapse ? (
                    <img
                      alt="logo"
                      src={Smalllogo}
                      style={{ height: "55px" }}
                      className="small_logo"
                    />
                  ) : (
                    <img
                      alt="logo"
                      src={Smalllogo}
                      style={{ height: "55px" }}
                      className="small_logo"
                    />
                  )}
                </Link>
              ) : (
                <Link to="/" className="">
                  {menuCollapse ? (
                    <img
                      alt="logo"
                      src={Smalllogo}
                      style={{ height: "50px" }}
                      className="small_logo"
                    />
                  ) : (
                    <img
                      alt="logo"
                      src={Biglogo}
                      style={{ height: "55px" }}
                      className="big_logo"
                    />
                  )}
                </Link>
              )}
            </div>

            <div className="m-3" onClick={menuIconClick}>
              <FiMenu />
            </div>
          </div>
          <div className="right-menu d-flex">
            <Link className="m-4 min" data-toggle="fullscreen" to="#">
              {handle.active ? (
                <FiMinimize
                  style={{ color: '#6c757d' }}
                  size={22}
                  onClick={handle.exit}
                />
              ) : (
                <FiMaximize
                  style={{ color: '#6c757d' }}
                  size={22}
                  onClick={handle.enter}
                />
              )}
            </Link>

            <div className="dropdown d-flex justify-content-center align-items-center">
              <BiBell
                className="dropdown-toggle"
                id="notificationMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
                size={23}
              />

              {adminInfo ? (
                <span className="notification-count">
                  {setcount > 0 ? setcount : null}
                </span>
              ) : (
                logger("not have any notification")
              )}

              {adminInfo ? (
                <div
                  className="dropdown-menu notification"
                  aria-labelledby="notificationMenu"
                >
                  {newNotification && newNotification.length > 0 ? (
                    <>
                      <h6 className="mb-3 fw-bold ms-4">Notification</h6>

                      {newNotification &&
                        newNotification.map((data) => {
                          return (
                            <Link
                              to="#"
                              key={data._id}
                              onClick={() =>
                                handleViewNotifications(data._id, data.req_ID)
                              }
                              className="dropdown-item d-flex"
                            >
                              <div>
                                <img
                                  src={
                                    data?.userid !== null
                                      ? data?.userid?.merchant_images
                                        ? data.userid.merchant_images
                                        : avatar
                                      : avatar
                                  }
                                  alt="notify"
                                  className="img-responsive rounded-circle me-3"
                                  style={{ width: "40px", height: "40px" }}
                                />
                              </div>
                              <div>
                                <h6>
                                  {data?.userid !== null
                                    ? data?.userid?.business_name
                                      ? data.userid.business_name
                                      : ""
                                    : ""}
                                </h6>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    color: "#6c757d",
                                    wordBreak: "break-all",
                                    height: "100%",
                                  }}
                                >
                                  {data.message}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                    </>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                      <img
                        src={noNotifications}
                        alt=""
                        className="img-responsive"
                        style={{ height: "150px" }}
                      />
                      <h5 style={{ fontWeight: "700" }}>
                        No Notifications Yet
                      </h5>
                      <p className="text-center mx-4">
                        You have no notifications right now.
                        <br /> Come back later
                      </p>
                    </div>
                  )}

                </div>
              ) : (
                logger("not have any notification")
              )}


              {/* {merchantInfo ? (
                <span className="notification-count">
                  {setMerchantcount > 0 ? setMerchantcount : null}
                </span>
              ) : (
                logger("not have any notification")
              )}

              {merchantInfo ? (
                <div
                  className="dropdown-menu notification"
                  aria-labelledby="notificationMenu"
                >
                  {newNotification && newNotification.length > 0 && newNotification.find((d) => d.role === 'Merchant') ? (
                    <>
                      <h6 className="mb-3 fw-bold ms-4">Notification</h6>

                      {newNotification &&
                        newNotification.map((data) => {
                          return (
                            <Link
                              to="#"
                              key={data._id}
                              onClick={() =>
                                handleViewNotifications(data._id, data.req_ID)
                              }
                              className="dropdown-item d-flex"
                            >
                              <div>
                                <img
                                  src={
                                    data?.userid !== null
                                      ? data?.userid?.merchant_images
                                        ? data.userid.merchant_images
                                        : avatar
                                      : avatar
                                  }
                                  alt="notify"
                                  className="img-responsive rounded-circle me-3"
                                  style={{ width: "40px", height: "40px" }}
                                />
                              </div>
                              <div>
                                <h6>
                                  {data?.userid !== null
                                    ? data?.userid?.business_name
                                      ? data.userid.business_name
                                      : ""
                                    : ""}
                                </h6>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    color: "#6c757d",
                                    wordBreak: "break-all",
                                    height: "100%",
                                  }}
                                >
                                  {data.message}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                    </>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                      <img
                        src={noNotifications}
                        alt=""
                        className="img-responsive"
                        style={{ height: "150px" }}
                      />
                      <h5 style={{ fontWeight: "700" }}>
                        No Notifications Yet
                      </h5>
                      <p className="text-center mx-4">
                        You have no notifications right now.
                        <br /> Come back later
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                logger("not have any notification")
              )} */}
            </div>

            <div className="dropdown d-flex justify-content-center align-items-md-center login-user m-4">
              {adminInfo ? (
                <>
                  <img
                    src={adminDetails && adminDetails?.admin_images ? adminDetails.admin_images : avatar}
                    alt="admin"
                    className="img-responsive rounded-circle me-2"
                    style={{ float: "left" }}
                    onClick={() => handleShow()}
                  />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="fs-5 ms-3">
                        Upload Profile Picture
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form className="px-3" onSubmit={submitHandler}>
                        <div className="form-group mb-3">
                          <input
                            id="file-input"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group text-left mt-3">
                          <Button variant="primary" type="submit">
                            Upload
                          </Button>
                        </div>
                      </form>
                    </Modal.Body>
                  </Modal>
                </>
              ) : merchantInfo ? (
                <img
                  src={merchantDetails && merchantDetails?.merchant_images ? merchantDetails.merchant_images : avatar}
                  alt=""
                  className="img-responsive rounded-circle me-2"
                  style={{ float: "left" }}
                />

              ) : null}

              <div
                className="dropdown-toggle"
                id="dropdownMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                {adminInfo ? (
                  <p
                    style={{
                      fontSize: "15px",
                      float: "left",
                      marginTop: "18px",
                    }}
                  >
                    {adminDetails && adminDetails ? adminDetails.admin_name : ''}
                  </p>
                ) : merchantInfo ? (
                  <p
                    style={{
                      fontSize: "15px",
                      float: "left",
                      marginTop: "18px",
                    }}
                  >
                    {merchantDetails && merchantDetails ? merchantDetails.business_name : ''}
                  </p>
                ) : null}
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenu">
                {adminInfo ? (
                  <Link
                    className="dropdown-item"
                    to="/admin/change_password"
                    style={{ color: "#676868" }}
                  >
                    Change Password
                  </Link>
                ) : merchantInfo ? (
                  <Link
                    className="dropdown-item"
                    to="/merchant/password"
                    style={{ color: "#676868" }}
                  >
                    Change Password
                  </Link>
                ) : null}
                <Link
                  className="dropdown-item"
                  to="#"
                  style={{ color: "#676868" }}
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
