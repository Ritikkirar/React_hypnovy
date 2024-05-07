import React, { useEffect, useState } from "react";
import { BiCard } from "react-icons/bi";
import { MdOutlineContacts, MdSave } from "react-icons/md";
import { ImPen } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequest,
  getMerchantDetailsById,
} from "../../../redux/actions/merchantAction";
import Footer from "../../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { generateUniqueNumber, logger } from "../../../util/util";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { getHolidayDate } from "../../../redux/actions/adminAction";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { message } from "antd";
import CurrencyInput from 'react-currency-input-field';


const CreateRequest = ({ ID, token }) => {

  const [req_Details, setReqDetails] = useState({
    req_ID: generateUniqueNumber(8),
    charge_type: "",
    req_type: "",
    withreturn: "",
    pickup_address: "",
    deposit_add_id: "",
  });

  const [showCanvas, setShowCanvas] = useState(false);
  const [show, setShow] = useState(false);
  const [extracharge, setextracharge] = useState(0);
  const [accept, setAccept] = useState();
  const [acceptextracharge, setAcceptExtracharges] = useState(0);
  const [sign, setSign] = useState("yes");
  const [insur, setInsur] = useState();
  const [insvalue, setInsvalue] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0);
  const [checkLimit, setChecklimit] = useState(0);
  const [sign_name, setsign_name] = useState();
  const [no_of_bags, setNoOfBags] = useState(1);
  const [bags, setBags] = useState([
    {
      bag_ID: "",
      cash_amount: "",
      cheque_amount: "",
      coins_amount: "",
      bar_code: "",
      subtotal: 0,
    },
  ]);
  logger("bags", bags);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { holidayDatesLists } = useSelector((state) => state.holidayDatesList);


  useEffect(() => {
    dispatch(getHolidayDate(token));
    dispatch(getMerchantDetailsById(ID, token));
  }, [dispatch, token, ID]);

  const { merchantDetails } = useSelector((state) => state.merchantDetails);
  logger("merchantDetails", merchantDetails);
  const phone = merchantDetails && merchantDetails.phone;
  const zone = merchantDetails && merchantDetails.zone;
  const business_name = merchantDetails && merchantDetails.business_name;
  const maxLimit = merchantDetails && merchantDetails.maxLimit;
  const weekly_service = merchantDetails && merchantDetails.weekly_service;
  const holiday_services = merchantDetails && merchantDetails.holiday_services;
  const type = merchantDetails && merchantDetails.type;
  const adminID = merchantDetails && merchantDetails.adminID;
  const selected_banks = merchantDetails && merchantDetails.selected_banks
  const address = merchantDetails && merchantDetails.address


  const isHoliday = (dateone) => {
    if (!holiday_services) {
      return (
        holidayDatesLists &&
        holidayDatesLists.some(
          (holiday) => holiday.date === moment(dateone).format("DD-MM-YYYY")
        )
      );
    }
  };

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
  }

  logger("req_Details,", req_Details);

  const handleSignSelect = (event) => {
    const selectedValue = event.target.value;
    setInsur(event.target.value);
    if (selectedValue === "Yes") {
      setShowCanvas(true);
      setInsvalue(grandTotal * 0.08 / 100)

      // setGrandTotal(grandTotal + insvalue)

    } else {
      setShowCanvas(false);
      setInsvalue(0)
    }
  };


  const handleInput = (e, index) => {

    if (
      !availableServices[0]?.price &&
      (e.target.name === "cash_amount" || e.target.name === "coins_amount")
    ) {
      return message.error({
        content: "Kindly Select the Pickup Date time Schedule",
        duration: 2,
      });
      // return
    } else {
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
      setBags(newInputs);
      const subtotal =
        parseFloat(newInputs[index].cash_amount.split(",").join("") || 0) +
        parseFloat(newInputs[index].cheque_amount.split(",").join("") || 0) +
        parseFloat(newInputs[index].coins_amount.split(",").join("") || 0);
      newInputs[index].subtotal = subtotal;
      const checklimit = newInputs.reduce(
        (accumulator, currentValue) =>
          accumulator +
          parseFloat(currentValue.cash_amount.split(",").join("") || 0 || 0) +
          parseFloat(currentValue.coins_amount.split(",").join("") || 0),
        0
      );
      setChecklimit(checklimit);
      if (checklimit > maxLimit) {
        if (
          e.target.name === "cash_amount" ||
          e.target.name === "coins_amount"
        ) {
          let sub = checklimit - maxLimit;
          let pervalueone = (sub / maxLimit) * 100;
          if (pervalueone <= 10) {
            logger("you can make request");
          } else {
            let setfinalextrarate =
              (pervalueone / 100) * availableServices[0].price;
            logger("setfinalextrarate", setfinalextrarate);
            setextracharge(setfinalextrarate.toFixed(2));
            setShow(true);
            if (setfinalextrarate) {
              if (accept === true) {
                if (!accept) {
                  logger("accept not here");
                } else {
                  setAcceptExtracharges(setfinalextrarate.toFixed(2));
                }
              }
            }
          }
        }
      }
      setGrandTotal(
        newInputs.reduce(
          (accumulator, currentValue) =>
            accumulator +
            parseFloat(currentValue.cash_amount.split(",").join("") || 0) +
            parseFloat(currentValue.cheque_amount.split(",").join("") || 0) +
            parseFloat(currentValue.coins_amount.split(",").join("") || 0),
          0
        )
      );
    }
  };

  const handleClose = () => {
    setAccept(false);
    setShow(false);
    setAcceptExtracharges(0);
  };

  const AcceptCondition = () => {
    setAccept(true);
    setShow(false);
    setAcceptExtracharges(extracharge);
  };

  const RejectCondtion = () => {
    setAccept(false);
    setShow(false);
    setAcceptExtracharges(0);
  };

  const handleSelect = (num) => {
    let newForms = [];
    for (let i = 0; i < num; i++) {
      newForms.push({
        bag_ID: "",
        cash_amount: "",
        cheque_amount: "",
        coins_amount: "",
        bar_code: "",
        subtotal: 0,
      });
    }
    setBags(newForms);
    setNoOfBags(num);
    setGrandTotal(0);
  };


  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() + (60 * 60 * 1000) < selectedDate.getTime();
  };


  const handleTimeSelection = (time) => {
    const day = moment(time).format("dddd");
    setSelectedTime(time);
    logger("Time", time);
    logger("day", day);
    // const timeAsAMPM = time.toLocaleString('en-US', { hour24: true });
    const timeAsAMPM = moment(time).format("HH:MM:SS");
    logger("timeAsAMPM", timeAsAMPM);
    if (selectedDay === day) {
      const servicesForDay = weekly_service.find(
        (day) => day.day_type === selectedDay
      ).services;
      logger("servicesForDay", servicesForDay);
      const servicesAtTime = servicesForDay.filter(
        (service) => timeAsAMPM >= service.start && timeAsAMPM <= service.end
      );
      logger("servicesAtTime", servicesAtTime);
      setAvailableServices(servicesAtTime);
    } else {
      setAvailableServices("");
    }
  };


  // Sort the data according to weekdays
  const sortedData = merchantDetails && weekly_service.sort((a, b) => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekdays.indexOf(a.day_type) - weekdays.indexOf(b.day_type);
  });

  logger("Sorted Data", sortedData)

  const submitHandler = (e) => {
    try {
      e.preventDefault();
      let bags1 = bags.map((obj) => {
        var { bag_ID,
          cash_amount,
          cheque_amount,
          coins_amount,
          bar_code,
          subtotal } = obj;

        const cash_amount1 = parseFloat(cash_amount?.split(','));
        const cheque_amount1 = parseFloat(cheque_amount?.split(','))
        const coins_amount1 = parseFloat(coins_amount?.split(','))

        return { bag_ID, cash_amount: cash_amount1, cheque_amount: cheque_amount1, coins_amount: coins_amount1, bar_code, subtotal }

      })
      logger("req_Details.deposit_add_id", req_Details.deposit_add_id);
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
        bags: bags1,
        grandTotal,
        zone: zone._id,
        phone,
        business_name,
        merchant: ID,
        signature: sign,
        customer_type: type,
        signatory_name: sign_name,
        insurance: insvalue
      };

      logger("formData", formData);
      const obj = {
        ID,
        adminID,
        req_ID: req_Details.req_ID,
        business_name
      };
      if (
        (checkLimit > maxLimit && accept === true) ||
        (checkLimit < maxLimit && accept === false)
      ) {
        dispatch(addRequest(formData, token, navigate, obj));

      } else if (checkLimit > maxLimit && accept === false) {
        return message.error({
          content:
            "Kindly Accept the Terms and Conditions otherwise Reduce Cash and Coins Amount",
          duration: 2,
        });
      } else {
        dispatch(addRequest(formData, token, navigate, obj));

      }

    } catch (error) {
      logger("error", error)
    }

  };


  const handleDayChange = (dayType) => {
    const currentDate = moment().startOf('day');
    let firstDate = currentDate.clone().day(dayType);
    while (currentDate.isAfter(firstDate, 'day') || isHoliday(firstDate)) {
      firstDate = firstDate.add(7, 'days');
    }
    setSelectedTime(firstDate.toDate());
  };

  const getContractedTime = () => {
    const today = moment()
    const dayName = today.format('dddd');
    console.log("dayName", dayName);
    const contractTime = merchantDetails && merchantDetails.weekly_service.find((day) => {
      return day.day_type === dayName;
    })
    
    if (contractTime && contractTime.services[0]) {
      const service1 = contractTime.services[0];
      const service2 = contractTime.services[1];

      const services = [];

      services.push(`${service1.name} - ${moment(service1.start, 'HH:mm').format('hA')} to ${moment(service1.end, 'HH:mm').format('hA')}`);

      if (service2) {
        services.push(`${service2.name} - ${moment(service2.start, 'HH:mm').format('hA')} to ${moment(service2.end, 'HH:mm').format('hA')}`);
      }

      return services.join(', ');
    } else {
      return 'No Service Available for Today';
    }
  }


  logger("Weekly_Services", weekly_service)
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
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-4 text-uppercase fw-bold">
                              <BiCard size={18} className="me-1" />
                              Create Request
                            </h6>
                            <p className="mb-4">
                              <b>Contracted Time : </b>
                              {getContractedTime()}
                            </p>
                          </div>


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
                                  // onChange={onChangeHandler}
                                  required
                                  disabled
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
                                  value={req_Details.req_type}
                                  required
                                  onChange={onChangeHandler}

                                >
                                  <option value="">Select Request Type</option>
                                  {merchantDetails && merchantDetails.service_type.map((item, i) => (
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
                                  required
                                  onChange={(e) => {
                                    setSelectedDay(e.target.value)
                                    handleDayChange(e.target.value)
                                  }}
                                >
                                  <option value="">Select a day</option>
                                  {merchantDetails && merchantDetails.weekly_service.map((day) => (
                                    <option
                                      key={day.day_type}
                                      value={day.day_type}
                                    >
                                      {day.day_type}&nbsp;(
                                      {day.services.map((service, index) => (
                                        <span key={index}>
                                          {`${service.name} - ${moment(service.start, 'HH:mm').format('hA')} to ${moment(service.end, 'HH:mm').format('hA')}`}
                                          {index < day.services.length - 1 ? ', ' : ''}
                                        </span>
                                      ))}
                                      )
                                    </option>
                                  ))}
                                </select>
                                {selectedDay && (
                                  <>
                                    <DatePicker
                                      className="form-control mt-2"
                                      filterDate={date => moment().isSameOrBefore(date, 'day') && !isHoliday(date)}
                                      filterTime={filterPassedTime}
                                      selected={selectedTime}
                                      timeIntervals={5}
                                      onChange={(date) =>
                                        handleTimeSelection(date)
                                      }
                                      excludeOut
                                      minTime={
                                        (date) => {
                                          let isToday = moment(date).isSame(moment(), 'day');
                                          if (isToday) {
                                            let nowAddOneHour = moment(new Date()).add({ hours: 1 }).toDate();
                                            return nowAddOneHour;
                                          }
                                          return moment().startOf('day').toDate()
                                        }
                                      } maxTime={moment().endOf('day').toDate()}
                                      minDate={moment().day(selectedDay).toDate()}
                                      showTimeSelect
                                      dateFormat="Pp"
                                      placeholderText="Select PickUp Date & Time"
                                    />
                                    {availableServices.length > 0 ? (
                                      <div>
                                        <ul>
                                          {availableServices.map(
                                            (service, i) => (
                                              <span
                                                key={i}
                                                className="text-primary sign-msg-charge "
                                              >
                                                Service: {service.name} &nbsp;
                                                {/* Applicable charges: $
                                                {service.price}/- */}
                                              </span>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    ) : (
                                      <p style={{ color: 'red' }}>
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
                                <input
                                  type="text"
                                  id="input-first-name"
                                  className="form-control"
                                  placeholder="Write here..."
                                  name="withreturn"
                                  value={req_Details.withreturn}
                                  // onChange={onChangeHandler}
                                  required
                                  disabled
                                />


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
                                  required
                                >
                                  <option value="">
                                    --- Select Pickup Address ---
                                  </option>
                                  <option value={address}>
                                    Office - {address}
                                  </option>



                                  {/* {pickupaddresslist &&
                                    pickupaddresslist.map((add, i) => (
                                      <option key={add._id} value={add._id}>
                                        Office {i + 1} - {add.address}
                                      </option>
                                    ))} */}
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
                                  required
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
                                        SEAL/BAG ID#
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

                                      <div className="form-control d-flex" >
                                        <span class="prefix">$</span>
                                        <CurrencyInput
                                          id="input-example"
                                          name="cash_amount"
                                          className="my-input"
                                          placeholder="Write here..."
                                          style={{ border: 'none', width: 120, outline: 'none' }}
                                          onChange={(e) => handleInput(e, i)}
                                          value={bag.cash_amount}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label>Cheque Amount</label>
                                      <div className="form-control d-flex" >
                                        <span class="prefix">$</span>


                                        <CurrencyInput
                                          id="input-example"
                                          name="cheque_amount"
                                          className="my-input"
                                          placeholder="Write here..."
                                          style={{ border: 'none', width: 120, outline: 'none' }}
                                          onChange={(e) => handleInput(e, i)}
                                          value={bag.cheque_amount}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label>Coins Amount</label>
                                      <div className="form-control d-flex" >
                                        <span class="prefix">$</span>
                                        <CurrencyInput
                                          id="input-example"
                                          name="coins_amount"
                                          className="my-input"
                                          placeholder="Write here..."
                                          style={{ border: 'none', width: 120, outline: 'none' }}
                                          onChange={(e) => handleInput(e, i)}
                                          value={bag.coins_amount}
                                        />
                                      </div>
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
                                        placeholder="Enter Bar Code..."
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-2 mt-2">
                                    <div className="form-group">
                                      <label>Sub Total</label>
                                      <div className="form-control d-flex" >
                                        <span class="prefix">$ </span>
                                        <CurrencyInput
                                          id="input-example"
                                          // name="coins_amount"
                                          className="my-input"
                                          placeholder="Write here..."
                                          style={{ border: 'none', width: 120, outline: 'none' }}
                                          disabled
                                          value={bag.subtotal}
                                        />
                                        {/* <text style={{ border: 'none', width: 120, outline: 'none' }}>{(bag.subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</text> */}
                                        {/* <input
                                        type="number"
                                        name="subtotal"
                                        style={{border:'none',width:120, outline: 'none'}}
                                        value={(bag.subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        // value={parseFloat(bag.cash_amount)+parseFloat(bag.cheque_amount)+parseFloat(bag.coins_amount)}
                                        onChange={(e) => handleInput(e, i)}
                                      
                                      /> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>

                          <div className="form-group flex-row mt-3">
                            <label className=" text-uppercase fw-bold">
                              Grand Total : <span class="prefix">$</span> {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </label>
                            {/* {checkLimit > maxLimit ? (
                          
                              <span
                                className="text-primary sign-msg"
                                style={{ fontSize: "15px" }}
                              >
                                <ImPen size={12} className="me-2" />
                                Its More than your limit Check our terms and
                                conditions.
                              </span>
                              
                            ) : (
                              grandTotal
                            )} */}
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header
                                closeButton
                              >
                                <Modal.Title className="fs-6 text-dark">Charge For Over Limit</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <form className="px-3"
                                // onSubmit={submitHandler}
                                >
                                  <h6>You Need to Pay Extra Charge ${extracharge.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </h6>
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
                                  // onChange={handleSignSelect}
                                  value={sign}
                                  className="form-control change-sign"
                                  disabled
                                >
                                  <option value="">Select</option>
                                  <option value="no">No</option>
                                  <option value="yes">Yes</option>
                                </select>

                              </div>

                            </div>
                            <div className="col-md-6 mt-2">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Signatory Name
                                </label>
                                <input
                                  type="text"
                                  id="input-first-name"
                                  className="form-control route-name"
                                  placeholder="Write here..."
                                  name="sign_name"
                                  value={sign_name}
                                  onChange={(e) => setsign_name(e.target.value)}
                                  required

                                />

                              </div>
                            </div>


                            <div className="col-md-12 mt-2">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Select Insurance?
                                </label>
                                <select
                                  onChange={handleSignSelect}
                                  value={insur}
                                  className="form-control change-sign"

                                >
                                  <option value="">Select</option>
                                  <option value="No">No</option>
                                  <option value="Yes">Yes</option>
                                </select>
                                {showCanvas && (
                                  <span
                                    className="text-primary sign-msg"
                                    style={{ fontSize: "15px" }}
                                  >
                                    <ImPen size={12} className="me-2" />
                                    Upon acceptance of Cash In Transit Insurance, you agree to pay the 0.08% of the sum insured of the consignment. Such sums will be billed separately from actual services rendered. Cash in Transit rates are based on the premiums offered by the insurance company and are subject to change without notice. You hereby agree that such sums will be paid within seven (7) days after the invoice date for the said services or as stated in your service contract. You agree that the value declared per service request does not exceed five hundred thousand dollars ($500,000.00) in the aggregate, nor shall Platinum Security Inc. be liable for an amount in excess of the said sum.
                                  </span>
                                )}
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
                              onclick="submitOnce()"
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

export default CreateRequest;
