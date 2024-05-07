import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { recentRequest } from '../../redux/actions/adminAction'
import Moment from 'moment'
import avatar from '../../images/avatar.png'
import NoRequest from '../../images/recent-request.jpg'
import { logger } from '../../util/util'


const RecentRequests = ({ token }) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const today = new Date()
    const dispatch = useDispatch()
    const { recentReqList } = useSelector((state) => state.recentReqList)

    logger("recentReqList", recentReqList);


    const getNext30Days = () => {
        const next30Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
        setStartDate(today)
        setEndDate(next30Days)
        return next30Days;
    }

    useEffect(() => {
        getNext30Days()
    }, [])

    useEffect(() => {
        dispatch(recentRequest(startDate, endDate, token))
    }, [dispatch, token, startDate, endDate])


    return (
        <>
            <div className="col-xl-6 col-lg-6 mb-3">
                <div className="card" style={{ height: '350px', overflow: 'auto', overscrollBehavior: 'auto' }}>
                    <div className="card-body">
                        <div className="dropdown float-end">
                            <Link to="/admin/requests" className="dropdown-item">View All</Link>
                        </div>
                        <h4 className="header-title mb-3 mt-2">Recent Requests</h4>
                        {recentReqList && recentReqList.length > 0 ? (
                            <div className="inbox-widget" data-simplebar style={{ maxHeight: "407px" }}>
                                {recentReqList && recentReqList.slice(0, 4).map((data) => {
                                    return (
                                        <div className="inbox-item" key={data._id}>
                                            <div className="inbox-item-img">
                                                <img src={data?.merchant !== null ?
                                                    data?.merchant?.merchant_images ?
                                                        data.merchant.merchant_images
                                                        : avatar
                                                    : avatar
                                                }
                                                    className="rounded-circle"
                                                    alt=""
                                                />
                                            </div>
                                            <p className="inbox-item-author">
                                                {data.business_name}
                                            </p>
                                            <p className="inbox-item-text" style={{ width: '45%' }}>
                                                From <Link to="#">{data?.pickup_address}</Link>
                                                <br />
                                                to <Link to="#"> {data.deposit_add_id !== null ?
                                                    data?.deposit_add_id?.bank_address ?
                                                        data.deposit_add_id.bank_address
                                                        : ''
                                                    : ''
                                                }</Link>
                                            </p>
                                            <p className="inbox-item-date">
                                                <Link to="#"
                                                    className="btn btn-sm me-4" style={{ color: "#6c757d" }}
                                                >
                                                    {Moment(data?.created_at).format('DD MMM YYYY')}
                                                </Link>

                                                <Link to={'/merchant/requests/view/' + data._id}
                                                    className="btn btn-sm btn-link text-info">
                                                    View
                                                </Link>
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className='d-flex flex-column justify-content-center align-items-center mt-4' >
                                <img src={NoRequest} alt='no result'
                                    className='img-responsive'
                                    style={{ height: '200px' }}
                                />
                                <h5 style={{ fontWeight: '700', color: '#4378fc' }}>
                                    No Recent Rquests are Available
                                </h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentRequests