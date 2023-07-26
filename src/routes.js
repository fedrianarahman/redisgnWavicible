import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const WaBlaste = React.lazy(()=>import('./views/dashboard/WaBlaste'))
const TopUpSaldo = React.lazy(()=>import('./views/dashboard/TopUpSaldo'))
const Profile = React.lazy(()=>import('./views/dashboard/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/wablaste', name: 'WaBlaste', element: WaBlaste },
  { path: '/topUpSaldo', name: 'topUpSaldo', element: TopUpSaldo },
  { path: '/profile', name: 'profile', element: Profile },
  
]

export default routes
