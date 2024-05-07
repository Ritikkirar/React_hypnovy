import React from 'react'
import { AiFillCalendar } from 'react-icons/ai'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment'
import Button from 'react-bootstrap/Button'


const Datepicker = ({ startDate, setStartDate, endDate, setEndDate, showCalendar, setShowCalendar, OnClickHandler, activeItem, setActiveItem }) => {
    const today = new Date()

    const getLast7Days = () => {
        const last7Days = [];
        for (let i = 0; i < 7; i++) {
            last7Days.unshift(new Date(today.getTime() - (i * 24 * 60 * 60 * 1000)));
        }
        setStartDate(last7Days[0])
        setEndDate(last7Days[last7Days.length - 1])
        setActiveItem('Last7Days');
        return last7Days;
    }

    const getLast30Days = () => {
        const last30Days = [];
        for (let i = 0; i < 30; i++) {
            last30Days.unshift(new Date(today.getTime() - (i * 24 * 60 * 60 * 1000)));
        }
        setStartDate(last30Days[0])
        setEndDate(last30Days[last30Days.length - 1])
        setActiveItem('Last30Days');
        return last30Days;
    }

    const lastMonth = () => {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const start = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
        const end = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
        setStartDate(start)
        setEndDate(end)
        setActiveItem('lastMonth');
    }

    const thisMonth = () => {
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const start = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
        const end = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0);
        setStartDate(start)
        setEndDate(end)
        setActiveItem('thisMonth');
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    return (
        <div className='dropdown custom_dropdown_div' >

            <div className="dropdown-toggle"
                id="dropdownMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ marginTop: '-18px' }}

            >
                <AiFillCalendar size={20} className='me-2' style={{ color: '#6c757d' }} />
                <span className='current_date_show'>
                    {Moment(startDate).format('DD/MM/YYYY')} - {Moment(endDate).format('DD/MM/YYYY')}
                </span>
            </div>

            <div className="dropdown-menu"
                aria-labelledby="dropdownMenu"
                style={{
                    width: showCalendar === true ? '615px' : '',
                    display: showCalendar === true ? 'flex' : '',
                    alignItems: showCalendar === true ? 'center' : '',
                    justifyContent: showCalendar === true ? 'space-between' : '',
                }}
            >
                <ul className='list-unstyled date_dropdown_list mb-0'>
                    <li className={`${activeItem === 'Today' ? 'active_date' : ''}`}
                        onClick={() => {
                            setStartDate(today)
                            setEndDate(today)
                            setActiveItem('Today');
                        }}>
                        Today
                    </li>
                    <li className={`${activeItem === 'Yesterday' ? 'active_date' : ''}`}
                        onClick={() => {
                            setStartDate(today.setDate(today.getDate() - 1))
                            setEndDate(today.setDate(today.getDate()))
                            setActiveItem('Yesterday');
                        }}>
                        Yesterday
                    </li>
                    <li className={`${activeItem === 'Last7Days' ? 'active_date' : ''}`}
                        onClick={() => getLast7Days()}>
                        Last 7 Days
                    </li>
                    <li className={`${activeItem === 'Last30Days' ? 'active_date' : ''}`}
                        onClick={() => getLast30Days()}>
                        Last 30 Days
                    </li>
                    <li className={`${activeItem === 'thisMonth' ? 'active_date' : ''}`}
                        onClick={() => thisMonth()}>
                        This Month
                    </li>
                    <li className={`${activeItem === 'lastMonth' ? 'active_date' : ''}`}
                        onClick={() => lastMonth()}>
                        Last Month
                    </li>
                    <li className={`${activeItem === 'customRange' ? 'active_date' : ''}`}
                        onClick={() => {
                            setShowCalendar(true)
                            setActiveItem('customRange')
                        }}>
                        Custom Range
                    </li>
                </ul>
                <div className={showCalendar === true ? 'd-block' : 'd-none'}>
                    <DatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        isClearable={true}
                        monthsShown={2}
                        style={{ marginTop: '-7px' }}
                        selectsRange
                        inline
                    />
                    <div className='d-flex justify-content-between align-items-center'>
                        <p style={{ fontSize: '13px' }} className='mt-3'>
                            {Moment(startDate).format('DD/MM/YYYY')} - {Moment(endDate).format('DD/MM/YYYY')}
                        </p>
                        <Button variant="light" type="button" onClick={() => setShowCalendar(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='me-2'
                            onClick={() => {
                                OnClickHandler()
                                setShowCalendar(false)
                            }}>
                            Apply
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Datepicker