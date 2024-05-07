import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdAccountCircle, MdOutlineContacts } from 'react-icons/md'
import { IoMdSave } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd'
import { addMerchant } from '../../../../redux/actions/merchantAction'
import { getBanks } from '../../../../redux/actions/adminAction'
import Footer from '../../../../components/Footer/Footer'
import ManagePrice from './ManagePrice';
import { API_KEY, backend_uri_local } from '../../../../util/constant';
import { logger } from '../../../../util/util';
import { getAllRoutes } from '../../../../redux/actions/routeAction'
import '../../Home.css'
import axios from 'axios';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';


const AddCustomer = ({ token }) => {
    const [state, setState] = useState({
        business_name: '',
        userName: '',
        type: '',
        address: '',
        city: '',
        zone: '',
        maxLimit: '',
        contactPerson: '',
        email: '',
        phone: '',
        contactPerson_sec: '',
        contact_email_sec: '',
        phone_sec: '',
        password: '',
        weekly_service: [],

        price: "",
        startDate: "",
        endDate: "",
        price_Premium: "",
        startDate_Premium: "",
        endDate_Premium: "",

        tue_price: "",
        tue_startDate: "",
        tue_endDate: "",
        tue_price_Premium: "",
        tue_startDate_Premium: "",
        tue_endDate_Premium: "",

        wed_price: "",
        wed_startDate: "",
        wed_endDate: "",
        wed_price_Premium: "",
        wed_startDate_Premium: "",
        wed_endDate_Premium: "",

        thu_price: "",
        thu_startDate: "",
        thu_endDate: "",
        thu_price_Premium: "",
        thu_startDate_Premium: "",
        thu_endDate_Premium: "",

        fri_price: "",
        fri_startDate: "",
        fri_endDate: "",
        fri_price_Premium: "",
        fri_startDate_Premium: "",
        fri_endDate_Premium: "",

        sat_price: "",
        sat_startDate: "",
        sat_endDate: "",
        sat_price_Premium: "",
        sat_startDate_Premium: "",
        sat_endDate_Premium: "",

        sun_price_Premium: "",
        sun_startDate_Premium: "",
        sun_endDate_Premium: "",

    })
    const [selectedOption, setSelectedOption] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [holiday_services, setHolidayServices] = useState(false)
    const [isValid, setIsValid] = useState()
    const [selected_banks, setSelectedBanks] = useState([])
    const [showPasswordConditions, setShowPasswordConditions] = useState(false);
    const [isUsernameUnique, setIsUsernameUnique] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);

    const [checked, setChecked] = useState({
        mon_checked: false,
        tue_checked: false,
        wed_checked: false,
        thu_checked: false,
        fri_checked: false,
        sat_checked: false,
        sun_checked: false,
    })

    logger("checked", checked);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { banksList } = useSelector(state => state.bankList)
    const { routeList } = useSelector(state => state.routeList)

    logger("selectedDays", selectedDays)
    logger("selected_banks", selected_banks)
    logger("state", state)
    logger("weekly_service", state.weekly_service)
    logger("maxLimit", state.maxLimit)
    logger("selectedOption,checkbox ===>", selectedOption, checkbox)
    logger("state checked", checked.mon_checked);

    useEffect(() => {
        dispatch(getBanks(token))
        dispatch(getAllRoutes(token))
    }, [dispatch, token])


    const Error = (value) => {
        return message.error({
            content: `${value}`,
            duration: 2
        });
    };

    const handlePasswordChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        setShowPasswordConditions(true);
        const inputValue = e.target.value;
        setIsValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(inputValue))
    }

    const OnChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === 'maxLimit') {
            const numericValue = value.replace(/[^0-9.]/g, '');
            setState({ ...state, [name]: numericValue });
        } else {
            setState({ ...state, [name]: value });
        }
    }

    const OnChangeHandle = (event) => {
        const { name, value } = event.target;
        logger("newPhoneValue", event.target.value)
        const unformattedPhoneNumber = value.replace(/\D/g, '');
        logger("unformattedPhoneNumber", unformattedPhoneNumber)
        setState((prevState) => ({
            ...prevState,
            [name]: unformattedPhoneNumber,
        }));
    };


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setCheckbox((prev) => prev === event.target.value ? "" : event.target.value);
    };

    const handleCheckbox = (event) => {
        setHolidayServices(event.target.checked)
    }

    const options = [
        ...(banksList
            ? banksList.map((data) => ({ value: data._id, label: data.bank_name }))
            : [])
    ];

    const handleBankChange = (selectedOptions) => {
        const options = selectedOptions;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            selectedValues.push(options[i].value);
        }
        setSelectedBanks(selectedValues);
    }

    const handleUsernameBlur = async () => {
        if (state.userName.trim() === '') {
            return; // Skip the uniqueness check if the username is empty
        }
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'authorizationkey': `${API_KEY}`
                }
            }

            const { data } = await axios.get(`${backend_uri_local}/api/merchant/check-username/?username=${state.userName}`, config);
            logger("check username uniqeuness response==>", data)

            setIsUsernameUnique(data.isUnique);
        } catch (error) {
            // Handle the error, e.g., display an error message to the user
            console.error('Error checking username uniqueness:', error);
        }
    };


    const submitHandler = (e) => {
        e.preventDefault()

        if (selectedDays.length === 0) {
            // Show an error message or perform other actions for invalid form submission
            Error('Choose At-least One Day of Service')
            return;
        }

        if (isValid === true) {
            let reqObj = {
                business_name: state.business_name,
                userName: state.userName,
                type: state.type,
                address: state.address,
                city: state.city,
                zone: state.zone,
                maxLimit: state.maxLimit,
                contactPerson: state.contactPerson,
                email: state.email,
                phone: state.phone,
                contactPerson_sec: state.contactPerson_sec,
                contact_email_sec: state.contact_email_sec,
                phone_sec: state.phone_sec,
                password: state.password,
                selectedOption: selectedOption,
                checkbox: checkbox,
                weekly_service: state.weekly_service,
                holiday_services: holiday_services,
                selected_banks: selected_banks
            }
            logger("reqObj", reqObj)
            dispatch(addMerchant(reqObj, token, navigate))

            setState({
                business_name: '',
                userName: '',
                type: '',
                address: '',
                city: '',
                zone: '',
                maxLimit: '',
                contactPerson: '',
                email: '',
                phone: '',
                contactPerson_sec: '',
                contact_email_sec: '',
                phone_sec: '',
                password: '',
                weekly_service: [],

                price: "",
                startDate: "",
                endDate: "",
                price_Premium: "",
                startDate_Premium: "",
                endDate_Premium: "",

                tue_price: "",
                tue_startDate: "",
                tue_endDate: "",
                tue_price_Premium: "",
                tue_startDate_Premium: "",
                tue_endDate_Premium: "",

                wed_price: "",
                wed_startDate: "",
                wed_endDate: "",
                wed_price_Premium: "",
                wed_startDate_Premium: "",
                wed_endDate_Premium: "",

                thu_price: "",
                thu_startDate: "",
                thu_endDate: "",
                thu_price_Premium: "",
                thu_startDate_Premium: "",
                thu_endDate_Premium: "",

                fri_price: "",
                fri_startDate: "",
                fri_endDate: "",
                fri_price_Premium: "",
                fri_startDate_Premium: "",
                fri_endDate_Premium: "",

                sat_price: "",
                sat_startDate: "",
                sat_endDate: "",
                sat_price_Premium: "",
                sat_startDate_Premium: "",
                sat_endDate_Premium: "",

                sun_price_Premium: "",
                sun_startDate_Premium: "",
                sun_endDate_Premium: ""
            })
            setSelectedOption('')
            setCheckbox('')
            setHolidayServices(false)
            setSelectedBanks([])
            setSelectedDays([])
            setChecked({
                mon_checked: false,
                tue_checked: false,
                wed_checked: false,
                thu_checked: false,
                fri_checked: false,
                sat_checked: false,
                sun_checked: false
            })
        } else {
            Error('Password is not Strong enough !')
        }
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
                                            <h6 className="mb-4 text-uppercase" style={{ fontWeight: '700' }}>
                                                <MdAccountCircle className='me-1' size={20} />
                                                Create Customer
                                            </h6>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">
                                                            Business Name
                                                        </label>
                                                        <input type="text"
                                                            className="form-control route-name"
                                                            placeholder="Enter business name"
                                                            onChange={OnChangeHandler}
                                                            name="business_name"
                                                            value={state.business_name}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Type</label>
                                                        <select className="form-control select2 form-select"
                                                            name="type"
                                                            value={state.type}
                                                            onChange={OnChangeHandler}
                                                            required
                                                        >
                                                            <option value="">-- Select Type --</option>
                                                            <option value="MERCHANT">MERCHANT</option>
                                                            <option value="FINANCIAL INSTITUTION">FINANCIAL INSTITUTION</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Address</label>
                                                        <input type="text"
                                                            className="form-control route-name"
                                                            placeholder="Enter Address1"
                                                            onChange={OnChangeHandler}
                                                            name="address"
                                                            value={state.address}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">City</label>
                                                        <input type="text"
                                                            className="form-control route-name"
                                                            placeholder="Enter City"
                                                            onChange={OnChangeHandler}
                                                            name="city"
                                                            value={state.city}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">
                                                            Service Type
                                                        </label>

                                                        <div className='form-control'>
                                                            <ul className='list-unstyled mb-0'>
                                                                <li className='d-flex align-items-center'>
                                                                    <input type="radio"
                                                                        id="pickup"
                                                                        name="selectedOption"
                                                                        value="Pickup and Deposits(Night Deposits)"
                                                                        onChange={handleSelectChange}
                                                                        checked={selectedOption === 'Pickup and Deposits(Night Deposits)'}
                                                                        required
                                                                    />
                                                                    <label htmlFor='pickup' className='ms-2'
                                                                        style={{ color: '#6c757d', fontSize: '15px' }}>
                                                                        Pickup and Deposits (Night Deposits)
                                                                    </label>
                                                                </li>
                                                                <li className='d-flex align-items-center'>
                                                                    <input type="radio"
                                                                        id="bank"
                                                                        name="selectedOption"
                                                                        value="Bank to Bank(Bank runs)"
                                                                        onChange={handleSelectChange}
                                                                        checked={selectedOption === 'Bank to Bank(Bank runs)'}
                                                                        required
                                                                    />
                                                                    <label htmlFor='bank' className='ms-2'
                                                                        style={{ color: '#6c757d', fontSize: '15px' }}>
                                                                        Bank to Bank (Bank runs)
                                                                    </label>
                                                                </li>
                                                                <li className='d-flex align-items-center'>
                                                                    <input type="checkbox"
                                                                        id="replenishment"
                                                                        className='custom-checkbox-input'
                                                                        name="checkbox"
                                                                        value="Replenishments (Business to Bank or Bank to Business)"
                                                                        onChange={handleCheckboxChange}
                                                                        checked={checkbox === 'Replenishments (Business to Bank or Bank to Business)'}
                                                                    />
                                                                    <label htmlFor="replenishment" className='custom-checkbox-label'
                                                                        style={{ color: '#6c757d', fontSize: '15px' }}>
                                                                        Replenishments (Business to Bank or Bank to Business)
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Select Zone</label>
                                                        <select className="form-control select2 form-select"
                                                            name="zone"
                                                            value={state.zone}
                                                            onChange={OnChangeHandler}
                                                            required
                                                        >
                                                            <option value="">-- Select Zone --</option>
                                                            {routeList && routeList.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item._id}>{item.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3 mb-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Banks</label>
                                                        <Select
                                                            classNamePrefix="select2"
                                                            options={options}
                                                            isMulti
                                                            value={selected_banks && selected_banks.map((bank) =>
                                                                options.find((option) => option.value === bank)
                                                            )}
                                                            onChange={handleBankChange}
                                                            closeMenuOnSelect={false}
                                                            components={{
                                                                IndicatorSeparator: null,
                                                                DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                                                    menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Max Limit</label>
                                                        <div className='form-control d-flex mb-3'>
                                                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                                            <CurrencyInput
                                                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                                                placeholder="Enter Limit"
                                                                onChange={OnChangeHandler}
                                                                // prefix="$"
                                                                name="maxLimit"
                                                                value={state.maxLimit}
                                                                required
                                                            />
                                                        </div>

                                                        <input type="checkbox"
                                                            name="holiday_services"
                                                            value={holiday_services}
                                                            onChange={handleCheckbox}
                                                            checked={holiday_services === true}
                                                        />
                                                        <label htmlFor='holiday_services'
                                                            className="form-control-label mb-2 fw-bold ms-2"
                                                            style={{ color: '#6c757d', fontSize: '15px' }}
                                                        >
                                                            Need Holiday Services
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-12 mt-3">
                                                    <h6 className="mb-2 text-uppercase" style={{ fontWeight: '700' }}>
                                                        <MdOutlineContacts className='me-1' />
                                                        Contact Information
                                                    </h6>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Contact Person (Primary)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control route-name"
                                                            placeholder="Enter Contact Person"
                                                            onChange={OnChangeHandler}
                                                            name="contactPerson"
                                                            value={state.contactPerson}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Email (Primary)</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter Email"
                                                            onChange={OnChangeHandler}
                                                            name="email"
                                                            value={state.email}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Phone Number (Primary)</label>
                                                        <InputMask
                                                            className="form-control"
                                                            mask="999-999-9999"
                                                            maskChar=""
                                                            alwaysShowMask={false}
                                                            placeholder="Enter Phone Number"
                                                            onChange={OnChangeHandle}
                                                            value={state.phone}
                                                            name="phone"
                                                        >
                                                            {(inputProps) => <input {...inputProps} type="text" />}
                                                        </InputMask>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold route-name">Contact Person (Secondary)</label>
                                                        <input type="text"
                                                            className="form-control route-name"
                                                            placeholder="Enter Contact Person"
                                                            onChange={OnChangeHandler}
                                                            name="contactPerson_sec"
                                                            value={state.contactPerson_sec}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Email (Secondary)</label>
                                                        <input type="email"
                                                            className="form-control"
                                                            placeholder="Enter Email"
                                                            onChange={OnChangeHandler}
                                                            name="contact_email_sec"
                                                            value={state.contact_email_sec}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Phone Number (Secondary)</label>
                                                        <InputMask
                                                            className="form-control"
                                                            mask="999-999-9999"
                                                            maskChar=""
                                                            alwaysShowMask={false}
                                                            placeholder="Enter Phone Number"
                                                            onChange={OnChangeHandle}
                                                            name="phone_sec"
                                                            value={state.phone_sec}
                                                        >
                                                            {(inputProps) => <input {...inputProps} type="text" />}
                                                        </InputMask>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
                                                    <div className="form-group success-icon-main">
                                                        <label className="form-control-label mb-2 fw-bold">User Name</label>
                                                        <input type="text"
                                                            className={isUsernameUnique === true ? 'text-success form-control' : 'form-control position-relative'}
                                                            placeholder="Enter UserName"
                                                            onChange={OnChangeHandler}
                                                            name="userName"
                                                            value={state.userName}
                                                            onBlur={handleUsernameBlur} // Call the uniqueness check on blur
                                                            required />
                                                        {isUsernameUnique === false ?
                                                            <p className='text-danger mb-0'>Username is Already taken.</p>
                                                            : isUsernameUnique === true && state.userName !== '' ?
                                                                // <p className='text-success mb-0'>Username is Available.</p>
                                                                <div className="dummy-positioning d-flex">
                                                                    <div className="success-icon">
                                                                        <div className="success-icon__tip"></div>
                                                                        <div className="success-icon__long"></div>
                                                                    </div>
                                                                </div>
                                                                : ''
                                                        }
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-3">
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
                                            </div>

                                            <ManagePrice
                                                state={state}
                                                setState={setState}
                                                selectedDays={selectedDays}
                                                setSelectedDays={setSelectedDays}
                                                checked={checked}
                                                setChecked={setChecked}
                                            />

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

export default AddCustomer;