import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import AdminEvents from "../pages/admin/AdminEvents";
import CreateEvent from "../pages/admin/CreateEvent";
import EditEvent from "../pages/admin/EditEvent";
import AdminBookings from "../pages/admin/AdminBookings";

import NotFound from "../pages/NotFound";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= DEFAULT ROUTE ================= */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<CreateEvent />} />
          <Route path="events/:id/edit" element={<EditEvent />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>

        {/* ================= NOT FOUND ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
