import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol, CPagination,CPaginationItem } from '@coreui/react'

import { ApiService } from '../../../ApiService/ApiService';
import ModalData from './Modal';
import SpinnerLoading from '../../../components/SpinnerLoad/SpinnerLoading';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';
const Outbox = () => {


    let defaultDate = new Date();
    defaultDate.getDate();
    const [params, setParams] = React.useState({
        jenis: '1',
        tanggal1: defaultDate || '',
        tanggal2: defaultDate || '',
        datas: [],
        satuData: {},
        show: false,
        modalTitle: '',
        modalButton: '',
        rows : 0,
        page : 0,
        // limit : 10,
        pages : 0,
        minPage : 5,
        pageCount : 0
    });

    // page count
    const [pageCount,setPageCount] = useState(0);

    useEffect(()=>{
        onLoadData()
    }, [params.page])
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setParams((params)=>({...params, [name] : value}))
    }

    const handleFormTanggal = () => {
        if (params.jenis == "1") {
            return (
                <>
                    <CCol md={3}>
                        <CFormLabel>Tanggal 1</CFormLabel>
                        <CFormInput type='date' name='tanggal1' defaultValue={defaultDate.toLocaleDateString('en-CA')} onChange={handleChange}/>
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel>Tanggal 2</CFormLabel>
                        <CFormInput type='date' name='tanggal2' defaultValue={defaultDate.toLocaleDateString('en-CA')}  onChange={handleChange}/>
                    </CCol>
                </>
            )
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setParams(state => ({ ...state, datas : []}))
        setLoading(state => true);
        await onLoadData();
    }
    
    const changePage = ({selected})=>{
        setParams({...params, page : selected, minPage : params.minPage +1})
    }

    const onLoadData = async () => {
        const { jenis, tanggal1, tanggal2 } = params;

        let localParams = {

            limit: 10,
            skip : 10 * params.page,
            sort: 'id desc'
        }

        let res = await ApiService.post(`/wa/get-outbox`, { jenis, tanggal1, tanggal2 }, { params: localParams });
        let pageCount = Math.ceil(res.data.data.total/10);
        setLoading(state => false);
        setParams((params)=>({...params, datas : res.data.data.datas, rows : res.data.data.total, pages :res.data.data.total, show: false, satuData: res.data.data.datas[0], pageCount }))

    }
    const handleClose = () => setParams({ ...params, show: false });

    const handleAddData = () => {
        setParams((params)=>({...params, show : true, modalTitle : "Tambah Data", modalButton : "Save", satuData: {} }))
    }

    const handleEditData = (dataApi) => {
        setParams((params)=>({...params, show : true, modalTitle : "Edit Data", modalButton : "Update", satuData : dataApi}));
    }

    return (
        <>
            {params.show?
                <ModalData show={params.show} onHide={handleClose} modalTitle={params.modalTitle} textBtn={params.modalButton} onLoadData={onLoadData} dataApi={params.satuData} /> : ''
            }
            <CCard style={{ border: "1px solid #FD841F" }}>
                <CCardHeader style={{ background: "#FD841F", color: "#fff", fontWeight: "bold" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5>Outbox</h5>
                        <CButton size='sm' type='submit' onClick={handleAddData} > Tambah Data</CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                       
                     <CForm onSubmit={handleSubmit}>
                        <CRow>
                            <CCol md={3}>
                                <CFormLabel>Jenis</CFormLabel>
                                <CFormSelect name='jenis' onChange={handleChange}>
                                    <option value="1">Terkirim</option>
                                    <option value="0">Antrian</option>
                                </CFormSelect>
                            </CCol>
                            {handleFormTanggal()}
                            <CCol md={3}>
                            <CButton size='sm' style={{ marginTop: "35px", background: "#379237", color: "#FFF", fontWeight: "bold", border: "none" }} type='submit'>Cari</CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                     {loading ? (
                        <SpinnerLoading/>
                     ):(
                        <>
                        <CTable small className='mt-4 table-responsive table-bordered' responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Nomor</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tanggal dibuat</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nomor Tujuan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Pesan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {params.datas.map((dataApi, index) => {
                                let dateNew = dataApi.createdAt.substr(0, 10);
                                let time = dataApi.createdAt.substr(11, 8);
                                return (
                                    <CTableRow key={dataApi.id}>
                                        <CTableDataCell>{((params.page) * 10) + index + 1}</CTableDataCell>
                                        <CTableDataCell>{`${dateNew} ${time}`}</CTableDataCell>
                                        <CTableDataCell>{dataApi.nomorTujuan}</CTableDataCell>
                                        <CTableDataCell>{dataApi.message}</CTableDataCell>
                                        <CTableDataCell>{dataApi.harga}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton size='sm' onClick={() => handleEditData(dataApi)}>Edit</CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })}
                        </CTableBody>
                    </CTable>
                    <p>Total Data  : {params.rows} Page : {params.rows ? params.page +1 : 0} of {Math.ceil(params.rows/10)}</p>
                    {/* <CPagination aria-label="Page navigation example" align='center'>
                    <CPaginationItem aria-label="Previous" disabled>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                    <CPaginationItem active>1</CPaginationItem>
                    <CPaginationItem>2</CPaginationItem>
                    <CPaginationItem>3</CPaginationItem>
                    <CPaginationItem aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                    </CPagination> */}
                    <CPagination aria-label="Page navigation example" align='center'>
                    <ReactPaginate
                             previousLabel={"< Prev"}
                             nextLabel={"> Next"}
                             pageRangeDisplayed={5}
                             pageCount={params.pageCount}
                            onPageChange={changePage}
                             containerClassName={"pagination"}
                            pageLinkClassName={"page-link"}
                            previousLinkClassName={"page-link "}
                            nextLinkClassName={"page-link "}
                            activeLinkClassName={"page-link active"}
                            disabledLinkClassName={"page-link disabled"}
                        />
                    </CPagination>
                    
                    </>
                     )
                     }
                    
                </CCardBody>
            </CCard>
        </>
    )
}

export default Outbox