import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiBarChart2 } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { getAllMerchantRequest, totalMerchantRequestCount } from "../../../../redux/actions/merchantAction";
import { getAllRoutes } from "../../../../redux/actions/routeAction";
import Footer from "../../../../components/Footer/Footer";
import Datepicker from '../../../../components/Common/Datepicker'
import Moment from "moment";
import { logger } from '../../../../util/util'
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import ExcelExport from "../../../../components/Common/ExcelExport";
import moment from "moment";

const CustomerRequestList = ({ token, visible, setVisible }) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [showCalendar, setShowCalendar] = useState(false);
    const [rate, setRate] = useState("all")
    const [zone, setZone] = useState("all")
    const [filteredData, setFilteredData] = useState(null);
    const [activeItem, setActiveItem] = useState('Today');
    const [totalRequestRate, setTotalRequestRate] = useState(0);
    const [extracharge, setExtracharge] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const { merchantrequestlist } = useSelector((state) => state.merchantRequests)
    const { totalMerchantRequestCounts } = useSelector((state) => state.totalMerchantRequestCounts)
    const { routeList } = useSelector(state => state.routeList)

    logger("merchantrequestlist", merchantrequestlist)
    logger("routeList", routeList)

    const calculateTotalRates = (requestList) => {
        let totalRate = 0;
        let extraCharge = 0;

        if (requestList) {
            requestList.forEach(element => {
                totalRate += element.rate + element.extraRate;
                extraCharge += element.extraRate;
            });
        }

        return { totalRate, extraCharge };
    };

    useEffect(() => {
        const { totalRate, extraCharge } = calculateTotalRates(merchantrequestlist);
        setTotalRequestRate(totalRate);
        setExtracharge(extraCharge);
    }, [merchantrequestlist]);

    const optionsRate = [
        { value: 'all', label: 'Select Service' },
        { value: 'Normal', label: 'Normal' },
        { value: 'Premium', label: 'Premium' },
    ];

    const handleSelectChange = (selectedOption) => {
        setRate(selectedOption.value);
    };

    useEffect(() => {
        dispatch(getAllMerchantRequest(id, token, navigate))
        dispatch(totalMerchantRequestCount(id, token))
        dispatch(getAllRoutes(token))
    }, [dispatch, token, id, navigate])


    const OnClickHandler = () => {
        if (rate || zone || startDate || endDate) {
            const filteredRequest = merchantrequestlist?.filter((data) => {
                //date
                if (startDate && endDate && rate === "all" && zone === "all") {
                    const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                    let start = Moment(startDate).format("YYYY-MM-DD");
                    let end = Moment(endDate).format("YYYY-MM-DD");
                    return itemDate >= start && itemDate <= end;
                }
                //rate
                else if (rate !== "all" && zone === "all" && !startDate && !endDate) {
                    return data.charge_type.includes(rate)
                }
                //zone
                else if (zone !== "all" && rate && !startDate && !endDate) {
                    return data.zone._id.includes(zone)
                }
                //rate & date
                else if (rate !== "all" && startDate && endDate && zone === "all") {
                    const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                    let start = Moment(startDate).format("YYYY-MM-DD");
                    let end = Moment(endDate).format("YYYY-MM-DD");
                    return data.charge_type.includes(rate)
                        && itemDate >= start && itemDate <= end;
                }
                //zone & date
                else if (zone !== "all" && startDate && endDate && rate === "all") {
                    const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                    let start = Moment(startDate).format("YYYY-MM-DD");
                    let end = Moment(endDate).format("YYYY-MM-DD");
                    return data.zone._id.includes(zone) && itemDate >= start && itemDate <= end;
                }
                //rate & zone
                else if (rate !== "all" && zone !== "all" && !startDate && !endDate) {
                    data.charge_type.includes(rate) && data.zone._id.includes(zone)
                }
                //rate & zone & date
                else if (rate !== "all" && zone !== "all" && startDate && endDate) {
                    const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                    let start = Moment(startDate).format("YYYY-MM-DD");
                    let end = Moment(endDate).format("YYYY-MM-DD");
                    return data.zone._id.includes(zone) && data.charge_type.includes(rate)
                        && itemDate >= start && itemDate <= end;
                }
                return data;
            })

            let totalRateSum = 0;
            let extraChargeSum = 0;

            filteredRequest.forEach(element => {
                totalRateSum += element.rate + element.extraRate;
                extraChargeSum += element.extraRate; // Initialize with 0 if undefined
            });

            setTotalRequestRate(totalRateSum);
            setExtracharge(extraChargeSum);
            setFilteredData(filteredRequest)
        } else {
            setFilteredData(null)
        }
    }

    const cancelHandler = () => {
        // setsearchKey("")
        setRate("all")
        setZone("all")
        setStartDate();
        setEndDate();
        setActiveItem('Today')
        const { totalRate, extraCharge } = calculateTotalRates(merchantrequestlist);
        setTotalRequestRate(totalRate);
        setExtracharge(extraCharge);
        setFilteredData(null)
    }

    // const mapBagAmounts = (bags, property) =>
    //     bags.map(bag => `${parseFloat(bag[property]).toLocaleString()}`).join(' , ');

