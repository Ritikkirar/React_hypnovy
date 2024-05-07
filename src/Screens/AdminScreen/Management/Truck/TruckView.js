import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../../../components/Footer/Footer'
import { MdCancel, MdAccountCircle } from 'react-icons/md'
import { AiOutlineSearch } from "react-icons/ai";
import { getTruckById } from "../../../../redux/actions/truckAction"
import { useDispatch, useSelector } from 'react-redux'
import Datepicker from '../../../../components/Common/Datepicker'
import Moment from 'moment'
import '../../Home.css'
import { logger } from '../../../../util/util';
import Select from 'react-select';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

const TruckView = ({ token }) => {
    const [type, setType] = useState('')
    const [rate, setRate] = useState('')
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [showCalendar, setShowCalendar] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const formatString = "YYYY-MM-DD,h:mm A";

    const { id } = useParams()

    const dispatch = useDispatch()
    const { truckDetails } = useSelector((state) => state.truckDetails)


    const optionsType = [
        { value: '', label: '--Select Type--' },
        { value: 'all', label: 'All' },
        { value: 'MERCHANT', label: 'Merchant' },
        { value: 'FINANCIAL INSTITUTION', label: 'Bank' },
    ];

    const optionsRate = [
        { value: '', label: '--Select Rate/Charges--' },
        { value: 'all', label: 'All' },
        { value: 'Normal', label: 'Normal' },
        { value: 'Premium', label: 'Premium' },
    ];

    const currentLoad = truckDetails && truckDetails.truck.Requests
    // console.log("request grand total",currentLoad?.filter(el => Moment(el.pickup_datetime, formatString).format("YYYY-MM-DD") === Moment().format("YYYY-MM-DD")).reduce((sum, el) => sum += el.grandTotal, 0)>truckDetails && truckDetails.truck.truck_insurance_amount)
    
   

    const handleSelectChange = (selectedOption) => {
        setType(selectedOption.value);
    };

    const handleSelectChange1 = (selectedOption) => {
        setRate(selectedOption.value);
    };

    const formattedPhoneNumber = (phone) => {
        if (phone && typeof phone === 'number') {
            const phoneString = phone.toString();
            return phoneString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
        return '';
    };

    const OnClickHandler = () => {
        let filteredRequests = truckDetails?.truck.Requests.filter((data) => {
            if (type !== 'all' && !rate && !startDate && !endDate) {
                return data.customer_type.includes(type);
            } else if (type === 'all' && !rate && !startDate && !endDate) {
                return data;
            } else if (rate !== "all" && !type && !startDate && !endDate) {
                return data.charge_type.includes(rate)
            } else if (rate === 'all' && !type && !startDate && !endDate) {
                return data;
            } else if (type === 'all' && rate !== 'all' && !startDate && !endDate) {
                return data.charge_type.includes(rate);
            } else if (type === 'all' && rate === 'all' && !startDate && !endDate) {
                return data;
            } else if (type !== 'all' && rate !== 'all' && !startDate && !endDate) {
                return data.customer_type.includes(type) && data.charge_type.includes(rate);
            } else if (!type && !rate && startDate && endDate) {
                const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end;
            } else if (type !== 'all' && rate !== 'all' && startDate && endDate) {
                const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end
                    && data.customer_type.includes(type)
                    && data.charge_type.includes(rate);
            } else if (type !== 'all' && !rate && startDate && endDate) {
                const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end
                    && data.customer_type.includes(type);
            } else if (rate !== 'all' && !type && startDate && endDate) {
                const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return data.charge_type.includes(rate)
                    && itemDate >= start && itemDate <= end;
            } else if (type === 'all' && !rate && startDate && endDate) {
                const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end;
            } else if (type === 'all' && rate === 'all' && startDate && endDate) {
                const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end;
            } else if (type === 'all' && rate !== 'all' && startDate && endDate) {
                const itemDate = Moment(data.created_at).format("YYYY-MM-DD");
                let start = Moment(startDate).format("YYYY-MM-DD");
                let end = Moment(endDate).format("YYYY-MM-DD");
                return itemDate >= start && itemDate <= end
                    && data.charge_type.includes(rate);
            }
            return data;
        })
        setFilteredData(filteredRequests)
    }


    const CancelHandler = () => {
        setType("")
        setRate("")
        setStartDate()
        setEndDate()
        const filteredRequests = truckDetails?.truck.Requests.filter((data) => {
            return data
        })
        setFilteredData(filteredRequests)
    }

    // const totalAmount = truckDetails ? truckDetails && truckDetails.truck.Requests.reduce((accumulator, currentValue) => {
    //     return accumulator + currentValue.grandTotal;
    // }, 0) : 0;

    useEffect(() => {
        dispatch(getTruckById(id, token))
    }, [dispatch, id, token])


    return (
        <div className="content-page position-relative" id='content'>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mt-3" style={{ marginBottom: '70px' }}>
                        <div className="col-md-12">
                            <div className="card-box pb-1">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className="media d-flex mb-2">
                                            <img className="me-3 rounded-circle avatar-lg"
                                                src={truckDetails && truckDetails.truck.truck_image}
                                                alt=""
                                            />
                                            <div className="media-body">
                                                <h5 className="mt-0 mb-1 fw-bold">
                                                    {truckDetails && truckDetails.truck.truck_name}
                                                </h5>
                                                <p className="text-muted mb-2">
                                                    {truckDetails && truckDetails.truck.truck_no}
                                                </p>
                                                <p className="text-muted mb-1">
                                                    Truck Type : {truckDetails && truckDetails.truck.truck_type}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {truckDetails && truckDetails.user.map((data, i) => {
                                        return (
                                            <div className="col-lg-3 px-2" key={i}>
                                                <h4 className="text-muted text-uppercase"
                                                    style={{ fontSize: '13px' }}
                                                >
                                                    {data.officer_type} :
                                                </h4>
                                                <p className="mb-3 text-muted">
                                                    <MdAccountCircle className='me-1' />
                                                    <span className="me-1"> {data.name} </span>|<span className="me-1 ms-1"> {data.email} </span>|<span className="me-1 ms-1">{'+1' + formattedPhoneNumber(data.mobile)} </span>
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="page-title mb-3">Truck Requests</h5>

                                    <div className="row mb-3" id="filters">

                                        <div className={`col-md-4  col-xl-2 mb-3`}>
                                            <Select
                                                classNamePrefix="select2"
                                                options={optionsType}
                                                value={optionsType.find((option) => option.value === type)}
                                                onChange={handleSelectChange}
                                                components={{
                                                    IndicatorSeparator: null,
                                                    DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                                        menuIsOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />,
                                                }}
                                            />
                                        </div>

                                        <div className={`col-md-3 mb-3`}>
                                            <Select
                                                classNamePrefix="select2"
                                                options={optionsRate}
                                                value={optionsRate.find((option) => option.value === rate)}
                                                onChange={handleSelectChange1}
                                                components={{
                                                    IndicatorSeparator: null,
                                                    DropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
                                                        menuIsOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />,
                                                }}
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <Datepicker startDate={startDate}
                                                setStartDate={setStartDate}
                                                endDate={endDate}
                                                setEndDate={setEndDate}
                                                showCalendar={showCalendar}
                                                setShowCalendar={setShowCalendar}
                                                OnClickHandler={OnClickHandler}
                                            />
                                        </div>

                                        <div className="col-md-2">
                                            <div className="row justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary p-0 me-3"
                                                    name="submit"
                                                    style={{
                                                        height: "40px",
                                                        width: "60px",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    <AiOutlineSearch size={20}
                                                        onClick={OnClickHandler}
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger p-0"
                                                    name="button"
                                                    style={{
                                                        height: "40px",
                                                        width: "60px",
                                                        borderRadius: "4px",
                                                    }}
                                                >
                                                    <MdCancel size={20}
                                                        onClick={CancelHandler}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="widget-rounded-circle card-box p-3"
                                                style={{ background: " #f6f1f1", border: "1px solid rgba(0,0,0,.077)" }}>
                                                <Link to="">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p className="mb-1">Insurance Amount</p>
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <h4 className="mt-1 fw-bold">
                                                                ${truckDetails && truckDetails.truck.truck_insurance_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="widget-rounded-circle card-box p-3"
                                                style={{ background: "#e8e7f0", border: "1px solid rgba(0,0,0,.077)" }}>
                                                <Link to="">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p className="mb-1 text-truncate">
                                                                Current Load Amount
                                                            </p>
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <h4 className="mt-1 fw-bold">
                                                                ${currentLoad?.filter(el => el.status === "PickedUp" && Moment(el.pickup_datetime, formatString).format("YYYY-MM-DD") === Moment().format("YYYY-MM-DD")).reduce((sum, el) => sum += el.grandTotal, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="widget-rounded-circle card-box p-3"
                                                style={{ background: "#fef6f7", border: "1px solid rgba(0,0,0,.077)" }}>
                                                <Link to="">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p className=" mb-1 text-dark text-truncate">
                                                                Next Pending Amount
                                                            </p>
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <h4 className="mt-1 fw-bold">
                                                                ${currentLoad?.filter(el => el.status === "Assigned" && Moment(el.pickup_datetime, formatString).format("YYYY-MM-DD") === Moment().format("YYYY-MM-DD")).reduce((sum, el) => sum += el.grandTotal, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="widget-rounded-circle card-box p-3"
                                                style={{ background: "#fef6f7", border: "1px solid rgba(0,0,0,.077)" }}>
                                                <Link to="">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p className=" mb-1 text-dark text-truncate">
                                                                Today's Load Amount
                                                            </p>
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <h4 className="mt-1 fw-bold text-danger">
                                                                ${currentLoad?.filter(el => Moment(el.pickup_datetime, formatString).format("YYYY-MM-DD") === Moment().format("YYYY-MM-DD")).reduce((sum, el) => sum += el.grandTotal, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='table-responsive'>
                                        <table className="table table-striped border-top custom_table my-3">
                                            <thead>
                                                <tr>
                                                    <th>#ID</th>
                                                    <th>Merchant</th>
                                                    <th>Routes</th>
                                                    <th>Rate/Charge</th>
                                                    <th>#Bag</th>
                                                    <th>Amount</th>
                                                    <th>Track</th>
                                                    <th>Created at</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filteredData ? filteredData.map((data, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{data.req_ID}</td>
                                                            <td> <Link to="#"> {data.business_name} </Link> </td>
                                                            <td>
                                                                <span className="badge bg-soft-primary me-1">Pickup :</span>

                                                                <Link to="#" target="_blank">
                                                                    {data.pickup_address}
                                                                </Link>
                                                                <br />

                                                                <span className="badge bg-soft-info me-1">Deposit :</span>
                                                                <Link to="#"
                                                                    target="_blank">
                                                                    {data.deposit_add_id !== null ? data.deposit_add_id.bank_address : ''}
                                                                </Link>
                                                            </td>
                                                            <td> {data.charge_type} </td>
                                                            <td> {data.bags.length} </td>
                                                            <td> ${data.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                            <td> <Link to="#"> Track </Link> </td>
                                                            <td> {Moment(data.created_at).format('DD/MM/YYYY')} </td>
                                                            <td>
                                                                <span className="badge bg-soft-info">{data.status}</span>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : truckDetails && truckDetails.truck.Requests.map((data, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{data.req_ID}</td>
                                                            <td> <Link to="#"> {data.business_name} </Link> </td>
                                                            <td>
                                                                <span className="badge bg-soft-primary me-1">Pickup :</span>

                                                                <Link to="#"
                                                                    target="_blank">
                                                                    {data.pickup_address}
                                                                </Link>
                                                                <br />

                                                                <span className="badge bg-soft-info me-1">Deposit :</span>
                                                                <Link to="#"
                                                                    target="_blank">
                                                                    {data.deposit_add_id !== null ? data.deposit_add_id.bank_address : ''}
                                                                </Link>
                                                            </td>
                                                            <td> {data.charge_type} </td>
                                                            <td> {data.bags.length} </td>
                                                            <td> ${data.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                            <td> <Link to="#"> Track </Link> </td>
                                                            <td> {Moment(data.created_at).format('DD/MM/YYYY')} </td>
                                                            <td>
                                                                <span className="badge bg-soft-info">{data.status}</span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
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

export default TruckView