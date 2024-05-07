import React from 'react'
import TimePicker from 'react-time-picker-input';
import "react-time-picker-input/dist/components/TimeInput.css"

function TimePickers({ value, onChange, disabled, fullTimeDropdown }) {

    return (
        <>
            <TimePicker
                className="form-control"
                value={value}
                hour12Format
                fullTimeDropdown={fullTimeDropdown}
                onChange={onChange}
                disabled={disabled}
            />
        </>
    )
}

export default TimePickers