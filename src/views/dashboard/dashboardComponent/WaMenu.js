import React from 'react'
import { CCard,CCardHeader, CCardBody, CButton } from '@coreui/react'
const WaMenu = () => {
  return (
    <CCard style={{ border : "1px solid #FD841F"}}>
        <CCardHeader style={{background : "#FD841F", color: "#fff", fontWeight : "bold"}}>WA Menu</CCardHeader>
        <CCardBody>
            <CButton size='sm' >Restart Wa</CButton>
            <CButton size='sm' style={{marginLeft : "10px", border : "none", background : "green"}} >Scan QR</CButton>
        </CCardBody>
    </CCard>
  )
}

export default WaMenu