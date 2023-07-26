import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol } from '@coreui/react';
import jwtDecode from 'jwt-decode';
import { ApiService } from '../../ApiService/ApiService';
import { useSelector, useDispatch } from 'react-redux'
import ModalIframe from '../../components/header/ModalIframe';
import CurrencyInput from 'react-currency-input-field';
const TopUpSaldo = (props) => {

    const whatsAppInfo = useSelector((state) => state.whatsAppInfo)
    const token = jwtDecode(useSelector((state => state.token)));
    const [data, setData] = useState({})
    
    const [modalIframe, setModalIframe] = useState({
        visible : false,
      })


    const url = `/wa/get-invoices`;

    const fetchData = async ()=>{
        const response = await ApiService.get(url);
        // console.log("line 18", response.data.data);
        // setData((data)=>(...data, response.data.data))
        setData((data)=>({...data, ...response.data.data[0]}))
    }

    const shorten = data.datetime_expired ? data.datetime_expired.substring(0,10) : '';

    useEffect(()=>{

        fetchData()
    }, [])

    const handleCloseIframe =  () =>{
        setModalIframe({...modalIframe, visible : false});
    }

    const caraTransfer = () =>{
         
        const param = [
            "key=abahKadabra",
            `nominal=${data.totalamount - data.feePayment}`,
            'keterangan=TopUp Saldo',
            `nomor=${whatsAppInfo.whatsappNumber}`,
            `uid_sekolah=${25}`,
            `action=caraTransfer`,
            `clientID=${token.id}`
        ]

        const url =  `https://siswa.smartsystem.co.id/#/paymentv2?`+param.join('&');
        setModalIframe({...modalIframe, visible : true, url : url});
        console.log("line 45", url);
    }

    console.log("line 60", data);
    const batalkanTransfer = () =>{
        const param = [
            "key=abahKadabra",
            `nominal=${data.totalamount - data.feePayment}`,
            'keterangan=TopUp Saldo',
            `nomor=${whatsAppInfo.whatsappNumber}`,
            `uid_sekolah=${25}`,
            `action=batalkan`,
            `clientID=${token.id}`
        ]

        const url =  `https://siswa.smartsystem.co.id/#/paymentv2?`+param.join('&');
        setModalIframe({...modalIframe, visible : true, url : url});
        console.log("line 71", url);
    }
    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
        //   style: "currency",
          currency: "IDR"
        }).format(number);
      }
  return (

    <>
    {(modalIframe.visible)?
    <ModalIframe visible={modalIframe.visible} cbClose={handleCloseIframe} url={modalIframe.url}/>
    :''
    }
    <CCard style={{ border: "1px solid #FD841F" }}>
        <CCardHeader style={{ background: "#FD841F", color: "#fff", fontWeight: "bold" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5>Top Up Saldo</h5>
                </div>
         </CCardHeader>
         <CCardBody>
            <CRow>
                <CCol md={6}>
                    <CCard style={{border : "1px solid #DEF5E5"}}>
                        <CCardHeader style={{background : "#DEF5E5", border : "none", color : "#379237"}}>Detail Item</CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                <CTableRow>
                                 <CTableHeaderCell scope="col">Item</CTableHeaderCell>
                                 <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                                </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableDataCell>Top up saldo</CTableDataCell>
                                        <CTableDataCell>{rupiah(data.totalamount - data.feePayment)}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableDataCell>Biaya Layanan</CTableDataCell>
                                        <CTableDataCell>{rupiah(data.feePayment)}</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                            <h3 style={{marginTop : "20px", fontSize : "20px", textAlign : "right"}}>Total : <span style={{fontSize : "20px"}}>{rupiah(data.totalamount)}</span></h3>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={6}>
                    <CCard style={{ border: "1px solid #FF7D7D" }}>
                        <CCardHeader style={{background : "#FF7D7D", color : "white"}}>
                            Informasi VA Pembayaran
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <CFormLabel>Kategori</CFormLabel>
                                <CFormInput type='text' value="Top Up Saldo" disabled/>
                                <div className='mt-2'>
                                    <CRow>
                                        <CCol md={4}>
                                        <CFormLabel>Bank</CFormLabel>
                                        <CFormInput type='text' value={data.bankName} disabled/>
                                        </CCol>
                                        <CCol md={8}>
                                        <CFormLabel>No VA</CFormLabel>
                                        <CFormInput type='text' value={data.paymentcode} disabled/>
                                        </CCol>
                                    </CRow>
                                </div>
                                <div className='mt-2'>
                                    <CRow>
                                        <CCol md={6}>
                                        <CFormLabel>Nominal Transfer</CFormLabel>
                                        <CFormInput type='text' style={{textAlign : "right"}} value={rupiah(data.totalamount)} disabled/>
                                        </CCol>
                                        <CCol md={6}>
                                        <CFormLabel>Tanggal Expired</CFormLabel>
                                        <CFormInput type='text' value={shorten} disabled/>
                                        </CCol>
                                    </CRow>
                                </div>
                                <div className='mt-4'>
                                    <CRow>
                                        <CCol md={6}>
                                        <CButton onClick={caraTransfer} style={{background : "#FEB139",width : "210px",height : "40px" ,color : "white", textAlign : "center", border : "none", borderRadius : "0px"}}>Cara Transfer</CButton>
                                        </CCol>
                                        <CCol md={6}>
                                        <CButton onClick={batalkanTransfer} style={{background : "#DC0000",width : "210px",height : "40px" ,color : "white", textAlign : "center", border : "none", borderRadius : "0px"}}>Batalkan Pembayaran</CButton>
                                        </CCol>
                                    </CRow>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
         </CCardBody>
    </CCard>
    </>
  )
}

export default TopUpSaldo