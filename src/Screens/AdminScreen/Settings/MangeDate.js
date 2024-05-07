import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer/Footer'
import moment from "moment"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addHolidayDate, deleteHolidayDate, getHolidayDate } from '../../../redux/actions/adminAction';
import swal from 'sweetalert';


const MangeDate = ({ token }) => {
  const dispatch = useDispatch()
  const [datevalue, setdateValue] = useState(new Date());
  const [holidayName, setHolidayName] = useState();
  const { holidayDatesLists } = useSelector((state) => state.holidayDatesList)


  useEffect(() => {
    dispatch(getHolidayDate(token))
  }, [dispatch, token])


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
          dispatch(deleteHolidayDate(id, token))

          swal("Poof! Holiday Date has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Holiday Date are safe!");
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addHolidayDate(moment(datevalue).format('DD-MM-YYYY'), holidayName, token))
    setHolidayName('')
    setdateValue(new Date())
  }


  return (
    <>
      <div className="content-page position-relative" id="content">
        <div className="content">
          <div className="row">
            <div className="col-xl-12 order-xl-1 order-2 mt-2">
              <div className="card mb-2">
                <div className="card-body pt-2 pb-2">
                  <div className="row my-2">
                    <div className="col-lg-5">
                      <h5 className="page-title mt-2">Holiday Dates</h5>
                    </div>
                    <div className="col-lg-7">
                      <div className="input-group">
                        <form onSubmit={handleSubmit} className='d-flex'>
                          <div className='mb-2 me-2'>
                            <input
                              type='text'
                              name='holidayName'
                              value={holidayName}
                              onChange={(e) => setHolidayName(e.target.value)}
                              placeholder='Enter Holiday Name'
                              className="form-control"
                              required
                            />
                          </div>
                          <div className='mb-2'>
                            <DatePicker
                              selected={datevalue}
                              onChange={date => setdateValue(date)}
                              aria-describedby="basic-addon1"
                              className="form-control"
                              dateFormat={moment(datevalue).format('DD-MM-YYYY')}
                              required
                            />
                          </div>
                          <div className="input-group-prepend ms-1">
                            <button
                              type="submit"
                              className="btn btn-success waves-effect waves-light"
                              data-toggle="modal"
                              data-target="#custom-modal"
                            >
                              Add New
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="row align-items-center pb-0 pt-4">
                    {holidayDatesLists && holidayDatesLists.map((item, i) => (
                      <div className="col-lg-3" key={i}>
                        <div className="input-group mb-3">
                          <div className="form-control rounded d-flex align-items-center justify-content-between">
                            <div>
                              <p className='mb-0 fw-bold text-capitalize' style={{ fontSize: '12px' }}>
                                {item.name}
                              </p>
                              <p className='mb-0'>{item.date}</p>
                            </div>
                            <div className="input-group-prepend ms-1">
                              <button type="button"
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-danger waves-effect waves-light"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MangeDate