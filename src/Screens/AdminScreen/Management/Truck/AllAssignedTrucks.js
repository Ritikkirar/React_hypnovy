import React, { useEffect } from 'react'
import Footer from '../../../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { getRecentAssignedTrucks } from '../../../../redux/actions/truckAction';
import { useDispatch, useSelector } from 'react-redux'
import NoTruck from '../../../../images/no-truck.jpg'
// import { logger } from '../../../../util/util';

const AllAssignedTrucks = ({ token }) => {
    const dispatch = useDispatch();
    const { recentTrucks } = useSelector(state => state.recentTrucks)

    useEffect(() => {
        dispatch(getRecentAssignedTrucks(token))
    }, [dispatch, token])

    return (
        <div className="content-page position-relative" id="content">
            <div className="content mb-xl-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-xl-4 col-md-12">
                            <h5 className="page-title">Recent Assigned Trucks</h5>
                        </div>
                    </div>

                    {recentTrucks && recentTrucks.length > 0 ? (
                        <div className="row mt-3" style={{ marginBottom: "45px" }}>
                            {recentTrucks && recentTrucks.map((truck) => {
                                return (
                                    <div className="col-md-6 col-xl-4" key={truck._id}>
                                        <div
                                            className="card-box project-box ribbon-box"
                                            style={{ height: "400px" }}
                                        >
                                            <div className="ribbon-two ribbon-two-success">
                                                <span>{truck.route.name}</span>
                                            </div>

                                            <Link
                                                to={'/truck/view/' + truck._id}
                                                className="font-clr"
                                            >
                                                <div
                                                    style={{
                                                        height: "180px",
                                                        overflow: "hidden",
                                                        width: "100%",
                                                        objectPosition: "center",
                                                    }}
                                                >
                                                    <img
                                                        className="grd-img"
                                                        src={truck.truck_image}
                                                        alt="truck_image"
                                                        style={{
                                                            height: " 100%",
                                                            width: " 100%",
                                                            objectPosition: "center",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>

                                                <h4 className="mt-3">
                                                    {truck.truck_name}
                                                    <div
                                                        className="badge bg-soft-success text-success"
                                                        style={{ marginLeft: "10px" }}
                                                    >
                                                        {truck.truck_no}
                                                    </div>
                                                </h4>

                                                <div className="row mt-3">
                                                    <div className="col-xl-12 col-lg-12">
                                                        <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                                                            Zone: <b>{truck.route.name}</b>
                                                        </span><br />
                                                        <span className="pe-2 text-nowrap mb-1 d-inline-block text-danger card-box-links">
                                                            <b>${truck.requestTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b> Request Amount
                                                        </span>
                                                    </div>

                                                    <div className="col-xl-12 col-lg-12  text-xl-right">
                                                        <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                                                            Today's Request Count: <b>{truck.Requests.length}</b>
                                                        </span>
                                                        <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                                                            <b>${truck.truck_insurance_amount.toLocaleString()}</b> Insurance Amount
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className='card-box project-box ribbon-box d-flex flex-column justify-content-center align-items-center mt-2'>
                            <img src={NoTruck} alt='no result'
                                className='img-responsive'
                                style={{ height: '200px' }}
                            />
                            <h5 style={{ fontWeight: '700', color: '#4b409a' }}>
                                No Recent Assigned Trucks are Available
                            </h5>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default AllAssignedTrucks