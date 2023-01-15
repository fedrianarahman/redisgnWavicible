import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const WaBlaste = React.lazy(()=>import('./views/dashboard/WaBlaste'))
const TopUpSaldo = React.lazy(()=>import('./views/dashboard/TopUpSaldo'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/wablaste', name: 'WaBlaste', element: WaBlaste },
  { path: '/topUpSaldo', name: 'topUpSaldo', element: TopUpSaldo },
  
]

export default routes
