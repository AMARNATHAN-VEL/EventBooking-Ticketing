import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ activeTab, onTabChange, bookingCount }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('eb_user'))
  const initials = user?.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const logout = () => {
    localStorage.removeItem('eb_user')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">EventBooking</div>
      <div className="nav-links">
        <button
          className={`nav-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => onTabChange('events')}
        >
          Home
        </button>
        <button
          className={`nav-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => onTabChange('bookings')}
        >
          My Bookings
          {bookingCount > 0 && <span className="nav-badge">{bookingCount}</span>}
        </button>
      </div>
      <div className="nav-user">
        <div className="avatar">{initials}</div>
        <span className="user-name">{user?.name.split(' ')[0]}</span>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}