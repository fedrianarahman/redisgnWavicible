import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import AuthProvider from './hooks/AuthProvider';
// import ProtectedRoute from './hooks/ProtectedRoute';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ProtectedRoute = React.lazy(()=> import('./hooks/ProtectedRoute'))
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <AuthProvider>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route path="*" name="Home" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>} />
          </Routes>
          </AuthProvider>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
