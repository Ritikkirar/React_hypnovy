import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { MdDownload, MdCancel } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import Switch from "react-switch";
import swal from 'sweetalert'
import Moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOfficers, deleteOfficer, updateActiveValue } from '../../../../redux/actions/officerAction'
import Footer from '../../../../components/Footer/Footer';
import Datepicker from '../../../../components/Common/Datepicker';
import { CSVLink } from "react-csv";
import '../../Home.css'
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { logger } from '../../../../util/util';


const Officer = ({ visible, setVisible, token }) => {
  const [toggles, setToggles] = useState({})
  const [gender, setGender] = useState('')
  const [type, setType] = useState('')
  const [searchKey, setsearchKey] = useState("");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [showCalendar, setShowCalendar] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [activeItem, setActiveItem] = useState('Today');

  const dispatch = useDispatch();
  const { officersList } = useSelector((state) => state.officerList)
  logger("officersList", officersList);

  const optionsType = [
    { value: '', label: 'Select Officer Type' },
    { value: 'Driver', label: 'Driver' },
    { value: 'Messenger', label: 'Messenger' },
    { value: 'Shotgun', label: 'Shotgun' },
  ];

  const optionsStatus = [
    { value: 'all', label: 'Select Status' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  const optionsGender = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ]

  useEffect(() => {
    dispatch(getAllOfficers(token))
  }, [dispatch, token])


  const searchHandler = (e) => {
    if (e.target.value !== "") {
      const filteredOfficer = officersList?.filter((data) => {
        return data.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setFilteredData(filteredOfficer)
    } else {
      setFilteredData(null)
    }
    setsearchKey(e.target.value)
  }


  const handleChange = (id, newValue) => {
    const obj = {
      Active: newValue
    }
    setToggles({ ...toggles, [id]: !toggles[id] });

    dispatch(updateActiveValue(id, obj, token))

    if (filteredData) {
      const updatedFilteredData = filteredData.map(officer => {
        if (officer._id === id) {
          return {
            ...officer,
            Active: newValue,
          };
        }
        return officer;
      });
      // Update the state variables with the updated arrays
      setFilteredData(updatedFilteredData);
    }
  }


  const handleSelectChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const handleSelectChange1 = (selectedOption) => {
    setGender(selectedOption.value);
  };

  const handleSelectChange2 = (selectedOption) => {
    setStatus(selectedOption.value);
  };

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
          //to reflect the removed users on UI
          setFilteredData(null)
          dispatch(deleteOfficer(id, token))

          swal("Poof! Officer details has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Officer details are safe!");
        }
      })
  }


  const OnClickHandler = (e) => {
    logger("inside onclick")
    if (type || status || gender || startDate || endDate) {
      logger("inside if", type, status, gender, startDate, endDate)
      const filteredOfficer = officersList?.filter((data) => {
        if (type && status === "all" && !gender && !startDate && !endDate) {
          return data.officer_type.includes(type)
        } else if (status !== "all" && !type && !gender && !startDate && !endDate) {
          return data.Active === JSON.parse(status)
        } else if (gender && !searchKey && status === "all" && !type && !startDate && !endDate) {
          return data.gender.includes(gender)
        } else if (status === "all" && !type && !gender && startDate && endDate) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return itemDate >= start && itemDate <= end;
        } else if (type && startDate && endDate && status === "all" && !gender) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.officer_type.includes(type) && itemDate >= start && itemDate <= end;
        } else if (type && gender && status === "all" && !startDate && !endDate) {
          return data.officer_type.includes(type) && data.gender.includes(gender)
        } else if (type && status !== "all" && !gender && !startDate && !endDate) {
          return data.officer_type.includes(type) && data.Active === JSON.parse(status)
        } else if (startDate && endDate && gender && status === "all" && !type) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.gender.includes(gender) && itemDate >= start && itemDate <= end;
        } else if (startDate && endDate && status !== "all" && !gender && !type) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.Active === JSON.parse(status) && itemDate >= start && itemDate <= end;
        } else if (gender && status !== "all" && !type && !startDate && !endDate) {
          return data.gender.includes(gender) && data.Active === JSON.parse(status)
        } else if (type && startDate && endDate && gender && status === "all") {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.officer_type.includes(type) &&
            data.gender.includes(gender) &&
            itemDate >= start && itemDate <= end;
        } else if (type && startDate && endDate && status !== "all" && !gender) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.officer_type.includes(type) &&
            data.Active === JSON.parse(status) &&
            itemDate >= start && itemDate <= end;
        } else if (type && status !== "all" && gender && !startDate && !endDate) {
          return data.officer_type.includes(type) &&
            data.gender.includes(gender) &&
            data.Active === JSON.parse(status)
        } else if (startDate && endDate && gender && status !== "all" && !type) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.gender.includes(gender) &&
            data.Active === JSON.parse(status) &&
            itemDate >= start && itemDate <= end;
        } else if (startDate && endDate && gender && status !== "all" && type) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return data.gender.includes(gender) &&
            data.Active === JSON.parse(status) &&
            data.officer_type.includes(type) &&
            itemDate >= start && itemDate <= end;
        }
        return data;
      })
      setFilteredData(filteredOfficer)
    } else {
      logger("inside else")
      setFilteredData(null)
    }
  }

  const CancelHandler = () => {
    setsearchKey('')
    setStatus('all')
    setType('')
    setGender('')
    setStartDate();
    setEndDate();
    setActiveItem('Today')
    setFilteredData(null)
  }

  const headers = [
    { label: "Officer ID", key: "officer_id" },
    { label: "Name", key: "name" },
    { label: "Email Address", key: "email" },
    { label: "Phone Number", key: "mobile" },
    { label: "Gender", key: "gender" },
    { label: "DOB", key: "date_of_birth" },
    { label: "Officer Type", key: "officer_type" },
    { label: "Truck", key: "truck" },
  ]

  logger("filtered data", filteredData)
  logger("search key", searchKey)

  return (
    <div className="content-page position-relative" id="content">
      <div className="content mb-xl-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right"></div>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "65px" }}>
            <div className="col-12">
              <div className="card mb-5">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-xl-4 col-md-12">
                              <h5 className="page-title">Officers</h5>
                            </div>

                            <div className="col-xl-2 col-lg-3 col-md-6 text-end mb-3">
                              {officersList && officersList.length > 0 ? (
                                <button className="btn btn-light btn-sm form-control py-2">
                                  {officersList && (
                                    <CSVLink
                                      filename={`OfficersList.csv`}
                                      data={officersList && officersList}
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

                            <div className="col-xl-2 col-lg-3 col-md-6 text-end mb-3">
                              <Link to="/officer/add">
                                <button className="btn btn-danger btn-sm form-control py-2" type="button"
                                  id="delete_user"
                                  style={{ backgroundColor: "rgb(185, 67, 58)", borderColor: "rgb(185, 67, 58)", fontSize: '0.7875rem' }}>
                                  Add Officer
                                </button>
                              </Link>
                            </div>

                            <div className="col-xl-2 col-lg-3 col-md-6 text-end mb-3">
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

                            <div className="col-xl-2 col-lg-3 col-md-6 text-end mb-3">
                              <input type="text"
                                className="search-btn form-control py-2 search-input"
                                name="search"
                                placeholder="Search..."
                                value={searchKey}
                                onChange={(e) => searchHandler(e)}
                              />
                            </div>
                          </div>


                          <div id="box-div">
                            <div style={{ display: (visible ? 'none' : 'block') }}>
                              <div className="row mb-3" id="filters">

                                <div className={'col-md-2 mb-3'}>
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

                                <div className={`col-xl-2 col-md-4 mb-3 `}>
                                  <Select
                                    classNamePrefix="select2"
                                    options={optionsGender}
                                    value={optionsGender.find((option) => option.value === gender)}
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

                                <div className="col-xl-4 col-md-8 mb-3">
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
                                      className="btn btn-primary p-0 me-3"
                                      name="submit"
                                      style={{
                                        padding: "5",
                                        height: "40px",
                                        width: "32px",
                                        borderRadius: "4px"
                                      }}>
                                      <AiOutlineSearch size={20} onClick={OnClickHandler} />
                                    </button>

                                    <button type="button"
                                      className="btn btn-danger p-0"
                                      name="button"
                                      style={{
                                        padding: "5",
                                        height: "40px",
                                        width: "32px",
                                        borderRadius: "4px"
                                      }}>
                                      <MdCancel size={20} onClick={CancelHandler} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='table-responsive'>
                              <table id="" className="table table-striped border-top custom_table">
                                <thead>
                                  <tr>
                                    <th>#ID</th>
                                    <th>Name</th>
                                    <th>Officer Id</th>
                                    <th>Date Of Birth</th>
                                    <th>Officer Type</th>
                                    <th>Assigned Truck</th>
                                    <th>Gender</th>
                                    <th>Total Request</th>
                                    <th>Create at</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    filteredData ? filteredData.map((officer, i) => {
                                      return (
                                        <tr key={officer._id}>
                                          <td>{i + 1}</td>
                                          <td>{officer.name}</td>
                                          <td>{officer.officer_id}</td>
                                          <td>{officer.date_of_birth.split('-').reverse().join('-')}</td>
                                          <td>{officer.officer_type}</td>
                                          <td>{officer.truck_id ? officer.truck_id.truck_name : 'N/A'}<br />
                                            <span className="badge bg-soft-success text-success">
                                              {officer.truck_id ? officer.truck_id.truck_no : ''}
                                            </span>
                                          </td>
                                          <td> {officer.gender} </td>
                                          <td>
                                            <Link to="#"
                                              className="btn btn-success">
                                              {officer.truck_id && officer.truck_id !== null ? officer.truck_id.Requests.length : 0}
                                            </Link>
                                          </td>
                                          <td>{Moment(officer.created_at).format('DD/MM/YYYY')}</td>
                                          <td>
                                            <Switch
                                              checked={officer.Active ? true : false}
                                              onChange={(checked) => {
                                                handleChange(officer._id, checked)
                                              }}
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
                                                  to={'/officer/edit/' + officer._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  Edit
                                                </Link>
                                                <Link
                                                  className="dropdown-item"
                                                  to="#"
                                                  style={{ color: "#676868" }}
                                                  onClick={() => handleDelete(officer._id)}
                                                >
                                                  Delete
                                                </Link>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    }) : officersList && officersList.map((officer, i) => {
                                      return (
                                        <tr key={officer._id}>
                                          <td>{i + 1}</td>
                                          <td>{officer.name}</td>
                                          <td>{officer.officer_id}</td>
                                          <td>{officer.date_of_birth.split('-').reverse().join('-')}</td>
                                          <td>{officer.officer_type}</td>
                                          <td>{officer.truck_id ? officer.truck_id.truck_name : 'N/A'}<br />
                                            <span className="badge bg-soft-success text-success">
                                              {officer.truck_id ? officer.truck_id.truck_no : ''}
                                            </span>
                                          </td>
                                          <td> {officer.gender} </td>
                                          <td>
                                            <Link to="#"
                                              className="btn btn-success">
                                              {officer.truck_id ? officer.truck_id.Requests.length : 0}
                                            </Link>
                                          </td>
                                          <td>{Moment(officer.created_at).format('DD/MM/YYYY')}</td>
                                          <td>
                                            <Switch
                                              checked={officer.Active ? true : false}
                                              onChange={(checked) => handleChange(officer._id, checked)}
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
                                                  to={'/officer/edit/' + officer._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  Edit
                                                </Link>
                                                <Link
                                                  className="dropdown-item"
                                                  to="#"
                                                  style={{ color: "#676868" }}
                                                  onClick={() => handleDelete(officer._id)}
                                                >
                                                  Delete
                                                </Link>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                              </table>
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


export default Officer;