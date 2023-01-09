import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const WaBlaste = React.lazy(()=>import('./views/dashboard/WaBlaste'))
const Setup = React.lazy(()=>import('./views/dashboard/Setup'))
const TopUpSaldo = React.lazy(()=>import('./views/dashboard/TopUpSaldo'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/wablaste', name: 'WaBlaste', element: WaBlaste },
  { path: '/setup', name: 'Setup', element: Setup },
  { path: '/topUpSaldo', name: 'topUpSaldo', element: TopUpSaldo },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  
]

export default routes
