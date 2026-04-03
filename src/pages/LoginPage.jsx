import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPage.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleLogin = () => {
    setError('')
    const { email, password } = form

    // Validation
    if (!email || !password)      { setError('Please fill in all fields.');     return }
    if (!email.includes('@'))     { setError('Enter a valid email address.');   return }

    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('eb_users') || '{}')
    if (!users[email])            { setError('No account found. Please sign up.'); return }
    if (users[email].password !== password) { setError('Incorrect password.');  return }

    // Save logged-in user, redirect to home
    localStorage.setItem('eb_user', JSON.stringify({ name: users[email].name, email }))
    navigate('/home')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">EventBooking</div>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to your account</p>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => set('password', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <button className="btn-primary" onClick={handleLogin}>Sign in</button>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}