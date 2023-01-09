import React from 'react'
import { CCard,CCardHeader, CCardBody, } from '@coreui/react'



const QrCode = () => {
  return (
    <CCard style={{ border : "1px solid #FD841F"}}>
        <CCardHeader  style={{background : "#FD841F", color: "#fff", fontWeight : "bold"}}>Qr Code</CCardHeader>
        <CCardBody></CCardBody>
    </CCard>
  )
}

export default QrCode