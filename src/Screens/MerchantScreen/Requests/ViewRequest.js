import React, { useEffect } from 'react'
import { MdLocationOn, MdOutlineContacts, MdOutlinePhoneCallback } from 'react-icons/md'
import { TbTriangleSquareCircle } from 'react-icons/tb'
import { FaRegCalendarAlt, FaUserTie, FaMapMarkerAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ProgressStep from '../../../components/Common/ProgressStep'
import Footer from '../../../components/Footer/Footer'
import { getSingleRequest } from '../../../redux/actions/merchantAction'
import { logger } from '../../../util/util'
import Moment from 'moment'
import avatar from "../../../images/avatar.png"

const ViewRequest = ({ ID, token }) => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { singlerequest, requestusers } = useSelector((state) => state.singlerequeststore)

    logger("requestusers", requestusers);
    logger("singlerequest", singlerequest)
    logger("requestusers", requestusers)

    useEffect(() => {
        dispatch(getSingleRequest(id, token))
    }, [dispatch, id, token])

    return (
        <>
            <div className="content-page position-relative" id="content">
                <div className="content">
                    <div className="content content-mdi-icon">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">

                                        </div>
                                        <h4 className="page-title">Request Details</h4>
                                    </div>
                                </div>
                            </div>

                            <div id="content">
                                <div id="content2">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-box">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="pl-xl-3 mt-3 mt-xl-0">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <h4 className="">
                                                                        {
                                                                            singlerequest && singlerequest.status === 'Declined' ? (
                                                                                <span className="badge bg-soft-danger text-danger ">
                                                                                    {singlerequest && singlerequest.status}
                                                                                </span>
                                                                            ) : (
                                                                                <span className='badge view_btn_top me-1 bg-soft-success text-success'>
                                                                                    {singlerequest && singlerequest.status}
                                                                                </span>
                                                                            )
                                                                        }
                                                                    </h4>
                                                                </div>
                                                            </div>

                                                            <div className="row mt-2">
                                                                <div className="col-sm-12">
                                                                    <h5 className="mb-2 text-uppercase">
                                                                        <MdOutlineContacts className='me-1' /> Request Information </h5>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <FaUserTie className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Merchant - </strong>
                                                                                {singlerequest && singlerequest.business_name}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Request Type - </strong>
                                                                                {singlerequest && singlerequest.req_type}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3 text-capitalize">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> With Return - </strong>
                                                                                {singlerequest && singlerequest.withreturn}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <MdLocationOn className='mb-1 me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">Zone - </strong>
                                                                                {singlerequest && singlerequest.zone.name}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Request Identification - </strong>
                                                                                {singlerequest && singlerequest.req_ID}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Service - </strong>
                                                                                {singlerequest && singlerequest.charge_type}

                                                                            </span>
                                                                        </div>
                                                                    </p>

                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Require Signature? - </strong>
                                                                                <span className='text-uppercase'>{singlerequest && singlerequest.signature}</span>
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p>
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <FaRegCalendarAlt className='me-2' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">Requested Time </strong>
                                                                                {Moment(singlerequest && singlerequest.created_at).format('DD-MM-YYYY, hh:mm A')}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                </div>

                                                                <div className="col-sm-12 mt-3 mb-3">
                                                                    <h5 className="mb-2 text-uppercase">
                                                                        <MdOutlineContacts className='me-2' />
                                                                        Pickup & Deposit Information
                                                                    </h5>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <p className="text-muted">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <MdLocationOn className='mb-1 me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">Pickup Location - </strong>
                                                                                {singlerequest && singlerequest.pickup_address}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <FaUserTie className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Contact Person - </strong>
                                                                                {singlerequest && singlerequest.business_name}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <MdOutlinePhoneCallback className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">
                                                                                    +1{singlerequest && singlerequest.phone && (
                                                                                        singlerequest.phone.slice(0, 3) + "-" +
                                                                                        singlerequest.phone.slice(3, 6) + "-" +
                                                                                        singlerequest.phone.slice(6)
                                                                                    )}
                                                                                </strong>
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <p>
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <MdLocationOn className='mb-1 me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">Bank Name - </strong>&nbsp;
                                                                                {singlerequest && singlerequest.deposit_add_id !== null ?
                                                                                    singlerequest.deposit_add_id.bank_name
                                                                                    : ''
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="text-muted">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <MdLocationOn className='mb-1 me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">Bank Address - </strong>
                                                                                {singlerequest && singlerequest.deposit_add_id !== null ? singlerequest.deposit_add_id.bank_address : 'N/A'}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <FaUserTie className='me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Contact Person - </strong>
                                                                                {singlerequest && singlerequest.deposit_add_id.contact_person}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <MdOutlinePhoneCallback className='me-2' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">
                                                                                    +1{singlerequest && singlerequest.deposit_add_id && singlerequest.deposit_add_id.bank_phone && (
                                                                                        singlerequest.deposit_add_id.bank_phone.slice(0, 3) + "-" +
                                                                                        singlerequest.deposit_add_id.bank_phone.slice(3, 6) + "-" +
                                                                                        singlerequest.deposit_add_id.bank_phone.slice(6)
                                                                                    )}
                                                                                </strong>
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {singlerequest && singlerequest.status === 'Declined' ?
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-box">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h4>Decline Summary</h4>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <p className='mb-2 fw-bold'>
                                                                    {/* <GoPrimitiveDot className='me-1' />  */}
                                                                    Decline Reasons
                                                                </p>
                                                                <ul>
                                                                    {singlerequest && singlerequest.DeclineReasons.map((data, i) => {
                                                                        return (
                                                                            <li key={i}>{data}</li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <p className='mb-2 fw-bold'>
                                                                    {/* <GoPrimitiveDot className='me-1' />  */}
                                                                    Decline Decription
                                                                </p>
                                                                <p style={{ color: '#6c757d' }}>
                                                                    {singlerequest && singlerequest.DeclineDes}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : ''
                                }

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card-box">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h4>Bag Information</h4>
                                                        </div>
                                                        <div className="col-6 text-end">
                                                            <h4>
                                                                Total Amount : ${singlerequest && singlerequest.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </h4>
                                                        </div>
                                                    </div>




                                                    <div id="box-div mt-1" className='table-responsive overflow-auto'>
                                                        <table id="" className="table table-striped dt-responsive w-100 mt-2">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID Number</th>
                                                                    <th>Currency Type</th>
                                                                    <th>Amount Type</th>
                                                                    <th>Total Amount</th>
                                                                    <th>Pickedup Time</th>
                                                                    <th>Deposit Time</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {singlerequest && singlerequest.bags.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">{item.bag_ID}</h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">XCD</h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">
                                                                                {item.cash_amount !== null && item.cheque_amount !== null && item.coins_amount !== null ? 'Cash,Cheques,Coins'
                                                                                    : item.cash_amount === null && item.cheque_amount !== null && item.coins_amount !== null ? 'Cheques,Coins'
                                                                                        : item.cash_amount !== null && item.cheque_amount === null && item.coins_amount !== null ? 'Cash,Coins'
                                                                                            : item.cash_amount !== null && item.cheque_amount !== null && item.coins_amount === null ? 'Cash,Cheques'
                                                                                                : item.cash_amount !== null && item.cheque_amount === null && item.coins_amount === null ? 'Cash'
                                                                                                    : item.cash_amount === null && item.cheque_amount !== null && item.coins_amount === null ? 'Cheques'
                                                                                                        : item.cash_amount === null && item.cheque_amount === null && item.coins_amount !== null ? 'Coins'
                                                                                                            : ''
                                                                                }
                                                                            </h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">
                                                                                ${item.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                            </h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">{singlerequest && singlerequest.pickedup_datetime ? Moment(singlerequest && singlerequest.pickedup_datetime).format('DD-MM-YYYY, hh:mm A') : "N/A"}</h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">{singlerequest && singlerequest.deposit_datetime ? Moment(singlerequest && singlerequest.deposit_datetime).format('DD-MM-YYYY, hh:mm A') : "N/A"}</h5>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-12">
                                        <div className='card-box'>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h4>Step Progress</h4>
                                                        </div>

                                                        <div className="col-6 text-end">
                                                            <Link to="#" className="btn btn-sm btn-link text-primary font-13" >
                                                                <h6 className="text-info">
                                                                    <FaMapMarkerAlt className='me-2'
                                                                        style={{ marginTop: '-3px' }}
                                                                        color='#6658dd'
                                                                    />
                                                                    Track
                                                                </h6>
                                                            </Link>
                                                        </div>
                                                        <ProgressStep status={singlerequest && singlerequest.status} />
                                                    </div>

                                                    <div className="track-order-list mt-0">
                                                        <ul className="list-unstyled nav justify-content-between">
                                                            <li className="completed">
                                                                <div>
                                                                    <span className="round">
                                                                        <i className="fa fa-check" aria-hidden="true"></i>
                                                                    </span>
                                                                    <h5 className="mt-2 mb-1">Requested</h5>
                                                                    <p className="text-muted">
                                                                        {Moment(singlerequest && singlerequest.created_at).format('DD-MM-YYYY, hh:mm A')}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li className="completed text-center">
                                                                <div className="mx-auto">
                                                                    <span className="round mx-auto">
                                                                        <i className="fa fa-check" aria-hidden="true"></i></span>
                                                                    <h5 className="mt-2 mb-1">Picked up (<span>{singlerequest && singlerequest.pickedup_datetime <= singlerequest && singlerequest.pickup_datetime
                                                                        ? 'On Time' : singlerequest && singlerequest.pickedup_datetime > singlerequest && singlerequest.pickup_datetime ? 'Late' : 'Not Reached'}</span>)
                                                                    </h5>
                                                                    <p className="text-muted">
                                                                    {singlerequest && singlerequest.pickedup_datetime ? Moment(singlerequest && singlerequest.pickedup_datetime).format("DD-MM-YYYY, hh:mm A") : 'N/A'}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li className="text-end">
                                                                <div className="ml-auto">
                                                                    <span className="round ml-auto"></span>
                                                                    <h5 className="mt-2 mb-1 ml-auto">Deposit</h5>
                                                                    <p className="text-muted">
                                                                    {singlerequest && singlerequest.deposit_datetime ? Moment(singlerequest && singlerequest.deposit_datetime).format('DD-MM-YYYY, hh:mm A') : 'N/A'}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className='card-box'>
                                            <div className="card">
                                                <h5>Client Details</h5>
                                                <div className="card-body">

                                                    <div className="row mt-3" style={{ marginBottom: '65px' }}>
                                                        <div className="col-md-12 d-flex ">
                                                            <div className="col-12 d-flex col-md-12 d-flex flex-column flex-md-row text-center border my-3 p-2 rounded-1">

                                                                <div className="user-icon pr-2">
                                                                    <h6>Client Image</h6>
                                                                    <img
                                                                        src={singlerequest && singlerequest.merchant.merchant_images ? singlerequest && singlerequest.merchant.merchant_images : avatar}
                                                                        alt="merchnat_image" className="img-fluid mx-auto d-block rounded" />
                                                                </div>
                                                                <div className="user-icon">
                                                                    <h6>Digital Signature</h6>
                                                                    <img src={singlerequest && singlerequest.merchant_signature ? singlerequest && singlerequest.merchant_signature : ""}
                                                                        alt="" className="img-fluid mx-auto d-block rounded" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className='card-box'>
                                            <div className="card">
                                                <h5>Officers Details</h5>
                                                <div className="card-body">
                                                    <div className="row " style={{ marginBottom: '65px' }}>
                                                        {requestusers && requestusers.map((item, i) => (
                                                            <div className="col-12 d-flex col-md-12 d-flex flex-column flex-md-row text-center border my-3 p-2 rounded-1" key={i}>
                                                                <div className="user-details col-md-6" >
                                                                    <h6 className='my-2'>{item.officer_type}</h6>
                                                                    <img src={item.officerImage}
                                                                        alt=''
                                                                        className="img-fluid mx-auto d-block rounded w-25"
                                                                    />
                                                                    <h6 className='my-2'>{item.name}</h6>
                                                                </div>

                                                                <div className="user-details col-md-6">
                                                                    <h6 className='my-2'>Digital Signature</h6>
                                                                    <img src={item.user_signature}
                                                                        alt=''
                                                                        className="img-fluid mx-auto d-block rounded w-50"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
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

export default ViewRequest