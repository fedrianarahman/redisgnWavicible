import React from 'react'
import { CCard, CCardHeader, CCardBody,CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CButton
 } from '@coreui/react'

const RegisterUser = () => {
  return (
    <CCard style={{ border : "1px solid #FD841F"}}>
        <CCardHeader style={{background : "#FD841F", color: "#fff", fontWeight : "bold"}}>Pendaftaran Nomor User Login</CCardHeader>
        <CCardBody>
            <CForm>
                <CRow>
                <div className='form-group col-md-4'>
                <CFormLabel>Nomor</CFormLabel>
                <CFormInput type='text' style={{border : "1px solid #379237", borderRadius : "5px"}}/>
                </div>
                <div className='form-group col-md-4'>
                <CFormLabel>Nomor</CFormLabel>
                <CFormInput type='text' style={{border : "1px solid #379237", borderRadius : "5px"}}/>
                </div>
                <div className='form-group col-md-4'>
                    <CButton size='sm' style={{marginTop : "35px", background : "#379237", color:"#FFF", fontWeight : "bold", border : "none"}}>Request OTP</CButton>
                </div>
                </CRow>
            </CForm>
        </CCardBody>
    </CCard>
  )
}

export default RegisterUser