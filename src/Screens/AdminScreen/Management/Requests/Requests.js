import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdCancel } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import pickup from '../../../../images/time-delivery-schedule-pickup-icon.jpg'
import { getAllRequests, getRequestsCount } from '../../../../redux/actions/merchantAction'
import { getAllRoutes } from '../../../../redux/actions/routeAction'
import Footer from '../../../../components/Footer/Footer'
import Datepicker from '../../../../components/Common/Datepicker'
import Moment from 'moment'
import { logger } from '../../../../util/util'
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getTrucksList, getUserByTruck } from '../../../../redux/actions/truckAction'
import { changeTruck, AssignTruck } from '../../../../redux/actions/adminAction'
import { message } from "antd";
import ExcelExport from '../../../../components/Common/ExcelExport'


const Requests = ({ visible, setVisible, token, adminID }) => {
  const { id } = useParams();
  const selectedRequestRef = useRef(null);
  const [searchKey, setsearchKey] = useState("");
  const [type, setType] = useState("all")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [showCalendar, setShowCalendar] = useState(false);
  const [rate, setRate] = useState("all")
  const [zone, setZone] = useState("all")
  const [filteredData, setFilteredData] = useState(null);
  const [activeItem, setActiveItem] = useState('Today');
  const [show, setShow] = useState(false);
  const [truckID, setTruckID] = useState()
  const [req_ID, setreq_ID] = useState()
  const [truckvalue, setTruckvalue] = useState()

  const dispatch = useDispatch()


  const { requestslist } = useSelector((state) => state.requestList)
  const { requestCount } = useSelector((state) => state.requestCount)
  const { routeList } = useSelector(state => state.routeList)
  const { trucksList } = useSelector((state) => state.truckList)
  const { users } = useSelector((state) => state.user)

  // const [totalRequestRate, setTotalRequestRate] = useState(requestslist && requestslist.forEach(element => {
  //   return totalRequestRate += element.rate + element.extraRate
  // }));
  // const [extracharge, setExtracharge] = useState(requestslist && requestslist.forEach(element => {
  //   return extracharge += element.extraRate
  // }));
  const [totalRequestRate, setTotalRequestRate] = useState(0);
  const [extracharge, setExtracharge] = useState(0);

  

  // requestslist && requestslist.forEach(element => {
  //   return totalRequestRate += element.rate + element.extraRate
  // })
  // requestslist && requestslist.forEach(element => {
  //   return extracharge += element.extraRate
  // })

  const calculateTotalRates = (requestList) => {
    let totalRate = 0;
    let extraCharge = 0;

    if (requestList) {
      requestList.forEach(element => {
        totalRate += element.rate + element.extraRate;
        extraCharge += element.extraRate;
      });
    }

    return { totalRate, extraCharge };
  };

  useEffect(() => {
    const { totalRate, extraCharge } = calculateTotalRates(requestslist);
    setTotalRequestRate(totalRate);
    setExtracharge(extraCharge);
  }, [requestslist]);

  useEffect(() => {
    if (selectedRequestRef.current) {
      selectedRequestRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [id, selectedRequestRef]);


  const handleClose = () => setShow(false);
  const handleShow = (ID, truck, merchantid) => {
   
    setShow(true);
    setreq_ID(ID)
    setTimeout(() => {
      setTruckvalue(truck)
    }, 1000);

  }

  const OnChangeHandler = (event) => {
    setTruckID(event.target.value);
    dispatch(getUserByTruck(event.target.value, token))
   
    
  }

  // const ClickHandler = () => {
  //   dispatch(getUserByTruck(truckID, token))
    
  // }

  const RequestChangeTruck = (e) => {
    e.preventDefault()
   
    if (!users) {
      setShow(false);
      return message.error({
        content: "Officers Not Assigned to the Truck Yet",
        duration: 3,
      });
    } else {
      dispatch(changeTruck(token, req_ID, truckID, adminID))
     
      setShow(false);
    }
  }

  const RequestAssignTruck = (e) => {
    e.preventDefault()
    if (!users) {
      setShow(false);
      return message.error({
        content: "Officers Not Assigned to the Truck Yet",
        duration: 3,
      });
    } else {
      dispatch(AssignTruck(token, req_ID, truckID))
      setShow(false);
    }
  }


  const formattedPhoneNumber = (phone) => {
    if (phone && typeof phone === 'number') {
      const phoneString = phone.toString();
      return phoneString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');;
  };

  const optionsType = [
    { value: 'all', label: 'Select Customer Type' },
    { value: 'MERCHANT', label: 'Merchant' },
    { value: 'FINANCIAL INSTITUTION', label: 'Bank' },
  ];

  const optionsRate = [
    { value: 'all', label: 'Select Request Type' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Premium', label: 'Premium' },
  ];

  const optionsZone = [
    { value: 'all', label: 'Select Zone' },
    ...(routeList ?
      routeList.map((data) => ({ value: data._id, label: data.name }))
      : [])
  ];

  const handleSelectChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const handleSelectChange1 = (selectedOption) => {
    setRate(selectedOption.value);
  };

  const handleSelectChange2 = (selectedOption) => {
    setZone(selectedOption.value);
  };

  const OnClickHandler = () => {
    if (type || rate || zone || startDate || endDate) {
      const filteredRequests = requestslist?.filter((data) => {
        if (type !== "all" && rate === "all" && zone === "all" && !startDate && !endDate) {
          return data.customer_type.includes(type)
        } else if (rate !== "all" && type === "all" && zone === "all" && !startDate && !endDate) {
          return data.charge_type.includes(rate)
        } else if (zone !== "all" && type === "all" && rate && !startDate && !endDate) {
          return data.zone._id.includes(zone)
        } else if (startDate && endDate && type === "all" && rate === "all" && zone === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return itemDate >= start && itemDate <= end;
        } else if (type !== "all" && rate !== "all" && zone === "all" && !startDate && !endDate) {
          return data.customer_type.toLowerCase().includes(type.toLowerCase())
            && data.charge_type.includes(rate)
        } else if (type !== "all" && zone !== "all" && rate === "all" && !startDate && !endDate) {
          return data.customer_type.toLowerCase().includes(type.toLowerCase())
            && data.zone._id.includes(zone)
        } else if (type !== "all" && startDate && endDate && zone === "all" && rate === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.customer_type.toLowerCase().includes(type.toLowerCase())
            && itemDate >= start && itemDate <= end;
        } else if (rate !== "all" && zone !== "all" && type === "all" && !startDate && !endDate) {
          return data.charge_type.includes(rate) && data.zone._id.includes(zone)
        } else if (rate !== "all" && startDate && endDate && zone === "all" && type === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.charge_type.includes(rate)
            && itemDate >= start && itemDate <= end;
        } else if (zone !== "all" && startDate && endDate && rate === "all" && type === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.zone._id.includes(zone) && itemDate >= start && itemDate <= end;
        } else if (type !== "all" && rate !== "all" && zone !== "all" && !startDate && !endDate) {
          return data.customer_type.toLowerCase().includes(type.toLowerCase())
            && data.charge_type.includes(rate) && data.zone._id.includes(zone)
        } else if (type !== "all" && rate !== "all" && startDate && endDate && zone === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.customer_type.toLowerCase().includes(type.toLowerCase())
            && data.charge_type.includes(rate) && itemDate >= start && itemDate <= end;
        } else if (rate !== "all" && zone !== "all" && startDate && endDate && type === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.zone._id.includes(zone) && data.charge_type.includes(rate)
            && itemDate >= start && itemDate <= end;
        } else if (type !== "all" && zone !== "all" && startDate && endDate && rate === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.zone._id.includes(zone)
            && data.customer_type.toLowerCase().includes(type.toLowerCase())
            && itemDate >= start && itemDate <= end;
        } else if (type !== "all" && zone !== "all" && startDate && endDate && rate !== "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.zone._id.includes(zone)
            && data.customer_type.toLowerCase().includes(type.toLowerCase())
            && data.charge_type.includes(rate)
            && itemDate >= start && itemDate <= end;
        }
        return data;
      })

      let totalRateSum = 0;
      let extraChargeSum = 0;
      filteredRequests.forEach(element => {
        totalRateSum += element.rate + element.extraRate;
        extraChargeSum += element.extraRate; // Initialize with 0 if undefined
      });

      setTotalRequestRate(totalRateSum);
      setExtracharge(extraChargeSum);

      setFilteredData(filteredRequests)
    } else {
      setTotalRequestRate(0)
      setExtracharge(0)
      setFilteredData(null)
    }
  }

  const CancelHandler = () => {
    setsearchKey("")
    setType("all")
    setRate("all")
    setZone("all")
    setStartDate()
    setEndDate()
    setActiveItem('Today')

    const { totalRate, extraCharge } = calculateTotalRates(requestslist);
    setTotalRequestRate(totalRate);
    setExtracharge(extraCharge);

    setFilteredData(null)
  }

  useEffect(() => {
    dispatch(getAllRequests(token))
    dispatch(getRequestsCount(token))
    dispatch(getTrucksList(token))
    dispatch(getAllRoutes(token))
  }, [dispatch, token])


  const searchHandler = (e) => {
    if (e.target.value !== "") {
      const filteredRequests = requestslist?.filter((data) => {
        return data.merchant.business_name.toLowerCase().includes(searchKey.toLowerCase());
      });
      setFilteredData(filteredRequests);

      const { totalRate, extraCharge } = calculateTotalRates(filteredRequests);
      setTotalRequestRate(totalRate);
      setExtracharge(extraCharge);
    } else {
      setFilteredData(null);

      const { totalRate, extraCharge } = calculateTotalRates(requestslist);
      setTotalRequestRate(totalRate);
      setExtracharge(extraCharge);
    }

    setsearchKey(e.target.value);
  };


  // const mapBagAmounts = (bags, property) =>
  //   bags.map(bag => `$${parseFloat(bag[property]).toLocaleString()}`).join(' , ');

  const mapAddress = address =>
    address.deposit_add_id.bank_name + ', ' + address.deposit_add_id.bank_address;


  const excelExportData = (filteredData || requestslist || []).map((data) => ({
    "Customer": `${data.merchant.business_name} (${data.zone.name})`,
    "Request ID": { v: data.req_ID, t: 'n' },
    "Request Type": data.req_type,
    "Charge Type": data.charge_type,
    "Status": data.status,
    "Rate": { v: data.rate, t: 'n' },
    "Pickup Date & Time": Moment(data.pickup_datetime).format("DD-MM-YYYY,hh:mm A"),
    "Picked Up Date & Time": data.pickedup_datetime ? Moment(data.pickedup_datetime).format("DD-MM-YYYY,hh:mm A") : 'N/A',
    "Deposit Date & Time": data.deposit_datetime ? Moment(data.deposit_datetime).format("DD-MM-YYYY,hh:mm A") : 'N/A',
    "Officer": data.user ? data.user?.name : 'N/A',
    "No of Bags": { v: data.no_of_bags, t: 'n' },
    "Bag Id": data.bags.map(bag => `${bag.bag_ID}`).join(' , '),
    "Cash Amount in Bag1($)": { v: data.bags[0]?.cash_amount, t: 'n' },
    "Cash Amount in Bag2($)": { v: data.bags[1]?.cash_amount || 0, t: 'n' },
    "Cheque Amount in Bag1($)": { v: data.bags[0]?.cheque_amount, t: 'n' },
    "Cheque Amount in Bag2($)": { v: data.bags[1]?.cheque_amount || 0, t: 'n' },
    "Coins Amount in Bag1($)": { v: data.bags[0]?.coins_amount, t: 'n' },
    "Coins Amount in Bag2($)": { v: data.bags[1]?.coins_amount || 0, t: 'n' },
    "Bags Grand Total($)": { v: parseFloat(data.grandTotal), t: 'n' },
    "Extra Charge($)": { v: parseFloat(data.extraRate), t: 'n' },
    "Insurance($)": { v: parseFloat(data.insurance), t: 'n' },
    "With Return": data.withreturn,
    "Pickup Address": data.pickup_address,
    "Deposit Address": mapAddress(data),
    "Contact Number": data.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
    // "Total Request Billed": parseFloat(totalRequestRate).toLocaleString(),
    // "Extra Charged Billed": parseFloat(extracharge).toLocaleString(),
  }))
  let columnCount = 25;


  return (
    <div className="content-page position-relative" id="content">
      <div className="content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">

                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className='col-md-6'>
              <div className="card-box">
                <Link to="#">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-lg d-flex justify-content-center align-items-center">
                        <img src={pickup}
                          className="img-fluid rounded-circle"
                          alt="user-img"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-end">
                        <h5 className="mt-1 text-dark">{requestCount && requestCount.totalRequests}</h5>
                        <p className="text-muted mb-1 text-truncate" style={{ fontSize: "14px" }}>
                          Total Requests
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="widget-rounded-circle card-box">
                <Link to="#">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-lg d-flex justify-content-center align-items-center">
                        <img src={pickup}
                          className="img-fluid rounded-circle"
                          alt="user-img"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-end">
                        <h5 className="mt-1 text-dark">{requestCount && requestCount.completedReq}</h5>
                        <p className="text-muted mb-1 text-truncate" style={{ fontSize: "14px" }}>
                          Completed Requests
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="widget-rounded-circle card-box">
                <Link to="#">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-lg d-flex justify-content-center align-items-center">
                        <img src={pickup}
                          className="img-fluid rounded-circle"
                          alt="user-img"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-end">
                        <h5 className="mt-1 text-dark">{requestCount && requestCount.assignedReq}</h5>
                        <p className="text-muted mb-1 text-truncate" style={{ fontSize: "14px" }}>
                          Assigned Requests
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="widget-rounded-circle card-box">
                <Link to="#">
                  <div className="row">
                    <div className="col-6">
                      <div className="avatar-lg d-flex justify-content-center align-items-center">
                        <img src={pickup}
                          className="img-fluid rounded-circle"
                          alt="user-img"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-end">
                        <h5 className="mt-1 text-dark">{requestCount && requestCount.inTransitReq}</h5>
                        <p className="text-muted mb-1" style={{ fontSize: "14px" }}>In transit Requests</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>


          <div className="row" style={{ marginBottom: "65px" }}>
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">

                          <div className="row">
                            <div className="col-md-12 col-lg-3 col-xl-6">
                              <h5 className="page-title">Requests</h5>
                            </div>
                            <div className="col-md-4 col-lg-3 text-end mb-3 col-xl-2">
                              <ExcelExport excelData={excelExportData} fileName={"All Requests"} NumberOfColumn={columnCount} />
                            </div>

                            <div className="col-md-4 col-lg-3 text-end mb-3 col-xl-2">
                              <button className="btn btn-light btn-sm form-control py-2"
                                id="show"
                                style={{ fontSize: '0.7875rem', display: (visible ? 'block' : 'none') }}
                                onClick={() => setVisible(!visible)}
                              >
                                Show Filters
                              </button>
                              <button className="btn btn-light btn-sm form-control py-2"
                                id="hide"
                                style={{ fontSize: '0.7875rem', display: (visible ? 'none' : 'block') }}
                                onClick={() => setVisible(!visible)}>
                                Hide Filters
                              </button>
                            </div>

                            <div className="col-md-4 col-lg-3 text-end mb-3 col-xl-2">
                              <input
                                type="text"
                                className="search-btn form-control py-2 search-input"
                                name="searchKey"
                                value={searchKey}
                                placeholder="Search..."
                                onChange={searchHandler} />
                            </div>
                          </div>
                          <br />

                          <div id="box-div">
                            <div style={{ display: (visible ? 'none' : 'block') }}>
                              <div className="row mb-3" id="filters">

                                <div className={`col-xl-2 col-md-4 mb-3`}>
                                  <Select
                                    classNamePrefix="select2"
                                    options={optionsType}
                                    value={optionsType.find((option) => option.value === type)}
                                    onChange={handleSelectChange}
                                    components={{
                                      IndicatorSeparator: null,
                                      DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                        menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                    }}
                                  />
                                </div>

                                <div className={`col-xl-2 col-md-4 mb-3`}>
                                  <Select
                                    classNamePrefix="select2"
                                    options={optionsRate}
                                    value={optionsRate.find((option) => option.value === rate)}
                                    onChange={handleSelectChange1}
                                    components={{
                                      IndicatorSeparator: null,
                                      DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                        menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                    }}
                                  />
                                </div>

                                <div className={`col-xl-2 col-md-4 mb-3`}>
                                  <Select
                                    classNamePrefix="select2"
                                    options={optionsZone}
                                    value={optionsZone.find((option) => option.value === zone)}
                                    onChange={handleSelectChange2}
                                    components={{
                                      IndicatorSeparator: null,
                                      DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                        menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                    }}
                                  />
                                </div>

                                <div className="col-xl-4 col-md-9  mb-3">
                                  <Datepicker startDate={startDate}
                                    setStartDate={setStartDate}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    showCalendar={showCalendar}
                                    setShowCalendar={setShowCalendar}
                                    OnClickHandler={OnClickHandler}
                                    activeItem={activeItem}
                                    setActiveItem={setActiveItem}
                                  />
                                </div>

                                <div className="col-xl-2 col-md-4">
                                  <div className="row justify-content-center">
                                    <button type="submit"
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "4px"
                                      }}
                                      className="btn btn-primary p-0 me-3"
                                      name="submit"
                                    >
                                      <AiOutlineSearch size={20}
                                        onClick={OnClickHandler} />
                                    </button>


                                    <button type="button"
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "4px"
                                      }}
                                      className="btn btn-danger p-0"
                                      name="button"
                                    >
                                      <MdCancel size={20}
                                        onClick={CancelHandler} />
                                    </button>

                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='table-responsive'>
                              <table id="" className="table table-striped border-top request_table">
                                <thead>
                                  <tr>
                                    <th>#ID</th>
                                    <th>Merchant</th>
                                    <th>Phone Number</th>
                                    <th>Assigned Truck</th>
                                    <th>Routes</th>
                                    <th>Rate/Charge</th>
                                    <th>Extra Charge</th>
                                    <th>Zone</th>
                                    <th>Track</th>
                                    <th>Requested Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    filteredData ? filteredData.map((item, i) => {
                                      return (
                                        <tr key={item._id} ref={item._id === id ? selectedRequestRef : null}>
                                          <td>{item.req_ID}</td>
                                          <td>
                                            <Link to="#"> {item.business_name} </Link>
                                          </td>

                                          <td style={{ width: '125px' }}>{'+1' + formattedPhoneNumber(item.phone)} </td>
                                          {item.truck ? (
                                            <td> {item.truck.truck_name}<br />
                                              <span className="badge bg-soft-success">{item.truck.truck_no}</span>
                                            </td>
                                          ) : (
                                            <td>N/A</td>
                                          )}

                                          <td>
                                            <span className="badge bg-soft-primary">Pickup :</span>
                                            <br />
                                            <Link to="#">
                                              {item.pickup_address}
                                            </Link>
                                            <br />

                                            <span className="badge bg-soft-info">Deposit :</span>
                                            <br />
                                            <Link to="#">
                                              {item.deposit_add_id !== null ? item.deposit_add_id.bank_address : 'N/A'}
                                            </Link>
                                          </td>
                                          <td className='text-capitalize'>
                                            ${item.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <br /> {item.charge_type}
                                          </td>
                                          <td className='text-capitalize'>
                                            ${item.extraRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                          </td>
                                          <td> {item.zone.name} </td>
                                          <td>
                                            <Link to="#"> Track </Link>
                                          </td>
                                          <td>
                                          {Moment(item.created_at).format("DD-MM-YYYY,hh:mm A")}
                                          </td>
                                          <td>
                                            <span className="badge bg-soft-primary">{item.status}</span>
                                          </td>
                                          <td className="">
                                            <div className="dropdown option-menu">

                                              <BsThreeDots id="dropdownMenuButton1"
                                                className="dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              />

                                              <div className="dropdown-menu border-0"
                                                aria-labelledby="dropdownMenuButton1"
                                                style={{ boxShadow: "0px 0px 15px -5px grey" }}
                                              >
                                                <Link
                                                  className="dropdown-item"
                                                  to={'/merchant/requests/view/' + item._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  View
                                                </Link>
                                                <Link
                                                  className="dropdown-item"
                                                  to={"/merchant/requests/edit/" + item._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  Edit
                                                </Link>
                                                {item.status === 'PickedUp' || item.status === 'Reached' || item.status === 'In Transit' || item.status === 'Completed' ?
                                                  ''
                                                  :
                                                  <Link
                                                    className="dropdown-item"
                                                    to="#"
                                                    style={{ color: "#676868" }}
                                                    onClick={() => handleShow(item._id, item.truck)}
                                                  >
                                                    Change Truck
                                                  </Link>
                                                }
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    }) : requestslist && requestslist.map((item, i) => {
                                      return (
                                        <tr key={item._id} ref={item._id === id ? selectedRequestRef : null}>
                                          <td>{item.req_ID}</td>
                                          <td>
                                            <Link to="#"> {item.business_name} </Link>
                                          </td>

                                          <td style={{ width: '125px' }}>{'+1' + formattedPhoneNumber(item.phone)} </td>
                                          {item.truck ? (
                                            <td> {item.truck.truck_name}<br />
                                              <span className="badge bg-soft-success">{item.truck.truck_no}</span>
                                            </td>
                                          ) : (
                                            <td>N/A</td>
                                          )}

                                          <td>
                                            <span className="badge bg-soft-primary">Pickup :</span>
                                            <br />
                                            <Link to="#">
                                              {item.pickup_address}
                                            </Link>
                                            <br />

                                            <span className="badge bg-soft-info">Deposit :</span>
                                            <br />
                                            <Link to="#">
                                              {item.deposit_add_id !== null ? item.deposit_add_id.bank_address : 'N/A'}
                                            </Link>
                                          </td>
                                          <td className='text-capitalize'>
                                            ${item.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <br /> {item.charge_type}
                                          </td>
                                          <td className='text-capitalize'>
                                            ${item.extraRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                          </td>
                                          <td> {item.zone.name} </td>
                                          <td>
                                            <Link to="#"> Track </Link>
                                          </td>
                                          <td>
                                          {Moment(item.created_at).format("DD-MM-YYYY,hh:mm A")}
                                          </td>
                                          <td>
                                            <span className="badge bg-soft-primary">{item.status}</span>
                                          </td>
                                          <td className="">
                                            <div className="dropdown option-menu">

                                              <BsThreeDots id="dropdownMenuButton1"
                                                className="dropdown-toggle"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              />

                                              <div className="dropdown-menu border-0"
                                                aria-labelledby="dropdownMenuButton1"
                                                style={{ boxShadow: "0px 0px 15px -5px grey" }}
                                              >
                                                <Link
                                                  className="dropdown-item"
                                                  to={'/merchant/requests/view/' + item._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  View
                                                </Link>
                                                <Link
                                                  className="dropdown-item"
                                                  to={"/merchant/requests/edit/" + item._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  Edit
                                                </Link>
                                                {item.status === 'PickedUp' || item.status === 'Reached' || item.status === 'In Transit' || item.status === 'Completed' ?
                                                  ''
                                                  :
                                                  <Link
                                                    className="dropdown-item"
                                                    to="#"
                                                    style={{ color: "#676868" }}
                                                    onClick={() => handleShow(item._id, item.truck)}
                                                  >
                                                    Change Truck
                                                  </Link>
                                                }
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                      <Modal.Title className="fs-5 text-dark">Change Truck</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <form className="px-3">
                                        <div className="form-group mb-3">
                                          <select className="form-control select2 form-select"
                                            id="truckID"
                                            name="truckID"
                                            value={truckID}
                                            onChange={OnChangeHandler}
                                            // onClick={ClickHandler}
                                            required
                                          >
                                            <option value="">--Select Truck--</option>
                                            {trucksList && trucksList.map((data, i) => {
                                              return (
                                                <option key={i} value={data._id}>
                                                  {data.truck_name} - {data.truck_no}
                                                </option>
                                              )
                                            })}
                                          </select>
                                        </div>

                                        <div id="show-driver" style={{ display: truckID ? "block" : "none" }}>
                                          {users && users.map((data, i) => {
                                            return (
                                              <p className='text-muted' key={i}>
                                                <strong>{data.officer_type} : &nbsp;&nbsp;</strong> {data.name} &nbsp;&nbsp;|&nbsp;&nbsp; {data.email}
                                              </p>
                                            )
                                          })}
                                        </div>

                                        <div className="form-group text-center mt-3">
                                          {truckvalue == null ?
                                            <Button
                                              onClick={RequestAssignTruck}
                                              variant="primary"
                                              type="button"
                                            >
                                              Assign Truck
                                            </Button>
                                            :
                                            <Button
                                              onClick={RequestChangeTruck}
                                              variant="primary"
                                              type="button"
                                            >
                                              Change Truck
                                            </Button>
                                          }

                                        </div>
                                      </form>
                                    </Modal.Body>
                                  </Modal>
                                </tbody>
                              </table>

                              <div className='mt-5 d-flex justify-content-around rate'>
                                <h6> Total Request Billed : <span>${totalRequestRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></h6>
                                <h6> Extra Charged Billed : <span>${extracharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></h6>
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Requests