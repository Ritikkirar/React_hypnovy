import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../../../components/Footer/Footer';
import { addBank, getBanks, deleteBank } from '../../../../redux/actions/adminAction'
import swal from 'sweetalert'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputMask from 'react-input-mask';
import NoData from '../../../../images/no-data.jpg'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { logger } from '../../../../util/util';

const MasterBanks = ({ token }) => {
    const [show, setShow] = useState(false);
    const [bank_name, setBankName] = useState('')
    const [bank_address, setBankAddress] = useState('')
    const [contact_person, setContactPerson] = useState('')
    const [bank_phone, setBankPhone] = useState('')

    const { banksList } = useSelector(state => state.bankList)

    logger("banksList", banksList);

    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        dispatch(getBanks(token))
    }, [dispatch, token])


    const submitHandler = (e) => {
        e.preventDefault()
        let reqObj = {
            bank_name: bank_name,
            bank_address: bank_address,
            bank_phone: bank_phone,
            contact_person: contact_person
        }
        dispatch(addBank(reqObj, token))
        handleClose()
        setBankName('')
        setBankAddress('')
        setContactPerson('')
        setBankPhone('')
    }

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(deleteBank(id, token))

                    swal("Poof! Bank has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Bank Details are safe!");
                }
            })
    }

    const OnChangeHandle = (newPhoneValue) => {
        logger("newPhoneValue", newPhoneValue.target.value)
        const formattedPhoneNumber = newPhoneValue.target.value
        const unformattedPhoneNumber = formattedPhoneNumber.replace(/\D/g, '');
        logger("unformattedPhoneNumber", unformattedPhoneNumber)
        setBankPhone(unformattedPhoneNumber);
    };



    return (
        <div className="content-page position-relative" id="content">
            <div className="content">
                <div className="row" style={{ marginBottom: "65px" }}>
                    <div className="col-xl-12 order-xl-1 order-2 mt-2">
                        <div className=" mb-2">
                            <div className="pt-2 pb-2">
                                <div className="row my-1">
                                    <div className="col-lg-7">
                                        {/* <h5 className="page-title">Add Master Banks</h5> */}
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="input-group-prepend float-end">
                                            <button type="button"
                                                className="btn btn-success py-2 px-4"
                                                onClick={handleShow}
                                                style={{ fontSize: '0.875rem' }}
                                            >
                                                Add New
                                            </button>
                                        </div>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title className="fs-5 ms-3">Add Bank</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form className="px-3" onSubmit={submitHandler}>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="bankname" className="form-control-label mb-2 fw-bold">Bank Name</label>
                                                        <input type='text'
                                                            id="bankname"
                                                            placeholder='Type Bank Name'
                                                            className='form-control route-name'
                                                            onChange={(e) => setBankName(e.target.value)}
                                                            name='bank_name'
                                                            value={bank_name}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="address" className='form-control-label mb-2 fw-bold'>Address</label>
                                                        <input className="form-control route-name"
                                                            type="text"
                                                            id="address"
                                                            name="bank_address"
                                                            value={bank_address}
                                                            onChange={(e) => setBankAddress(e.target.value)}
                                                            placeholder="Enter Address"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="contact" className='form-control-label mb-2 fw-bold'>Contact Person</label>
                                                        <input className="form-control route-name"
                                                            type="text"
                                                            id="contact"
                                                            name="contact_person"
                                                            value={contact_person}
                                                            onChange={(e) => setContactPerson(e.target.value)}
                                                            placeholder="Enter Contact Person"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group mb-3">
                                                        <label htmlFor="phone" className='form-control-label mb-2 fw-bold'>Phone Number</label>
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

                                                    <div className="form-group text-center mt-3">
                                                        <Button
                                                            variant="primary"
                                                            type="submit"
                                                            style={{ padding: '8px 25px' }}
                                                        >
                                                            Create
                                                        </Button>
                                                    </div>

                                                </form>
                                            </Modal.Body>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body pt-2 pb-2">
                                <div className="row my-1">
                                    <div className='box-div'>
                                        <h5 className="page-title mt-3 mb-4">Master Banks</h5>
                                        {banksList && banksList.length > 0 ? (
                                            <div className='table-responsive'>
                                                <table id="" className="table table-striped border-top banks_table mb-5">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Bank Name</th>
                                                            <th>Address</th>
                                                            <th>Contact Person</th>
                                                            <th>Phone Number</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {banksList && banksList.map((item, i) => {
                                                            return (
                                                                <tr key={item._id}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{item.bank_name}</td>
                                                                    <td style={{ width: '40%' }}>{item.bank_address}</td>
                                                                    <td>{item.contact_person}</td>
                                                                    <td>{'+1' + item.bank_phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</td>
                                                                    <td>
                                                                        <div className="dropdown option-menu">

                                                                            <BsThreeDots id="dropdownMenuButton1"
                                                                                className="dropdown-toggle"
                                                                                data-bs-toggle="dropdown"
                                                                                aria-expanded="false"
                                                                            />

                                                                            <div className="dropdown-menu border-0" aria-labelledby="dropdownMenuButton1"
                                                                                style={{ boxShadow: "0px 0px 15px -5px grey" }}>
                                                                                <Link
                                                                                    className="dropdown-item"
                                                                                    to={"/admin/bank/editBank/" + item._id}
                                                                                    style={{ color: "#676868" }}
                                                                                >
                                                                                    Edit
                                                                                </Link>
                                                                                <Link
                                                                                    className="dropdown-item"
                                                                                    to="#"
                                                                                    style={{ color: "#676868" }}
                                                                                    onClick={() => handleDelete(item._id)}
                                                                                >
                                                                                    Delete
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        {/* <AiFillDelete size={20}
                                                                            className='text-danger'
                                                                            onClick={() => handleDelete(item._id)}
                                                                        />
                                                                        <Link to={"/admin/bank/editBank/" + item._id}>
                                                                            <AiFillEdit size={20}
                                                                                className='text-primary'
                                                                                />
                                                                        </Link> */}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>

                                                </table>
                                            </div>
                                        ) : (
                                            <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                                                <img src={NoData} alt='no result'
                                                    className='img-responsive'
                                                    style={{ height: '200px' }}
                                                />
                                                <h5 style={{ fontWeight: '700', color: '#f2425f' }}
                                                    className='mb-5'>
                                                    No Data Found
                                                </h5>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default MasterBanks