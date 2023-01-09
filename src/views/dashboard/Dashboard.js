import React from 'react'

import {

  CCol,
  CRow,
} from '@coreui/react'

import Outbox from './dashboardComponent/Outbox'
const Dashboard = () => {

  return (
    <>
      <CRow>
        <CCol md={12} style={{ marginTop: "30px" }}>
          <Outbox />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
