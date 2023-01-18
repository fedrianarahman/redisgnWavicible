import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilLayers,
  cilAudio,
} from '@coreui/icons'
import {  CNavItem,  } from '@coreui/react'

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
    name: 'Wa Blaster',
    to: '/wablaste',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },
]

export default _nav
