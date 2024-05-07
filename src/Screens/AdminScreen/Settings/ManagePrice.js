import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../../components/Footer/Footer'
import { getPrice } from '../../../redux/actions/adminAction'

const ManagePrice = ({token}) => {
    const dispatch =useDispatch()

    useEffect(() => {
        dispatch(getPrice(token))
    }, [dispatch,token])

   
    return (
        <>

            <div className="content-page position-relative" id="content">
                <div className="content">
                    <div className="row">
                        <div className="col-xl-12 order-xl-1 order-2 mt-2">
                            <div className="card mb-2">
                                <div className="card-body pt-2 pb-2">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <h5 className="">Manage Price</h5>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="text-lg-right mt-3 mt-lg-0">
                                                {/* <!-- <button type="button" className="btn btn-danger waves-effect waves-light" data-toggle="modal" data-target="#custom-modal"><i className="mdi mdi-plus-circle mr-1"></i> Add New</button> --> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-box mb-1 pb-0 pt-2">
                                <div className="row align-items-center">
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            <h5 style={{ marginLeft: "50px" }}>Monday</h5>

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control" disabled>
                                    <option value="">Monday</option>
                                    <option value="">Tuesday</option>
                                    <option value="">Wednesday</option>
                                    <option value="">Thursday</option>
                                    <option value="">Friday</option>
                                    <option value="">Saturday</option>
                                    <option value="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Select Type</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Amount</label>
                                            <input type="text" 
                                            className="form-control" 
                                            defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Start Time</label>
                                            <input type="time" 
                                            className="form-control" 
                                            defaultValue="08:00" 
                                            placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>End Time</label>
                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control" disabled>
                                    <option value="">Monday</option>
                                    <option value="">Tuesday</option>
                                    <option value="">Wednesday</option>
                                    <option value="">Thursday</option>
                                    <option value="">Friday</option>
                                    <option value="">Saturday</option>
                                    <option value="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="" selected>Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="text" className="form-control" defaultValue="350"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="23:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 ">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 ">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 text-right"></div>

                                </div>
                            </div>
                            <div className="card-box mb-1 pb-0 pt-2">
                                <div className="row align-items-center">
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            <h5 style={{ marginLeft: "50px" }}>Tuesday</h5>

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="" selected>Tuesday</option>
                                    <option defaultValue="">Wednesday</option>
                                    <option defaultValue="">Thursday</option>
                                    <option defaultValue="">Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Select Type</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Amount</label>
                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Start Time</label>
                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>End Time</label>
                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>



                                    <div className="col-lg-11 text-right"></div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control" disabled>
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="">Wednesday</option>
                                    <option defaultValue="">Thursday</option>
                                    <option defaultValue="">Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="" selected>Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="text" className="form-control" defaultValue="350"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="23:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 ">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 ">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 text-right"></div>
                                    <div className="col-lg-11 text-right"></div>

                                </div>
                            </div>
                            <div className="card-box mb-1 pb-0 pt-2">
                                <div className="row align-items-center">
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            <h5 style={{ marginLeft: "50px" }}>Wednesday</h5>
                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="" selected>Wednesday</option>
                                    <option defaultValue="">Thursday</option>
                                    <option defaultValue="">Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Select Type</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Amount</label>
                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Start Time</label>
                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>End Time</label>
                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="" selected>Wednesday</option>
                                    <option defaultValue="">Thursday</option>
                                    <option defaultValue="">Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 text-right"></div>

                                </div>
                            </div>
                            <div className="card-box mb-1 pb-0 pt-2">
                                <div className="row align-items-center">
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            <h5 style={{ marginLeft: "50px" }}>Thursday</h5>
                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="">Wednesday</option>
                                    <option defaultValue="" selected>Thursday</option>
                                    <option defaultValue="">Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Select Type</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Amount</label>
                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Start Time</label>
                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>End Time</label>
                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="">Wednesday</option>
                                    <option defaultValue="" selected>Thursday</option>
                                    <option defaultValue="">Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 text-right"></div>

                                </div>
                            </div>
                            <div className="card-box mb-1 pb-0 pt-2">
                                <div className="row align-items-center">
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            <h5 style={{ marginLeft: "50px" }}>Friday</h5>
                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="">Wednesday</option>
                                    <option defaultValue="">Thursday</option>
                                    <option defaultValue="" selected>Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Select Type</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Amount</label>
                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Start Time</label>
                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>End Time</label>
                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="">Wednesday</option>
                                    <option defaultValue="">Thursday</option>
                                    <option defaultValue="" selected>Friday</option>
                                    <option defaultValue="">Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="">Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 text-right"></div>

                                </div>
                            </div>
                            <div className="card-box mb-1 pb-0 pt-2">
                                <div className="row align-items-center">
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            <h5 style={{ marginLeft: "50px" }}>Saturday</h5>
                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option defaultValue="">Monday</option>
                                    <option defaultValue="">Tuesday</option>
                                    <option defaultValue="">Wednesday</option>
                                    <option defaultValue="">Thursday</option>
                                    <option defaultValue="">Friday</option>
                                    <option defaultValue="" selected>Saturday</option>
                                    <option defaultValue="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Select Type</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="" selected>Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Amount</label>
                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Start Time</label>
                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>End Time</label>
                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            {/*                         
                        <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option value="">Monday</option>
                                    <option value="">Tuesday</option>
                                    <option value="">Wednesday</option>
                                    <option value="">Thursday</option>
                                    <option value="">Friday</option>
                                    <option value="" selected>Saturday</option>
                                    <option value="">Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="" selected>Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 text-right"></div>

                                </div>
                            </div>

                            <div className="card-box mb-1 pb-0 pt-2">
                                <div className="row align-items-center">
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}
                                            <h5 style={{ marginLeft: "50px" }}>Sunday</h5>
                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option value="">Monday</option>
                                    <option value="">Tuesday</option>
                                    <option value="">Wednesday</option>
                                    <option value="">Thursday</option>
                                    <option value="">Friday</option>
                                    <option value="">Saturday</option>
                                    <option value="" selected>Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Select Type</label>
                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="" selected>Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Amount</label>
                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>Start Time</label>
                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            <label>End Time</label>
                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success text-white form-control" value="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">
                                            {/* <label style={{visibility: '0'}}>Select Day</label> */}

                                            {/* <!-- <label>Select Day</label>
                                <select name="" id="" className="form-control">
                                    <option value="">Monday</option>
                                    <option value="">Tuesday</option>
                                    <option value="">Wednesday</option>
                                    <option value="">Thursday</option>
                                    <option value="">Friday</option>
                                    <option value="">Saturday</option>
                                    <option value="" selected>Sunday</option>
                                </select> --> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <select name="" id="" className="form-control">
                                                <option defaultValue="">Normal</option>
                                                <option defaultValue="" selected>Premium</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="text" className="form-control" defaultValue="250"
                                                // onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                                placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="08:00" placeholder="Write here..." />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="form-group mb-3">

                                            <input type="time" className="form-control" defaultValue="20:00" placeholder="Write here..." />
                                        </div>
                                    </div>

                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <input type="button" className="btn btn-success form-control text-white" defaultValue="Save" />
                                        </div>
                                    </div>
                                    <div className="col-lg-1 mt-3">
                                        <div className="form-group mb-3">
                                            <button type="button" style={{ padding: "0" }} className="btn btn-danger form-control" name="button"> Disable </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-11 text-right"></div>

                                </div>
                            </div>

                        </div>

                    </div>



                </div>

             <Footer/>

            </div>
        </>
    )
}

export default ManagePrice