import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  CButton,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilDollar, cilLoopCircular, cilPhone, cilMoney } from '@coreui/icons'
import { AppHeaderDropdown } from './header/index'
import { IoCallSharp } from "react-icons/io5";
import { logo } from '../assets/brand/logo';
import jwtDecode from 'jwt-decode';
import ModalTopUp from './header/ModalTopUp';
import ModalIframe from './header/ModalIframe';
import ModalScan from './header/ModalScan';
import { ApiService } from '../ApiService/ApiService';
import ButtonStatus from './header/ButtonStatus';
import { BsFillTelephonePlusFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const whatsAppInfo = useSelector((state) => state.whatsAppInfo)
  const token = jwtDecode(useSelector((state => state.token)));
  const navigate = useNavigate();

  const [params, setParams] = useState({
    show: false,
    modalTitle: "Top Up Saldo",
    textBtn: "cek",
    nominal: "300000",
    nomorWa: whatsAppInfo.whatsappNumber,
    uid_Sekolah: 25,
    data: {}
  });

  const [modalScan, setModalScan] = useState({
    show: false,
    dataQrCode: ""
  })

  const [elemenQrCode, setElementQrCode] = useState("");

  const [modalIframe, setModalIframe] = useState({
    visible: false,
  })

  const handleClick = async () => {
    await cekInvoice();
    
  }

  const cekInvoice = async ()=>{
    const url = `/wa/get-invoices`;
    let res =  await ApiService.get(url);
    // console.log("line 64" , res.data);
    if (res.data !== null) {
      navigate("topUpSaldo") || navigate("/topUpSaldo");
    }else{
      setParams({ ...params, show: true })
    }
  }

  const handleClose = () => {
    setParams({ ...params, show: false })
  }

  const handleSubmit = (url) => {
    // event.preventDefault();
    setModalIframe({ ...modalIframe, visible: true, url: url });
    handleClose()
    // console.log("line 63", param);
  }

  const handleCloseIframe = () => {
    setModalIframe({ ...modalIframe, visible: false });
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      // style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const handleScan = () => {
    setModalScan((modalScan) => ({ ...modalScan, show: true }));
    // console.log("line 79", modalScan.dataQrCode);
  }

  const handleScanClose = () => {
    setModalScan((modalScan) => ({ ...modalScan, show: !true }));
  }
  // console.log("line 89", modalScan.dataQrCode);
  useEffect(() => {
    (async () => {
      let fetch = await ApiService.post(`/wa/get-state-server`, { id: token.id })
      // setElementQrCode((satate)=> fetch.data.data)
      //   console.log("line fetch", fetch.data)
      setModalScan({ ...modalScan, dataQrCode: fetch.data.data })
    })()
  }, [])

  return (
    <>
      {
        params.show ?
          <ModalTopUp show={params.show} onHide={handleClose} modalTitle={params.modalTitle} textBtn={params.modalButton} handleSubmit={handleSubmit} noWhatsApp={whatsAppInfo.whatsappNumber} data={params.data} />
          : ''
      }
      {
        modalIframe.visible ?
          <ModalIframe visible={modalIframe.visible} cbClose={handleCloseIframe} url={modalIframe.url} />
          : ''
      }
      {
        modalScan.show ?
          <ModalScan show={modalScan.show} onHide={handleScanClose} qrCode={elemenQrCode} />
          : ''
      }
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink to="/dashboard" component={NavLink}>
                {whatsAppInfo.nama}
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            {/* <CNavItem >
            <CButton size='sm' style={{ marginTop: "5px", background: "#379237", border: "none" }} onClick={handleScan}>cek scan</CButton>
            </CNavItem> */}
            <CNavItem >
              <CNavLink href="#" >
                {/* <CIcon icon={cilDollar} size="lg" style={{color : "green"}}/> */}
                Saldo :
                <span style={{ fontSize: "16px", marginLeft : "5px" }}>Rp. {rupiah(whatsAppInfo.saldoTopup)}</span>
                <CTooltip CTooltip content="on Login" placement='right'>
                  <CIcon icon={cilLoopCircular} style={{ marginLeft: "7px", color: "black" }} />
                  {/* <IoCallSharp  /> */}
                </CTooltip>
              </CNavLink>
            </CNavItem>
            <CNavItem >
              <CButton size='sm' style={{ marginTop: "5px", background: "#379237", border: "none" }} onClick={handleClick}>Top Up saldo <CIcon icon={cilMoney} style={{ marginLeft: "7px", color: "white" }} /></CButton>
            </CNavItem>
            <CNavItem >
              <CNavLink href="#" >

                Status :
                {
                  modalScan.dataQrCode == "onLogin" &&
                  <CTooltip CTooltip content="on Login" placement='right'>
                    <CIcon icon={cilPhone}  style={{ marginLeft: "12px", background: "green", padding: "3px", color: "white", borderRadius: "50%", marginTop: "2px" }} size={"lg"} />
                  </CTooltip>
                }
                {
                  modalScan.dataQrCode == "error" &&
                  <CTooltip CTooltip content="on Login" placement='right'>
                    <CIcon icon={cilPhone}  style={{ marginLeft: "12px", background: "red", padding: "3px", color: "white", borderRadius: "50%", marginTop: "2px" }} size={"lg"} />
                  </CTooltip>
                }
                {modalScan.dataQrCode != "onLogin" &&
                  <CTooltip content="Scan qr" placement='right'>
                    <CButton size='sm' style={{ marginLeft: "3px", color: "white", background: "#F6F54D", border: "none", marginTop: "-3px" }} onClick={handleScan}> scan qr</CButton>
                  </CTooltip>
                }
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
      </CHeader>
    </>
  )
}

export default AppHeader
