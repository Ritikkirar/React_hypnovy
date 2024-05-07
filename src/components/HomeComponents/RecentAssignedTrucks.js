import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRecentAssignedTrucks } from '../../redux/actions/truckAction';
import { useDispatch, useSelector } from 'react-redux'
import NoTruck from '../../images/no-truck.jpg'
import { logger } from '../../util/util';


const RecentAssignedTrucks = ({ token }) => {
    const dispatch = useDispatch()
    const { recentTrucks } = useSelector(state => state.recentTrucks)
    logger("recentTrucks at dashboard", recentTrucks);

    useEffect(() => {
        dispatch(getRecentAssignedTrucks(token))
    }, [dispatch, token])

    return (
        <>
            <div className="col-lg-8 col-md-8">
                <div className="dropdown float-end mt-3">
                    <Link to="/truck/all" className="dropdown-item">View All</Link>
                </div>
                <h4 className="header-title mb-0 mt-3">Recent Assign Trucks</h4>
                {recentTrucks && recentTrucks.length > 0 ? (
                    <div className="row mt-2">
                        {recentTrucks && recentTrucks.slice(0, 2).map((data) => {
                            return (
                                <div className="col-lg-6" key={data._id}>
                                    <div className="card-box project-box ribbon-box" style={{ height: "420px" }}>
                                        <div className="ribbon-two ribbon-two-success">
                                            <span>{data.route.name}</span>
                                        </div>
                                        <Link to={'/truck/view/' + data._id} className="font-clr" >
                                            <div style={{ height: "180px", overflow: "hidden", width: "100%", objectPosition: "center" }}>
                                                <img className="grd-img"
                                                    src={data.truck_image}
                                                    alt='truck'
                                                    style={{ height: " 100%", width: " 100%", objectPosition: "center", objectFit: "cover" }} />
                                            </div>

                                            <h4 className="mt-3">
                                                {data.truck_name}
                                                <div
                                                    className="badge bg-soft-success text-success"
                                                    style={{ marginLeft: "10px" }}>
                                                    {data.truck_no}
                                                </div>
                                            </h4>

                                            <div className="row mt-3">
                                                <div className="col-xl-12 col-lg-12 ">
                                                    <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                                                        Zone : <b>{data.route.name}</b>
                                                    </span> <br/>
                                                    <span className="pe-2 text-nowrap mb-1 d-inline-block text-danger card-box-links">
                                                        <b>${data.requestTotal}</b> Request Amount
                                                    </span>
                                                </div>

                                                <div className="col-xl-12 col-lg-12  text-xl-right">
                                                    <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                                                        Today's Request Count : <b>{data.Requests.length}</b>
                                                    </span>
                                                    <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                                                        <b>${data.truck_insurance_amount.toLocaleString()}</b> Insurance Amount
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
                            style={{ height: '300px' }}
                        />
                        <h5 style={{ fontWeight: '700', color: '#4b409a' }}>
                            No Recent Assigned Trucks are Available
                        </h5>
                    </div>
                )}

            </div>
        </>
    )
}

export default RecentAssignedTrucks