import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdAccountCircle, MdOutlineContacts } from 'react-icons/md'
import { IoMdSave } from 'react-icons/io'
import { getOfficerDetailsById, updateOfficer } from '../../../../redux/actions/officerAction'
import { getTruckListByZone } from '../../../../redux/actions/truckAction'
import { getAllRoutes } from '../../../../redux/actions/routeAction'
import Footer from '../../../../components/Footer/Footer'
import '../../Home.css'
import InputMask from 'react-input-mask'
import { logger } from '../../../../util/util'
import '../../Home.css'


const EditOfficer = ({ token }) => {
  const { id } = useParams()
  const [state, setState] = useState({
    officer_id: '',
    name: '',
    email: '',
    gender: '',
    date_of_birth: '',
    mobile: '',
    zone: '',
    officer_type: '',
    truck: ''
  })
  const [officerImage, setOfficerImage] = useState()
  const [officerImageName, setOfficerImageName] = useState()
  const [imageSource, setImageSource] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { officerDetails } = useSelector((state) => state.officerDetails)
  const { trucks } = useSelector((state) => state.trucks)
  const { routeList } = useSelector(state => state.routeList)

  logger("routeList on edit officer", routeList)
  logger("officerDetails", officerDetails)
  logger("zone", state.zone)

  useEffect(() => {
    dispatch(getOfficerDetailsById(id, token));
    dispatch(getAllRoutes(token))
  }, [dispatch, id, token])


  useEffect(() => {
    if (officerDetails) {
      setState({
        officer_id: officerDetails.officer_id,
        name: officerDetails.name,
        email: officerDetails.email,
        gender: officerDetails.gender,
        date_of_birth: officerDetails.date_of_birth,
        mobile: officerDetails.mobile,
        zone: officerDetails.zone,
        officer_type: officerDetails.officer_type,
        truck: officerDetails.truck_id
      })
      setOfficerImage(officerDetails.officerImage)
      dispatch(getTruckListByZone(officerDetails.zone, token))
    }
  }, [officerDetails, dispatch, token])


  const OnChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const OnChangeHandle = (newPhoneValue) => {
    logger("newPhoneValue", newPhoneValue.target.value)
    const formattedPhoneNumber = newPhoneValue.target.value
    const unformattedPhoneNumber = formattedPhoneNumber.replace(/\D/g, '');
    logger("unformattedPhoneNumber", unformattedPhoneNumber)
    setState((prevState) => ({ ...prevState, mobile: unformattedPhoneNumber }));
  };

  const handlePhoto = (e) => {
    setOfficerImage(e.target.files[0])
    setOfficerImageName(e.target.files[0].name)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSource(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_id', id)
    formData.append('officer_id', state.officer_id)
    formData.append('officer_type', state.officer_type)
    formData.append('name', state.name)
    formData.append('email', state.email)
    formData.append('gender', state.gender)
    formData.append('mobile', state.mobile)
    formData.append('zone', state.zone)
    formData.append('truck', state.truck)
    formData.append('date_of_birth', state.date_of_birth)
    formData.append('officerImage', officerImage)
    logger("formData", Object.fromEntries(formData))

    dispatch(updateOfficer(formData, token, navigate))
  }


  return (
    <div className="content-page position-relative" id="content">
      <div className="content">
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-lg-12 col-xl-12">
              <div className="card-box" style={{ marginBottom: '60px' }}>
                <div className="tab-content pt-0">
                  <div className="tab-pane mt-3 show active" id="change_pwd">
                    <form onSubmit={submitHandler}>
                      <input type="hidden"
                        name="_token"
                        value="rs4zJREqupYowTKVG453jbCwMbyTl8CCrUddagdi"
                      />
                      <h6 className="mb-4 text-uppercase" style={{ fontWeight: '700' }}>
                        <MdAccountCircle className='me-1' size={20} />
                        Update Officer
                      </h6>

                      <img src={imageSource ? imageSource : officerImage && officerImage}
                        alt='officer'
                        className='float-end border mt-3'
                        style={{ width: '300px', height: '300px' }}
                      />

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Officer Id
                            </label>
                            <input type="text"
                              className="form-control"
                              placeholder="Enter Login Id for Officer"
                              onChange={OnChangeHandler}
                              name="officer_id"
                              value={state.officer_id}
                              required
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Officer Type
                            </label>
                            <select className="form-control select2 form-select"
                              name="officer_type"
                              value={state.officer_type}
                              onChange={OnChangeHandler}
                              required
                            >
                              <option value="">-- Select Officer Type --</option>
                              <option value="Driver">Driver</option>
                              <option value="Messenger">Messenger</option>
                              <option value="Shotgun">Shotgun</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Name
                            </label>
                            <input type="text"
                              className="form-control route-name"
                              placeholder="Full name"
                              onChange={OnChangeHandler}
                              name="name"
                              value={state.name}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Gender
                            </label>
                            <select className="form-control select2 form-select"
                              name="gender"
                              value={state.gender}
                              onChange={OnChangeHandler}
                              required
                              >
                              <option value="">-- Select Gender --</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold">Zone</label>
                            <select className="form-control select2 form-select"
                              name="zone"
                              value={state.zone}
                              onChange={(e) => {
                                OnChangeHandler(e)
                                dispatch(getTruckListByZone(e.target.value, token))
                              }}
                              required
                              >
                              <option value="">-- Select Zone --</option>
                              {routeList && routeList.map((data, i) => {
                                return (
                                  <option key={i} value={data._id}>{data.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Select Truck
                            </label>
                            <select className="form-control select2 form-select"
                              name="truck"
                              value={state.truck}
                              onChange={OnChangeHandler}
                              required
                            >
                              <option value="">-- Select Truck --</option>
                              {trucks && trucks.map((data, i) => {
                                return (
                                  <option key={i} value={data._id} >
                                    {data.truck_name} | {data.truck_no}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Date of Birth
                            </label>
                            <input type="date"
                              className="form-control"
                              placeholder="DOB"
                              onChange={OnChangeHandler}
                              name="date_of_birth"
                              value={state.date_of_birth}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold">Officer Image</label>
                            <div className='d-flex align-items-start'>
                              <input
                                type="file"
                                style={{ color: 'transparent', width: '105px', marginRight: '8px' }}
                                onChange={handlePhoto}
                                id="input-first-name"
                                className="form-control"
                                placeholder="Add Location"
                                name="officerImage"
                              />
                              <div style={{ width: 'calc(100% - 105px)', wordWrap: 'break-word' }}>
                                {officerImageName ? (
                                  <div>{officerImageName}</div>
                                ) : (
                                  <div>
                                    {officerImage && officerImage.substring(officerImage.lastIndexOf('/') + 1)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-12 mt-3">
                          <h6 className="mb-2 text-uppercase" style={{ fontWeight: '700' }}>
                            <MdOutlineContacts className='me-1' />
                            Contact Information
                          </h6>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Email
                            </label>
                            <input type="email"
                              className="form-control"
                              placeholder="Enter Email"
                              onChange={OnChangeHandler}
                              name="email"
                              value={state.email}
                              required 
                              />
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Phone Number
                            </label>
                            <InputMask
                              className="form-control"
                              mask="999-999-9999"
                              maskChar=""
                              alwaysShowMask={false}
                              onChange={OnChangeHandle}
                              value={state.mobile.toString()}
                              name="mobile"
                              required
                            >
                              {(inputProps) => <input {...inputProps} type="text" />}
                            </InputMask>
                          </div>
                        </div>

                      </div>

                      <div className="text-start mt-2">
                        <button type="submit"
                          className="btn btn-success waves-effect waves-light mt-2">
                          <IoMdSave />
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

      <Footer />
    </div>
  )
}


export default EditOfficer