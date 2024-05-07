import React from 'react'

const RequestGeofence = () => {
    return (
        <>
            <div className="col-xl-6 col-lg-6">
                <div className="card" style={{height:'350px'}}>
                    <div className="card-body">
                        <h4 className="header-title mb-3 mt-2">Requests according to Geo-Fence</h4>
                        <div id="world-map-markers" style={{ height: " 260px" }}></div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RequestGeofence