import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputMask from 'react-input-mask';
import { getBankById, updateBank } from "../../../../redux/actions/adminAction";
import Footer from "../../../../components/Footer/Footer";
import { logger } from "../../../../util/util";
import { AiFillBank } from 'react-icons/ai'
import { IoMdSave } from 'react-icons/io'
import "../../Home.css";


const EditBank = ({ token }) => {
    const [bank, setBank] = useState({
        bank_name: "",
        bank_address: "",
        contact_person: ""
    });
    const [bank_phone, setBankPhone] = useState()
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { bankDetails } = useSelector(state => state.bankDetails)
    logger("bankDetails", bankDetails)

    useEffect(() => {
        dispatch(getBankById(id, token));
    }, [dispatch, id, token]);


    useEffect(() => {
        if (bankDetails) {
            setBank({
                ...bankDetails,
                bank_name: bankDetails.bank_name,
                bank_address: bankDetails.bank_address,
                contact_person: bankDetails.contact_person
            });
            setBankPhone(bankDetails.bank_phone)
        }
    }, [bankDetails]);


    const OnChangeHandler = (e) => {
        setBank({ ...bank, [e.target.name]: e.target.value });
    };

    const OnChangeHandle = (newPhoneValue) => {
        logger("newPhoneValue", newPhoneValue.target.value)
        const formattedPhoneNumber = newPhoneValue.target.value
        const unformattedPhoneNumber = formattedPhoneNumber.replace(/\D/g, '');
        logger("unformattedPhoneNumber", unformattedPhoneNumber)
        setBankPhone(unformattedPhoneNumber);
      };

    const submitHandler = (e) => {
        e.preventDefault();
        const obj = {
            bank_name: bank.bank_name,
            bank_address: bank.bank_address,
            bank_phone: bank_phone,
            contact_person: bank.contact_person
        };

        dispatch(updateBank(id, obj, token, navigate));
    };

    logger("BANKPHONE", bank_phone)

    return (

        <>
            <div className="content-page position-relative" id="content">
                <div className="content" style={{ marginBottom: "65px" }}>
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-5">
                                <div className="page-title-box">
                                    <h4 className="page-title">
                                        <Link to="/admin/master-banks">
                                            <h4 className="page-title text-dark">Back</h4>
                                        </Link>
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <form id="geo_form"
                            className="add_new_geo"
                            onSubmit={submitHandler}
                        >
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card-box card_outer mb-0">
                                        <h4 className="header-title mb-3">
                                            <AiFillBank className='me-1' size={20} style={{ marginTop: '-3px' }} />
                                            Update Bank
                                        </h4>
                                        <div className="top_items mb-3">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-0">
                                                        <label className="routeLabel" htmlFor="bank_name">
                                                            Bank Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="bank_name"
                                                            id="bank_name"
                                                            placeholder="Bank Name"
                                                            className="form-control p-2 route-name"
                                                            onChange={OnChangeHandler}
                                                            value={bank.bank_name}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-0">
                                                        <label className="routeLabel" htmlFor="bank_address">
                                                            Bank Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="bank_address"
                                                            id="bank_address"
                                                            placeholder="Bank Address"
                                                            className="form-control p-2"
                                                            onChange={OnChangeHandler}
                                                            value={bank.bank_address}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-0">
                                                        <label className="routeLabel" htmlFor="contact_person">
                                                            Contact Person
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="contact_person"
                                                            id="contact_person"
                                                            placeholder="Contact Person"
                                                            className="form-control p-2 route-name"
                                                            onChange={OnChangeHandler}
                                                            value={bank.contact_person}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-0">
                                                        <label className="routeLabel" htmlFor="bank_phone">
                                                            Bank Phone
                                                        </label>
                                                        <InputMask
                                                            className="form-control"
                                                            mask="999-999-9999"
                                                            maskChar=""
                                                            alwaysShowMask={false}
                                                            placeholder="Enter Phone Number"
                                                            onChange={OnChangeHandle}
                                                            value={bank_phone}
                                                        >
                                                            {(inputProps) => <input {...inputProps} type="text" />}
                                                        </InputMask>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="geo_bottom_btns w-100">
                                            <button type="submit"
                                                className="btn btn-success waves-effect waves-light mt-2">
                                                <IoMdSave className="me-1"/>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default EditBank