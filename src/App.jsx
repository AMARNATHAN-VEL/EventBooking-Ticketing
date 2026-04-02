import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage  from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage   from './pages/HomePage'

// Protects /home — redirects to /login if not logged in
function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('eb_user') || 'null')
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Navigate to="/login" replace />} />
        <Route path="/login"  element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home"   element={<PrivateRoute><HomePage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}