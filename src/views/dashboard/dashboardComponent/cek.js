{/* {loading ? (
                        <SpinnerLoading />
                       ):(
                        <>
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
                     <CTable small className='mt-4 table-responsive table-bordered'>
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
                                        <CTableDataCell>{index + 1}</CTableDataCell>
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
                        </>
                       )}
                     */}