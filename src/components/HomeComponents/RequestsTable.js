import React, { useEffect } from 'react'
import { getAssignedRequest, getTransitRequest } from '../../redux/actions/merchantAction'
import { useDispatch, useSelector } from 'react-redux'
import { logger } from '../../util/util'

const RequestsTable = ({ token }) => {
    const dispatch = useDispatch()
    const { assignedReq } = useSelector((state) => state.assignedReq)
    const { transitReq } = useSelector((state) => state.transitReq)

    logger("assignedReq",assignedReq)
    logger("transitReq",transitReq)


    useEffect(() => {
        dispatch(getAssignedRequest(token))
        dispatch(getTransitRequest(token))
    }, [dispatch, token])

    return (
        <>
            <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6 '>
                <h4 className="text-truncate text-un-assign">Assigned Requests</h4>
                <div className="widget-rounded-circle-grey" style={{ borderRadius: "0.25rem 0px 0px 0.25rem" }}>
                    <div className="row align-items-center mx-0">
                        <div className="col-2 px-0">
                            <div className="bg-head bg-reds" style={{ borderRadius: "0.25rem 0px 0px 0.25rem" }}>
                                <h3>Total</h3>
                                <p>{assignedReq && assignedReq.total}</p>
                            </div>
                        </div>

                        <div className="col-10 ps-0">
                            <div className="table-out table-responsive">
                                <table className="table table-borderless assigned_request">
                                    <thead className='text-center'>
                                        <tr style={{ fontSize: "0.875rem" }}>
                                            <th>Pickups</th>
                                            <th className="border-r">Deposits</th>
                                            <th >Merchant</th>
                                            <th className="border-r">Bank</th>
                                            <th>Normal</th>
                                            <th>Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        <tr style={{ fontSize: "0.875rem" }}>
                                            <td>0</td>
                                            <td className="border-r">0</td>
                                            <td>{assignedReq && assignedReq.merchant}</td>
                                            <td className="border-r">{assignedReq && assignedReq.bank}</td>
                                            <td>{assignedReq && assignedReq.normal}</td>
                                            <td>{assignedReq && assignedReq.premium}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-md-12 col-sm-12 col-lg-6 col-xl-6 '>
                <h4 className="text-truncate text-un-assign">In transit Requests</h4>
                <div className="widget-rounded-circle-grey  " style={{ borderRadius: " 0px 0.25rem 0.25rem 0px" }}>
                    <div className="row align-items-center mx-0">
                        <div className="col-2 px-0 ">
                            <div className="bg-head bg-greens" style={{ borderRadius: " 0px 0.25rem 0.25rem 0px" }}>
                                <h3>Total</h3>
                                <p>{transitReq && transitReq.total}</p>
                            </div>
                        </div>

                        <div className="col-10 ps-0">
                            <div className="table-out table-responsive">
                                <table className="table table-borderless transit_requests">
                                    <thead className='text-center'>
                                        <tr style={{ fontSize: "0.875rem" }}>
                                            <th>Pickups</th>
                                            <th className="border-r">Deposits</th>
                                            <th >Merchant</th>
                                            <th className="border-r">Bank</th>
                                            <th>Normal</th>
                                            <th>Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        <tr style={{ fontSize: "0.875rem" }}>
                                            <td>0</td>
                                            <td className="border-r">0</td>
                                            <td>{transitReq && transitReq.merchant}</td>
                                            <td className="border-r">{transitReq && transitReq.bank}</td>
                                            <td>{transitReq && transitReq.normal}</td>
                                            <td>{transitReq && transitReq.premium}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default RequestsTable