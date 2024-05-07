import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { updateMerchantProfile, getMerchantDetailsById } from '../../../redux/actions/merchantAction'
import { MdAccountCircle, MdOutlineContacts } from "react-icons/md"
import { FaAddressBook } from 'react-icons/fa'
import { IoMdSave } from 'react-icons/io'
import { logger } from '../../../util/util'
import InputMask from 'react-input-mask';



const MerchantProfile = ({ ID, token }) => {
    const [merchant, setMerchant] = useState({
        business_name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        contactPerson_sec: '',
        contact_email_sec: '',
        phone_sec: ''
    })

    const [merchant_images, setMerchantImages] = useState()
    const [imageName, setImageName] = useState('')

    const { merchantDetails } = useSelector(state => state.merchantDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getMerchantDetailsById(ID, token));
    }, [dispatch, ID, token])

    useEffect(() => {
        if (merchantDetails) {
            setMerchant({
                ...merchantDetails,
                business_name: merchantDetails.business_name,
                contactPerson: merchantDetails.contactPerson,
                email: merchantDetails.email,
                phone: merchantDetails.phone,
                address: merchantDetails.address,
                city: merchantDetails.city,
                contactPerson_sec: merchantDetails.contactPerson_sec,
                contact_email_sec: merchantDetails.contact_email_sec,
                phone_sec: merchantDetails.phone_sec
            })
            setMerchantImages(merchantDetails.merchant_images)
        }

    }, [merchantDetails])


    const OnChangeHandler = (e) => {
        setMerchant({ ...merchant, [e.target.name]: e.target.value })
    }

    const OnChangeHandle = (event) => {
        const { name, value } = event.target;
        logger("newPhoneValue", event.target.value)
        const unformattedPhoneNumber = value.replace(/\D/g, '');
        logger("unformattedPhoneNumber", unformattedPhoneNumber)
        setMerchant((prevState) => ({
            ...prevState,
            [name]: unformattedPhoneNumber,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('business_name', merchant.business_name)
        formData.append('address', merchant.address)
        formData.append('city', merchant.city)
        formData.append('contactPerson', merchant.contactPerson)
        formData.append('email', merchant.email)
        formData.append('phone', merchant.phone)
        formData.append('contactPerson_sec', merchant.contactPerson_sec)
        formData.append('contact_email_sec', merchant.contact_email_sec)
        formData.append('phone_sec', merchant.phone_sec)
        formData.append('merchant_images', merchant_images)
        dispatch(updateMerchantProfile(ID, formData, token, navigate))
    }

    return (
        <>
            <div className="content-page position-relative" id="content" >
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row mt-3">
                                <div className="col-lg-12 col-xl-12">
                                    <div className="card-box mb-5">
                                        <div className="tab-content pt-0">
                                            <div className="tab-pane mt-3 show active" id="change_pwd">
                                                <form onSubmit={submitHandler} method="post" encType="multipart/form-data">
                                                    <input type="hidden" name="_token" value="umd0N1yGJrJxBFcxCO9M4XXboHTlRl5v0k9ACCuH" />
                                                    <h5 className="mb-4 text-uppercase" style={{ fontSize: '0.9375rem', fontWeight: '700' }}>
                                                        <MdAccountCircle size={18} style={{ marginTop: '-3px' }} className='me-1' /> Personal Information
                                                    </h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Name</label>
                                                                <input
                                                                    type="text" id="input-first-name"
                                                                    className="form-control route-name"
                                                                    placeholder="Business name"
                                                                    name="business_name"
                                                                    value={merchant.business_name}
                                                                    onChange={OnChangeHandler}
                                                                    required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Profile Image</label>
                                                                <input type="file"
                                                                    onChange={(e) => {
                                                                        setMerchantImages(e.target.files[0])
                                                                        setImageName(e.target.files[0].name)
                                                                    }}
                                                                    id="input-first-name"
                                                                    className="form-control"
                                                                    placeholder="Add Location"
                                                                    name="merchant_images"
                                                                    defaultValue=""
                                                                />
                                                            </div>
                                                            <p className='mb-0'>{imageName ? imageName
                                                                : merchant_images && merchant_images.substring(merchant_images.lastIndexOf('/') + 1)
                                                            }
                                                            </p>
                                                        </div>

                                                        <div className="col-sm-12 mt-3">
                                                            <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.9375rem', fontWeight: '700' }}>
                                                                <FaAddressBook style={{ marginTop: '-3px' }} className='me-1' />
                                                                Addresses
                                                            </h5>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-address">Address</label>
                                                                <input
                                                                    type="text"
                                                                    id="input-address"
                                                                    className="form-control route-name"
                                                                    placeholder="Enter Address"
                                                                    name="address"
                                                                    value={merchant.address}
                                                                    onChange={OnChangeHandler}
                                                                    required
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 mb-3">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-address">City</label>
                                                                <input
                                                                    type="text"
                                                                    id="input-address"
                                                                    className="form-control route-name"
                                                                    placeholder="Enter City"
                                                                    name="City"
                                                                    value={merchant.city}
                                                                    onChange={OnChangeHandler}
                                                                    required
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>



                                                        <div className="col-sm-12 mt-4">
                                                            <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.9375rem', fontWeight: '700' }}>
                                                                <MdOutlineContacts style={{ marginTop: '-3px' }} className='me-1' />
                                                                Point of Contact Primary
                                                            </h5>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Contact Person</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control route-name"
                                                                    placeholder="Enter Contact Person"
                                                                    name="contactPerson"
                                                                    value={merchant.contactPerson}
                                                                    onChange={OnChangeHandler}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Email Id</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Email Id for merchant"
                                                                    name="email"
                                                                    value={merchant.email}
                                                                    onChange={OnChangeHandler}
                                                                    required />
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-country">City</label>
                                                                <input
                                                                    type="text"
                                                                    id="input-country"
                                                                    className="form-control"
                                                                    placeholder="city"
                                                                    name="location"
                                                                    value={merchant.location}
                                                                    onChange={OnChangeHandler}
                                                                    required />
                                                            </div>
                                                        </div> */}
                                                        <div className="col-md-6 mt-2 mb-3">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Phone
                                                                    Number</label>
                                                                <InputMask
                                                                    className="form-control"
                                                                    mask="999-999-9999"
                                                                    maskChar=""
                                                                    alwaysShowMask={false}
                                                                    placeholder="Enter Phone Number"
                                                                    onChange={OnChangeHandle}
                                                                    value={merchant.phone}
                                                                    name="phone"
                                                                >
                                                                    {(inputProps) => <input {...inputProps} type="text" />}
                                                                </InputMask>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12 mt-3">
                                                            <h5 className="mb-3 text-uppercase" style={{ fontSize: '0.9375rem', fontWeight: '700' }}>
                                                                <MdOutlineContacts style={{ marginTop: '-3px' }} className='me-1' />
                                                                Point of Contact Secondary
                                                            </h5>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Contact Person</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control route-name"
                                                                    placeholder="Enter Contact Person"
                                                                    name="contactPerson_sec"
                                                                    value={merchant.contactPerson_sec}
                                                                    onChange={OnChangeHandler}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Email Id</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Email Id for merchant"
                                                                    name="contact_email_sec"
                                                                    value={merchant.contact_email_sec}
                                                                    onChange={OnChangeHandler}
                                                                    required />
                                                            </div>
                                                        </div>


                                                        {/* <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-country">City</label>
                                                                <input
                                                                    type="text"
                                                                    id="input-country"
                                                                    className="form-control"
                                                                    placeholder="city"
                                                                    name="location"
                                                                    value={merchant.location}
                                                                    onChange={OnChangeHandler}
                                                                    required />
                                                            </div>
                                                        </div> */}
                                                        <div className="col-md-6 mt-2">
                                                            <div className="form-group">
                                                                <label className="form-control-label" htmlFor="input-first-name">Phone
                                                                    Number</label>
                                                                <InputMask
                                                                    className="form-control"
                                                                    mask="999-999-9999"
                                                                    maskChar=""
                                                                    alwaysShowMask={false}
                                                                    placeholder="Enter Phone Number"
                                                                    onChange={OnChangeHandle}
                                                                    value={merchant.phone_sec}
                                                                    name="phone_sec"
                                                                >
                                                                    {(inputProps) => <input {...inputProps} type="text" />}
                                                                </InputMask>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="text-left mt-2">
                                                        <button type="submit"
                                                            className="btn btn-success waves-effect waves-light mt-2">
                                                            <IoMdSave style={{ marginTop: '-3px' }} className='me-1' />
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
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

export default MerchantProfile