import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { MdDownload, MdCancel } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import Switch from "react-switch";
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMerchant, deleteMerchant, getTotalMerchants, updateActiveValue
} from '../../../../redux/actions/merchantAction'
import swal from 'sweetalert'
import merchant from '../../../../images/merchant-icon-11.jpg'
import '../../Home.css'
import Moment from 'moment'
import Footer from '../../../../components/Footer/Footer';
import Datepicker from '../../../../components/Common/Datepicker';
import { backend_uri_local, API_KEY } from '../../../../util/constant'
import axios from 'axios'
import { CSVLink } from "react-csv";
import { logger } from '../../../../util/util';
import '../../Home.css'
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';



const Customer = ({ visible, setVisible, token }) => {
  const [toggles, setToggles] = useState({});
  const [searchKey, setsearchKey] = useState("");
  const [status, setStatus] = useState("all");
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [showCalendar, setShowCalendar] = useState(false);
  const [totalRequests, setTotalRequests] = useState({});
  const [filteredData, setFilteredData] = useState(null);
  const [activeItem, setActiveItem] = useState('Today');

  const options = [
    { value: 'all', label: 'Select Status' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  const dispatch = useDispatch();

  const { merchantsList } = useSelector((state) => state.merchantList)
  const { totalMerchants } = useSelector((state) => state.totalMerchant)

  logger('merchantsList', merchantsList)


  useEffect(() => {
    dispatch(getTotalMerchants(token))
  }, [dispatch, token])


  useEffect(() => {
    dispatch(getAllMerchant(token))
  }, [dispatch, token])


  useEffect(() => {
    merchantsList && merchantsList.forEach((customer) => {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'authorizationkey': `${API_KEY}`
        }
      }
      axios.get(`${backend_uri_local}/api/merchant/request_count_per_customer/${customer._id}`, config)
        .then((res) => {
          setTotalRequests((prevTotalRequests) => ({
            ...prevTotalRequests,
            [customer._id]: res.data.data,
          }))
        }).catch((error) => {
          logger("error", error);
        })
    });
  }, [merchantsList, token]);


  const handleChange = (id, newValue) => {
    const obj = {
      Active: newValue
    }
    setToggles({ ...toggles, [id]: !toggles[id] });
    dispatch(updateActiveValue(id, obj, token))

    if (filteredData) {
      const updatedFilteredData = filteredData.map(customer => {
        if (customer._id === id) {
          return {
            ...customer,
            Active: newValue,
          };
        }
        return customer;
      });
      // Update the state variables with the updated arrays
      setFilteredData(updatedFilteredData);
    }
  }

  const handleSelectChange = (selectedOption) => {
    setStatus(selectedOption.value);
  }

  const searchHandler = (e) => {
    if (e.target.value !== "") {
      const filteredCustomer = merchantsList?.filter((data) => {
        return data.business_name.toLowerCase().includes(searchKey.toLowerCase())
      })
      setFilteredData(filteredCustomer)
    } else {
      setFilteredData(null)
    }
    setsearchKey(e.target.value)
  }

  const OnClickHandler = () => {
    if (status || startDate || endDate) {
      let filteredCustomer = merchantsList?.filter((data) => {
        if (status !== 'all' && !startDate && !endDate) {
          return data.Active === JSON.parse(status)
        } else if (status === 'all' && !startDate && !endDate) {
          return data
        } else if (!status && !startDate && !endDate) {
          return data
        } else if (status === 'all' && startDate && endDate) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return itemDate >= start && itemDate <= end;
        } else if (status !== 'all' && startDate && endDate) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return itemDate >= start && itemDate <= end
            && data.Active === JSON.parse(status)
        } else if (!status && startDate && endDate) {
          const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
          let start = Moment(startDate).format("YYYY-MM-DD");
          let end = Moment(endDate).format("YYYY-MM-DD");
          return itemDate >= start && itemDate <= end;
        }
        return data;
      })
      setFilteredData(filteredCustomer)
    } else {
      setFilteredData(null)
    }
  }

  const CancelHandler = () => {
    setsearchKey('')
    setStatus('all')
    setStartDate()
    setEndDate()
    setActiveItem('Today')
    setFilteredData(null)
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
          dispatch(deleteMerchant(id, token))

          swal("Poof! Merchant details has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Merchant details are safe!");
        }
      })
  }

  const headers = [
    { label: "Business Name", key: "business_name" },
    { label: "Type", key: "type" },
    { label: "Location", key: "city" },
    { label: "Zone", key: "zone" },
    { label: "Service Type", key: "service_type" },
    { label: "Maximum Limit", key: "maxLimit" },
    { label: "Holiday Services", key: "holiday_services" },
    { label: "Banks", key: "selected_banks" },
    { label: "Contact Person", key: "contactPerson" },
    { label: "Office Address", key: "address" },
    { label: "Email Address", key: "email" },
    { label: "Phone Number", key: "phone" }
  ]

  const formattedPhoneNumber = (phone) => {
    if (phone && typeof phone === 'number') {
      const phoneString = phone.toString();
      return phoneString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return '';
  };


  return (
    <div className="content-page position-relative" id="content">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right"></div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6 col-xl-4'>
              <div className="card-box">
                <Link to="/customer/listing">
                  <div className="row">
                    <div className="col-4">
                      <div className="avatar-lg d-flex justify-content-center align-items-center">
                        <img src={merchant} alt='user-img' className='img-fluid rounded-circle' />
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="text-end">
                        <h4 className="mt-1 text-dark">{totalMerchants && totalMerchants.total}</h4>
                        <p className="text-muted mb-1 text-truncate" style={{ fontSize: "14px" }}>
                          Total Customer
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='col-md-6 col-xl-4'>
              <div className="widget-rounded-circle card-box">
                <Link to="/customer/listing">
                  <div className="row">
                    <div className="col-4">
                      <div className="avatar-lg d-flex justify-content-center align-items-center">
                        <img src={merchant} alt='user-img' className='img-fluid rounded-circle' />
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="text-end">
                        <h4 className="mt-1 text-dark">{totalMerchants && totalMerchants.active}</h4>
                        <p className="text-muted mb-1 text-truncate" style={{ fontSize: "14px" }}>
                          Active Customer
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='col-md-6 col-xl-4'>
              <div className="widget-rounded-circle card-box">
                <Link to="/customer/listing">
                  <div className="row">
                    <div className="col-4">
                      <div className="avatar-lg d-flex justify-content-center align-items-center">
                        <img src={merchant} alt='user-img' className='img-fluid rounded-circle' />
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="text-end">
                        <h4 className="mt-1 text-dark">{totalMerchants && totalMerchants.in_active}</h4>
                        <p className="text-muted mb-1 text-truncate" style={{ fontSize: "14px" }}>
                          Inactive Customer
                        </p>
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
                            <div className="col-lg-3 col-md-12 col-xl-6">
                              <h5 className="page-title">Customers</h5>
                            </div>

                            <div className="col-md-4 col-lg-3 text-end mb-3 col-xl-2">
                              {merchantsList && merchantsList.length > 0 ? (
                                <button className="btn btn-light btn-sm form-control py-2">
                                  {merchantsList && (
                                    <CSVLink
                                      filename={`CustomersList.csv`}
                                      data={merchantsList && merchantsList}
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
                            <div className="col-md-4 col-lg-3 text-end mb-3 col-xl-2">
                              <Link to="/customer/add">
                                <button className="btn btn-danger btn-sm form-control py-2" type="button"
                                  id="delete_user"
                                  style={{ backgroundColor: "rgb(185, 67, 58)", borderColor: "rgb(185, 67, 58)", fontSize: '0.7875rem' }}>
                                  Add Customer
                                </button>
                              </Link>
                            </div>
                            <div className="col-md-4 col-lg-3 text-end mb-4 col-xl-2">
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
                          </div>


                          <div id="box-div">
                            <div style={{ display: (visible ? 'none' : 'block') }}>
                              <div className="row mb-3" id="filters">
                                <div className={`col-md-3 mb-3 `}>
                                  <Select
                                    classNamePrefix="select2"
                                    options={options}
                                    value={options.find((option) => option.value === status)}
                                    onChange={handleSelectChange}
                                    style={{ fontSize: "0.875rem" }}
                                    components={{
                                      IndicatorSeparator: null,
                                      DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                        menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                    }}
                                  />
                                </div>

                                <div className="col-md-9  col-xl-4 col-lg-5 mb-3" >
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

                                <div className="col-md-3 col-xl-3 col-lg-2 text-end mb-3">
                                  <input type="text"
                                    className="form-control search-input"
                                    name="searchKey"
                                    placeholder="Search..."
                                    value={searchKey}
                                    onChange={(e) => searchHandler(e)} />
                                </div>

                                <div className="col-md-3 col-xl-2">
                                  <div className="row justify-content-center">
                                    <button type="submit"
                                      className="btn btn-primary p-0 me-3"
                                      name="submit"
                                      style={{
                                        padding: "5",
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "4px"
                                      }}>
                                      <AiOutlineSearch size={20}
                                        onClick={OnClickHandler}
                                      />
                                    </button>

                                    <button type="button"
                                      className="btn btn-danger p-0"
                                      name="button"
                                      style={{
                                        padding: "5",
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "4px"
                                      }}>
                                      <MdCancel size={20}
                                        onClick={CancelHandler}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='table-responsive'>
                              <table id="" className="table table-striped border-top custom_table mb-5">
                                <thead>
                                  <tr>
                                    <th>#ID</th>
                                    <th>Business Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Total Request</th>
                                    <th>Create at</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    filteredData ? filteredData.map((element, i) => {
                                      return (
                                        <tr key={element._id} >
                                          <td>{i + 1}</td>
                                          <td>{element.business_name}</td>
                                          <td> {element.email} </td>
                                          <td>{'+1' + formattedPhoneNumber(element.phone)}</td>
                                          <td>
                                            <Link to="/admin/requests"
                                              className="btn btn-success">
                                              {totalRequests[element._id]}
                                            </Link>
                                          </td>
                                          <td>{Moment(element.created_at).format('DD/MM/YYYY')}</td>
                                          <td>
                                            <Switch
                                              checked={element.Active ? true : false}
                                              onChange={(newValue) => handleChange(element._id, newValue)}
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
                                                  to={'/customer/edit/' + element._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  Edit
                                                </Link>
                                                <Link
                                                  className="dropdown-item"
                                                  to="#"
                                                  style={{ color: "#676868" }}
                                                  onClick={() => handleDelete(element._id)}
                                                >
                                                  Delete
                                                </Link>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    }) : merchantsList && merchantsList.map((element, i) => {
                                      return (
                                        <tr key={element._id} >
                                          <td>{i + 1}</td>
                                          <td>{element.business_name}</td>
                                          <td>{element.email}</td>
                                          <td>{'+1' + formattedPhoneNumber(element.phone)}</td>
                                          <td>
                                            <Link to={'/customer-request-list/' + element._id}
                                              className="btn btn-success">
                                              {totalRequests[element._id]}
                                            </Link>
                                          </td>
                                          <td>{Moment(element.created_at).format('DD/MM/YYYY')}</td>
                                          <td>
                                            <Switch
                                              checked={element.Active ? true : false}
                                              onChange={(newValue) => handleChange(element._id, newValue)}
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
                                                  to={'/customer/edit/' + element._id}
                                                  style={{ color: "#676868" }}
                                                >
                                                  Edit
                                                </Link>
                                                <Link
                                                  className="dropdown-item"
                                                  to="#"
                                                  style={{ color: "#676868" }}
                                                  onClick={() => handleDelete(element._id)}
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

export default Customer;