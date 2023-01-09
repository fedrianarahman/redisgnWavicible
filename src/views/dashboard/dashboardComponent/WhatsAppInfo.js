import {
    CCard,
    CRow,
    CTable,
    CCardHeader,
    CCardBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell
 } from "@coreui/react";
import React, { useEffect, useState }from "react"; 
import { ApiService } from "../../../ApiService/ApiService";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";



const WhatsAppInfo = () =>{
    let token = jwtDecode(window.localStorage.getItem("token"));
    // console.log("line 21", token)
    const [data, setData] = useState({
        nomorWa : '',
        namaSekolah : '',
        saldo : '',
        statusLogin : ''
    });

    const dispatch = useDispatch();

    useEffect(()=>{
        fetchData();
        dispatch({type : "set",  data});
        // console.log("line 35 whatsapp info", data);
    }, [])

const fetchData = async () =>{
    
    const response = await ApiService.post(`/wa/get-user-wa`, token);
    setData({...data, nomorWa : response.data.data.whatsappNumber, namaSekolah : response.data.data.nama, saldo : response.data.data.saldoTopup});
    // console.log("line 35", response.data)
  
}

    return(
        <CCard style={{ border : "1px solid #FD841F"}}>
            <CCardHeader style={{background : "#FD841F", color: "#fff", fontWeight : "bold"}}>Featured</CCardHeader>
            <CCardBody>
                <CTable small>
                    <CTableHead>
                        <CTableRow>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                        <CTableHeaderCell scope="row">Nomor Wa :</CTableHeaderCell>
                        <CTableDataCell>{data.nomorWa}</CTableDataCell>
                        {/* <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell> */}
                        </CTableRow>
                        <CTableRow>
                        <CTableHeaderCell scope="row">Nama :</CTableHeaderCell>
                        <CTableDataCell>{data.namaSekolah}</CTableDataCell>
                        {/* <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell> */}
                        </CTableRow>
                        <CTableRow>
                        <CTableHeaderCell scope="row">status :</CTableHeaderCell>
                        <CTableDataCell>{data.statusLogin}</CTableDataCell>
                        {/* <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell> */}
                        </CTableRow>
                        <CTableRow>
                        <CTableHeaderCell scope="row">Saldo :</CTableHeaderCell>
                        <CTableDataCell>{data.saldo}</CTableDataCell>
                        {/* <CTableDataCell></CTableDataCell>
                        <CTableDataCell></CTableDataCell> */}
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}


export default WhatsAppInfo;