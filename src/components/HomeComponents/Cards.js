import React, { useEffect } from 'react'
import { FiBarChart2, FiHeart, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getTotalCount } from '../../redux/actions/merchantAction'
import { useDispatch, useSelector } from 'react-redux'
import { logger } from '../../util/util'


const Cards = ({ token }) => {
    const dispatch = useDispatch()
    const { totalCounts } = useSelector((state) => state.totalCount)

    logger("totalCounts==>", totalCounts)


    useEffect(() => {
        dispatch(getTotalCount(token))
    }, [dispatch, token])


    return (
        <>
            <div className='col-md-6 col-xl-6'>
                <div className="card-box">
                    <Link to="/customer/listing">
                        <div className="row">
                            <div className="col-6">
                                <div className="avatar-lg avatar-merchants rounded-circle d-flex justify-content-center align-items-center">
                                    <FiUsers className='font-22 avatar-title' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-end">
                                    <h4 className="mt-1 text-dark">{totalCounts && totalCounts.merchants}</h4>
                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "15px" }}>
                                        Merchants
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='col-md-6 col-xl-6'>
                <div className="widget-rounded-circle card-box">
                    <Link to="/customer/listing">
                        <div className="row">
                            <div className="col-6">
                                <div className="avatar-lg avatar-banks rounded-circle d-flex justify-content-center align-items-center">
                                    <FiUsers className='font-22 avatar-title' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-end">
                                    <h4 className="mt-1 text-dark">{totalCounts && totalCounts.banks}</h4>
                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "15px" }}>
                                        Banks
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='col-md-6 col-xl-6'>
                <div className="widget-rounded-circle card-box">
                    <Link to="/officer/listing">
                        <div className="row">
                            <div className="col-6">
                                <div className="avatar-lg avatar-chart rounded-circle d-flex justify-content-center align-items-center">
                                    <FiBarChart2 className='font-22 avatar-title' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-end">
                                    <h4 className="mt-1 text-dark">{totalCounts && totalCounts.officers}</h4>
                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "15px" }}>
                                        Officers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='col-md-6 col-xl-6'>
                <div className="widget-rounded-circle card-box">
                    <Link to="/truck">
                        <div className="row">
                            <div className="col-6">
                                <div className="avatar-lg avatar-heart rounded-circle d-flex justify-content-center align-items-center">
                                    <FiHeart className='font-22 avatar-title' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-end">
                                    <h4 className="mt-1 text-dark">{totalCounts && totalCounts.trucks}</h4>
                                    <p className="text-muted mb-1 ">Trucks</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Cards