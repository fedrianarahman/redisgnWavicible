import React, { useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  
  cilSettings,
  
  cilUser,
  cilExitToApp
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { AuthContext } from '../../hooks/AuthProvider';
import ModalProfile from './ModalTopUp'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {

  const navigate = useNavigate();
  const {onLogout} = React.useContext(AuthContext);
  const whatsAppInfo = useSelector((state)=> state.whatsAppInfo)
  const [params, setParams] = useState({
    show : false,
  })

  const handleClose = () =>{
    setParams({...params, show : false})
  }
  const handleModal = () =>{
    setParams({...params, show : true,})
   
  }
  
  const Logout = () =>{

    window.localStorage.removeItem("token");
    navigate("/login")

  }

  return (
    <>
    
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <CIcon icon={cilUser} className="me-2" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#" onClick={()=>handleModal()}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={onLogout}>
          <CIcon icon={cilExitToApp} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
