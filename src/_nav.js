import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilLayers,
  cilAudio,
  cilSettings
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Wa Blaste',
    to: '/wablaste',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
]

export default _nav
