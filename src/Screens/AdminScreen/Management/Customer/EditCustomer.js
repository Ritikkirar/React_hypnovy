import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { MdAccountCircle, MdOutlineContacts } from 'react-icons/md'
import { IoMdSave } from 'react-icons/io'
import { getMerchantDetailsById, updateMerchant } from '../../../../redux/actions/merchantAction'
import { getBanks } from '../../../../redux/actions/adminAction'
import { getAllRoutes } from '../../../../redux/actions/routeAction'
import Footer from '../../../../components/Footer/Footer'
import '../../Home.css'
import { FiActivity } from "react-icons/fi";
import { logger } from '../../../../util/util'
import TimePickers from '../../../../components/TimePicker'
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input-field'
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';


const EditCustomer = ({ token }) => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const { id } = useParams()
    const [state, setState] = useState({
        business_name: '',
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
        service_type: [],
        weekly_service: [],

        price: "",
        startDate: "",
        endDate: "",
        price_Premium: "",
        startDate_Premium: "",
        endDate_Premium: "",
    })
    const [selectedOption, setSelectedOption] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [holiday_services, setHolidayServices] = useState(false)
    const [selected_banks, setSelectedBanks] = useState()
    const [data, setData] = useState();
    const [values, setValues] = useState([]);
    const [isChecked, setIsChecked] = useState(Array(weekdays.length).fill(true))
    logger("isChecked", isChecked);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { merchantDetails } = useSelector((state) => state.merchantDetails)
    const { banksList } = useSelector(state => state.bankList)
    const { routeList } = useSelector(state => state.routeList)

    logger("merchantDetails", merchantDetails)
    logger("selected_banks", selected_banks)
    logger("data", data);
    logger("weekly_service", state.weekly_service);
    logger("values", values);
    logger("state.startdate", state.startDate)

    const options = [
        ...(banksList
            ? banksList.map((data) => ({ value: data._id, label: data.bank_name }))
            : [])
    ];


    useEffect(() => {
        dispatch(getMerchantDetailsById(id, token));
        dispatch(getBanks(token))
        dispatch(getAllRoutes(token))
    }, [dispatch, id, token])

    useEffect(() => {
        setDataPrev()
    }, [merchantDetails, banksList])

    const handleDatePickerChange = (name, date, day) => {
        // setValues(values => ({
        //     ...values,
        //     [name]: date
        // }));
        setValues((prevState) => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [name]: date,
            },
        }));
    };

    const setDataPrev = () => {
        if (merchantDetails) {
            setState({
                ...merchantDetails,
                business_name: merchantDetails.business_name,
                type: merchantDetails.type,
                address: merchantDetails.address,
                city: merchantDetails.city,
                zone: merchantDetails.zone._id,
                maxLimit: merchantDetails.maxLimit,
                contactPerson: merchantDetails.contactPerson,
                email: merchantDetails.email,
                phone: merchantDetails.phone,
                contactPerson_sec: merchantDetails.contactPerson_sec,
                contact_email_sec: merchantDetails.contact_email_sec,
                phone_sec: merchantDetails.phone_sec,
            })

            setSelectedOption(merchantDetails.service_type[0])
            setCheckbox(merchantDetails.service_type[1])
            setHolidayServices(merchantDetails.holiday_services)
            setData(merchantDetails.weekly_service)


            // Map the fetched selected banks to their corresponding options
            const selectedOptions = merchantDetails.selected_banks.map((bank) => {
                return options.find((option) => option.value === bank._id);
            });

            // Set the selected banks
            setSelectedBanks(selectedOptions);
        }
    }

    logger("selectedOption state", selectedOption)
    logger("checkbox state", checkbox)

    logger("MERCHANT details", merchantDetails && merchantDetails)

    const OnChangeHandler = (event) => {
        if (event.target.name === 'maxLimit') {
            setState({ ...state, [event.target.name]: event.target.value.replace(/[^0-9.]/g, "") });
        } else {
            setState({ ...state, [event.target.name]: event.target.value });
        }
    }

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setCheckbox((prev) => prev === event.target.value ? "" : event.target.value);
        logger("CheckBox", checkbox)
    };

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

    const handleCheckbox = (event) => {
        setHolidayServices(event.target.checked)
    }

    const handleBankChange = (selectedOptions) => {
        setSelectedBanks(selectedOptions);
    }


    const submitHandler = (e) => {
        e.preventDefault();

        let reqObj = {
            business_name: state.business_name,
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
            weekly_service: state.weekly_service,
            selected_banks: selected_banks && selected_banks.map((data) => data.value),
            holiday_services: holiday_services,
            selectedOption: selectedOption,
            checkbox: checkbox,
        }

        logger("reqObject", reqObj)

        dispatch(updateMerchant(id, reqObj, token, navigate))

        setState({
            business_name: '',
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
            service_type: [],
            weekly_service: [],

            price: "",
            startDate: "",
            endDate: "",
            price_Premium: "",
            startDate_Premium: "",
            endDate_Premium: "",
        })
    }

    logger("weekly_service", state.weekly_service);
    logger("bdkjfbkhjafb =====>", data)


    const handleChange = (event, index, day) => {

        setValues((prevState) => ({
            ...prevState,
            [day]: {
                ...prevState[day], // Spread the existing properties of 'day' object
                [event.target.name]: event.target.value.replace(/[^0-9.]/g, ""),
            },
        }));

    };

    const getPriceByDay = (day) => {
        const dayData = data?.find((d) => d.day_type === day);
        const arr = []
        if (dayData) {
            const services = dayData.services;
            for (let j = 0; j < services.length; j++) {
                const service = services[j];
                if (service.price !== "") {
                    arr.push(service); // Return the price value of the first service with a non-empty price
                }
            }
            logger("services by function", arr)
            return arr;
        }

        return null; // Day data not found or no service with a price found, return null
    };


    const ChangeHandlerone = (name, date, index, weekday) => {
        logger("data.....name.....", data, name);
        let newInputs = [...data];
        const takedata = newInputs?.findIndex((item) => item.day_type === weekday)
        logger("weekday", weekday);
        if (newInputs[takedata].day_type === weekday) {

            newInputs[takedata].services[index][name] = date;
            setData(newInputs)
        } else {
            logger("not match");
        }
    }

    const ChangeHandler = (e, i, index, weekday) => {
        logger("i", i);
        logger("data", data);
        logger("index ,weekday", index, weekday);
        let newInputs = [...data];
        logger("newInputs", newInputs);
        const takedata = newInputs.findIndex((item) => item.day_type === weekday)
        logger("takedata", takedata);
        if (newInputs[takedata].day_type === weekday) {
            logger("newInputs[takedata].services[index]", newInputs[takedata].services[index][e.target.name]);
            newInputs[takedata].services[index][e.target.name] = e.target.value.replace(/[^0-9.]/g, '');
            setData(newInputs)
        } else {
            logger("not match");
        }
        logger("newInputs again", newInputs);
    }

    const areAllInputsFilled = (i, day) => {
        logger("indexing", i);
        logger("days", day);
        if (day === 'Sunday') {
            return (
                values[day] &&
                values[day].price_Premium &&
                values[day].startDate_Premium &&
                values[day].endDate_Premium
            )
        } else if (day === 'Saturday') {
            return (
                values[day] &&
                values[day].price_Premium &&
                values[day].startDate_Premium &&
                values[day].endDate_Premium
            )
        } else {
            return (
                values[day] &&
                values[day].price &&
                values[day].startDate &&
                values[day].endDate &&
                values[day].price_Premium &&
                values[day].startDate_Premium &&
                values[day].endDate_Premium
            );
        }
    }

    const areAllInputsFill = (i, day) => {
        const dayData = data?.find((d) => d.day_type === day);
        if (dayData) {
            const services = dayData.services;
            for (let j = 0; j < services.length; j++) {
                const service = services[j];
                if (service.price === "" || service.start === "" || service.end === "") {
                    return false; // If any service is missing input values, return false
                }
            }
            return true; // All services have input values, return true
        }
        return false; // Day data not found, return false
    };

    const handleCheck = (e, Type, index) => {
        logger("e =======>", e);
        logger("Type =======>", Type);
        logger("index =======>", index);
        logger("values ======>", values);

        if (e.target.checked === false) {
            data.forEach((d) => {
                if (d.day_type === Type) {
                    d.services.forEach((service) => {
                        service.price = "";
                        service.start = "00:00";
                        service.end = "00:00";

                        // Assign default values to other properties if needed
                        // service.end = "12:00";
                        // service.price_Premium = "0";
                        // service.startDate_Premium = "00:00";
                        // service.endDate_Premium = "12:00";
                    });
                }
            });
            const result = state.weekly_service.filter(item => item.day_type !== Type)
            state.weekly_service = result;
            return;
        }

        switch (Type) {
            case "Monday":
                let temObject = {
                    day_type: 'Monday',
                    services: [
                        {
                            name: 'Normal',
                            price: getPriceByDay("Monday")[0].price,
                            start: getPriceByDay("Monday")[0].start,
                            end: getPriceByDay("Monday")[0].end
                        },
                        {
                            name: 'Premium',
                            price: getPriceByDay("Monday")[1].price,
                            start: getPriceByDay("Monday")[1].start,
                            end: getPriceByDay("Monday")[1].end
                        }
                    ],
                }
                if (e.target.checked) {
                    logger("e.target.checked in monday", e.target.checked);
                    state.weekly_service.push(temObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Monday")
                    logger("DATA", data)
                    state.weekly_service = data
                }

                break;

            case "Tuesday":
                let tueArray =
                {
                    day_type: 'Tuesday',
                    services: [
                        {
                            name: 'Normal',
                            price: getPriceByDay("Tuesday")[0].price,
                            start: getPriceByDay("Tuesday")[0].start,
                            end: getPriceByDay("Tuesday")[0].end
                        },
                        {
                            name: 'Premium',
                            price: getPriceByDay("Tuesday")[1].price,
                            start: getPriceByDay("Tuesday")[1].start,
                            end: getPriceByDay("Tuesday")[1].end
                        }
                    ],
                }

                if (e.target.checked) {
                    state.weekly_service.push(tueArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Tuesday")
                    state.weekly_service = data
                }
                break;

            case "Wednesday":
                let wedArray =
                {
                    day_type: 'Wednesday',
                    services: [
                        {
                            name: 'Normal',
                            price: getPriceByDay("Wednesday")[0].price,
                            start: getPriceByDay("Wednesday")[0].start,
                            end: getPriceByDay("Wednesday")[0].end
                        },
                        {
                            name: 'Premium',
                            price: getPriceByDay("Wednesday")[1].price,
                            start: getPriceByDay("Wednesday")[1].start,
                            end: getPriceByDay("Wednesday")[1].end
                        }
                    ],
                }

                if (e.target.checked) {
                    logger("e.target.checked in Wednesday", e.target.checked);
                    state.weekly_service.push(wedArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Wednesday")
                    state.weekly_service = data
                }
                break;

            case "Thursday":
                let thuArray =
                {
                    day_type: 'Thursday',
                    services: [
                        {
                            name: 'Normal',
                            price: getPriceByDay("Thursday")[0].price,
                            start: getPriceByDay("Thursday")[0].start,
                            end: getPriceByDay("Thursday")[0].end
                        },
                        {
                            name: 'Premium',
                            price: getPriceByDay("Thursday")[1].price,
                            start: getPriceByDay("Thursday")[1].start,
                            end: getPriceByDay("Thursday")[1].end
                        }
                    ],
                }

                if (e.target.checked) {
                    state.weekly_service.push(thuArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Thursday")
                    state.weekly_service = data
                }
                break;

            case "Friday":
                let friArray =
                {
                    day_type: 'Friday',
                    services: [
                        {
                            name: 'Normal',
                            price: getPriceByDay("Friday")[0].price,
                            start: getPriceByDay("Friday")[0].start,
                            end: getPriceByDay("Friday")[0].end
                        },
                        {
                            name: 'Premium',
                            price: getPriceByDay("Friday")[1].price,
                            start: getPriceByDay("Friday")[1].start,
                            end: getPriceByDay("Friday")[1].end
                        }
                    ],
                }

                if (e.target.checked) {
                    state.weekly_service.push(friArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Friday")
                    state.weekly_service = data
                }
                break;

            case "Saturday":
                let satObject =
                {
                    day_type: 'Saturday',
                    services: [

                        {
                            name: 'Premium',
                            price: getPriceByDay("Saturday")[1].price,
                            start: getPriceByDay("Saturday")[1].start,
                            end: getPriceByDay("Saturday")[1].end
                        }
                    ],
                }

                if (e.target.checked) {
                    state.weekly_service.push(satObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Saturday")
                    state.weekly_service = data
                }
                break;

            case "Sunday":
                let sunObject =
                {
                    day_type: 'Sunday',
                    services: [
                        {
                            name: 'Premium',
                            price: getPriceByDay("Saturday")[1].price,
                            start: getPriceByDay("Saturday")[1].start,
                            end: getPriceByDay("Saturday")[1].end
                        }
                    ],
                }

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

    const handleCheck1 = (e, Type, index) => {
        logger("e =======>", e);
        logger("Type =======>", Type);
        logger("index =======>", index);
        logger("values ======>", values);
        let test = [...state.weekly_service]
        switch (Type) {
            case "Monday":
                let temObject = {
                    day_type: 'Monday',
                    services: [
                        {
                            name: 'Normal',
                            price: values.Monday.price,
                            start: values.Monday.startDate,
                            end: values.Monday.endDate
                        },
                        {
                            name: 'Premium',
                            price: values.Monday.price_Premium,
                            start: values.Monday.startDate_Premium,
                            end: values.Monday.endDate_Premium
                        }
                    ],
                }
                if (e.target.checked) {
                    test.push(temObject)
                    setState({ ...state, weekly_service: test })
                    // state.weekly_service.push(temObject)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Monday")
                    setState({ ...state, weekly_service: data })
                    // state.weekly_service = data
                }
                break;
            case "Tuesday":
                let tueArray =
                {
                    day_type: 'Tuesday',
                    services: [
                        {
                            name: 'Normal',
                            price: values.Tuesday.price,
                            start: values.Tuesday.startDate,
                            end: values.Tuesday.endDate
                        },
                        {
                            name: 'Premium',
                            price: values.Tuesday.price_Premium,
                            start: values.Tuesday.startDate_Premium,
                            end: values.Tuesday.endDate_Premium
                        }
                    ],
                }
                if (e.target.checked) {
                    test.push(tueArray)
                    setState({ ...state, weekly_service: test })
                    // state.weekly_service.push(tueArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Tuesday")
                    setState({ ...state, weekly_service: data })
                    // state.weekly_service = data
                }
                break;
            case "Wednesday":
                let wedArray =
                {
                    day_type: 'Wednesday',
                    services: [
                        {
                            name: 'Normal',
                            price: values.Wednesday.price,
                            start: values.Wednesday.startDate,
                            end: values.Wednesday.endDate
                        },
                        {
                            name: 'Premium',
                            price: values.Wednesday.price_Premium,
                            start: values.Wednesday.startDate_Premium,
                            end: values.Wednesday.endDate_Premium
                        }
                    ],
                }
                if (e.target.checked) {
                    test.push(wedArray)
                    setState({ ...state, weekly_service: test })
                    // state.weekly_service.push(wedArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Wednesday")
                    setState({ ...state, weekly_service: data })
                    // state.weekly_service = data
                }
                break;
            case "Thursday":
                let thuArray =
                {
                    day_type: 'Thursday',
                    services: [
                        {
                            name: 'Normal',
                            price: values.Thursday.price,
                            start: values.Thursday.startDate,
                            end: values.Thursday.endDate
                        },
                        {
                            name: 'Premium',
                            price: values.Thursday.price_Premium,
                            start: values.Thursday.startDate_Premium,
                            end: values.Thursday.endDate_Premium
                        }
                    ],
                }
                if (e.target.checked) {
                    test.push(thuArray)
                    setState({ ...state, weekly_service: test })
                    // state.weekly_service.push(thuArray)
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Thursday")
                    setState({ ...state, weekly_service: data })
                    // state.weekly_service = data
                }
                break;
            case "Friday":
                let friArray =
                {
                    day_type: 'Friday',
                    services: [
                        {
                            name: 'Normal',
                            price: values.Friday.price,
                            start: values.Friday.startDate,
                            end: values.Friday.endDate
                        },
                        {
                            name: 'Premium',
                            price: values.Friday.price_Premium,
                            start: values.Friday.startDate_Premium,
                            end: values.Friday.endDate_Premium
                        }
                    ],
                }
                if (e.target.checked) {

                    test.push(friArray)
                    setState({ ...state, weekly_service: test })


                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Friday")
                    setState({ ...state, weekly_service: data })

                    // state.weekly_service = data
                }
                break;
            case "Saturday":
                let satObject =
                {
                    day_type: 'Saturday',
                    services: [
                        {
                            name: 'Premium',
                            price: values.Saturday.price_Premium,
                            start: values.Saturday.startDate_Premium,
                            end: values.Saturday.endDate_Premium
                        }
                    ],
                }
                if (e.target.checked) {
                    // state.weekly_service.push(satObject)
                    test.push(satObject)
                    setState({ ...state, weekly_service: test })
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Saturday")
                    setState({ ...state, weekly_service: data })
                    // state.weekly_service = data
                }
                break;
            case "Sunday":
                let sunObject =
                {
                    day_type: 'Sunday',
                    services: [
                        {
                            name: 'Premium',
                            price: values.Sunday.price_Premium,
                            start: values.Sunday.startDate_Premium,
                            end: values.Sunday.endDate_Premium
                        }
                    ],
                }
                if (e.target.checked) {
                    // state.weekly_service.push(sunObject)
                    test.push(sunObject)
                    setState({ ...state, weekly_service: test })
                } else {
                    const data = state.weekly_service.filter(item => item.day_type !== "Sunday")
                    setState({ ...state, weekly_service: data })
                    // state.weekly_service = data
                }
                break;
            default:
                break;
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
                                                Update Customer
                                            </h6>
                                            <div className="row">
                                                <div className="col-lg-6">
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

                                                <div className="col-lg-6">
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

                                                <div className="col-lg-6 mt-2">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Address</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="Enter Address"
                                                            onChange={OnChangeHandler}
                                                            name="address"
                                                            value={state.address}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-2">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">City</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="Enter City"
                                                            onChange={OnChangeHandler}
                                                            name="city"
                                                            value={state.city}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-2">
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

                                                <div className="col-lg-6 mt-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Max Limit</label>
                                                        <div className='form-control d-flex mb-3'>
                                                            <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                                            <CurrencyInput
                                                                id="input-example"
                                                                style={{ border: 'none', width: '100%', outline: 'none' }}
                                                                placeholder="Enter Limit"
                                                                onChange={OnChangeHandler}
                                                                name="maxLimit"
                                                                value={state.maxLimit}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mt-2 mb-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">
                                                            Service Type
                                                        </label>
                                                        <div className='form-control'>
                                                            <ul className='list-unstyled mb-0'>
                                                                <li>
                                                                    <input type="radio"
                                                                        id="pickup"
                                                                        name="service_type"
                                                                        value="Pickup and Deposits(Night Deposits)"
                                                                        onChange={handleSelectChange}
                                                                        checked={selectedOption === 'Pickup and Deposits(Night Deposits)'}
                                                                    />
                                                                    <label htmlFor='pickup' className='ms-2'
                                                                        style={{ color: '#6c757d', fontSize: '15px' }}>
                                                                        Pickup and Deposits (Night Deposits)
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <input type="radio"
                                                                        id="bank"
                                                                        name="service_type"
                                                                        value="Bank to Bank(Bank runs)"
                                                                        onChange={handleSelectChange}
                                                                        checked={selectedOption === 'Bank to Bank(Bank runs)'}
                                                                    />
                                                                    <label htmlFor='bank' className='ms-2'
                                                                        style={{ color: '#6c757d', fontSize: '15px' }}>
                                                                        Bank to Bank (Bank runs)
                                                                    </label>
                                                                </li>
                                                                <li>
                                                                    <input type="checkbox"
                                                                        className='custom-checkbox-input'
                                                                        id="replenishment"
                                                                        name="replenishment"
                                                                        value="Replenishments (Business to Bank or Bank to Business)"
                                                                        onChange={handleCheckboxChange}
                                                                        checked={checkbox === "Replenishments (Business to Bank or Bank to Business)"}
                                                                    />
                                                                    <label htmlFor='replenishment' className='custom-checkbox-label'
                                                                        style={{ color: '#6c757d', fontSize: '15px' }}>
                                                                        Replenishments (Business to Bank or Bank to Business)
                                                                    </label>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Banks</label>
                                                        <Select
                                                            classNamePrefix="select2"
                                                            options={options}
                                                            isMulti
                                                            value={selected_banks}
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

                                                <div className="col-lg-6">
                                                    <div className="form-group mb-3">
                                                        <input type="checkbox"
                                                            name="holiday_services"
                                                            value={holiday_services}
                                                            onChange={handleCheckbox}
                                                            checked={holiday_services === true}
                                                        />
                                                        <label htmlFor='holiday_services'
                                                            className="form-control-label fw-bold ms-2"
                                                            style={{ color: '#6c757d', fontSize: '15px' }}
                                                        >
                                                            Need Holiday Services
                                                        </label>
                                                    </div>
                                                </div>


                                                <div className="col-sm-12 mt-3">
                                                    <h6 className="mb-2 text-uppercase" style={{ fontWeight: '700' }}>
                                                        <MdOutlineContacts className='me-1' />
                                                        Contact Information
                                                    </h6>
                                                </div>

                                                <div className="col-lg-6 mt-2">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold fw-bold">Contact Person (Primary)</label>
                                                        <input type="text"
                                                            className="form-control route-name"
                                                            placeholder="Enter Contact Person"
                                                            name="contactPerson"
                                                            value={state.contactPerson}
                                                            onChange={OnChangeHandler}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-2">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Email (Primary)</label>
                                                        <input type="email"
                                                            className="form-control"
                                                            placeholder="Enter Email"
                                                            name="email"
                                                            value={state.email}
                                                            onChange={OnChangeHandler}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-2 mb-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">
                                                            Phone Number (Primary)
                                                        </label>
                                                        <InputMask
                                                            className="form-control"
                                                            mask="999-999-9999"
                                                            maskChar=""
                                                            alwaysShowMask={false}
                                                            placeholder="Enter Phone Number"
                                                            onChange={OnChangeHandle}
                                                            value={state.phone.toString()}
                                                            name="phone"
                                                        >
                                                            {(inputProps) => <input {...inputProps} type="text" />}
                                                        </InputMask>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mt-2">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold fw-bold">Contact Person (Secondary)</label>
                                                        <input type="text"
                                                            className="form-control route-name"
                                                            placeholder="Enter Contact Person"
                                                            name="contactPerson_sec"
                                                            value={state.contactPerson_sec}
                                                            onChange={OnChangeHandler}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">Email (Secondary)</label>
                                                        <input type="email"
                                                            className="form-control"
                                                            placeholder="Enter Email"
                                                            name="contact_email_sec"
                                                            value={state.contact_email_sec}
                                                            onChange={OnChangeHandler}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label mb-2 fw-bold">
                                                            Phone Number (Secondary)
                                                        </label>
                                                        <InputMask
                                                            className="form-control"
                                                            mask="999-999-9999"
                                                            maskChar=""
                                                            alwaysShowMask={false}
                                                            placeholder="Enter Phone Number"
                                                            onChange={OnChangeHandle}
                                                            value={state.phone_sec !== null ? state.phone_sec.toString() : ''}
                                                            name="phone_sec"
                                                        >
                                                            {(inputProps) => <input {...inputProps} type="text" />}
                                                        </InputMask>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='row align-items-center'>

                                                <div className="col-md-12 mt-3">
                                                    <h6 className="mb-2 text-uppercase" style={{ fontWeight: '700' }}>
                                                        <FiActivity className='me-1' />  Weekly Services
                                                    </h6>
                                                </div>

                                                {weekdays.map((weekday, i) => (
                                                    <div key={i}>
                                                        {
                                                            data?.find((d) => d.day_type === weekday) ? (
                                                                <div className='row align-items-center'>
                                                                    <div className='col-3 text-start  col-xl-1'>
                                                                        <input type='checkbox'
                                                                            className='Checkboxes'
                                                                            disabled={!areAllInputsFill(i, weekday)}
                                                                            onChange={(e) => {
                                                                                handleCheck(e, weekday, i)
                                                                                setIsChecked((prevState) => {
                                                                                    const updatedState = [...prevState];
                                                                                    updatedState[i] = !prevState[i];
                                                                                    return updatedState;
                                                                                });
                                                                            }}
                                                                            // checked={isChecked}
                                                                            checked={isChecked[i] || false}
                                                                        // checked={data.find((d) => d.day_type === weekday)?.isChecked === false  ? false : isChecked }
                                                                        />
                                                                    </div>
                                                                    <div className="col-9 col-xl-2 mt-2">
                                                                        <div className="form-group ">
                                                                            <p style={{ fontSize: '18px', color: isChecked[i] === true ? 'black' : 'gray' }}
                                                                                className="form-control border-0 input_days">{weekday}
                                                                            </p>

                                                                        </div>
                                                                    </div>

                                                                    {data.find((d) => d.day_type === weekday).services.map((service, index) => (
                                                                        <div key={index} className='row align-items-center row m-auto '>
                                                                            <div className="col-md-3 col-sm-6 col-xl-2 offset-xl-1">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Service Type</label>
                                                                                    <input type="text"
                                                                                        className="form-control input_days"
                                                                                        style={{ fontSize: '15px' }}
                                                                                        defaultValue={service.name}
                                                                                        placeholder="Write here..."
                                                                                        disabled
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Rate</label>
                                                                                    <div className='form-control d-flex mb-3'>
                                                                                        <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                                                                        <CurrencyInput
                                                                                            id="input-example"
                                                                                            style={{ border: 'none', width: '100%', outline: 'none' }}
                                                                                            name={"price"}
                                                                                            value={service.price}
                                                                                            onChange={(e) => ChangeHandler(e, i, index, weekday)}
                                                                                            placeholder="Write here..."
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Start Time</label>
                                                                                    <TimePickers
                                                                                        value={service.start}
                                                                                        name="start"
                                                                                        onChange={(date) => ChangeHandlerone("start", date, index, weekday)}
                                                                                        index={index}
                                                                                        weekday={weekday}
                                                                                        data={data}
                                                                                        setData={setData}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>End Time</label>
                                                                                    <TimePickers
                                                                                        value={service.end}
                                                                                        name="end"
                                                                                        onChange={(date) => ChangeHandlerone("end", date, index, weekday)}
                                                                                        index={index}
                                                                                        weekday={weekday}
                                                                                        data={data}
                                                                                        setData={setData}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : weekday === 'Sunday' ? (
                                                                <div className='row align-items-center'>
                                                                    <div className='col-3 text-start col-xl-1 '>
                                                                        <input
                                                                            type='checkbox'
                                                                            className='Checkboxes'
                                                                            disabled={!areAllInputsFilled(i, weekday)}
                                                                            onChange={(e) => handleCheck1(e, weekday, i)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-9 col-xl-2">
                                                                        <div className="form-group mb-3">
                                                                            <p className="form-control border-0 input_days"
                                                                                style={{ fontSize: '18px', color: state.weekly_service.find(item => item.day_type === weekday) ? 'black' : 'gray' }} > {weekday}</p>

                                                                        </div>
                                                                    </div>

                                                                    <div className='row align-items-center row  m-auto'>
                                                                        <div className="col-md-3 col-sm-6 col-xl-2 offset-xl-1">
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

                                                                        <div className="col-md-3 col-sm-6 col-xl-2">
                                                                            <div className="form-group mb-3">
                                                                                <label>Amount</label>
                                                                                <div className='form-control d-flex mb-3'>
                                                                                    <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                                                                    <CurrencyInput
                                                                                        id="input-example"
                                                                                        style={{ border: 'none', width: '100%', outline: 'none' }}
                                                                                        name='price_Premium'
                                                                                        value={state.price_Premium}
                                                                                        onChange={(event) => handleChange(event, i, weekday)}
                                                                                        placeholder="Write here..."
                                                                                        disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-3 col-sm-6 col-xl-2">
                                                                            <div className="form-group mb-3">
                                                                                <label>Start Time</label>
                                                                                <TimePickers
                                                                                    value={'12:00'}
                                                                                    name="startDate_Premium"
                                                                                    disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                    onChange={(date) => handleDatePickerChange("startDate_Premium", date, weekday)}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-3 col-sm-6 col-xl-2">
                                                                            <div className="form-group mb-3">
                                                                                <label>End Time</label>
                                                                                <TimePickers
                                                                                    value={'12:00'}
                                                                                    name="endDate_Premium"
                                                                                    disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                    onChange={(date) => handleDatePickerChange("endDate_Premium", date, weekday)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : weekday === 'Saturday' ? (
                                                                <div className='row align-items-center'>
                                                                    <div className='col-3 text-start col-xl-1 '>
                                                                        <input
                                                                            type='checkbox'
                                                                            className='Checkboxes'
                                                                            disabled={!areAllInputsFilled(i, weekday)}
                                                                            onChange={(e) => handleCheck1(e, weekday, i)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-9 col-xl-2 mt-3">
                                                                        <div className="form-group ">
                                                                            <p className="form-control border-0 input_days"
                                                                                style={{ fontSize: '18px', color: state.weekly_service.find(item => item.day_type === weekday) ? 'black' : 'gray' }} > {weekday}</p>

                                                                        </div>
                                                                    </div>

                                                                    <div className='row align-items-center row  m-auto'>
                                                                        <div className="col-md-3 col-sm-6 col-xl-2 offset-xl-1">
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

                                                                        <div className="col-md-3 col-sm-6 col-xl-2">
                                                                            <div className="form-group mb-3">
                                                                                <label>Rate</label>
                                                                                <div className='form-control d-flex mb-3'>
                                                                                    <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                                                                    <CurrencyInput
                                                                                        id="input-example"
                                                                                        style={{ border: 'none', width: '100%', outline: 'none' }}
                                                                                        name='price_Premium'
                                                                                        value={state.price_Premium}
                                                                                        onChange={(event) => handleChange(event, i, weekday)}
                                                                                        placeholder="Write here..."
                                                                                        disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-3 col-sm-6 col-xl-2">
                                                                            <div className="form-group mb-3">
                                                                                <label>Start Time</label>
                                                                                <TimePickers
                                                                                    value={'12:00'}
                                                                                    name="startDate_Premium"
                                                                                    disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                    onChange={(date) => handleDatePickerChange("startDate_Premium", date, weekday)}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-3 col-sm-6 col-xl-2">
                                                                            <div className="form-group mb-3">
                                                                                <label>End Time</label>
                                                                                <TimePickers
                                                                                    value={'12:00'}
                                                                                    name="endDate_Premium"
                                                                                    disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                    onChange={(date) => handleDatePickerChange("endDate_Premium", date, weekday)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )

                                                                :
                                                                (
                                                                    <div className='row align-items-center'>
                                                                        <div className='col-3 text-start col-xl-1 pt-2'>
                                                                            <input
                                                                                type='checkbox'
                                                                                className='Checkboxes'
                                                                                disabled={!areAllInputsFilled(i, weekday)}
                                                                                onChange={(e) => handleCheck1(e, weekday, i)}
                                                                            />
                                                                        </div>
                                                                        <div className="col-9 col-xl-2 mt-2">
                                                                            <div className="form-group ">
                                                                                <p className="form-control border-0 input_days"
                                                                                    style={{ fontSize: '18px', color: state.weekly_service.find(item => item.day_type === weekday) ? 'black' : 'gray' }} > {weekday}</p>

                                                                            </div>
                                                                        </div>


                                                                        <div className='row align-items-center row  m-auto'>
                                                                            {/* <div className='col-md-1'></div> */}
                                                                            <div className="col-md-3 col-sm-6 col-xl-2 offset-xl-1">
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
                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Rate</label>
                                                                                    <div className='form-control d-flex mb-3'>
                                                                                        <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                                                                        <CurrencyInput
                                                                                            id="input-example"
                                                                                            style={{ border: 'none', width: '100%', outline: 'none' }}
                                                                                            name='price'
                                                                                            // value={state.price}
                                                                                            onChange={(event) => handleChange(event, i, weekday)}
                                                                                            placeholder="Write here..."
                                                                                            disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Start Time</label>
                                                                                    <TimePickers
                                                                                        value={'00:00'}
                                                                                        name="startDate"
                                                                                        disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                        onChange={(date) => handleDatePickerChange("startDate", date, weekday)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>End Time</label>
                                                                                    <TimePickers
                                                                                        value={'12:00'}
                                                                                        name="endDate"
                                                                                        disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                        onChange={(date) => handleDatePickerChange("endDate", date, weekday)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='row align-items-center row  m-auto'>
                                                                            <div className="col-md-3 col-sm-6 col-xl-2 offset-xl-1">
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

                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Rate</label>
                                                                                    <div className='form-control d-flex mb-3'>
                                                                                        <span className="prefix" style={{ color: '#6c757d' }}>$</span>
                                                                                        <CurrencyInput
                                                                                            id="input-example"
                                                                                            style={{ border: 'none', width: '100%', outline: 'none' }}
                                                                                            name='price_Premium'
                                                                                            value={state.price_Premium}
                                                                                            onChange={(event) => handleChange(event, i, weekday)}
                                                                                            placeholder="Write here..."
                                                                                            disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Start Time</label>
                                                                                    <TimePickers
                                                                                        value={'12:00'}
                                                                                        name="startDate_Premium"
                                                                                        disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                        onChange={(date) => handleDatePickerChange("startDate_Premium", date, weekday)}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-3 col-sm-6 col-xl-2">
                                                                                <div className="form-group mb-3">
                                                                                    <label>End Time</label>
                                                                                    <TimePickers
                                                                                        value={'12:00'}
                                                                                        name="endDate_Premium"
                                                                                        disabled={state.weekly_service.find(item => item.day_type === weekday)}
                                                                                        onChange={(date) => handleDatePickerChange("endDate_Premium", date, weekday)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                        }
                                                    </div>
                                                ))
                                                }
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


export default EditCustomer;