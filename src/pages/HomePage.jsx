import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './HomePage.css'

const EVENTS = [
  { id: 1, name: 'Coldplay: Music of the Spheres', date: 'May 15, 2026', venue: 'DY Patil Stadium, Mumbai',    category: 'Music',  emoji: '🎵', price: '₹2,499' },
  { id: 2, name: 'IPL 2026: CSK vs MI',            date: 'Jun 20, 2026', venue: 'Chepauk, Chennai',             category: 'Sports', emoji: '🏏', price: '₹1,499' },
  { id: 3, name: 'Zakir Khan Live Comedy',          date: 'Jun 10, 2026', venue: 'Chowdiah Hall, Bengaluru',    category: 'Comedy', emoji: '😂', price: '₹999'   },
  { id: 4, name: 'A.R. Rahman Symphony Night',      date: 'Jul  5, 2026', venue: 'YMCA Grounds, Chennai',       category: 'Music',  emoji: '🎶', price: '₹3,499' },
  { id: 5, name: 'Avengers: Secret Wars Premiere',  date: 'May  2, 2026', venue: 'PVR IMAX, Chennai',           category: 'Movie',  emoji: '🎬', price: '₹599'   },
  { id: 6, name: 'Diljit Dosanjh: Dil-Luminati',   date: 'May 28, 2026', venue: 'JLN Stadium, Delhi',          category: 'Music',  emoji: '🎤', price: '₹1,999' },
]

export default function HomePage() {
  const user     = JSON.parse(localStorage.getItem('eb_user'))
  const key      = 'eb_bookings_' + user.email
  const [bookings, setBookings] = useState(
    () => JSON.parse(localStorage.getItem(key) || '[]')
  )
  const [tab, setTab] = useState('events')

  const book = (event) => {
    if (bookings.some(b => b.id === event.id)) return
    const updated = [...bookings, event]
    setBookings(updated)
    localStorage.setItem(key, JSON.stringify(updated))
  }

  return (
    <div className="page">
      <Navbar activeTab={tab} onTabChange={setTab} bookingCount={bookings.length} />

      {tab === 'events' ? (
        <main className="container">
          {/* Hero banner */}
          <div className="hero-banner">
            <div className="hero-greeting">Hello, {user.name.split(' ')[0]}!</div>
            <h1 className="hero-title">Discover events near you</h1>
            <p className="hero-sub">{EVENTS.length} events · {bookings.length} booking{bookings.length !== 1 ? 's' : ''} made</p>
          </div>

          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {EVENTS.map(ev => {
              const isBooked = bookings.some(b => b.id === ev.id)
              return (
                <div className="event-card" key={ev.id}>
                  <div className={`event-img cat-${ev.category.toLowerCase()}`}>
                    <span>{ev.emoji}</span>
                  </div>
                  <div className="event-body">
                    <span className={`category-badge cat-${ev.category.toLowerCase()}`}>{ev.category}</span>
                    <h3 className="event-name">{ev.name}</h3>
                    <p className="event-meta">📅 {ev.date}</p>
                    <p className="event-meta">📍 {ev.venue}</p>
                    <div className="event-footer">
                      <span className="event-price">{ev.price}</span>
                      <button
                        className={`btn-book ${isBooked ? 'booked' : ''}`}
                        onClick={() => book(ev)}
                        disabled={isBooked}
                      >
                        {isBooked ? '✓ Booked' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      ) : (
        <main className="container">
          <h2 className="section-title">My Bookings</h2>
          {bookings.length === 0 ? (
            <div className="empty-state">
              <p>🎟 No bookings yet. <button onClick={() => setTab('events')}>Browse events</button></p>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map(b => (
                <div className="booking-item" key={b.id}>
                  <div className={`booking-icon cat-${b.category.toLowerCase()}`}>{b.emoji}</div>
                  <div>
                    <div className="booking-name">{b.name}</div>
                    <div className="booking-meta">📅 {b.date} · 📍 {b.venue}</div>
                    <div className="booking-id">Booking ID: EVT-{String(b.id).padStart(4, '0')}</div>
                  </div>
                  <span className="booking-confirmed">✓ Confirmed</span>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  )
}