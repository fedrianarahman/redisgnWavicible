import React, { useState } from 'react'
import { Modal, Form, Row, Button } from 'react-bootstrap';
import jwtDecode from "jwt-decode";
import { ApiService } from '../../../ApiService/ApiService';
import { useSelector} from 'react-redux'
const ModalData = (props) => {

    // let token = jwtDecode(window.localStorage.getItem("token"));
    const token = jwtDecode(useSelector((state => state.token)));
    const [params, setParams] = useState({
        form: {
            ...props.dataApi,
            uid_sekolah: token.id
        }
    })

    const handleChange = (event) => {
        event.preventDefault()
        let name = event.target.name;
        let value = event.target.value;
        let form = { ...params.form };
        form[name] = value;
        setParams({ form });
    }

    const saveData = async (event) => {
        event.preventDefault()
        props.onHide();

        if (params.form.id) {
            let form = { ...params.form }
            if (!form.sendStatusDate || form.sendStatusDate == null) form.sendStatusDate = 0;

            let updateData = await ApiService.post(`/wa/outbox-save`, form);
            console.log('line 34', updateData.data);
            if (updateData.data.status == "success") {
                alert('data berhasil diubah')
                props.onLoadData();
            }
        } else {
            let addData = await ApiService.post(`/wa/outbox-save`, params.form);
            console.log('line 38', addData.data);
            alert('data berhasil ditambahkan');
            props.onLoadData();
        }
    }

    return (
        <Modal show={props.show} onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title >{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Row>
                        <>
                            <Form.Group className='col col-md-12'>
                                <Form.Label>Nomor Tujuan</Form.Label>
                                <Form.Control type='text' name='nomorTujuan' required onChange={handleChange} defaultValue={params.form.nomorTujuan} placeholder="nomor tujuan" />
                            </Form.Group>

                            <Form.Group className='col col-md-12'>
                                <Form.Label>Pesan</Form.Label>
                                <Form.Control as="textarea" placeholder="Leave a comment here"
                                    style={{ height: '100px', fontSize: '12px' }}
                                    required
                                    name='message'
                                    onChange={handleChange}
                                    defaultValue={params.form.message}
                                />
                            </Form.Group>
                        </>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="warning" type="submit" onClick={saveData}>
                    {props.textBtn}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalData