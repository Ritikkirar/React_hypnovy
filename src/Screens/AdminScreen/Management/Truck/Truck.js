import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel, MdDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getTrucksList, addTruck, deleteTruck, getRecentAssignedTrucks, updateUserActiveValue } from '../../../../redux/actions/truckAction';
import { getAllRoutes } from '../../../../redux/actions/routeAction'
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../../components/Footer/Footer";
import { BsThreeDots } from 'react-icons/bs'
import Moment from 'moment'
import swal from 'sweetalert'
import Datepicker from '../../../../components/Common/Datepicker'
import NoTruck from '../../../../images/no-truck.jpg'
import { CSVLink } from "react-csv";
import Switch from "react-switch";
import { logger } from "../../../../util/util";
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import CurrencyInput from 'react-currency-input-field';


const Truck = ({ visible, setVisible, token }) => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    truck_name: '',
    truck_no: '',
    truck_type: '',
    truck_insurance_amount: '',
    route: ''
  })
  const [truck_image, setTruckImage] = useState()
  const [truck_document, setTruckDocument] = useState()
  const [searchKey, setSearchKey] = useState('')
  const [route, setRoute] = useState("all")
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [availabiltyStatus, setAvailabiltyStatus] = useState("all")
  const [status, setStatus] = useState("all")
  const [showCalendar, setShowCalendar] = useState(false);
  const [toggles, setToggles] = useState({});
  const [filteredData, setFilteredData] = useState(null);
  const [activeItem, setActiveItem] = useState('Today');

  const dispatch = useDispatch()

  const { trucksList } = useSelector(state => state.truckList)
  const { recentTrucks } = useSelector(state => state.recentTrucks)
  const { routeList } = useSelector(state => state.routeList)


  logger("recentTrucks", recentTrucks)
  logger("trucksList", trucksList)
  logger("routeList", routeList)
  logger("filteredData", filteredData)



  const optionsZone = [
    { value: 'all', label: 'Select Zone' },
    ...(routeList
      ? routeList.map((data) => ({ value: data._id, label: data.name }))
      : [])
  ];

  const optionsAvailabiltyStatus = [
    { value: 'all', label: 'Select Availability' },
    { value: 'Available', label: 'Available' },
    { value: 'Booked', label: 'Booked' },
  ];

  const optionsStatus = [
    { value: 'all', label: 'Select Status' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    dispatch(getTrucksList(token))
    dispatch(getRecentAssignedTrucks(token))
    dispatch(getAllRoutes(token))
  }, [dispatch, token])


  const searchHandler = (e) => {
    if (e.target.value !== "") {
      const filteredTrucks = trucksList?.filter((data) => {
        return data.truck_name.toLowerCase().includes(searchKey.toLowerCase())
      })
      setFilteredData(filteredTrucks)
    } else {
      setFilteredData(null)
    }
    setSearchKey(e.target.value)
  }

  const handleSelectChange = (selectedOption) => {
    setRoute(selectedOption.value);
  };

  const handleSelectChange1 = (selectedOption) => {
    setAvailabiltyStatus(selectedOption.value);
  };

  const handleSelectChange2 = (selectedOption) => {
    setStatus(selectedOption.value);
  };

  const OnChangeHandler = (event) => {
    if (event.target.name === 'truck_insurance_amount') {
      setState({ ...state, [event.target.name]: event.target.value.replace(/[^0-9.]/g, '') });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  }

  // const commaSeparators = (number) => {
  //   if (String(number) == "") {
  //     return number
  //   } else {
  //     const parts = number.toString().split('.');
  //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //     const formattedNumber = parts.join('.');
  //     return formattedNumber;
  //   }
  // };

  const OnClickHandler = () => {
    if (status || startDate || endDate || route || availabiltyStatus) {
      const filteredTrucks = trucksList?.filter((data) => {
        if (route !== "all" && availabiltyStatus === "all" && status === "all" && !startDate && !endDate) {
          return data.route._id.includes(route)
        } else if (startDate && endDate && route === "all" && availabiltyStatus === "all" && status === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return itemDate >= start && itemDate <= end;
        } else if (availabiltyStatus !== "all" && route === "all" && status === "all" && !startDate && !endDate) {
          return data.availability_status.includes(availabiltyStatus)
        } else if (status !== "all" && availabiltyStatus === "all" && route === "all" && !startDate && !endDate) {
          return data.Active === JSON.parse(status)
        } else if (route !== "all" && startDate && endDate && status === "all" && availabiltyStatus === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.route._id.includes(route) && itemDate >= start && itemDate <= end;
        } else if (route !== "all" && availabiltyStatus !== "all" && status === "all" && !startDate && !endDate) {
          return data.route._id.includes(route)
            && data.availability_status.includes(availabiltyStatus)
        } else if (route !== "all" && status !== "all" && availabiltyStatus === "all" && !startDate && !endDate) {
          return data.route._id.includes(route) && data.Active === JSON.parse(status)
        } else if (startDate && endDate && availabiltyStatus !== "all" && route === "all" && status === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.availability_status.includes(availabiltyStatus)
            && itemDate >= start && itemDate <= end;
        } else if (startDate && endDate && status !== "all" && availabiltyStatus === "all" && route === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.Active === JSON.parse(status)
            && itemDate >= start && itemDate <= end;
        } else if (availabiltyStatus !== "all" && status !== "all" && route === "all" && !startDate && !endDate) {
          return data.availability_status.includes(availabiltyStatus)
            && data.Active === JSON.parse(status)
        } else if (route !== "all" && startDate && endDate && availabiltyStatus !== "all" && status === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.route._id.includes(route)
            && data.availability_status.includes(availabiltyStatus)
            && itemDate >= start && itemDate <= end;
        } else if (route !== "all" && startDate && endDate && status !== "all" && availabiltyStatus === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.route._id.includes(route)
            && data.Active === JSON.parse(status)
            && itemDate >= start && itemDate <= end;
        } else if (route !== "all" && availabiltyStatus !== "all" && status !== "all" && !startDate && !endDate) {
          return data.route._id.includes(route)
            && data.availability_status.includes(availabiltyStatus)
            && data.Active === JSON.parse(status)
        } else if (startDate && endDate && availabiltyStatus !== "all" && status !== "all" && route === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.availability_status.includes(availabiltyStatus)
            && data.Active === JSON.parse(status)
            && itemDate >= start && itemDate <= end;
        } else if (startDate && endDate && availabiltyStatus !== "all" && status !== "all" && route !== "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.route._id.includes(route)
            && data.availability_status.includes(availabiltyStatus)
            && data.Active === JSON.parse(status)
            && itemDate >= start && itemDate <= end;
        }
        return data;
      })
      setFilteredData(filteredTrucks)
    } else {
      setFilteredData(null)
    }
  }

  const CancelHandler = () => {
    setSearchKey('')
    setRoute("all")
    setAvailabiltyStatus("all")
    setStatus("all")
    setStartDate()
    setEndDate()
    setActiveItem('Today')
    setFilteredData(null)
  }

  const handleChange = (id, newValue) => {
    const obj = {
      Active: newValue
    }
    setToggles({ ...toggles, [id]: !toggles[id] });
    dispatch(updateUserActiveValue(id, obj, token))

    if (filteredData) {
      const updatedFilteredData = filteredData.map(truck => {
        if (truck._id === id) {
          return {
            ...truck,
            Active: newValue,
          };
        }
        return truck;
      });
      // Update the state variables with the updated arrays
      setFilteredData(updatedFilteredData);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('truck_name', state.truck_name)
    formData.append('truck_no', state.truck_no)
    formData.append('truck_type', state.truck_type)
    formData.append('truck_insurance_amount', state.truck_insurance_amount)
    formData.append('route', state.route)
    formData.append('truck_image', truck_image)
    formData.append('truck_document', truck_document)
    // logger("formdata", Object.fromEntries(formData));
    dispatch(addTruck(formData, token))
    setShow(false)
    setState({
      truck_name: '',
      truck_no: '',
      truck_type: '',
      truck_insurance_amount: '',
      route: ''
    })
    setTruckImage('')
    setTruckDocument('')
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
          setFilteredData(null)
          dispatch(deleteTruck(id, token))
          swal("Poof! Truck details has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Truck details are safe!");
        }
      })
  }

  const headers = [
    { label: "Truck Name", key: "truck_name" },
    { label: "Truck Number", key: "truck_no" },
    { label: "Truck Type", key: "truck_type" },
    { label: "Insurance Amount", key: "truck_insurance_amount" },
    { label: "Route", key: "route" },
    { label: "Status", key: "availability_status" }
  ]



  return (
    <div className="content-page position-relative" id="content">
      <div className="content mb-xl-5">
        <div className="container-fluid">
          <div className="row mt-xl-4 mt-3">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12 col-xl-4">
                              <h5 className="page-title">Trucks</h5>
                            </div>

                            <div className="col-md-6 col-lg-3 col-xl-2 text-end mb-3">
                              {trucksList && trucksList.length > 0 ? (
                                <button className="btn btn-light btn-sm form-control py-2">
                                  {trucksList && (
                                    <CSVLink
                                      filename={`TrucksList.csv`}
                                      data={trucksList && trucksList}
                                      headers={headers}
                                      style={{ color: '#000', fontSize: '0.7875rem' }}
                                    >
                                      <MdDownload className='me-1' />
                                      Export CSV
                                    </CSVLink>
                                  )}
                                </button>
                              ) : null}
                            </div>

                            <div className="col-md-6 col-lg-3 col-xl-2 text-end mb-3">
                              <button
                                className="btn btn-danger btn-sm form-control py-2"
                                type="button"
                                onClick={handleShow}
                                style={{
                                  backgroundColor: "rgb(185, 67, 58)",
                                  borderColor: "rgb(185, 67, 58)",
                                  color: "#fff",
                                  fontSize: '0.7875rem'
                                }}
                              >
                                Add Truck
                              </button>

                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title className="ms-3 text-uppercase modal_title">Add Truck</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <form className="px-3" onSubmit={submitHandler}>

                                    <div className="form-group mb-3">
                                      <label htmlFor="truckname" className="form-control-label mb-2 fw-bold">Truck</label>
                                      <input className="form-control route-name"
                                        type="text"
                                        id="truckname"
                                        name="truck_name"
                                        value={state.truck_name}
                                        placeholder="Eicher Motors"
                                        onChange={OnChangeHandler}
                                        required
                                      />
                                    </div>

                                    <div className="form-group mb-3">
                                      <label htmlFor="trucknumber" className='form-control-label mb-2 fw-bold'>Truck Number</label>
                                      <input className="form-control"
                                        type="text"
                                        id="trucknumber"
                                        name="truck_no"
                                        value={state.truck_no}
                                        onChange={OnChangeHandler}
                                        placeholder="CH AT 9658"
                                        required
                                      />
                                    </div>

                                    <div className="form-group mb-3">
                                      <label htmlFor="trucktype" className='form-control-label mb-2 fw-bold'>Truck Type</label>
                                      <input className="form-control route-name"
                                        type="text"
                                        id="trucktype"
                                        name="truck_type"
                                        value={state.truck_type}
                                        onChange={OnChangeHandler}
                                        placeholder="Car transporter"
                                        required
                                      />
                                    </div>

                                    <div className="form-group mb-3">
                                      <label className='form-control-label mb-2 fw-bold'>Truck Insurance Amount</label>
                                      <div className='form-control d-flex mb-3'>
                                        <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                        <CurrencyInput
                                          // type="text"
                                          style={{ border: 'none', width: '100%', outline: 'none' }}
                                          id="input-example"
                                          name="truck_insurance_amount"
                                          value={state.truck_insurance_amount}
                                          onChange={OnChangeHandler}
                                          placeholder="Write here.."
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="form-group mb-3">
                                      <label htmlFor="truckimage" className='form-control-label mb-2 fw-bold'>Truck Image</label>
                                      <input className="form-control"
                                        type="file"
                                        id="truckimage"
                                        name="truck_image"
                                        onChange={(e) => setTruckImage(e.target.files[0])}
                                        placeholder="CH AT 9658"
                                        required
                                      />
                                    </div>

                                    <div className="form-group mb-3">
                                      <label htmlFor="truckdocument" className='form-control-label mb-2 fw-bold'>Truck Document</label>
                                      <input className="form-control"
                                        type="file"
                                        id="truckdocument"
                                        name="truck_document"
                                        onChange={(e) => setTruckDocument(e.target.files[0])}
                                        placeholder="CH AT 9658"
                                        required
                                      />
                                    </div>

                                    <div className="form-group mb-3">
                                      <label htmlFor="route" className='form-control-label mb-2 fw-bold'>Select Route</label>
                                      <select className="form-control select2 form-select"
                                        id="route"
                                        name="route"
                                        value={state.route}
                                        onChange={OnChangeHandler}
                                      >
                                        <option value=''>--Select Route--</option>
                                        {routeList && routeList.map((item, i) => {
                                          return (
                                            <option key={i} value={item._id}>
                                              {item.name}
                                            </option>
                                          )
                                        })}
                                      </select>
                                    </div>

                                    <div className="form-group mt-3" style={{ padding: "8px 0px" }}>
                                      <Button
                                        variant="primary"
                                        type="submit"
                                        className="Create_btn"
                                      >
                                        Create
                                      </Button>
                                    </div>

                                  </form>
                                </Modal.Body>
                              </Modal>
                            </div>

                            <div className="col-md-6 col-lg-3 col-xl-2 text-end mb-3">
                              <button
                                className="btn btn-light btn-sm form-control py-2"
                                id="show"
                                style={{ fontSize: '0.7875rem', display: visible ? "block" : "none" }}
                                onClick={() => setVisible(!visible)}
                              >
                                Show Filters
                              </button>

                              <button
                                className="btn btn-light btn-sm form-control py-2"
                                id="hide"
                                style={{ fontSize: '0.7875rem', display: visible ? "none" : "block" }}
                                onClick={() => setVisible(!visible)}
                              >
                                Hide Filters
                              </button>
                            </div>

                            <div className="col-md-6 col-lg-3 col-xl-2 text-end">
                              <input
                                type="text"
                                className="form-control search-input"
                                name="searchKey"
                                value={searchKey}
                                placeholder="Search..."
                                onChange={searchHandler}
                              />
                            </div>
                          </div>
                          <br />

                          <div id="box-div">
                            <div style={{ display: visible ? "none" : "block" }}>
                              <div className="row" id="filters">

                                <div className='col-md-4 col-xl-2 mb-3'>
                                  <Select
                                    classNamePrefix="select2"
                                    options={optionsZone}
                                    value={optionsZone.find((option) => option.value === route)}
                                    onChange={handleSelectChange}
                                    components={{
                                      IndicatorSeparator: null,
                                      DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                        menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                    }}
                                  />
                                </div>

                                <div className='col-md-4 col-xl-2 mb-3'>
                                  <Select
                                    classNamePrefix="select2"
                                    options={optionsAvailabiltyStatus}
                                    value={optionsAvailabiltyStatus.find((option) => option.value === availabiltyStatus)}
                                    onChange={handleSelectChange1}
                                    components={{
                                      IndicatorSeparator: null,
                                      DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                        menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                    }}
                                  />
                                </div>

                                <div className='col-md-4 col-xl-2 mb-3'>
                                  <Select
                                    classNamePrefix="select2"
                                    options={optionsStatus}
                                    value={optionsStatus.find((option) => option.value === status)}
                                    onChange={handleSelectChange2}
                                    components={{
                                      IndicatorSeparator: null,
                                      DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                        menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                    }}
                                  />
                                </div>

                                <div className="col-md-8 col-xl-4 mb-3">
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

                                <div className="col-md-3 col-xl-2">
                                  <div className="row justify-content-center">
                                    <button
                                      type="submit"
                                      className="btn btn-primary p-0 me-3"
                                      name="submit"
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      <AiOutlineSearch size={20}
                                        onClick={OnClickHandler} />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-danger p-0"
                                      name="button"
                                      style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      <MdCancel size={20}
                                        onClick={CancelHandler} />
                                    </button>
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

          <div className="row">
            <div className="col-md-12">
              <div className="dropdown float-end mt-3">
                <Link to="/truck/all" className="dropdown-item">View All</Link>
              </div>
              <h4 className="header-title mb-0 mt-3">Recent Assign Trucks</h4>
            </div>
          </div>

          {recentTrucks && recentTrucks.length > 0 ? (
            <div className="row mt-3" >
              {recentTrucks && recentTrucks.slice(0, 3).map((truck) => {
                return (
                  <div className="col-md-6 col-xl-4" key={truck._id}>
                    <div
                      className="card-box project-box ribbon-box"
                      style={{ height: "400px" }}
                    >
                      <div className="ribbon-two ribbon-two-success">
                        <span>{truck.route.name}</span>
                      </div>

                      <Link
                        to={'/truck/view/' + truck._id}
                        className="font-clr"
                      >
                        <div
                          style={{
                            height: "180px",
                            overflow: "hidden",
                            width: "100%",
                            objectPosition: "center",
                          }}
                        >
                          <img
                            className="grd-img"
                            src={truck.truck_image}
                            alt="truck_image"
                            style={{
                              height: "100%",
                              width: "100%",
                              objectPosition: "center",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <h4 className="mt-3">
                          {truck.truck_name}
                          <div
                            className="badge bg-soft-success text-success"
                            style={{ marginLeft: "10px" }}
                          >
                            {truck.truck_no}
                          </div>
                        </h4>

                        <div className="row mt-3">
                          <div className="col-xl-12 col-lg-12">
                            <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                              Zone: <b>{truck.route.name}</b>
                            </span><br />
                            <span className="pe-2 text-nowrap mb-1 d-inline-block text-danger card-box-links">
                              <b>${truck.requestTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b> Request Amount
                            </span>
                          </div>

                          <div className="col-xl-12 col-lg-12  text-xl-right">
                            <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                              Today's Request Count: <b>{truck.Requests.length}</b>
                            </span>
                            <span className="pe-2 text-nowrap mb-1 d-inline-block card-box-links">
                              <b>${truck.truck_insurance_amount.toLocaleString()}</b> Insurance Amount
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='card-box project-box ribbon-box d-flex flex-column justify-content-center align-items-center mt-2'>
              <img src={NoTruck} alt='no result'
                className='img-responsive'
                style={{ height: '200px' }}
              />
              <h5 style={{ fontWeight: '700', color: '#4b409a' }}>
                No Recent Assigned Trucks are Available
              </h5>
            </div>
          )}


          <div className="card" style={{ marginBottom: "70px" }}>
            <div className="card-body">
              <div id="box-div">
                <div className='table-responsive'>
                  <table id="" className="table table-striped border-top custom_table my-3">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Truck Name</th>
                        <th>Type</th>
                        <th>Route</th>
                        <th>Total Request</th>
                        <th>Insurance Amount</th>
                        <th>Create at</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        filteredData ? filteredData.map((truck, i) => {
                          return (
                            <tr key={truck._id}>
                              <td>{i + 1}</td>
                              <td className="d-flex flex-column justify-content-between">
                                {truck.truck_name}
                                <div
                                  className="badge bg-soft-success text-success align-items-center mt-2"
                                  style={{ fontSize: '12px', lineHeight: '1.5' }}
                                >
                                  {truck.truck_no}
                                </div>
                              </td>
                              <td>{truck.truck_type}</td>
                              <td>{truck.route.name}</td>
                              <td>
                                <Link to="#"
                                  className="btn btn-success">
                                  {truck.Requests.length}
                                </Link>
                              </td>
                              <td> ${truck.truck_insurance_amount.toLocaleString()} </td>
                              <td>{Moment(truck.created_at).format('DD/MM/YYYY')}</td>
                              <td>
                                <Switch
                                  checked={truck.Active ? true : false}
                                  onChange={(newValue) => handleChange(truck._id, newValue)}
                                  handleDiameter={35}
                                  offColor="#6ac7df"
                                  onColor="#6ac7df"
                                  offHandleColor="#6d4fdb"
                                  onHandleColor="#6d4fdb"
                                  height={37}
                                  width={100}
                                  borderRadius={2}
                                  activeBoxShadow="none"
                                  uncheckedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 12,
                                        color: "white",
                                        paddingRight: 18
                                      }}
                                    >
                                      Blocked
                                    </div>
                                  }
                                  checkedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 12,
                                        color: "white",
                                        paddingLeft: 8
                                      }}
                                    >
                                      Active
                                    </div>
                                  }
                                  className="react-switch"
                                  id="small-radius-switch"
                                />

                              </td>
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
                                      to={'/truck/edit/' + truck._id}
                                      style={{ color: "#676868" }}
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      style={{ color: "#676868" }}
                                      onClick={() => handleDelete(truck._id)}
                                    >
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        }) : trucksList && trucksList.map((truck, i) => {
                          return (
                            <tr key={truck._id}>
                              <td>{i + 1}</td>
                              <td className="d-flex flex-column justify-content-between">
                                {truck.truck_name}
                                <div
                                  className="badge bg-soft-success text-success align-items-center mt-2"
                                  style={{ fontSize: '12px', lineHeight: '1.5' }}
                                >
                                  {truck.truck_no}
                                </div>
                              </td>
                              <td>{truck.truck_type}</td>
                              <td>{truck.route.name}</td>
                              <td>
                                <Link to="#"
                                  className="btn btn-success">
                                  {truck.Requests.length}
                                </Link>
                              </td>
                              <td> ${truck.truck_insurance_amount.toLocaleString()} </td>
                              <td>{Moment(truck.created_at).format('DD/MM/YYYY')}</td>
                              <td>
                                <Switch
                                  checked={truck.Active ? true : false}
                                  onChange={(newValue) => handleChange(truck._id, newValue)}
                                  handleDiameter={35}
                                  offColor="#6ac7df"
                                  onColor="#6ac7df"
                                  offHandleColor="#6d4fdb"
                                  onHandleColor="#6d4fdb"
                                  height={37}
                                  width={100}
                                  borderRadius={2}
                                  activeBoxShadow="none"
                                  uncheckedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 12,
                                        color: "white",
                                        paddingRight: 18
                                      }}
                                    >
                                      Blocked
                                    </div>
                                  }
                                  checkedIcon={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        fontSize: 12,
                                        color: "white",
                                        paddingLeft: 8
                                      }}
                                    >
                                      Active
                                    </div>
                                  }
                                  className="react-switch"
                                  id="small-radius-switch"
                                />

                              </td>
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
                                      to={'/truck/edit/' + truck._id}
                                      style={{ color: "#676868" }}
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      style={{ color: "#676868" }}
                                      onClick={() => handleDelete(truck._id)}
                                    >
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Truck;
