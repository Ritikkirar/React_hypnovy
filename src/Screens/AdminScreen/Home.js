import React from 'react'
import "./Home.css"
import Footer from '../../components/Footer/Footer'
import Cards from '../../components/HomeComponents/Cards'
import RequestsTable from '../../components/HomeComponents/RequestsTable'
import RecentAssignedTrucks from '../../components/HomeComponents/RecentAssignedTrucks'
import Chart from '../../components/HomeComponents/Chart'
import RecentRequests from '../../components/HomeComponents/RecentRequests'
import RequestGeofence from '../../components/HomeComponents/RequestGeofence'



const Home = ({ token }) => {
    return (
        <div className='content-page position-relative' id="content" >
            <div className='content mb-xl-5'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='page-title-box'>
                                <div className='page-title-right'></div>
                                <h4 className="page-title">Dashboard </h4>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <Cards token={token} />
                        <RequestsTable token={token}/>
                    </div>
                    <div className='row'>
                        <RecentAssignedTrucks token={token}/>
                        <Chart token={token}/>
                    </div>
                    <div className='row' style={{ marginBottom: "70px" }}>
                        <RecentRequests token={token}/>
                        <RequestGeofence token={token}/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home