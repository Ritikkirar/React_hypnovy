import React, { useState, useEffect } from "react";
import { FiBarChart2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './merchantDashboard.css'
import Chart from "react-apexcharts";
import { recentRequestPerMerchant, totalMerchantRequestCount, getPerDayRequest } from '../../redux/actions/merchantAction'
import { useDispatch, useSelector } from "react-redux";
import avatar from '../../images/avatar.png'
import NoRequest from '../../images/recent-request.jpg'
import Moment from 'moment'
import Footer from '../../components/Footer/Footer'
import { logger } from "../../util/util";



const MerchantDashboard = ({ ID, token }) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const today = new Date()

    const dispatch = useDispatch()
    const { recentReq } = useSelector((state) => state.recentReq)
    const { totalMerchantRequestCounts } = useSelector((state) => state.totalMerchantRequestCounts)
    const { perDayRequest } = useSelector((state) => state.perDayRequest)

    const categories = perDayRequest && perDayRequest.map((item) => Moment(item.date).format('MMM-DD'))
    const data = perDayRequest && perDayRequest.map((item) => item.count)

    logger("recentReq", recentReq);

    const options = {
        chart: {
            id: "spline",
        },
        xaxis: {
            categories: perDayRequest && perDayRequest.map((item) => Moment(item.date).format('MMM-DD')),
            labels: {
                style: {
                    colors: '#98a6ad',
                }
            }
        },
        yaxis: [
            {
                labels: {
                    style: {
                        colors: '#98a6ad',
                    }
                },
                title: {
                    text: "Numbers of requests",
                    style: {
                        color: '#98a6ad',
                    }
                }
            }
        ],
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: [
            "#47bf9b"
        ],
        fill: {
            type: "solid",
            colors: ['#bfe9dc']
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false
        }
    }

    const series = [
        {
            name: 'Requests',
            data: perDayRequest && perDayRequest.map((item) => item.count)
        }
    ]


    const getNext30Days = () => {
        const next30Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
        setStartDate(today)
        setEndDate(next30Days)
        return next30Days;
    }

    const thisMonth = () => {
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const start = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
        const end = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0);
        setStart(start)
        setEnd(end)
    }

    useEffect(() => {
        getNext30Days()
        thisMonth()
    }, [])


    useEffect(() => {
        dispatch(recentRequestPerMerchant(ID, startDate, endDate, token))
        dispatch(totalMerchantRequestCount(ID, token))
    }, [dispatch, ID, startDate, endDate, token])


    useEffect(() => {
        dispatch(getPerDayRequest(Moment(start).format('YYYY-MM-DD'), Moment(end).format('YYYY-MM-DD'), ID, token))
    }, [dispatch, start, end, ID, token])


    return (
        <>
            <div className="content-page position-relative" id="content">
                <div className="content mb-xl-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right"></div>
                                    <h4 className="page-title">Dashboard</h4>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="/requests">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatars-chart rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatar-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="mt-1 text-dark">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.totalRequests}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        Total Requests
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="/requests">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatar-charts rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatar-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="text-dark mt-1">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.completedReq}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        Completed Requests
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="/requests">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatar-charts rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatar-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="text-dark mt-1">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.assignedReq}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        Assinged Requests
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="/requests">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatars-chart rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatar-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="text-dark mt-1">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.inTransitReq}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        In transit Requests
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="dropdown float-end">
                                            <Link to="#" className="dropdown-item">View All</Link>
                                        </div>
                                        <h4 className="header-title mb-3">Recent Requests</h4>

                                        {recentReq && recentReq.length > 0 ? (
                                            <table className="table dashboard-table">
                                                <thead>
                                                    <tr>
                                                        <th className="fs-15">Merchant</th>
                                                        <th className="fs-15">Status</th>
                                                        <th className="fs-15">Truck</th>
                                                        <th className="fs-15">Date</th>
                                                        <th className="fs-15">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {recentReq &&
                                                        recentReq.slice(0, 4).map((data) => (
                                                            <tr key={data._id}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div>

                                                                            <img
                                                                                src={data.merchant.merchant_images ? data.merchant.merchant_images : avatar}
                                                                                className="rounded-circle me-3"
                                                                                alt=""
                                                                                style={{ width: "40px", height: "40px" }}
                                                                            />
                                                                        </div>

                                                                        <div className="d-flex flex-column">
                                                                            <p className="m-0 p-0 custom-author-name fs-15">{data.merchant.business_name}</p>
                                                                            <p className="m-0 p-0 custom-author-text">
                                                                                From <Link to="#">{data?.pickup_address}</Link>
                                                                                <br />
                                                                                to <Link to="#">
                                                                                    {data?.deposit_add_id !== null ?
                                                                                        data?.deposit_add_id?.bank_address ?
                                                                                            data.deposit_add_id.bank_address
                                                                                            : ''
                                                                                        : ''
                                                                                    }
                                                                                </Link>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-info text-white assined w-50">{data.status}</span>
                                                                </td>
                                                                <td>
                                                                    {data.truck ? (
                                                                        <>
                                                                            <span className="truck-name fs-13">{data.truck.truck_name}</span>
                                                                            <br />
                                                                            <span className="badge bg-soft-success truck-number ">{data.truck.truck_no}</span>
                                                                        </>
                                                                    ) : (
                                                                        "Not Available"
                                                                    )}
                                                                </td>
                                                                <td><span className="date fs-13">{Moment(data.created_at).format("DD-MM-YYYY")}</span></td>
                                                                <td>
                                                                    <Link to={"/requests/view/" + data._id} className="btn btn-sm btn-link text-info fs-13 view">
                                                                        View
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
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
                        </div>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="card-boxe pb-2">
                                            <h4 className="header-title mb-3">Requests</h4>
                                            <div dir="ltr">
                                                <div id="apex-mixed-1" style={{ height: "400px" }} data-colors="#1abc9c,#4a81d4" dir="ltr">
                                                    <Chart
                                                        options={options}
                                                        series={series}
                                                        type="area"
                                                        // width="500"
                                                        height="350"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MerchantDashboard