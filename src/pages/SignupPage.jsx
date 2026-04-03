import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './AuthPage.css'

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSignup = () => {
    setError('')
    const { name, email, password, confirm } = form

    // Validation
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields.');        return }
    if (!email.includes('@'))                      { setError('Enter a valid email address.');      return }
    if (password.length < 6)                       { setError('Password must be at least 6 chars.'); return }
    if (password !== confirm)                      { setError('Passwords do not match.');           return }

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('eb_users') || '{}')
    if (users[email]) { setError('An account with this email already exists.'); return }

    users[email] = { name, password }
    localStorage.setItem('eb_users', JSON.stringify(users))

    // Redirect to login
    navigate('/login')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">EventBooking</div>
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Join to start booking events</p>

        {error && <div className="form-error">{error}</div>}

        {[
          { label: 'Full name',        key: 'name',     type: 'text',     placeholder: 'Arjun Mehta' },
          { label: 'Email address',    key: 'email',    type: 'email',    placeholder: 'you@example.com' },
          { label: 'Password',         key: 'password', type: 'password', placeholder: 'Min. 6 characters' },
          { label: 'Confirm password', key: 'confirm',  type: 'password', placeholder: 'Repeat password' },
        ].map(({ label, key, type, placeholder }) => (
          <div className="form-group" key={key}>
            <label>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={e => set(key, e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignup()}
            />
          </div>
        ))}

        <button className="btn-primary" onClick={handleSignup}>Create account</button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}