import React from 'react'

const date = new Date().getFullYear();
const Footer = () => {
  return (
   
    <footer className="footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">{date} &copy; Platinum Security</div>
        <div className="col-md-6"></div>
      </div>
    </div>
  </footer>
 
  )
}

export default Footer