import React from 'react'
import {CCard,CCardBody, CCardHeader, CForm, CFormInput, CFormLabel, CRow,CCol } from '@coreui/react';
import { useSelector } from 'react-redux';
const Profile = () => {
    const whatsAppInfo = useSelector((state) => state.whatsAppInfo)
  return (
   <CRow>
        <CCol md={12} style={{ marginTop: "30px" }}>
            <CCard >
                 <CCardHeader style={{ background: "#FD841F", color: "#fff", fontWeight: "bold" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5>Profile</h5>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CForm>
                        <CRow>
                            <CCol md={6}>
                                <CFormLabel>Nama</CFormLabel>
                                <CFormInput readOnly={true} value={whatsAppInfo.nama}/>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel>whatsappNumber</CFormLabel>
                                <CFormInput readOnly={true} value={whatsAppInfo.whatsappNumber}/>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
   </CRow>
  )
}

export default Profile