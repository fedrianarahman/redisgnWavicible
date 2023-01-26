import React, { Component, useState } from 'react'
import { Modal, Form, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode';
import CurrencyInput from 'react-currency-input-field';

const ModalTopUp = (props) => {

    const [params, setParams] = useState({
        nominal: "",
    });

    const prefix = "Rp."

    const whatsAppInfo = useSelector((state) => state.whatsAppInfo)
    const token = jwtDecode(useSelector((state => state.token)));


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setParams({ ...params, [name]: value })
    }



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
        <Modal size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                {props.modalTitle}
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Row>
                        <>

                            <Form.Group className='col col-md-12'>
                                <Form.Label>Nominal</Form.Label>
                                <CurrencyInput
                                    style={{textAlign : "right"}}
                                    id="input-example"
                                    name="nominal"
                                    className='form-control'
                                    placeholder=""
                                    defaultValue={params.nominal}
                                    decimalsLimit={2}
                                    onValueChange={(value) => setParams({...params, nominal : value})}
                                    // onChange={handleChange}
                                />
                            </Form.Group>
                        </>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" type="submit" onClick={props.onHide}>
                    close
                </Button>
                <Button onClick={handleSubmit2} style={{ marginTop: "5px", background: "#379237", border: "none" }}>Top up</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalTopUp