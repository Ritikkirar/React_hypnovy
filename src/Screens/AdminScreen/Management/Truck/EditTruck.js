import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdSave } from 'react-icons/io'
import { FaTruck } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getTruckById, updateTruck } from '../../../../redux/actions/truckAction'
import { getAllRoutes } from '../../../../redux/actions/routeAction'
import Footer from "../../../../components/Footer/Footer";
import { logger } from '../../../../util/util'
import CurrencyInput from 'react-currency-input-field';

const EditTruck = ({ token }) => {
  const [trucks, setTrucks] = useState({
    truck_name: '',
    truck_no: '',
    truck_type: '',
    truck_insurance_amount: '',
    route: ''
  })
  const [truck_image, setTruckImage] = useState()
  const [truck_document, setTruckDocument] = useState('')
  const [imageName, setImageName] = useState('')
  const [documentName, setDocumentName] = useState('')
  const [imageSource, setImageSource] = useState('')
  const { id } = useParams()

  const { truckDetails } = useSelector(state => state.truckDetails)
  const { routeList } = useSelector(state => state.routeList)

  logger("truckDetails", truckDetails)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(getTruckById(id, token));
    dispatch(getAllRoutes(token))
  }, [dispatch, id, token])


  useEffect(() => {
    if (truckDetails) {
      setTrucks({
        ...truckDetails,
        truck_name: truckDetails.truck.truck_name,
        truck_no: truckDetails.truck.truck_no,
        truck_type: truckDetails.truck.truck_type,
        truck_insurance_amount: truckDetails.truck.truck_insurance_amount,
        route: truckDetails.truck.route._id
      })
      setTruckImage(truckDetails.truck.truck_image)
      setTruckDocument(truckDetails.truck.truck_document)
    }
  }, [truckDetails])


  const OnChangeHandler = (e) => {
    if (e.target.name === "truck_insurance_amount") {
    setTrucks({ ...trucks, truck_insurance_amount: e.target.value.replace(/[^0-9.]/g, "") })

    }else{
      setTrucks({ ...trucks, [e.target.name]: e.target.value })
    }
   
  }

  const handlePhoto = (e) => {
    logger("e.target.files",e.target.files);
    setTruckImage(e.target.files[0])
    setImageName(e.target.files[0].name)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSource(reader.result);
    };
    reader.readAsDataURL(file);
  }


  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('truck_name', trucks.truck_name)
    formData.append('truck_no', trucks.truck_no)
    formData.append('truck_type', trucks.truck_type)
    formData.append('truck_insurance_amount', trucks.truck_insurance_amount)
    formData.append('route', trucks.route)
    formData.append('truck_image', truck_image)
    formData.append('truck_document', truck_document)
    // logger("formdata", Object.fromEntries(formData));
    dispatch(updateTruck(id, formData, token, navigate))
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
                        <FaTruck className='me-1' size={20} />
                        Update Truck
                      </h6>

                      <img src={imageSource ? imageSource : truck_image && truck_image}
                        alt='truck'
                        className='float-end border mt-3'
                        style={{ width: '300px', height: '300px' }}
                      />

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Truck Name
                            </label>
                            <input type="text"
                              className="form-control route-name"
                              placeholder="Enter Truck Name"
                              onChange={OnChangeHandler}
                              name="truck_name"
                              value={trucks.truck_name}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Truck Number
                            </label>
                            <input type="text"
                              className="form-control"
                              placeholder="Enter Truck Number"
                              onChange={OnChangeHandler}
                              name="truck_no"
                              value={trucks.truck_no}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Truck Type
                            </label>
                            <input type="text"
                              className="form-control"
                              placeholder="Enter Truck Type"
                              onChange={OnChangeHandler}
                              name="truck_type"
                              value={trucks.truck_type}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Truck Insurance Amount
                            </label>

                            <div className="form-control d-flex" >
                             <span class="prefix">$</span>
                            <CurrencyInput
                            id="input-example"
                            style={{ border: 'none', width: 120, outline: 'none' }}
                             type="text"
                             className="my-input"
                              placeholder="Enter Truck Insurance Amount"
                              onChange={OnChangeHandler}
                              name="truck_insurance_amount"
                              value={trucks.truck_insurance_amount}
                              required
                            />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="form-group">
                             <label className="form-control-label fw-bold mb-2">
                              Truck Image
                            </label>
                            <div className='d-flex align-items-start'>
                              <input
                                className="form-control"
                                type="file"
                                style={{ color: 'transparent', width: '105px', marginRight: '8px' }}
                                name="truck_image"
                                // value={imageName}
                                onChange={handlePhoto}
                              />
                              <div style={{ width: 'calc(100% - 105px)', wordWrap: 'break-word' }}>
                                {imageName ? (
                                  <div>{imageName}</div>
                                ) : (
                                  <div>
                                    {truck_image && truck_image.substring(truck_image.lastIndexOf('/') + 1)}
                                  </div>
                                )}
                              </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2 mb-2">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Truck Document
                            </label>
                            <div className='d-flex align-items-start'>
                              <input
                                className="form-control"
                                style={{ color: 'transparent', width: '105px', marginRight: '8px' }}
                                type="file"
                                name="truck_document"
                                onChange={(e) => {
                                  setTruckDocument(e.target.files[0]);
                                  setDocumentName(e.target.files[0].name);
                                }}
                              />
                              <div style={{ width: 'calc(100% - 105px)', wordWrap: 'break-word' }}>
                                {documentName ? (
                                  <div>{documentName}</div>
                                ) : (
                                  <div>
                                    {truck_document && truck_document.substring(truck_document.lastIndexOf('/') + 1)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-control-label fw-bold mb-2">
                              Select Route
                            </label>
                            <select className="form-control select2 form-select"
                              name="route"
                              value={trucks.route}
                              onChange={OnChangeHandler}
                              required
                            >
                              <option value=''>--Select Route--</option>
                              {routeList && routeList.map((item, i) => {
                                return (
                                  <option key={i} value={item._id}>{item.name}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>

                      </div>

                      <div className="text-start mt-2">
                        <button type="submit"
                          className="btn btn-success waves-effect waves-light mt-2">
                          <IoMdSave className="me-1" />
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

export default EditTruck