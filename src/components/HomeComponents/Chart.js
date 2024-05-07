import React, { useEffect } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts'
import { useDispatch, useSelector } from 'react-redux'
import { merchantTypeWiseRequest } from '../../redux/actions/merchantAction'
import { logger } from '../../util/util'

const Chart = ({ token }) => {
    const dispatch = useDispatch()
    const { typeWiseReq } = useSelector((state) => state.typeWiseReq)

    logger("typeWiseReq", typeWiseReq)


    useEffect(() => {
        dispatch(merchantTypeWiseRequest(token))
    }, [dispatch, token])

    const options = {
        animationEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        toolTip: {
            enabled: "true",
            borderColor: "transparent",
            backgroundColor: "#000000c2",
            fontColor: "#fff",
        },
        data: [{
            type: "pie",
            indexLabel: "",
            toolTipContent: "{legendText}: <strong>{y}</strong>",
            startAngle: -90,
            dataPoints: [
                { y: typeWiseReq && typeWiseReq.merchantReq, legendText: "Merchants", color: "#6658dd" },
                { y: typeWiseReq && typeWiseReq.bankReq, legendText: "Banks", color: "#ee517f" }
            ]
        }]
    }


    return (
        <>
            <div className="col-lg-4">
                <h4 className="header-title mb-0 mt-3 ms-1">Merchant Type wise Requests</h4>
                <div className="card-box mt-2" style={{ height: '420px' }}>
                    <div className="widget-chart text-center" dir="ltr">
                        <div className="mt-3 chartjs-chart">
                            <CanvasJSChart options={options} containerProps={{ width: '100%', height: '300px' }} />
                        </div>

                        <div className="row mt-3">
                            <div className="col-6">
                                <p className="text-muted mb-1 text-truncate">Merchants</p>
                                <h5>{typeWiseReq && typeWiseReq.merchantReq}</h5>
                            </div>
                            <div className="col-6">
                                <p className="text-muted mb-1 text-truncate">Banks</p>
                                <h5>{typeWiseReq && typeWiseReq.bankReq}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chart