console.log("merchantrequestlist",merchantrequestlist)
    const mapAddress = address =>
        address.deposit_add_id.bank_name + ', ' + address.deposit_add_id.bank_address;


    const excelExportData = (filteredData || merchantrequestlist || []).map((data) => {
        return {
            "Customer": `${data.merchant.business_name} (${data.zone.name})`,
            "Request ID": { v: data.req_ID, t: 'n' },
            "Request Type": data.req_type,
            "Charge Type": data.charge_type,
            "Status": data.status,
            "Rate": { v: data.rate, t: 'n' },
            "Pickup Date & Time": moment(data.pickup_datetime).format("DD-MM-YYYY,hh:mm A"),
            "Picked Up Date & Time": data.pickedup_datetime ? moment(data.pickedup_datetime).format("DD-MM-YYYY,hh:mm A") : 'N/A',
            "Deposit Date & Time": data.deposit_datetime ? moment(data.deposit_datetime).format("DD-MM-YYYY,hh:mm A") : 'N/A',
            "Officer": data.user ? data.user?.name : 'N/A',
            "No of Bags": { v: data.no_of_bags, t: 'n' },
            "Bag Id": data.bags.map(bag => `${bag.bag_ID}`).join(' , '),
            "Cash Amount in Bag1($)": { v: data.bags[0]?.cash_amount, t: 'n' },
            "Cash Amount in Bag2($)": { v: data.bags[1]?.cash_amount || 0, t: 'n' },
            "Cheque Amount in Bag1($)": { v: data.bags[0]?.cheque_amount, t: 'n' },
            "Cheque Amount in Bag2($)": { v: data.bags[1]?.cheque_amount || 0, t: 'n' },
            "Coins Amount in Bag1($)": { v: data.bags[0]?.coins_amount, t: 'n' },
            "Coins Amount in Bag2($)": { v: data.bags[1]?.coins_amount || 0, t: 'n' },
            "Bags Grand Total($)": { v: parseFloat(data.grandTotal), t: 'n' },
            "Extra Charge($)": { v: parseFloat(data.extraRate), t: 'n' },
            "Insurance($)": { v: parseFloat(data.insurance), t: 'n' },
            "With Return": data.withreturn,
            "Pickup Address": data.pickup_address,
            "Deposit Address": mapAddress(data),
            "Contact Number": data.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
        }
    })
    let columnCount = 25;

    return (
        <>
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

                        <div className="row">
                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="/requests">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatars-chart rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatars-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="text-dark mt-1">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.totalRequests}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        Total Requests
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="/requests">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatar-charts rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatars-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="text-dark mt-1">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.completedReq}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        Completed Requests
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="/requests">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatar-charts rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatars-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="text-dark mt-1">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.assignedReq}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        Assigned Requests
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-md-6 col-xl-6">
                                <div className="widget-rounded-circle card-box">
                                    <Link to="#">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="avatar-lg avatars-chart rounded-circle d-flex justify-content-center align-items-center">
                                                    <FiBarChart2 className='avatars-title' />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="text-end">
                                                    <h4 className="text-dark mt-1">
                                                        {totalMerchantRequestCounts && totalMerchantRequestCounts.inTransitReq}
                                                    </h4>
                                                    <p className="text-muted mb-1 text-truncate" style={{ fontSize: "0.875rem" }}>
                                                        In transit Requests
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
                                                        <div className="row mb-4">
                                                            <div className="col-md-12 col-xl-4 mb-2">
                                                                <h5 className="page-title">Requests</h5>
                                                            </div>
                                                            <div className="col-md-6 col-lg-3 col-xl-2 mb-2 text-end">
                                                                {/* <Link to="/requests/create" className="btn btn-danger btn-sm form-control py-2"
                                                                    style={{ backgroundColor: "#b9433a", borderColor: "#b9433a", fontSize: '0.7875rem' }}>
                                                                    Create Request
                                                                </Link> */}
                                                            </div>
                                                            <div className="col-md-6 col-lg-3 mb-2 col-xl-2 text-end">
                                                                <ExcelExport excelData={excelExportData} fileName={"Customer Requests"} NumberOfColumn={columnCount} />
                                                            </div>
                                                            <div className="col-md-6 col-lg-3 mb-2 col-xl-2 text-end">
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
                                                            {/* <div className="col-md-6 col-lg-3 mb-2 col-xl-2 text-end">
                                                                <input
                                                                    type="text"
                                                                    className="search-btn form-control search-input"
                                                                    name="searchKey"
                                                                    placeholder="Search..."
                                                                    value={searchKey}
                                                                    onChange={searchHandler}
                                                                />
                                                            </div> */}
                                                        </div>

                                                        <div id="box-div" className="pb-5">
                                                            <div style={{ display: (visible ? 'none' : 'block') }}>
                                                                <div className="row mb-3" id="filters">

                                                                    <div className="col-xl-4 col-md-3 mb-4">
                                                                        <Datepicker startDate={startDate}
                                                                            setStartDate={setStartDate}
                                                                            endDate={endDate} s
                                                                            setEndDate={setEndDate}
                                                                            showCalendar={showCalendar}
                                                                            setShowCalendar={setShowCalendar}
                                                                            OnClickHandler={OnClickHandler}
                                                                            activeItem={activeItem}
                                                                            setActiveItem={setActiveItem}
                                                                        />
                                                                    </div>

                                                                    <div className={`col-xl-3 col-md-3 mb-4`}>
                                                                        <Select
                                                                            classNamePrefix="select2"
                                                                            options={optionsRate}
                                                                            value={optionsRate.find((option) => option.value === rate)}
                                                                            onChange={handleSelectChange}
                                                                            components={{
                                                                                IndicatorSeparator: null,
                                                                                DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                                                                    menuIsOpen ? <AiOutlineCaretUp style={{ color: '#adb5bd' }} /> : <AiOutlineCaretDown style={{ color: '#adb5bd' }} />,
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <div className="col-xl-2 col-md-3 mb-2">
                                                                        <div className="row justify-content-center">
                                                                            <div className="col-2 col-md-5 text-center">
                                                                                <button
                                                                                    type="submit"
                                                                                    style={{ padding: "0", height: "40px", width: "40px", borderRadius: "4px" }}
                                                                                    className="btn btn-primary p-0 me-3"
                                                                                    name="submit"
                                                                                >
                                                                                    <AiOutlineSearch size={20}
                                                                                        onClick={OnClickHandler} />
                                                                                </button>
                                                                            </div>

                                                                            <div className="col-2 col-md-5 text-center">
                                                                                <button
                                                                                    type="button"
                                                                                    style={{ padding: "0", height: "40px", width: "40px", borderRadius: "4px" }}
                                                                                    className="btn btn-danger"
                                                                                    name="button"
                                                                                >
                                                                                    <MdCancel size={20}
                                                                                        onClick={cancelHandler} />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className='table-responsive'>
                                                                <table id=""
                                                                    className="table table-striped border-top custom_table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#ID</th>
                                                                            <th>Pickup/Deposit</th>
                                                                            <th>Assigned Truck</th>
                                                                            <th>Routes</th>
                                                                            <th>Rate/Charge</th>
                                                                            <th>Extra Charge</th>
                                                                            {/* <th>#Bag</th> */}
                                                                            <th>Bag Amount</th>
                                                                            <th>Zone</th>
                                                                            <th>Track</th>
                                                                            <th>Requested Time</th>
                                                                            <th>Status</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                        {
                                                                            filteredData ? filteredData.map((req, i) => {
                                                                                const s1 = req.req_type.toString().indexOf('(')
                                                                                const s2 = req.req_type.toString().indexOf(')')
                                                                                const string = req.req_type.toString().slice(s1, s2 + 1)
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td>{req.req_ID}</td>
                                                                                        <td>
                                                                                            <span className="badge bg-soft-success text-success">
                                                                                                {req.req_type.toString().substr("0", s1)}
                                                                                            </span>
                                                                                            <span className="badge bg-soft-success text-success">
                                                                                                {string}
                                                                                            </span>
                                                                                        </td>
                                                                                        {req.truck && req.truck !== null ? (
                                                                                            <td> {req.truck.truck_name}<br />
                                                                                                <span className="badge bg-soft-success">
                                                                                                    {req.truck.truck_no}
                                                                                                </span>
                                                                                            </td>
                                                                                        ) : (
                                                                                            <td>N/A</td>
                                                                                        )}

                                                                                        <td>
                                                                                            <span className="badge bg-soft-primary">
                                                                                                Pickup :
                                                                                            </span>
                                                                                            <Link to="#">
                                                                                                {req.pickup_address}
                                                                                            </Link>
                                                                                            <br />
                                                                                            <span className="badge bg-soft-info">
                                                                                                Deposit :
                                                                                            </span>
                                                                                            <Link to="#">
                                                                                                {req.deposit_add_id !== null ? req.deposit_add_id.bank_address : 'N/A'}
                                                                                            </Link>
                                                                                        </td>
                                                                                        <td className='text-capitalize'>
                                                                                            ${req.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <br /> {req.charge_type}
                                                                                        </td>
                                                                                        <td className='text-capitalize'>
                                                                                            ${req.extraRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                                        </td>
                                                                                        {/* <td> {req.no_of_bags} </td> */}
                                                                                        <td> ${req.grandTotal.toFixed(2)} </td>
                                                                                        <td> {req.zone.name} </td>
                                                                                        <td>
                                                                                            <Link to="#"> Track </Link>
                                                                                        </td>
                                                                                        <td>{Moment(req.created_at).format('DD-MM-YYYY,hh:mm A')}</td>
                                                                                        <td>
                                                                                            <span className="badge bg-soft-primary">
                                                                                                {req.status}
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="">
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
                                                                                                        to={"/merchant/requests/view/" + req._id}
                                                                                                        style={{ color: "#676868" }}
                                                                                                    >
                                                                                                        View
                                                                                                    </Link>
                                                                                                    <Link
                                                                                                        className="dropdown-item"
                                                                                                        to={"/merchant/requests/edit/" + req._id}
                                                                                                        style={{ color: "#676868" }}
                                                                                                    >
                                                                                                        Edit
                                                                                                    </Link>
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            }) : merchantrequestlist && merchantrequestlist.map((req, i) => {
                                                                                const s1 = req.req_type.toString().indexOf('(')
                                                                                const s2 = req.req_type.toString().indexOf(')')
                                                                                const string = req.req_type.toString().slice(s1, s2 + 1)
                                                                               console.log("req??????",req.created_at)
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td>{req.req_ID}</td>
                                                                                        <td>
                                                                                            <span className="badge bg-soft-success text-success">
                                                                                                {req.req_type.toString().substr("0", s1)}
                                                                                            </span>
                                                                                            <span className="badge bg-soft-success text-success">
                                                                                                {string}
                                                                                            </span>
                                                                                        </td>
                                                                                        {req.truck && req.truck !== null ? (
                                                                                            <td> {req.truck.truck_name}<br />
                                                                                                <span className="badge bg-soft-success">
                                                                                                    {req.truck.truck_no}
                                                                                                </span>
                                                                                            </td>
                                                                                        ) : (
                                                                                            <td>N/A</td>
                                                                                        )}

                                                                                        <td>
                                                                                            <span className="badge bg-soft-primary">
                                                                                                Pickup :
                                                                                            </span>
                                                                                            <Link to="#">
                                                                                                {req.pickup_address}
                                                                                            </Link>
                                                                                            <br />
                                                                                            <span className="badge bg-soft-info">
                                                                                                Deposit :
                                                                                            </span>
                                                                                            <Link to="#">
                                                                                                {req.deposit_add_id !== null ? req.deposit_add_id.bank_address : 'N/A'}
                                                                                            </Link>
                                                                                        </td>
                                                                                        <td className='text-capitalize'>
                                                                                            ${req.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <br /> {req.charge_type}
                                                                                        </td>
                                                                                        <td className='text-capitalize'>
                                                                                            ${req.extraRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                                        </td>
                                                                                        {/* <td> {req.no_of_bags} </td> */}
                                                                                        <td> ${req.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
                                                                                        <td> {req.zone.name} </td>
                                                                                        <td>
                                                                                            <Link to="#"> Track </Link>
                                                                                        </td>
                                                                                        <td>{Moment(req.created_at).format('DD-MM-YYYY,hh:mm A')}</td>
                                                                                        <td>
                                                                                            <span className="badge bg-soft-primary">
                                                                                                {req.status}
                                                                                            </span>
                                                                                        </td>
                                                                                        <td className="">
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
                                                                                                        to={"/merchant/requests/view/" + req._id}
                                                                                                        style={{ color: "#676868" }}
                                                                                                    >
                                                                                                        View
                                                                                                    </Link>
                                                                                                    <Link
                                                                                                        className="dropdown-item"
                                                                                                        to={"/merchant/requests/edit/" + req._id}
                                                                                                        style={{ color: "#676868" }}
                                                                                                    >
                                                                                                        Edit
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

                                                                <div className='mt-5 d-flex justify-content-around rate'>
                                                                    <h6> Total Request Billed : <span>${totalRequestRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></h6>
                                                                    <h6> Extra Charged Billed : <span>${extracharge.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></h6>
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
                <Footer />
            </div>
        </>
    )
}

export default CustomerRequestList

