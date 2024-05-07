import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import "../Home.css";
import { useDispatch } from "react-redux";
import { addRoute, getAllRoutes } from "../../../redux/actions/routeAction";


const AddRouteScreen = ({ token }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoutes(token));
  }, [dispatch, token]);

  const OnChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
    };
    dispatch(addRoute(obj, token, navigate));
    setState({
      name: "",
      description: "",
    });
  };

  return (
    <>
      <div className="content-page position-relative" id="content">
        <div className="content" style={{ marginBottom: "65px" }}>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-4 col-xl-6">
                <div className="page-title-box">
                  <h4 className="page-title">
                    <Link to="/admin/route">
                      <h4 className="page-title text-dark">Back</h4>
                    </Link>
                  </h4>
                </div>
              </div>
              <div className="col-8 col-xl-6">
                <div className="input-group py-4">
                  <input
                    type="text"
                    id="pac-input"
                    className="form-control p-2"
                    placeholder="Search by name "
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-danger p-2"
                      type="button"
                      id="refresh"
                      style={{
                        background: "rgb(185, 67, 58)",
                        border: "rgb(185, 67, 58)",
                        borderRadius: "unset",
                      }}
                    >
                      Edit Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <form
              id="geo_form"
              className="add_new_geo"
              onSubmit={submitHandler}
            >
              <div className="row">
                <div className="col-lg-5">
                  <div className="card-box card_outer mb-0">
                    <h4
                      className="header-title mb-3"
                      style={{ color: "#acbfd2" }}
                    >
                      Add Route
                    </h4>
                    <div className="top_items">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group mb-0">
                            <label className="routeLabel" htmlFor="name">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Name"
                              className="form-control p-2 route-name"
                              onChange={OnChangeHandler}
                              value={state.name}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-12">
                          <div className="form-group mb-0">
                            <label className="routeLabel" htmlFor="Description">
                              Description (Optional)
                            </label>
                            <textarea
                              className="form-control p-2"
                              id="Description"
                              name="description"
                              onChange={OnChangeHandler}
                              value={state.description}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2" style={{ display: "none" }}>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Team</label> <br />
                            <select id="selectize-select" name="team_id">
                              <option value="0">All</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-6">
                                <div
                                  className="custom-control custom-checkbox select_all"
                                  id="old_show"
                                >
                                  <input
                                    type="checkbox"
                                    className="custom-control-input all"
                                    id="checkmeout0"
                                  />
                                  <label
                                    className="custom-control-label select_all"
                                    htmlFor="checkmeout0"
                                  >
                                    Select All Agent
                                  </label>
                                </div>
                                <div
                                  className="custom-control custom-checkbox show_alls"
                                  id="new_show"
                                >
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="show_all"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="show_all"
                                  >
                                    Show All Agent
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  name="search"
                                  placeholder="Search"
                                  className="form-control newsearch"
                                  id="search"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="geo_middle"
                      style={{ height: "270px" }}
                      id="scroll-bar"
                    >
                      <div className="row mb-2 cornar"></div>
                    </div>

                    <div className="geo_bottom_btns">
                      <div className="row">
                        <div className="col-md-6 mb-2 mb-md-0">
                          <button type="button"
                            onClick={() => navigate("/admin/route")}
                            className="cancle-btn mb-0">
                            Cancel
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="submit"
                            className="save-btn waves-effect waves-light"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card-box p-0">
                    <div id="map-canvas">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246149.00575149138!2d-61.497591316591965!3d15.426329337757934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c14d2faf2155a15%3A0x49b39109053afd3c!2sDominica!5e0!3m2!1sen!2sin!4v1654772312578!5m2!1sen!2sin"
                        width=""
                        height="600"
                        style={{ border: "0", width: "100%" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Deposit"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AddRouteScreen;
