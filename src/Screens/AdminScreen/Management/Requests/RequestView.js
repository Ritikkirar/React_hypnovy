import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { MdLocationOn, MdOutlineContacts, MdOutlinePhoneCallback } from 'react-icons/md'
import { TbTriangleSquareCircle } from 'react-icons/tb'
import { FaRegCalendarAlt, FaUserTie, FaMapMarkerAlt, FaAddressBook } from 'react-icons/fa'
import ProgressStep from '../../../../components/Common/ProgressStep'
import Footer from '../../../../components/Footer/Footer'
import { getSingleRequest } from '../../../../redux/actions/merchantAction'
import avatar from '../../../../images/avatar.png'
import moment from 'moment'
import { logger } from '../../../../util/util'


const RequestView = ({ token }) => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { singlerequest, requestusers } = useSelector((state) => state.singlerequeststore)

    logger("singlerequest", singlerequest, requestusers);


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
                                                                                <FaUserTie color='#6658dd' className='me-1' />
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
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Request Type - </strong>
                                                                                {singlerequest && singlerequest.req_type}
                                                                            </span>
                                                                        </div>
                                                                    </p>

                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
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
                                                                                <strong className="view_que_text"> Zone - </strong>
                                                                                {singlerequest && singlerequest.zone.name}
                                                                            </span>
                                                                        </div>
                                                                    </p>

                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Require Signature? - </strong>
                                                                                <span className='text-uppercase'> {singlerequest && singlerequest.signature}</span>
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
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
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Rate / Charge - </strong>
                                                                                ${singlerequest && singlerequest.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  {singlerequest && singlerequest.charge_type}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Extra Charge - </strong>
                                                                                ${singlerequest && singlerequest.extraRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Insurance Charge - </strong>
                                                                                ${singlerequest && singlerequest.insurance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <TbTriangleSquareCircle color='#6658dd' className='me-1' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Total Charge - </strong>
                                                                                ${(parseFloat(singlerequest && singlerequest.rate) + parseFloat(singlerequest && singlerequest.extraRate) + parseFloat(singlerequest && singlerequest.insurance)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <FaRegCalendarAlt className='me-2' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">Requested Time - </strong>
                                                                                {moment(singlerequest && singlerequest.created_at).format('DD-MM-YYYY, hh:mm A')}
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                </div>

                                                                <div className="col-sm-12 mt-2 mb-3">
                                                                    <h5 className="mb-2 text-uppercase">
                                                                        <MdOutlineContacts className='me-2' />
                                                                        Pickup & Deposit Information
                                                                    </h5>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <p>
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
                                                                                <FaUserTie color='#6658dd' className='me-1' />
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
                                                                                <MdOutlinePhoneCallback color='#6658dd' className='me-2' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">
                                                                                    +{singlerequest && singlerequest.phone && (
                                                                                        singlerequest.phone.slice(0, 4) + "-" +
                                                                                        singlerequest.phone.slice(4, 7) + "-" +
                                                                                        singlerequest.phone.slice(7)
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
                                                                                <strong className="view_que_text">Bank Name - </strong>
                                                                                {singlerequest && singlerequest.deposit_add_id !== null ?
                                                                                    singlerequest.deposit_add_id.bank_name
                                                                                    : ''
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p>
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <FaAddressBook className='mb-1 me-1' color='#6658dd' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">Bank Address - </strong>
                                                                                {singlerequest && singlerequest.deposit_add_id !== null ?
                                                                                    singlerequest.deposit_add_id.bank_address
                                                                                    : ''
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <FaUserTie color='#6658dd' className='me-1' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text"> Contact Person - </strong>
                                                                                {singlerequest && singlerequest.deposit_add_id !== null ?
                                                                                    singlerequest.deposit_add_id.contact_person
                                                                                    : ''
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </p>
                                                                    <p className="mt-3">
                                                                        <div className='d-flex'>
                                                                            <div>
                                                                                <MdOutlinePhoneCallback color='#6658dd' className='me-2' />
                                                                            </div>
                                                                            <span>
                                                                                <strong className="view_que_text">
                                                                                    +{singlerequest && singlerequest.deposit_add_id !== null ?
                                                                                        singlerequest.deposit_add_id.bank_phone && (
                                                                                            singlerequest.deposit_add_id.bank_phone.slice(0, 4) + "-" +
                                                                                            singlerequest.deposit_add_id.bank_phone.slice(4, 7) + "-" +
                                                                                            singlerequest.deposit_add_id.bank_phone.slice(7)
                                                                                        )
                                                                                        : ''
                                                                                    }
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

                                                    <div id="box-div table-responsive mt-1" className='table-responsive mt-1 overflow-auto'>
                                                        <table id="" className="table table-striped w-100 mt-2 text-center">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID Number</th>
                                                                    {/* <th>Currency Type</th>
                                                                    <th>Amount Type</th> */}
                                                                    <th>Total Amount</th>
                                                                    <th>Pickedup Time</th>
                                                                    <th>Deposit Time</th>
                                                                    {/* <th>Action</th> */}
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {singlerequest && singlerequest.bags.map((item, i) => (
                                                                    <tr key={i}>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">{item.bag_ID}</h5>
                                                                        </td>
                                                                        {/* <td>
                                                                            <h5 className="m-0 font-weight-normal">USD</h5>
                                                                        </td>
                                                                        <td>

                                                                            <h5 className="m-0 font-weight-normal">
                                                                                {item.cash_amount !== 0 && item.cheque_amount !== 0 && item.coins_amount !== 0 ? 'Cash,Cheques,Coins'
                                                                                    : item.cash_amount == 0 && item.cheque_amount !== 0 && item.coins_amount !== 0 ? 'Cheques,Coins'
                                                                                        : item.cash_amount !== 0 && item.cheque_amount == 0 && item.coins_amount !== 0 ? 'Cash,Coins'
                                                                                            : item.cash_amount !== 0 && item.cheque_amount !== 0 && item.coins_amount == 0 ? 'Cash,Cheques'
                                                                                                : item.cash_amount !== 0 && item.cheque_amount == 0 && item.coins_amount == 0 ? 'Cash'
                                                                                                    : item.cash_amount == 0 && item.cheque_amount !== 0 && item.coins_amount == 0 ? 'Cheques'
                                                                                                        : item.cash_amount == 0 && item.cheque_amount == 0 && item.coins_amount !== 0 ? 'Coins'
                                                                                                            : ''
                                                                                }
                                                                            </h5>
                                                                        </td>

                                                                            <h5 className="m-0 font-weight-normal">{item.deposit_type}</h5>
                                                                        </td> */}

                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">
                                                                                ${item.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                            </h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">
                                                                                {singlerequest && singlerequest.pickedup_datetime ? moment(singlerequest && singlerequest.pickedup_datetime).format('DD-MM-YYYY, hh:mm A') : "N/A"}
                                                                            </h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5 className="m-0 font-weight-normal">{singlerequest && singlerequest.deposit_datetime ? moment(singlerequest && singlerequest.deposit_datetime).format('DD-MM-YYYY, hh:mm A') : "N/A"}</h5>
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
                                                                        {moment(singlerequest && singlerequest.created_at).format("DD-MM-YYYY, hh:mm A")}
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
                                                                        {singlerequest && singlerequest.pickedup_datetime ? moment(singlerequest && singlerequest.pickedup_datetime).format("DD-MM-YYYY, hh:mm A") : 'N/A'}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li className="text-end">
                                                                <div className="ml-auto">
                                                                    <span className="round ml-auto"></span>
                                                                    <h5 className="mt-2 mb-1 ">Deposit</h5>
                                                                    <p className="text-muted"> {singlerequest && singlerequest.deposit_datetime ? moment(singlerequest && singlerequest.deposit_datetime).format('DD-MM-YYYY, hh:mm A') : 'N/A'}
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
                                    <div className="col-md-6">
                                        <div className='card-box'>
                                            <div className="card">
                                                <h5>Client Details</h5>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="d-flex">
                                                            <div className="d-flex flex-column flex-md-row text-center my-3 p-2">

                                                                <div className="user-icon">
                                                                    <h6>Client Image</h6>
                                                                    <img
                                                                        src={singlerequest && singlerequest.merchant.merchant_images ? singlerequest && singlerequest.merchant.merchant_images : avatar}
                                                                        alt="merchnat_image" className="img-fluid mx-auto d-block rounded" />
                                                                </div>
                                                                <div className="user-icon d-flex flex-column">
                                                                    <h6>Digital Signature</h6>
                                                                    <img src={singlerequest && singlerequest.merchant_signature ? singlerequest && singlerequest.merchant_signature : ""}
                                                                        alt="" className="img-fluid mx-auto d-block rounded" />
                                                                    <div className='d-flex mt-3 align-items-center'>
                                                                        <h6>Signatory Name :</h6>
                                                                        <div className='ms-2 mb-2'>{singlerequest && singlerequest.signatory_name}</div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='card p-2' style={{ height: '350px', marginBottom: '24px' }}>
                                            <h5 className='p-3'>Truck Details</h5>
                                            <div className="" style={{ height: '230px' }}>
                                                <img src={singlerequest && singlerequest.truck?.truck_image}
                                                    className="mx-auto d-block rounded img-responsive"
                                                    alt=''
                                                    style={{ height: '230px' }}
                                                />
                                            </div>
                                            <h6 className='my-2 text-center'>
                                                {singlerequest && singlerequest.truck?.truck_name} ({singlerequest && singlerequest.truck?.truck_no})
                                            </h6>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="row">
                                    <div className="col-12">
                                        <div className='card-box'>
                                            <div className="card">
                                                <h5>Truck Details</h5>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12 d-flex col-md-12 d-flex flex-column flex-md-row p-2 text-center">
                                                            <div className="user-details col-md-6">

                                                                <img src={singlerequest && singlerequest.truck?.truck_image}
                                                                    className="img-fluid mx-auto d-block rounded w-50"
                                                                    alt=''
                                                                />
                                                                <h6 className='my-2'>
                                                                    {singlerequest && singlerequest.truck?.truck_name} ({singlerequest && singlerequest.truck?.truck_no})
                                                                </h6>
                                                                <div>
                                                                    <p className='my-2'>
                                                                        <strong>Truck Number : </strong>
                                                                        {singlerequest && singlerequest.truck?.truck_no}
                                                                    </p>
                                                                    <p className='my-2'>
                                                                        <strong> Truck Type : </strong>
                                                                        {singlerequest && singlerequest.truck?.truck_type}
                                                                    </p>
                                                                    <p className='my-2'>
                                                                        <strong> Route : </strong>
                                                                        {singlerequest && singlerequest.truck?.route}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="row">
                                    <div className="col-12">
                                        <div className='card-box'>
                                            <div className="card">
                                                <h5>Officers Details</h5>
                                                <div className="card-body">
                                                    <div className="row">
                                                        {requestusers && requestusers.map((item, i) => (
                                                            <div className="col-12 d-flex col-md-12 d-flex flex-column flex-md-row text-center border my-3 p-2 rounded-1" key={i}>
                                                                <div className="user-details col-md-6" >
                                                                    <h6 className='my-2'>{item.officer_type}</h6>
                                                                    {/* <div className='w-25 w-25 ms-2'> */}
                                                                    <img src={item.officerImage}
                                                                        className="img-fluid mx-auto d-block rounded w-25"
                                                                        alt=''
                                                                    />
                                                                    {/* </div> */}
                                                                    <h6 className='my-2'>{item.name}</h6>


                                                                </div>

                                                                <div className="user-details col-md-6">
                                                                    <h6 className='my-2'>Digital Signature</h6>
                                                                    <img src={item.user_signature}
                                                                        className="img-fluid mx-auto d-block rounded w-50"
                                                                        alt=''
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
            </div >
        </>
    )
}

export default RequestView