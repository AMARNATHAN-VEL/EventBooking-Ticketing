import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const navItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Events", path: "/admin/events" },
  { label: "Bookings", path: "/admin/bookings" },
];

const AdminLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);

  const adminProfile = {
    name: "Admin User",
    role: "Administrator",
    email: "admin@example.com",
    phone: "(555) 123-4567",
    joined: "January 2025",
  };

  return (
    <div className="min-h-screen bg-bg text-body">
      <aside className="fixed left-0 top-0 z-20 h-screen w-72 border-r border-border bg-sidebar px-6 py-8 shadow-sm flex flex-col">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-body">
              Admin panel
            </p>
            <h1 className="mt-4 text-2xl font-bold text-body">Event Booker</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-lg bg-primary p-2 text-surface hover:bg-secondary transition"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zM13 11a1 1 0 110 2h-2a1 1 0 110-2h2zm-6 0a1 1 0 110 2H5a1 1 0 110-2h2zm.464-4.536l-1.414-1.414a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 001.414-1.414zM5 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-surface shadow"
                    : "text-body hover:bg-secondary hover:text-on-light"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-10 rounded-3xl bg-surface-muted p-4 text-sm text-on-light shadow-sm">
          <p className="font-semibold text-on-light">Quick tips</p>
          <p className="mt-2 leading-6 text-on-light-muted">
            Use the sidebar to switch between dashboard, event management, and
            bookings.
          </p>
        </div>

        <div className="mt-auto rounded-3xl bg-surface p-4 text-sm text-on-light shadow-sm ring-1 ring-border">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-surface">
              {adminProfile.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-on-light">{adminProfile.name}</p>
              <p className="text-xs text-on-light-muted">{adminProfile.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowProfile(true)}
            className="mt-4 w-full rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-surface transition hover:bg-secondary"
          >
            View profile
          </button>
        </div>
      </aside>

      <div className="ml-72 flex-1">
        <main className="min-h-screen p-6">
          <Outlet />
        </main>
      </div>

      {showProfile ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
          <div className="w-full max-w-md rounded-3xl bg-surface p-6 shadow-2xl ring-1 ring-border">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-on-light-muted">
                  Admin profile
                </p>
                <h2 className="mt-2 text-2xl font-bold text-on-light">
                  {adminProfile.name}
                </h2>
                <p className="mt-1 text-sm text-on-light-muted">
                  {adminProfile.role}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="rounded-full border border-border bg-surface-muted px-3 py-2 text-on-light-muted transition hover:bg-slate-200"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm text-on-light">
              <div>
                <p className="font-semibold text-on-light">Email</p>
                <p>{adminProfile.email}</p>
              </div>
              <div>
                <p className="font-semibold text-on-light">Phone</p>
                <p>{adminProfile.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-on-light">Member since</p>
                <p>{adminProfile.joined}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:bg-secondary"
              >
                Close profile
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminLayout;
