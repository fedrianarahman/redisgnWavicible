import React, { Component, useEffect, useRef, } from 'react'
import ReactDOM from "react-dom"
import { Modal, Form, Row, Button, ModalBody } from 'react-bootstrap';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import Iframe from 'react-iframe';
import { useNavigate } from 'react-router-dom';
const ModalIframe = ({ visible, cbClose, url }) => {
  // const url  = `https://siswa.smartsystem.co.id/#/paymentv2?key=abahKadabra&nominal=300,000&keterangan=TopUp Saldo&nomor=082112531997&uid_sekolah=25`

  const navigate = useNavigate();
  const myIframe = useRef();

  const getInvoice = ()=>{
    navigate("topUpSaldo") || navigate("/topUpSaldo");
  }
  useEffect(() => {
    // let myIframe = document.getElementById("myIframe");
    // let url_string = "https://siswa.smartsystem.co.id/#/paymentv2?key=abahKadabra&nominal=300000&keterangan=TopUp Saldo&nomor=082112531997&uid_sekolah=25";
    // let width = "100%";
    // let height = "100%";
    // let geo = "uk";

    // let adsURL = url_string + "&size=" + width + "x" + height;
    // console.log(adsURL);
    // myIframe.src = adsURL;

    // console.log("line 21",myIframe.current)
    
    var eventMethod = window.addEventListener? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod === "attachEvent"? "onmessage" : "message";

    eventer(messageEvent,function (e) {
      console.log("line 29", e.data);

      if (e.data.action ==="close") {
        cbClose()
      }
      if (e.data.action ==="finish") {
        getInvoice()
        cbClose()
      }
      if (e.data.action === "batalkan" ){
        getInvoice();
        cbClose()
        // $scope.modal.close();
        //$scope.getInvoices();
    }

    })
    
  })

  return (
   
    <CModal visible={visible} size='lg' onClose={cbClose} fullscreen={true}>
      {/* <CModalHeader>
      <CModalTitle>iframe</CModalTitle>
      </CModalHeader> */}
      <CModalBody>
      <iframe 
        src={url}
        style={{width : "100%", height : "800px"}} />
      </CModalBody>
    </CModal>
  )
}


export default ModalIframe