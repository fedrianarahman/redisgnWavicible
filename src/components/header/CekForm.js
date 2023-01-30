import React, { useState } from 'react'
import { CForm, CFormLabel, CFormInput, CButton, CInputGroup } from '@coreui/react'
import CurrencyInput from 'react-currency-input-field';
import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode';
const CekForm = (props) => {

  const [params, setParams] = useState({
    nominal: "",
  })

  const whatsAppInfo = useSelector((state) => state.whatsAppInfo)
  const token = jwtDecode(useSelector((state => state.token)));

  const handleSubmit2 = (event) => {
    event.preventDefault()
    // console.log("line 80", param);
    if (!params.nominal ) {
        alert("silahkan masukan nilai")
        return false
    }
    if(params.nominal <= 25000){
        alert("miinimal top up Rp.25.0000");
        return false
    }

    const param = [
        "key=abahKadabra",
        `nominal=${params.nominal}`,
        'keterangan=TopUp Saldo',
        `nomor=${whatsAppInfo.whatsappNumber}`,
        `uid_sekolah=${25}`,
        `clientID=${token.id}`
    ]

    const url = `https://siswa.smartsystem.co.id/#/paymentv2?` + param.join('&');

    console.log("line 96", url);
    props.handleSubmit(url)
}


  return (
    <div style={props.style}>
      <CForm onSubmit={handleSubmit2}>
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
            autoComplete="off" />
        </CInputGroup>
        <CButton className='float-end text-right' type='submit' style={{background: "#379237", border: "none"}}>Top up</CButton>
        <CInputGroup className=''>
        </CInputGroup>
      </CForm>
    </div>
  )
}

export default CekForm