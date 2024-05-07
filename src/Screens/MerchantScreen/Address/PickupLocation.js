import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'
import { AiOutlineBars } from 'react-icons/ai'
import { logger } from '../../../util/util'
import { getMerchantDetailsById } from '../../../redux/actions/merchantAction'
import { useDispatch, useSelector } from 'react-redux'


const PickupLocation = ({ token, ID }) => {
    const dispatch = useDispatch()
    const { merchantDetails } = useSelector((state) => state.merchantDetails);
    logger("merchantDetails", merchantDetails);


    useEffect(() => {
        dispatch(getMerchantDetailsById(ID, token));
    }, [dispatch, ID, token])


    const formattedPhoneNumber = (phone) => {
        logger("Phone", phone)
        if (phone && typeof phone === 'number') {
            logger("inside function Phone", phone)
            const phoneString = phone.toString();
            return phoneString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
    };


    return (
        <>
            <div className="content-page position-relative" id="content">
                <div className="content">
                    <div className="row">
                        <div className="col-8">
                            <div className="page-title-box">
                                <h5 className="page-title ms-2 ms-md-0">Pickup Locations</h5>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <div className="card-box project-box pickup_card">
                                <h5 className="mt-0">
                                    <Link to="#" className="text-dark">
                                        Office
                                    </Link>
                                </h5>

                                <p className="mb-1 mt-3">
                                    <div className='d-flex'>
                                        <div>
                                            <AiOutlineBars size={18} className='text-muted me-1' />
                                        </div>
                                        <span className="pe-2 mb-2 d-inline-block ">
                                            <b className='ms-1'>Address : </b>
                                            {merchantDetails && merchantDetails.address}
                                        </span>
                                    </div>

                                    <div className='d-flex'>
                                        <div>
                                            <AiOutlineBars size={18} className='text-muted me-1' />
                                        </div>
                                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                            <b className='ms-1'>City : </b>
                                            {merchantDetails && merchantDetails.city}
                                        </span>
                                    </div>

                                    <div className='d-flex'>
                                        <div>
                                            <AiOutlineBars size={18} className='text-muted me-1' />
                                        </div>
                                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                            <b className='ms-1'>Contact Person : </b>
                                            {merchantDetails && merchantDetails.contactPerson}
                                        </span>
                                    </div>

                                    <div className='d-flex'>
                                        <div>
                                            <AiOutlineBars size={18} className='text-muted me-1' />
                                        </div>
                                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                            <b className='ms-1'>Contact Number : </b>
                                            {'+1' + formattedPhoneNumber(merchantDetails && merchantDetails.phone)}
                                        </span>
                                    </div>
                                </p>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 mb-3">
                            <div className="card-box project-box pickup_card">
                                <h5 className="mt-0">
                                    <Link to="#" className="text-dark">
                                        Office - 2
                                    </Link>
                                </h5>

                                <p className="mb-1 mt-3">
                                    <div className='d-flex'>
                                        <div>
                                            <AiOutlineBars size={18} className='text-muted me-1' />
                                        </div>
                                        <span className="pe-2 mb-2 d-inline-block ">
                                            <b className='ms-1'>Address : </b>
                                            {merchantDetails && merchantDetails.address2}
                                        </span>
                                    </div>

                                    <div className='d-flex'>
                                        <div>
                                            <AiOutlineBars size={18} className='text-muted me-1' />
                                        </div>
                                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                            <b className='ms-1'>Contact Person : </b>
                                            {merchantDetails && merchantDetails.contactPerson_sec}
                                        </span>
                                    </div>

                                    <div className='d-flex'>
                                        <div>
                                            <AiOutlineBars size={18} className='text-muted me-1' />
                                        </div>
                                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                                            <b className='ms-1'>Contact Number : </b>
                                            {'+1' + formattedPhoneNumber(merchantDetails && merchantDetails.phone_sec)}
                                        </span>
                                    </div>
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PickupLocation