import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  
  CRow,
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
} from '@coreui/react'
import Checkbox from './waBlasteComponent/Checkbox';
import { ApiService } from '../../ApiService/ApiService';
import jwtDecode from 'jwt-decode';
const WaBlaste = () => {

  const [params, setParams] = useState({
    tahunAjaranSekolah: "",
    kelas: "",
    nama: "",
  });

  const [dataTabel, setDataTabel] = useState([])
  const [tahunAjaran, setTahunAjaran] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  // form checked
  const [isCheckAll, setIsCheckAll] = useState(false);
  //  end form checked

  // input pesan
  const [inputText, setInputTex] = useState({
    input: "",
    output: "",
  });
  // end inputPesan

  const [satuData, setSatudata] = useState([]);

  useEffect(() => {
    fetchDataTahunAjaran(),
      fetchDataKelas()
  }, []);


  // const handleSelectAll = (data) => {
  //   setIsCheckAll(!isCheckAll)
  //   for (let row of data) {
  //     row.isChecked = !isCheckAll
  //   }
  // };
  
  const handleSelectAll = (e, data) => {
    setIsCheckAll(!isCheckAll)
    for (let row of data) {
      row.isChecked = !isCheckAll
    }
  };

  const ambilDataCheked = () => {
    let datatable = [...dataTabel].filter(o => o.isChecked)
    console.log("dat checked", datatable)
  }

  // const handleClick = (data) => {
  //   data.isChecked = !data.isChecked
  //   let newData = [...dataTabel]
  //   setSatudata(data);
  //   setDataTabel(newData);
  //   console.log("line 81", satuData);
  // };
  const handleClickCheckbox = (e,data) => {
    data.isChecked = !data.isChecked
    let newData = [...dataTabel]
    // setSatudata(data);
    setDataTabel(newData);
    console.log("line 81", data);
  };

  const fetchDataTahunAjaran = async () => {
    const tokenSS = window.sessionStorage.getItem("tokenSS");
    const tokenData = jwtDecode(tokenSS)

    const Localparams = {
      where: { "sekolah": tokenData.user.uid_sekolah },
      limit: 1000,
      sort: "tahun_ajaran desc",
    }
    let url = "/tahunajaran"
    let params = Localparams;
    let configLocal = {token : tokenSS}
    // console.log("line 91", configLocal);
    const getDataTahunAjaran = await ApiService.get(url, params, configLocal);

    setTahunAjaran(getDataTahunAjaran.data.data)
  }

  const fetchDataKelas = async () => {
    const tokenSS = window.sessionStorage.getItem("tokenSS");
    const tokenData = jwtDecode(tokenSS)
    const Localparams = {
      sort: "nama_kelas asc",
      uid_sekolah: tokenData.id,
    }

    const configLocal = {token : tokenSS}
    const getDataKelas = await ApiService.get(`/kelas`, Localparams, configLocal );
    setDataKelas(getDataKelas.data.data);
  }

  const handleChange = (event) => {
    let nama = event.target.name;
    let value = event.target.value;

    // setParams({ ...params, [nama]: value });
    setParams((params)=>({...params, [nama] : value}))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const tokenSS = window.sessionStorage.getItem("tokenSS");

    let where = {
      'a.tahun': params.tahunAjaranSekolah
    }
    if (params.nama) where["b.fullname"] = { contains: params.nama }
    if (params.kelas) where["a.id_kelas"] = params.kelas

    let Params = { where }
    const configLocal = {token : tokenSS}

    const getDataSiswa = await ApiService.get(`/siswadss/kelastahunajaran`, Params, configLocal);
    setDataTabel(getDataSiswa.data.data);
    dataTabel.isChecked = false
  }

  const fnReplace = (tpl,data) => {return (tpl+'').replace(/\$\(([^\)]+)?\)/g, function ($1, $2) { return data[$2]; });}

  const handleChangePesan = (event) => {
    let nama = event.target.name;
    let value = event.target.value;

    let text = value;
    let dataReplace = {}
    dataArray.map(row => {
  
      dataReplace[row.label] = row.value

    })
    text = fnReplace(text,dataReplace);
    setInputTex({ ...inputText, [nama]: value, output: text });


  }
  let dataArray = [{
    label: "nama_siswa",
    value: "Dede Rahmat"
  },
  {
    label: "nama_kelas",
    value: "1 E"
  },
  {
    label: "tagihan",
    value: `⏺    20.000 SPP Oktober 2022
⏺    20.000 SPP November 2022
TOTAL TAGIHAH 40.000
            `
  }]
  
  const listFormat = dataArray.map((data) => "$("+data.label+")").join('\n')

  const handleKirimPesan = async () => {
    let datatable = [...dataTabel].filter(o => o.isChecked)
    let pesan = inputText.input
    let dataPenerima = datatable
    let formatPesan = pesan
    const response = await ApiService.post(`/wa/blaster`, { dataPenerima, formatPesan });
    console.log("line 188", response.data);
  }
  return (
    <>
      <CCard style={{ marginBottom: "30px", border: "1px solid #FD841F" }}>
        <CCardHeader style={{ background: "#FD841F", color: "#fff", fontWeight: "bold", textAlign: "center" }}>
          Tahap 1 : Membuat Format  Pesan
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol md={8}>
                <CFormLabel>Format Pesan</CFormLabel>
                <CFormTextarea style={{ height: '100px' }} name='input' onChange={handleChangePesan}></CFormTextarea>
              </CCol>
              <CCol md={3}>
                <CFormLabel>Data</CFormLabel>
                <CFormTextarea style={{ height: '100px' }} readOnly defaultValue={listFormat}></CFormTextarea>
              </CCol>
              <CCol md={8}>
                <CFormLabel>Perkiraan Pesan</CFormLabel>
                <CFormTextarea style={{ height: '100px' }} defaultValue={inputText.output} readOnly></CFormTextarea>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
      <CCard style={{ border: "1px solid #FD841F" }}>
        <CCardHeader style={{ background: "#FD841F", color: "#fff", fontWeight: "bold", textAlign: "center" }}>
          Tahap 2 : Memilih Siswa Yang Dituju
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit} id='wa-blaste-form'>
            <CRow>
              <CCol md={3}>
                <CFormLabel htmlFor="validationCustom04">Tahun Ajaran</CFormLabel>
                <CFormSelect id="validationCustom04" name='tahunAjaranSekolah' onChange={handleChange}>
                  <option value="">Pilih...</option>
                  {tahunAjaran.map((dataTahunAjaran) => <option key={dataTahunAjaran.id} value={dataTahunAjaran.tahun_ajaran}>{dataTahunAjaran.tahun_ajaran}</option>)}
                </CFormSelect>
                
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="validationCustom04">Kelas</CFormLabel>
                <CFormSelect id="validationCustom04" name='kelas' onChange={handleChange}>
                  <option value="">Semua</option>
                  {dataKelas.map((satuDataKelas) => <option key={satuDataKelas.id} value={satuDataKelas.id}>{satuDataKelas.nama_kelas}</option>)}
                </CFormSelect>
                
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="validationCustom05">Nama</CFormLabel>
                <CFormInput type="text" id="validationCustom05" name='nama' onChange={handleChange} autoComplete="off" />
                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CButton color="primary" style={{ marginTop: "30px" }} type="submit">
                  Cari
                </CButton>
                
                <CButton style={{ marginTop: "30px", marginLeft: "10px", background: "#F6F54D", color: "#000", border: "none" }} onClick={handleKirimPesan}>kirim Pesan</CButton>
              </CCol>
            </CRow>
          </CForm>
          <CTable style={{ marginTop: "30px" }} className='table-stripped'>
            <CTableHead style={{ background: "#FFBF00", }}>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                <CTableHeaderCell scope="col">No Hp Ayah</CTableHeaderCell>
                <CTableHeaderCell scope="col">No Hp Ibu</CTableHeaderCell>
                <CTableHeaderCell scope="col">Kelas</CTableHeaderCell>
                <CTableHeaderCell scope="col"><Checkbox type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  data={dataTabel}
                  isChecked={isCheckAll} /></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataTabel.map((data, index) => {
                return (
                  <React.Fragment key={data.id}>
                  <>

                    <CTableRow key={data.id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{data.fullname}</CTableDataCell>
                      <CTableDataCell>{data.ayah_mobile1}</CTableDataCell>
                      <CTableDataCell>{data.ibu_mobile1}</CTableDataCell>
                      <CTableDataCell>{data.nama_kelas}</CTableDataCell>
                      <CTableDataCell>
                        <Checkbox key={data.id} type="checkbox"
                          name={data.fullname}
                          id={data.id}
                          handleClick={handleClickCheckbox}
                          data={data}
                          isChecked={data.isChecked} />
                      </CTableDataCell>
                    </CTableRow>
                  </>
                  </React.Fragment>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default WaBlaste