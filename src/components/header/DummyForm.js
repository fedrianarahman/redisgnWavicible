import React,{ useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { CForm, CInputGroup, CButton } from '@coreui/react';
const DummyForm = (props) => {
    const [params, setParams] = useState({
        nominal: "",
      })
      
  return (
    <div>
        <CForm onSubmit={props.handleSubmit3}>
        <CInputGroup className='mb-3 '>
          <CurrencyInput 
            style={{ textAlign: "right" }}
            id="input-example"
            name="nominal"
            className='form-control'
            placeholder=""
            defaultValue={params.nominal}
            decimalsLimit={2}
            onValueChange={(value) => setParams({ ...params, nominal: value })}
            autoComplete="off" disabled={props.disabled}/>
        </CInputGroup>
        <CButton className='float-end text-right' type='submit' style={{background: "#379237", border: "none"}} >Top up</CButton>
        <CInputGroup className=''>
        </CInputGroup>
      </CForm>
    </div>
  )
}

export default DummyForm