import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Footer from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoutes, deleteRoute } from "../../../redux/actions/routeAction";
import "../Home.css";
import swal from "sweetalert";

const RouteScreen = ({ token }) => {
    const dispatch = useDispatch();
    const { routeList } = useSelector((state) => state.routeList);

    useEffect(() => {
        dispatch(getAllRoutes(token));
    }, [dispatch, token]);


    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteRoute(id, token));

                swal("Poof! Routes details has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Route details are safe!");
            }
        });
    };

    return (
        <div className="content-page position-relative" id="content">
            <div className="content">
                <div className="container-fluid mt-3">
                    <div className="geo_wrapper geo_main">
                        <div className="row" style={{ marginBottom: "65px" }}>
                            <div className="col-12 col-md-12 col-lg-4">
                                <div className="card">
                                    <div className="card-body px-0">
                                        <div className="row pe-2">
                                            <div className="col-md-12 text-end">
                                                <Link to="/admin/route/add">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary add_route_btn"
                                                        style={{ fontSize: '0.875rem' }}
                                                    >
                                                        <AiFillPlusCircle className="me-1" />
                                                        Add Route
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="table-responsive p-2">
                                            <table
                                                className="table table-striped"
                                                id="products-datatable"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th style={{ width: "85px" }}>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {routeList &&
                                                        routeList.map((route) => {
                                                            return (
                                                                <tr key={route._id}>
                                                                    <td className="table-user">
                                                                        <Link
                                                                            to=""
                                                                            className="route_name font-weight-semibold ms-2"
                                                                        >
                                                                            {route.name}
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        <Link
                                                                            to={"/admin/route/routeEdit/" + route._id}
                                                                            className="action-icon"
                                                                        >
                                                                            <FaEdit />
                                                                        </Link>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary-outline action-icon"
                                                                            onClick={() => handleDelete(route._id)}
                                                                        >
                                                                            <MdDelete />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-12 col-lg-8">
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RouteScreen;
