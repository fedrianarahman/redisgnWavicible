import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import {logoNegative} from "../assets/brand/logo-negative"
import {sygnet} from "../assets/brand/sygnet"
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { IoCallSharp } from "react-icons/io5";
// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{background : "#FD841F"}}
    >
      <CSidebarBrand className="d-none d-md-flex" style={{background : "#FD841F"}} to="/">
        <IoCallSharp style={{ marginRight : "180px", background: "green", padding: "3px", color: "white", borderRadius: "50%"}} size={30} />
        <span style={{fontWeight :"bold", marginLeft : '-40px', marginTop : "10px", fontSize :"20px", position:"absolute"}}>Wa Vicible</span>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
      style={{background : "#FD841F"}}
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
