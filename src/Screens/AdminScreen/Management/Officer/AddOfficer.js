import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd'
import { MdAccountCircle, MdOutlineContacts } from 'react-icons/md'
import { IoMdSave } from 'react-icons/io'
import { logger } from '../../../../util/util'
import { addOfficer } from '../../../../redux/actions/officerAction'
import { getTruckListByZone } from '../../../../redux/actions/truckAction'
import Footer from '../../../../components/Footer/Footer'
import '../../Home.css'
import SignatureCanvas from 'react-signature-canvas';
import { getAllRoutes } from '../../../../redux/actions/routeAction';
import InputMask from 'react-input-mask';



const AddOfficer = ({ token }) => {
  const [state, setState] = useState({
    // officer_id: `OFFICER${generateUniqueNumber(4)}`,
    officer_id: '',
    name: '',
    email: '',
    gender: '',
    date_of_birth: '',
    mobile: '',
    officer_type: '',
    password: '',
    truck: '',
    zone: ''
  })
  const [officerImage, setOfficerImage] = useState()
  const [isValid, setIsValid] = useState()
  const [signature, setSignature] = useState('');
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);

  const [isSignatureSelected, setIsSignatureSelected] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const sigCanvas = useRef({})
  const inputFileRef = useRef({})

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { trucks } = useSelector((state) => state.trucks)
  const { routeList } = useSelector(state => state.routeList)

  logger("routeList in add officer", routeList)
  logger("trucks in add officer", trucks)

  useEffect(() => {
    dispatch(getAllRoutes(token))
  }, [dispatch, token])


  const Error = (value) => {
    return message.error({
      content: `${value}!`,
      duration: 2
    });
  };

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

  const handlePasswordChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setShowPasswordConditions(true);
    const inputValue = e.target.value;
    setIsValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(inputValue))
  };

  const handleSignatureButtonClick = () => {
    setIsSignatureSelected(true);
  };

  const handleImageButtonClick = () => {
    setIsSignatureSelected(false);
  };

  const handleSignatureClear = () => {
    sigCanvas.current.clear();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    logger("FileImage", file)
    setImageFile(file);
  };

  logger("IMAGE_FILE_STATE", imageFile)

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('officer_id', state.officer_id);
    formData.append('officer_type', state.officer_type);
    formData.append('name', state.name);
    formData.append('email', state.email);
    formData.append('gender', state.gender);
    formData.append('mobile', state.mobile);
    formData.append('password', state.password);
    formData.append('truck', state.truck);
    formData.append('date_of_birth', state.date_of_birth);
    formData.append('officerImage', officerImage);

    if (isSignatureSelected && signature) {
      logger("inside condition signature state")
      formData.append('user_signature', signature);
    } else if (!isSignatureSelected && imageFile) {
      logger("inside condition imageFile state")
      formData.append('signatureFile', imageFile)
    }

    formData.append('zone', state.zone);

    if (isValid) {
      dispatch(addOfficer(formData, token, navigate));
      // setState({
      //   officer_id: '',
      //   name: '',
      //   email: '',
      //   gender: '',
      //   date_of_birth: '',
      //   mobile: '',
      //   officer_type: '',
      //   password: '',
      //   truck: '',
      //   zone: '',
      // });
      // if (isSignatureSelected && signature) {
      //   sigCanvas.current.clear();
      //   setSignature('');
      // }
      // inputFileRef.current.value = '';
      // setOfficerImage(null);
      // setImageFile(null);
    } else {
      Error('Password is not strong enough');
    }
  };

  const handleEnd = () => {
    const canvas = sigCanvas.current;
    const signatureData = canvas.toDataURL();
    setSignature(signatureData);
  };


  return (
    <div className="content-page position-relative" id="content">
      <div className="content">
        <div className="container-fluid">

          <div className="row mt-3">
            <div className="col-lg-12 col-xl-12">
              <div className="card-box" style={{ marginBottom: '60px' }}>
                <div className="tab-content pt-0">

                  <div className="mt-3">
                    <form onSubmit={submitHandler} method="POST" encType="multipart/form-data">
                      <h6 className="mb-4 text-uppercase" style={{ fontWeight: '700' }}>
                        <MdAccountCircle className='me-1' size={20} style={{ marginTop: '-3px' }} />
                        Create Officer
                      </h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold">
                              Officer Id
                            </label>
                            <input type="text"
                              id="input-first-name"
                              className="form-control"
                              placeholder="Enter Id for Officer"
                              onChange={OnChangeHandler}
                              name="officer_id"
                              value={state.officer_id}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold">Officer Type</label>
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
                            <label className="form-control-label mb-2 fw-bold">Name</label>
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
                            <label className="form-control-label mb-2 fw-bold">Gender</label>
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
                            <label className="form-control-label mb-2 fw-bold">Select Truck</label>
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

                        <div className="col-md-6 mb-3 mt-2">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold">Date of Birth</label>
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
                            <label htmlFor='file' className="form-control-label mb-2 fw-bold">Officer Image</label>
                            <input type="file"
                              accept=".png, .jpg, .jpeg"
                              name="officerImage"
                              onChange={(e) => setOfficerImage(e.target.files[0])}
                              ref={inputFileRef}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold">
                              {isSignatureSelected ? 'Officer Signature' : 'Officer Signature'}
                            </label>
                            <div className='mb-3'>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={handleSignatureButtonClick}
                                style={{ marginRight: '20px' }}
                              >
                                Signature Canvas
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={handleImageButtonClick}
                              >
                                Upload Image
                              </button>
                            </div>
                            {isSignatureSelected ? (
                              <div>
                                <SignatureCanvas
                                  penColor="black"
                                  canvasProps={{
                                    className: "form-control",
                                    width: 500,
                                    height: 100,
                                    style: { border: "1px solid #ced4da", borderRadius: "0.375rem" },
                                  }}
                                  ref={sigCanvas}
                                  onEnd={handleEnd}
                                  required
                                />
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm mt-3"
                                  onClick={handleSignatureClear}
                                >
                                  Clear
                                </button>
                              </div>
                            ) : (
                              <div>
                                <input type="file"
                                  name='signatureFile'
                                  className="form-control"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  required
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold" >Password</label>
                            <input type="password"
                              className="form-control"
                              placeholder="Password"
                              name="password"
                              onChange={handlePasswordChange}
                              value={state.password}
                              required
                            />
                            {isValid ?
                              <p className='text-success mt-1 mb-0' style={{ fontSize: '12px', fontWeight: "bold" }}>Strong Password</p>
                              : isValid === false ? <p className='text-danger mt-1 mb-0' style={{ fontSize: '12px', fontWeight: "bold" }}>Weak Password</p>
                                : null
                            }
                            {showPasswordConditions && (
                              <div>
                                <p className='text-danger mb-0' style={{ fontSize: '12px' }}>
                                  Password should be minimum 8 digit & which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
                                </p>
                              </div>
                            )}
                          </div>
                        </div>


                        <div className="col-sm-12 mt-3">
                          <h6 className="mb-2 text-uppercase" style={{ fontWeight: '700' }}>
                            <MdOutlineContacts className='me-1' style={{ marginTop: '-3px' }} />
                            Contact Information
                          </h6>
                        </div>

                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label mb-2 fw-bold">Email</label>
                            <input type="email"
                              className="form-control mb-3"
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
                            <label className="form-control-label mb-2 fw-bold">Phone Number</label>
                            <InputMask
                              className="form-control"
                              mask="999-999-9999"
                              maskChar=""
                              alwaysShowMask={false}
                              placeholder="Enter Phone Number"
                              onChange={OnChangeHandle}
                              required
                            >
                              {(inputProps) => <input {...inputProps} type="text" />}
                            </InputMask>
                          </div>
                        </div>
                      </div>

                      <div className="text-start">
                        <button type="submit"
                          className="btn btn-success mt-2 d-flex align-items-center justify-content-center">
                          <IoMdSave size={18} />
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
      </div >
      <Footer />
    </div >
  )
}

export default AddOfficer