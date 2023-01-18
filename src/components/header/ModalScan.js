import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Form, Row, Button } from 'react-bootstrap';
import { ApiService } from '../../ApiService/ApiService';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
const ModalScan = (props) => {
    //  const token = jwtDecode(useSelector((state => state.token)));
    // const [data, setData] = useState("");

    // useEffect(() => {
    //   (async () => {
    //     let fetch =   await ApiService.post(`/wa/get-state-server`, {id : token.id})
    //     console.log("line fetch", fetch)
    //     setData(state => fetch.data.data)
    //   })()
     
    // }, []);

  return (
    <Modal show={props.show} onHide={props.onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered >
        <Modal.Header closeButton>
                <Modal.Title >Scan QR</Modal.Title>
            </Modal.Header>
    <Modal.Body>
      {/* {data} */}
       <div dangerouslySetInnerHTML={{ __html : props.qrCode}}/>
       
    </Modal.Body>
</Modal>
  )
}

export default ModalScan