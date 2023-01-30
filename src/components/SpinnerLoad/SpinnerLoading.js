import React from 'react'
import "./spinner.css";

const SpinnerLoading = () => {
  return (
    <div style={{position : "absolute", zIndex : 1, marginTop : "140px", marginLeft : "450px", display : "block"}} >
      <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
    </div>
  )
}

export default SpinnerLoading