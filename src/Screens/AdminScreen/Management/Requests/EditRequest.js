import React, { useEffect, useState } from "react";
import { BiCard } from "react-icons/bi";
import { MdOutlineContacts, MdSave } from "react-icons/md";
import { ImPen } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRequest, editSingleRequest, getMerchantDetailsById } from "../../../../redux/actions/merchantAction";
import Footer from "../../../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment"
import { getHolidayDate } from "../../../../redux/actions/adminAction";
import { message } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { logger } from "../../../../util/util";
import CurrencyInput from 'react-currency-input-field';



const AdminEditRequest = ({ token }) => {
  const { id } = useParams()
  const [req_Details, setReqDetails] = useState({
    req_ID: "",
    charge_type: "",
    req_type: "",
    withreturn: "",
    pickup_address: "",
    deposite_address: "",
    pickup_add_id: "",
    deposit_add_id: "",
  });
  const [extracharge, setextracharge] = useState();
  const [show, setShow] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [accept, setAccept] = useState()
  const [acceptextracharge, setAcceptExtracharges] = useState(0)
  const [sign, setSign] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const [checkLimit, setChecklimit] = useState(0)
  const [no_of_bags, setNoOfBags] = useState(1);
  const [bags, setBags] = useState([
    {
      bag_ID: "",
      cash_amount: 0,
      cheque_amount: 0,
      coins_amount: 0,
      bar_code: "",
      subtotal: 0,
    },
  ]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getSingleRequest(id, token))
  }, [dispatch, token, id]);

  logger("selectedDay State", selectedDay)

  const { singlerequest } = useSelector((state) => state.singlerequeststore)
  logger("singlerequest in edit", singlerequest);
  const { merchantDetails } = useSelector((state) => state.merchantDetails)
  logger("merchant Details", merchantDetails)
  const { holidayDatesLists } = useSelector((state) => state.holidayDatesList);

  const ID = singlerequest && singlerequest.merchant._id;
  const phone = merchantDetails && merchantDetails.phone;
  const zone = merchantDetails && merchantDetails.zone;
  const business_name = merchantDetails && merchantDetails.business_name;
  const service_type = merchantDetails && merchantDetails.service_type;
  const maxLimit = merchantDetails && merchantDetails.maxLimit;
  const weekly_service = merchantDetails && merchantDetails.weekly_service;
  const holiday_services = merchantDetails && merchantDetails.holiday_services;
  const type = merchantDetails && merchantDetails.type;
  const selected_banks = merchantDetails && merchantDetails.selected_banks
  const address = merchantDetails && merchantDetails.address



  const isHoliday = (dateone) => {
    if (!holiday_services) {
      return holidayDatesLists && holidayDatesLists.some(
        (holiday) =>
          moment(holiday.date).format("YYYY-MM-DD") ===
          moment(dateone).format("YYYY-MM-DD")
      );
    }
  };


  useEffect(() => {
    dispatch(getHolidayDate(token));
    dispatch(getMerchantDetailsById(singlerequest && singlerequest.merchant._id, token))
  }, [dispatch, singlerequest, ID, token]);


  const onChangeHandler = (e) => {
    setReqDetails({ ...req_Details, [e.target.name]: e.target.value });
    if (e.target.value === "Pickup and Deposits(Night Deposits)" || e.target.value === "Bank to Bank(Bank runs)") {
      setReqDetails({ ...req_Details, withreturn: 'No', req_type: e.target.value })
    } else if (e.target.value === "Replenishments (Business to Bank or Bank to Business)") {
      setReqDetails({ ...req_Details, withreturn: 'Yes', req_type: e.target.value })
    }

    else {
      setReqDetails({ ...req_Details, [e.target.name]: e.target.value });
    }

  };

  const handleSignSelect = (event) => {
    if (event?.target?.value === "yes") {
      setShowCanvas(true)
    }
    else {
      setShowCanvas(false)
    }
    setSign(event?.target?.value);
  };

  const handleInput = (e, index) => {
    let newInputs = [...bags];
    if (e.target.name === "cash_amount") {
      newInputs[index].cash_amount = e.target.value.replace(/[^0-9.]/g, "");
    } else if (e.target.name === "coins_amount") {
      newInputs[index].coins_amount = e.target.value.replace(/[^0-9.]/g, "");
    } else if (e.target.name === "cheque_amount") {
      newInputs[index].cheque_amount = e.target.value.replace(/[^0-9.]/g, "");
    } else {
      newInputs[index][e.target.name] = e.target.value;
    }
    // newInputs[index][e.target.name] = e.target.value;
    // logger(" newInputs[index]", newInputs[index].cash_amount);

    setBags(newInputs);

    const subtotal = parseFloat(newInputs[index].cash_amount) + parseFloat(newInputs[index].cheque_amount) + parseFloat(newInputs[index].coins_amount);
    newInputs[index].subtotal = subtotal;

    const checklimit = newInputs.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.cash_amount || 0) + parseFloat(currentValue.coins_amount || 0), 0)

    // logger("checklimit", checklimit);
    if (checklimit > maxLimit) {
      if (e.target.name === "cash_amount" || e.target.name === "coins_amount") {
        setShow(true)
        let sub = checklimit - maxLimit;
        let pervalue = (sub * 10 / 100);
        setextracharge(pervalue)
        // logger("pervalue", pervalue);
        if (pervalue) {
          if (accept === true) {
            if (!accept) {
              logger("accept not here");
            } else {
              setAcceptExtracharges(pervalue)
            }
          }
        }
      }
      setChecklimit(checklimit)
      setGrandTotal(
        newInputs.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.cash_amount || 0) + parseFloat(currentValue.cheque_amount || 0) + parseFloat(currentValue.coins_amount || 0), 0)
      )
    }
  }

  // logger("grandTotal", grandTotal);
  const handleClose = () => {
    setAccept(false)
    setShow(false);
    setAcceptExtracharges(0)
  }

  const AcceptCondition = () => {
    setAccept(true)
    setShow(false)
    setAcceptExtracharges(extracharge)
  }

  const RejectCondtion = () => {
    setAccept(false)
    setShow(false)
    setAcceptExtracharges(0)
  }

  const handleSelect = (num) => {
    let newForms = [];
    for (let i = 0; i < num; i++) {
      newForms.push({
        bag_ID: "",
        cash_amount: 0,
        cheque_amount: 0,
        coins_amount: 0,
        bar_code: "",
        subtotal: 0,
      });
    }
    setBags(newForms);
    setNoOfBags(num);
    setGrandTotal(0)
  };
  logger("Weekly_Service from merchantdetails", weekly_service)

  // logger("bags", bags);
  const handleTimeSelection = (time) => {
    logger("Time ", time)
    const day = moment(time).format("dddd");
    logger("Day ", day)
    // logger("SelectedDay",selectedDay)
    setSelectedTime(time);
    // logger("day", moment(time).format("HH:MM:SS"));
    // const timeAsAMPM = time.toLocaleString('en-US', { hour24: true });
    const timeAsAMPM = moment(time).format("HH:MM:SS");
    // logger("timeAsAMPM", timeAsAMPM);
    if (selectedDay === day) {
      logger("check condition")
      logger("inside condition selectedDay", selectedDay)
      const servicesForDay = weekly_service && weekly_service.find(
        (dayItem) => dayItem.day_type === selectedDay
      ).services;
      logger("servicesForDay", servicesForDay);
      const servicesAtTime = servicesForDay && servicesForDay.filter(
        (service) => timeAsAMPM >= service.start && timeAsAMPM <= service.end
      );
      logger("servicesAtTime", servicesAtTime);
      setAvailableServices(servicesAtTime);
      logger("availableServices", availableServices);
    }
    else {
      setAvailableServices("");
      logger("availableServices", availableServices);
    }
  };

  useEffect(() => {
    if (singlerequest) {
      setReqDetails({
        ...singlerequest,
        req_ID: singlerequest.req_ID,
        charge_type: singlerequest.charge_type,
        req_type: singlerequest.req_type,
        withreturn: singlerequest.withreturn,
        pickup_address: singlerequest.pickup_address,
        deposit_add_id: singlerequest.deposit_add_id._id,
      })
      setSelectedDay(moment(singlerequest.pickup_datetime).format("dddd"))
      setSelectedTime(moment(singlerequest.pickup_datetime).toDate())
      setNoOfBags(singlerequest.no_of_bags)
      setBags(singlerequest.bags)
      setSign(singlerequest.signature)
      setGrandTotal(singlerequest.grandTotal)
    }
  }, [singlerequest])


  useEffect(() => {
    if (selectedDay && weekly_service) {
      handleTimeSelection(moment(singlerequest && singlerequest.pickup_datetime).toDate());
    }
  }, [selectedDay, weekly_service]);

  useEffect(() => {
    if (sign === "yes") {
      setShowCanvas(true)
    }
    else {
      setShowCanvas(false)
    }
  }, [sign]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      req_ID: req_Details.req_ID,
      charge_type: availableServices[0].name,
      rate: availableServices[0].price,
      extraRate: acceptextracharge,
      req_type: req_Details.req_type,
      pickup_datetime: moment(selectedTime).format("YYYY-MM-DD,hh:mm A"),
      withreturn: req_Details.withreturn,
      pickup_address: req_Details.pickup_address,
      deposit_add_id: req_Details.deposit_add_id,
      no_of_bags,
      bags,
      grandTotal,
      zone,
      phone,
      business_name,
      merchant: ID,
      signature: sign,
      customer_type: type
    };
  
    if (checkLimit > maxLimit && accept === true) {
      dispatch(editSingleRequest(id, formData, token, navigate));
      // dispatch(addNotification(obj, token, navigate))
    } else if (checkLimit > maxLimit && accept === false) {

      return message.error({
        content: "kindly accept the terms and conditions otherwise Reduce cash and coins Amount",
        duration: 2,
      });
    } else {
      dispatch(editSingleRequest(id, formData, token, navigate));
      // dispatch(addNotification(obj, token, navigate))
    }
  };

  logger("singlereques ||||||||t", req_Details)

  return (
    <>
      <div className="content-page position-relative" id="content">
        <div className="content">
          <div className="content">
            <div className="container-fluid">
              <div className="row mt-3">
                <div className="col-lg-12 col-xl-12">
                  <div className="card-box">
                    <div className="tab-content pt-0">
                      <div className="tab-pane mt-3 show active" id="change_pwd"
                      >
                        <form
                          method="post"
                          encType="multipart/form-data"
                          onSubmit={submitHandler}
                          style={{ marginBottom: "90px" }}
                        >
                          <h6 className="mb-4 text-uppercase fw-bold">
                            <BiCard size={18} className="me-1" />
                            Edit Request
                          </h6>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  #ID (Auto Generate)
                                </label>
                                <input
                                  type="text"
                                  id="input-first-name"
                                  className="form-control"
                                  placeholder="Write here..."
                                  name="req_ID"
                                  value={req_Details.req_ID}
                                  onChange={onChangeHandler}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-md-6  ">
                              <div className="form-group">

                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Service Type
                                </label>
                                <select
                                  className="form-control request-type-value form-select"
                                  name="req_type"
                                  onChange={onChangeHandler}
                                  value={req_Details.req_type}
                                >
                                  <option value="">Select Request Type</option>
                                  {service_type && service_type.map((item, i) => (
                                    <option key={i} value={item}>
                                      {item}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="col-md-6 mt-2">
                              <div className="form-control-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  <span id="location-type">Pickup</span>- Date
                                  Time Schedule
                                </label>

                                <select
                                  className="form-control"
                                  value={selectedDay}
                                  onChange={(e) =>
                                    setSelectedDay(e.target.value)
                                  }
                                >
                                  <option value="">Select a day</option>
                                  {weekly_service && weekly_service.map((day) => (
                                    <option
                                      key={day.day_type}
                                      value={day.day_type}
                                    >
                                      {day.day_type}
                                    </option>
                                  ))}
                                </select>
                                {selectedDay && (
                                  <>
                                    <DatePicker
                                      className="form-control mt-2"

                                      filterDate={date => !isHoliday(date)}
                                      selected={selectedTime}
                                      onChange={(date) =>
                                        handleTimeSelection(date)
                                      }
                                      showTimeSelect
                                      dateFormat="Pp"
                                    />
                                    {availableServices && availableServices.length > 0 ? (
                                      <div>
                                        <ul>
                                          {availableServices && availableServices.map(
                                            (service, i) => (
                                              <span
                                                key={i}
                                                className="text-primary sign-msg-charge "
                                              >
                                                Service: {service.name} &nbsp;
                                                Applicable charges: $
                                                {service.price}/-
                                              </span>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    ) : (
                                      <p>
                                        No services available at selected time.
                                      </p>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6 mt-2">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  With Return
                                </label>
                                <p className="form-control form-select"> {req_Details.withreturn}</p>
                              </div>
                            </div>

                            <div className="col-md-12 mt-2">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Choose Pickup Address
                                </label>
                                <select
                                  className="form-control form-select"
                                  value={req_Details.pickup_address}
                                  name="pickup_address"
                                  onChange={onChangeHandler}
                                >
                                  <option value="">
                                    --- Select Pickup Address ---
                                  </option>
                                  <option value={address}>
                                    Office - {address}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-12 mt-2">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Choose Deposit Address
                                </label>
                                <select
                                  className="form-control form-select"
                                  value={req_Details.deposit_add_id}
                                  name="deposit_add_id"
                                  onChange={onChangeHandler}
                                >
                                  <option value="">
                                    --- Select Deposit Address ---
                                  </option>
                                  {selected_banks &&
                                    selected_banks.map((add, i) => (
                                      <option key={add._id} value={add._id}>
                                        Bank {i + 1} - {add.bank_name},
                                        {add.bank_address}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-12 mt-3">
                              <h6 className="mb-2 text-uppercase fw-bold">
                                <MdOutlineContacts size={18} className="me-2" />
                                Bag Information
                              </h6>
                            </div>

                            <div className="col-md-2 mt-2">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Number of Bags
                                </label>
                                <select
                                  className="form-control num-bags form-select"
                                  value={no_of_bags}
                                  onChange={(e) => handleSelect(e.target.value)}
                                >
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div id="bogs-box">
                            {bags &&
                              bags.map((bag, i) => (
                                <div className="row mt-2" key={i}>
                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label className="form-control-label">
                                        Bag#ID
                                      </label>
                                      <input
                                        type="text"
                                        name="bag_ID"
                                        className="form-control"
                                        value={bag.bag_ID}
                                        onChange={(e) => handleInput(e, i)}
                                        placeholder="Write here..."
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label>Cash Amount</label>
                                      <CurrencyInput
                                        id="input-example"
                                        name="cash_amount"
                                        prefix="$"
                                        className="my-input form-control"
                                        placeholder="Write here..."
                                        onChange={(e) => handleInput(e, i)}
                                        value={bag.cash_amount}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label>Cheque Amount</label>
                                      <CurrencyInput
                                        id="input-example"
                                        name="cheque_amount"
                                        prefix="$"
                                        className="my-input form-control"
                                        placeholder="Write here..."
                                        onChange={(e) => handleInput(e, i)}
                                        value={bag.cheque_amount}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label>Coins Amount</label>
                                      <CurrencyInput
                                        id="input-example"
                                        name="coins_amount"
                                        prefix="$"
                                        className="my-input form-control"
                                        placeholder="Write here..."
                                        onChange={(e) => handleInput(e, i)}
                                        value={bag.coins_amount}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label className="form-control-label">
                                        Bar Code
                                      </label>
                                      <input
                                        type="text"
                                        name="bar_code"
                                        className="form-control"
                                        value={bag.bar_code}
                                        onChange={(e) => handleInput(e, i)}
                                        placeholder="Write here..."
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label>Sub Total</label>
                                      <div className="form-control d-flex" >
                                        <span class="prefix">$ </span>
                                        <text style={{ border: 'none', width: 120, outline: 'none' }}>{(bag.subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</text>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>

                          <div className="form-group flex-row mt-3">
                            <label className=" text-uppercase fw-bold">
                              Grand Total : <span class="prefix">$</span> {grandTotal && grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </label>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header
                                closeButton
                              >
                                <Modal.Title className="fs-6 text-dark">Accept terms & Conditions</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <form className="px-3"
                                // onSubmit={submitHandler}
                                >
                                  <h6>you need to pay extracharge {extracharge} </h6>

                                  <div className="form-group text-center mt-3">
                                    <Button
                                      variant="primary"
                                      type="button"
                                      className="me-2"
                                      onClick={AcceptCondition}
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      variant="primary"
                                      type="button"
                                      onClick={RejectCondtion}
                                    >
                                      Reject
                                    </Button>
                                  </div>
                                </form>

                              </Modal.Body>
                            </Modal>
                          </div>

                          <div className="row">
                            <div className="col-sm-12 mt-3">
                              <h6 className="mb-2 text-uppercase fw-bold">
                                <ImPen size={15} className="me-2" />
                                Mandatory Acknowledgements
                              </h6>
                            </div>
                            <div className="col-md-6 mt-2">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Require Signature?
                                </label>
                                <select
                                  onChange={handleSignSelect}
                                  className="form-control change-sign"
                                  value={sign}
                                  disabled
                                >
                                  <option value="">Select</option>
                                  <option value="no">No</option>
                                  <option value="yes">Yes</option>
                                </select>
                                {/* {showCanvas && (
                                  <span
                                    className="text-primary sign-msg"
                                    style={{ fontSize: "15px" }}
                                  >
                                    <ImPen size={12} className="me-2" />
                                    It's mandatory to ask image and Signature.
                                  </span>
                                )} */}
                                {/* {showCanvas && (
                                  <div
                                    className="mt-3"
                                    style={{ border: "1px solid black" }}
                                  >
                                    <SignatureCanvas
                                      penColor="black"
                                      ref={canvasRef}
                                      canvasProps={{
                                        width: 500,
                                        height: 200,
                                        className: "sigCanvas",
                                      }}
                                      onEnd={handleSave}
                                    />

                                    <button type="button" onClick={clearSignature}>
                                      Clear Signature
                                    </button>
                                  
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </div>

                          <div className="text-start mt-2">
                            <button
                              type="submit"
                              className="btn btn-success waves-effect waves-light mt-2"
                            >
                              <MdSave size={18} className="me-1" />
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
  );
};

export default AdminEditRequest;