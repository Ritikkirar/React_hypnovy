import React, { useState } from 'react'
import { useEffect } from 'react';
import {
  Stepper,
  Step,
} from "react-progress-stepper";
import { logger } from '../../util/util';

const ProgressStep = ({ status }) => {
  const [statu, setStatus] = useState(0)
  logger("status", status);
  logger("statu", statu);

  useEffect(() => {
    if (status === 'Pending') {
      setStatus(0);
    } else if (status === 'Assigned') {
      setStatus(1);
    } else if (status === 'PickedUp') {
      setStatus(2);
    } else if (status === 'Completed') {
      setStatus(3);
    } else {
      setStatus(0);
    }

  }, [status])


  return (
    <>
      <Stepper step={statu}>
        <Step ></Step>
        <Step></Step>
        <Step></Step>
      </Stepper>

    </>
  )
}

export default ProgressStep