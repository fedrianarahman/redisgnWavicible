import React, { useState } from 'react'
import { Modal, Form, Row, Button } from 'react-bootstrap';
const ModalForm = ({ show, onHide, modalTitle, }) => {

    const [inputText, setInputTex] = useState({
        input : "",
        output : "",
    })

    const handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        
        let text = value;
        dataArray.map(row => {
            ///{namaSisa}/
            let regex = new RegExp(row.label,'g')
            text = text.replace(regex,row.value);
            console.log("line",text)
        })
    

        setInputTex({...inputText, [name] : value, output : text});
    }

    let dataArray = [{
        label : "{namasiswa}",
        value : "Dede Rahmat"
    },{
        label : "{tagihan}",
        value : `⏺    20.000 SPP Oktober 2022
⏺    20.000 SPP November 2022
TOTAL TAGIHAH 40.000
                `
    }]

    const listFormat = dataArray.map((data)=> data.label).join('\n')
    

    return (
        <Modal size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                {modalTitle}
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <>
                        
                        <Form.Group className='col col-md-8'>
                            <Form.Label>Input</Form.Label>
                            <Form.Control as="textarea" name="input" placeholder="Leave a comment here" style={{ height: '100px', fontSize: '12px' }} required onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className='col col-md-4'>
                            <Form.Label>Data</Form.Label>
                            <Form.Control as="textarea" defaultValue={listFormat}
                                        style={{ height: '100px', fontSize: '12px' }}
                                        required readOnly/>
                        </Form.Group>
                        <Form.Group className='col col-md-12'>
                            <Form.Label>Output</Form.Label>
                            <Form.Control as="textarea" defaultValue={inputText.output} placeholder="Leave a comment here"
                                        style={{ height: '100px', fontSize: '12px' }}
                                        required readOnly/>
                        </Form.Group>
                        </>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" >Save</Button>
                <Button variant="warning" type="submit" onClick={onHide}>
                    close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalForm