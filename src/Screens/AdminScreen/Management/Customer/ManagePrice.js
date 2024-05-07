import React, { useState } from 'react'
import { FiActivity } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import TimePickers from '../../../../components/TimePicker.js';
import CurrencyInput from 'react-currency-input-field';
import { logger } from '../../../../util/util.js';


const ManagePrice = ({ state, setState, selectedDays, setSelectedDays, checked, setChecked }) => {
    const [duplicateAll, setDuplicateAll] = useState(false);
    const weekDays = ["tue", "wed", "thu", "fri"];

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value.replace(/[^0-9.]/g, "") });
    }

    const handleDatePickerChange = (name, date) => {
        setState(state => ({
            ...state,
            [name]: date
        }));
    };

    const areAllInputsFilled = () => {
        return state.price && state.startDate && state.endDate && state.price_Premium
            && state.startDate_Premium && state.endDate_Premium
    }

    const areAllTueInputsFilled = () => {
        return state.tue_price && state.tue_startDate && state.tue_endDate && state.tue_price_Premium
            && state.tue_startDate_Premium && state.tue_endDate_Premium
    }

    const areAllWedInputsFilled = () => {
        return state.wed_price && state.wed_startDate && state.wed_endDate && state.wed_price_Premium
            && state.wed_startDate_Premium && state.wed_endDate_Premium
    }

    const areAllThuInputsFilled = () => {
        return state.thu_price && state.thu_startDate && state.thu_endDate && state.thu_price_Premium
            && state.thu_startDate_Premium && state.thu_endDate_Premium
    }

    const areAllFriInputsFilled = () => {
        return state.fri_price && state.fri_startDate && state.fri_endDate && state.fri_price_Premium
            && state.fri_startDate_Premium && state.fri_endDate_Premium
    }

    const areAllSatInputsFilled = () => {
        return state.sat_price_Premium && state.sat_startDate_Premium && state.sat_endDate_Premium
    }

    const areAllSunInputsFilled = () => {
        return state.sun_price_Premium && state.sun_startDate_Premium && state.sun_endDate_Premium
    }

    const handleCheck = (e, Type) => {
        if (e.target.checked) {
            setSelectedDays([...selectedDays, Type]);
        } else {
            setSelectedDays(selectedDays.filter(d => d !== Type));
        }
        switch (Type) {
            case "MONDAY":
                let temObject = {
                    day_type: 'Monday',
                    services: [
                        {
                            name: 'Normal',
                            price: state.price,
                            start: state.startDate,
                            end: state.endDate
                        },
                        {
                            name: 'Premium',
                            price: state.price_Premium,
                            start: state.startDate_Premium,
                            end: state.endDate_Premium
                        }
                    ],
                }
                setChecked({ ...checked, mon_checked: e.target.checked })
                if (e.target.checked) {
                    logger("inside if ");
                    state.weekly_service.push(temObject)
                } else {
                    logger("inside else condition");
                    const data = state.weekly_service.filter(item => item.day_type !== "Monday")
                    state.weekly_service = data
                }
                break;

            case "TUESDAY":
                let tueArray =
                {
                    day_type: 'Tuesday',
                    services: [
                        {
                            name: 'Normal',
                            price: state.tue_price,
                            start: state.tue_startDate,
                            end: state.tue_endDate
                        },
                        {
                            name: 'Premium',
                            price: state.tue_price_Premium,
                            start: state.tue_startDate_Premium,
                            end: state.tue_endDate_Premium
                        }
                    ],
                }
                setChecked({ ...checked, tue_checked: e.target.checked })
                if (e.target.checked) {
                    state.weekly_service.push(tueArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Tuesday")
                    state.weekly_service = data
                }
                break;

            case "WEDNESDAY":
                let wedObject =
                {
                    day_type: 'Wednesday',
                    services: [
                        {
                            name: 'Normal',
                            price: state.wed_price,
                            start: state.wed_startDate,
                            end: state.wed_endDate
                        },
                        {
                            name: 'Premium',
                            price: state.wed_price_Premium,
                            start: state.wed_startDate_Premium,
                            end: state.wed_endDate_Premium
                        }
                    ],
                }
                setChecked({ ...checked, wed_checked: e.target.checked })
                if (e.target.checked) {
                    state.weekly_service.push(wedObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Wednesday")
                    state.weekly_service = data
                }
                break;

            case "THURSDAY":
                let thuObject =
                {
                    day_type: 'Thursday',
                    services: [
                        {
                            name: 'Normal',
                            price: state.thu_price,
                            start: state.thu_startDate,
                            end: state.thu_endDate
                        },
                        {
                            name: 'Premium',
                            price: state.thu_price_Premium,
                            start: state.thu_startDate_Premium,
                            end: state.thu_endDate_Premium
                        }
                    ],
                }
                setChecked({ ...checked, thu_checked: e.target.checked })
                if (e.target.checked) {
                    state.weekly_service.push(thuObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Thursday")
                    state.weekly_service = data
                }
                break;

            case "FRIDAY":
                let friObject =
                {
                    day_type: 'Friday',
                    services: [
                        {
                            name: 'Normal',
                            price: state.fri_price,
                            start: state.fri_startDate,
                            end: state.fri_endDate
                        },
                        {
                            name: 'Premium',
                            price: state.fri_price_Premium,
                            start: state.fri_startDate_Premium,
                            end: state.fri_endDate_Premium
                        }
                    ],
                }
                setChecked({ ...checked, fri_checked: e.target.checked })
                if (e.target.checked) {
                    state.weekly_service.push(friObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Friday")
                    state.weekly_service = data
                }
                break;

            case "SATURDAY":
                let satObject =
                {
                    day_type: 'Saturday',
                    services: [

                        {
                            name: 'Premium',
                            price: state.sat_price_Premium,
                            start: state.sat_startDate_Premium,
                            end: state.sat_endDate_Premium
                        }
                    ],
                }
                setChecked({ ...checked, sat_checked: e.target.checked })
                if (e.target.checked) {
                    state.weekly_service.push(satObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Saturday")
                    state.weekly_service = data
                }
                break;

            case "SUNDAY":
                let sunObject =
                {
                    day_type: 'Sunday',
                    services: [
                        {
                            name: 'Premium',
                            price: state.sun_price_Premium,
                            start: state.sun_startDate_Premium,
                            end: state.sun_endDate_Premium
                        }
                    ],
                }
                setChecked({ ...checked, sun_checked: e.target.checked })
                if (e.target.checked) {
                    state.weekly_service.push(sunObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Sunday")
                    state.weekly_service = data
                }
                break;

            default:
                break;
        }

    }

    const handleDuplicateAllChange = (event) => {
        setDuplicateAll(event.target.checked);
        if (event.target.checked) {
            // When "Duplicate All" is checked, set the values for other days to match Monday
            // Assuming your weekDays array contains the names of all the days you want to duplicate to (e.g., ['Tuesday', 'Wednesday', ...])
            weekDays.forEach((day) => {
                if (day !== "Monday") {
                    setState((prevState) => ({
                        ...prevState,
                        [`${day}_price`]: state.price,
                        [`${day}_startDate`]: state.startDate,
                        [`${day}_endDate`]: state.endDate,
                        [`${day}_price_Premium`]: state.price_Premium,
                        [`${day}_startDate_Premium`]: state.startDate_Premium,
                        [`${day}_endDate_Premium`]: state.endDate_Premium,
                    }));
                }
            });
        }
    };


    return (
        <>
            <div className='row align-items-center mt-3'>

                <div className="col-md-12 mt-3">
                    <h6 className="mb-2 text-uppercase" style={{ fontWeight: '700' }}>
                        <FiActivity className='me-1' />  Weekly Services
                    </h6>

                    <div className="float-end mb-3 d-flex align-items-center">
                        <input
                            type="checkbox"
                            className=""
                            id="duplicateAllCheckbox"
                            checked={duplicateAll}
                            onChange={handleDuplicateAllChange}
                        />
                        <label className="form-check-label fw-bold ms-2"
                            htmlFor="duplicateAllCheckbox"
                            style={{ color: '#6c757d', fontSize: '15px' }}
                        >
                            Duplicate All
                        </label>
                    </div>
                </div>

                <div className='col-md-1 pt-2'>
                    <input type='checkbox'
                        className='Checkboxes'
                        disabled={!areAllInputsFilled()}
                        onChange={(e) => handleCheck(e, "MONDAY")}
                        checked={checked.mon_checked === true}
                    />
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label></label>
                        <p style={{ fontSize: '18px', color: checked.mon_checked === true ? 'black' : 'gray' }}
                            className="form-control border-0 input_days">Monday</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Normal"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control d-flex mb-3'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='price'
                                value={state.price}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.mon_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.startDate}
                            name="startDate"
                            onChange={(date) => handleDatePickerChange("startDate", date)}
                            disabled={checked.mon_checked === true}
                            fullTimeDropdown={checked.mon_checked === true ? false : true}
                        />

                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.endDate}
                            name="endDate"
                            onChange={(date) => handleDatePickerChange("endDate", date)}
                            disabled={checked.mon_checked === true}
                            fullTimeDropdown={checked.mon_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1 pt-2'>

                </div>
                <div className="col-md-2">

                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Premium"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='price_Premium'
                                value={state.price_Premium}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.mon_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.startDate_Premium}
                            name="startDate_Premium"
                            onChange={(date) => handleDatePickerChange("startDate_Premium", date)}
                            disabled={checked.mon_checked === true}
                            fullTimeDropdown={checked.mon_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.endDate_Premium}
                            name="endDate_Premium"
                            onChange={(date) => handleDatePickerChange("endDate_Premium", date)}
                            disabled={checked.mon_checked === true}
                            fullTimeDropdown={checked.mon_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1 pt-2'>
                    <input type='checkbox'
                        className='Checkboxes'
                        disabled={!areAllTueInputsFilled()}
                        onChange={(e) => handleCheck(e, "TUESDAY")}
                        checked={checked.tue_checked === true}
                    />
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label></label>
                        <p style={{ fontSize: '18px', color: checked.tue_checked === true ? 'black' : 'gray' }}
                            className="form-control border-0 input_days">Tuesday</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Normal"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='tue_price'
                                value={state.tue_price}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.tue_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.tue_startDate}
                            name="tue_startDate"
                            onChange={(date) => handleDatePickerChange("tue_startDate", date)}
                            disabled={checked.tue_checked === true}
                            fullTimeDropdown={checked.tue_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.tue_endDate}
                            name="tue_endDate"
                            onChange={(date) => handleDatePickerChange("tue_endDate", date)}
                            disabled={checked.tue_checked === true}
                            fullTimeDropdown={checked.tue_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1'>

                </div>
                <div className='col-md-2'>

                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Premium"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='tue_price_Premium'
                                value={state.tue_price_Premium}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.tue_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.tue_startDate_Premium}
                            name="tue_startDate_Premium"
                            onChange={(date) => handleDatePickerChange("tue_startDate_Premium", date)}
                            disabled={checked.tue_checked === true}
                            fullTimeDropdown={checked.tue_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.tue_endDate_Premium}
                            name="tue_endDate_Premium"
                            onChange={(date) => handleDatePickerChange("tue_endDate_Premium", date)}
                            disabled={checked.tue_checked === true}
                            fullTimeDropdown={checked.tue_checked === true ? false : true}
                        />

                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1 pt-2'>
                    <input type='checkbox'
                        className='Checkboxes'
                        disabled={!areAllWedInputsFilled()}
                        onChange={(e) => handleCheck(e, "WEDNESDAY")}
                        checked={checked.wed_checked === true}
                    />
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label></label>
                        <p style={{ fontSize: '18px', color: checked.wed_checked === true ? 'black' : 'gray' }}
                            className="form-control border-0 input_days">Wednesday</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Normal"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='wed_price'
                                value={state.wed_price}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.wed_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.wed_startDate}
                            name="wed_startDate"
                            onChange={(date) => handleDatePickerChange("wed_startDate", date)}
                            disabled={checked.wed_checked === true}
                            fullTimeDropdown={checked.wed_checked === true ? false : true}
                        />

                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.wed_endDate}
                            name="wed_endDate"
                            onChange={(date) => handleDatePickerChange("wed_endDate", date)}
                            disabled={checked.wed_checked === true}
                            fullTimeDropdown={checked.wed_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1'>

                </div>
                <div className='col-md-2'>

                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Premium"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='wed_price_Premium'
                                value={state.wed_price_Premium}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.wed_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.wed_startDate_Premium}
                            name="wed_startDate_Premium"
                            onChange={(date) => handleDatePickerChange("wed_startDate_Premium", date)}
                            disabled={checked.wed_checked === true}
                            fullTimeDropdown={checked.wed_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.wed_endDate_Premium}
                            name="wed_endDate_Premium"
                            onChange={(date) => handleDatePickerChange("wed_endDate_Premium", date)}
                            disabled={checked.wed_checked === true}
                            fullTimeDropdown={checked.wed_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1 pt-2'>
                    <input type='checkbox'
                        className='Checkboxes'
                        disabled={!areAllThuInputsFilled()}
                        onChange={(e) => handleCheck(e, "THURSDAY")}
                        checked={checked.thu_checked === true}
                    />
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label></label>
                        <p style={{ fontSize: '18px', color: checked.thu_checked === true ? 'black' : 'gray' }}
                            className="form-control border-0 input_days">Thursday</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Normal"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='thu_price'
                                value={state.thu_price}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.thu_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.thu_startDate}
                            name="thu_startDate"
                            onChange={(date) => handleDatePickerChange("thu_startDate", date)}
                            disabled={checked.thu_checked === true}
                            fullTimeDropdown={checked.thu_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.thu_endDate}
                            name="thu_endDate"
                            onChange={(date) => handleDatePickerChange("thu_endDate", date)}
                            disabled={checked.thu_checked === true}
                            fullTimeDropdown={checked.thu_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1'>

                </div>
                <div className='col-md-2'>

                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Premium"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='thu_price_Premium'
                                value={state.thu_price_Premium}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.thu_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.thu_startDate_Premium}
                            name="thu_startDate_Premium"
                            onChange={(date) => handleDatePickerChange("thu_startDate_Premium", date)}
                            disabled={checked.thu_checked === true}
                            fullTimeDropdown={checked.thu_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.thu_endDate_Premium}
                            name="thu_endDate_Premium"
                            onChange={(date) => handleDatePickerChange("thu_endDate_Premium", date)}
                            disabled={checked.thu_checked === true}
                            fullTimeDropdown={checked.thu_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1 pt-2'>
                    <input type='checkbox'
                        className='Checkboxes'
                        disabled={!areAllFriInputsFilled()}
                        onChange={(e) => handleCheck(e, "FRIDAY")}
                        checked={checked.fri_checked === true}
                    />
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label></label>
                        <p style={{ fontSize: '18px', color: checked.fri_checked === true ? 'black' : 'gray' }}
                            className="form-control border-0 input_days">Friday</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Normal"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='fri_price'
                                value={state.fri_price}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.fri_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.fri_startDate}
                            name="fri_startDate"
                            onChange={(date) => handleDatePickerChange("fri_startDate", date)}
                            disabled={checked.fri_checked === true}
                            fullTimeDropdown={checked.fri_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.fri_endDate}
                            name="fri_endDate"
                            onChange={(date) => handleDatePickerChange("fri_endDate", date)}
                            disabled={checked.fri_checked === true}
                            fullTimeDropdown={checked.fri_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1'>

                </div>
                <div className='col-md-2'>

                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Premium"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='fri_price_Premium'
                                value={state.fri_price_Premium}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.fri_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.fri_startDate_Premium}
                            name="fri_startDate_Premium"
                            onChange={(date) => handleDatePickerChange("fri_startDate_Premium", date)}
                            disabled={checked.fri_checked === true}
                            fullTimeDropdown={checked.fri_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.fri_endDate_Premium}
                            name="fri_endDate_Premium"
                            onChange={(date) => handleDatePickerChange("fri_endDate_Premium", date)}
                            disabled={checked.fri_checked === true}
                            fullTimeDropdown={checked.fri_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1 pt-2'>
                    <input type='checkbox'
                        className='Checkboxes'
                        disabled={!areAllSatInputsFilled()}
                        onChange={(e) => handleCheck(e, "SATURDAY")}
                        checked={checked.sat_checked === true}
                    />
                </div>

                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label></label>
                        <p style={{ fontSize: '18px', color: checked.sat_checked === true ? 'black' : 'gray' }}
                            className="form-control border-0 input_days">Saturday</p>
                    </div>
                </div>
                {/* <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Normal"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='sat_price'
                                value={state.sat_price}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.sat_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.sat_startDate}
                            name="sat_startDate"
                            onChange={(date) => handleDatePickerChange("sat_startDate", date)}
                            disabled={checked.sat_checked === true}
                            fullTimeDropdown={checked.sat_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.sat_endDate}
                            name="sat_endDate"
                            onChange={(date) => handleDatePickerChange("sat_endDate", date)}
                            disabled={checked.sat_checked === true}
                            fullTimeDropdown={checked.sat_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>

                <div className='col-md-1'>

                </div>
                <div className="col-md-2">

                </div> */}
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Premium"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='sat_price_Premium'
                                value={state.sat_price_Premium}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.sat_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.sat_startDate_Premium}
                            name="sat_startDate_Premium"
                            onChange={(date) => handleDatePickerChange("sat_startDate_Premium", date)}
                            disabled={checked.sat_checked === true}
                            fullTimeDropdown={checked.sat_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.sat_endDate_Premium}
                            name="sat_endDate_Premium"
                            onChange={(date) => handleDatePickerChange("sat_endDate_Premium", date)}
                            disabled={checked.sat_checked === true}
                            fullTimeDropdown={checked.sat_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>


                <div className='col-md-1 pt-2'>
                    <input type='checkbox'
                        className='Checkboxes'
                        disabled={!areAllSunInputsFilled()}
                        onChange={(e) => handleCheck(e, "SUNDAY")}
                        checked={checked.sun_checked === true}
                    />
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label></label>
                        <p style={{ fontSize: '18px', color: checked.sun_checked === true ? 'black' : 'gray' }}
                            className="form-control border-0 input_days">Sunday</p>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Service Type</label>
                        <input type="text"
                            className="form-control input_days"
                            style={{ fontSize: '15px' }}
                            defaultValue="Premium"
                            placeholder="Write here..."
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Rate</label>
                        <div className='form-control mb-3 d-flex'>
                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                            <CurrencyInput
                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                name='sun_price_Premium'
                                value={state.sun_price_Premium}
                                onChange={handleChange}
                                placeholder="Write here..."
                                disabled={checked.sun_checked === true}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>Start Time</label>
                        <TimePickers
                            value={state.sun_startDate_Premium}
                            name="sun_startDate_Premium"
                            onChange={(date) => handleDatePickerChange("sun_startDate_Premium", date)}
                            disabled={checked.sun_checked === true}
                            fullTimeDropdown={checked.sun_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group mb-3">
                        <label>End Time</label>
                        <TimePickers
                            value={state.sun_endDate_Premium}
                            name="sun_endDate_Premium"
                            onChange={(date) => handleDatePickerChange("sun_endDate_Premium", date)}
                            disabled={checked.sun_checked === true}
                            fullTimeDropdown={checked.sun_checked === true ? false : true}
                        />
                    </div>
                </div>
                <div className='col-md-1'>

                </div>
            </div>

        </>
    )
}

export default ManagePrice