import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'
import { AiOutlineBars } from 'react-icons/ai'
import { logger } from '../../../util/util'
import { getMerchantDetailsById } from '../../../redux/actions/merchantAction'
import { useDispatch, useSelector } from 'react-redux'

const DepositLocation = ({ token, ID }) => {
    const dispatch = useDispatch()
    const { merchantDetails } = useSelector((state) => state.merchantDetails);
    logger("merchantDetails", merchantDetails);


    useEffect(() => {
        dispatch(getMerchantDetailsById(ID, token));
    }, [dispatch, ID, token])


    return (
        <>
            <div className="content-page position-relative" id="content">
                <div className="content">
                    <div className="row">
                        <div className="col-8">
                            <div className="page-title-box">
                                <h5 className="page-title ms-2 ms-md-0">Deposit Locations</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {merchantDetails && merchantDetails.selected_banks?.map((item, i) => (
                            <div className="col-lg-4 mb-3" key={i}>
                                <div className="card-box project-box deposit_card">
                                    <h5 className="mt-0">
                                        <Link to="#" className="text-dark">{item.bank_name}</Link>
                                    </h5>

                                    <p className="mb-1 mt-3">
                                        <div className='d-flex'>
                                            <div>
                                                <AiOutlineBars size={18} className='text-muted me-1' />
                                            </div>
                                            <span className="mb-2 d-inline-block">
                                                <b className='ms-1'>Address : </b>{item.bank_address}
                                            </span>
                                        </div>

                                        <div className='d-flex'>
                                            <div>
                                                <AiOutlineBars size={18} className='text-muted me-1' />
                                            </div>
                                            <span className="mb-2 d-inline-block">
                                                <b className='ms-1'>Contact Person : </b>
                                                {item.contact_person}
                                            </span>
                                        </div>

                                        <div className='d-flex'>
                                            <div>
                                                <AiOutlineBars size={18} className='text-muted me-1' />
                                            </div>
                                            <span className="mb-2 d-inline-block">
                                                <b className='ms-1'>Contact Number : </b>
                                                +1{item.bank_phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                                            </span>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default DepositLocation