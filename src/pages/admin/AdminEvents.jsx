import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import {
  EVENT_PATH,
  filterEvents,
  getEventFilterOptions,
  getVipRevenue,
} from "../../services/eventService";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    date: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const { get, del, loading } = useApi("http://localhost:3000");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setError(null);

    try {
      const data = await get(EVENT_PATH);
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    }
  };

  const openDeleteModal = (event) => {
    setError(null);
    setDeletingEvent(event);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;
    setShowDeleteModal(false);
    setDeletingEvent(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEvent) return;

    setDeleteLoading(true);
    setError(null);

    try {
      await del(`${EVENT_PATH}/${deletingEvent.id}`);
      await loadEvents();
      closeDeleteModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete event");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/events/${id}/edit`);
  };

  const handleFilterChange = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: "", category: "", date: "" });
  };

  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters],
  );

  const vipRevenue = useMemo(
    () => filteredEvents.reduce((sum, event) => sum + getVipRevenue(event), 0),
    [filteredEvents],
  );

  const { statuses, categories } = useMemo(
    () => getEventFilterOptions(events),
    [events],
  );

  if (loading && !events.length) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-3xl bg-slate-50 p-10 text-slate-700">
        Loading events...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Admin Events
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage event details, timing, and inventory from your admin
            dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            Showing {filteredEvents.length} of {events.length} events
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/events/new")}
            className="inline-flex items-center justify-center rounded-3xl px-4 py-3 text-sm font-semibold btn-primary"
          >
            Create event
          </button>
        </div>
      </div>
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-12">
        <div className="grid gap-4 sm:col-span-10">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm text-slate-700">
              Status
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
              >
                <option value="">All statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-700">
              Category
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-700">
              Date
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="rounded-3xl bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 shadow-sm">
            <p className="text-slate-500">VIP revenue</p>
            <p className="mt-1 text-lg text-slate-900">
              ₹{vipRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl bg-rose-50 p-6 text-rose-700 ring-1 ring-rose-200">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      ) : null}

      {showDeleteModal && deletingEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Confirm delete
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-900">
                    {deletingEvent.title}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-slate-500 transition hover:bg-slate-200"
              >
                ×
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete event"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 text-left text-sm uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-4">Event</th>
              <th className="px-4 py-4">Venue & Timing</th>

              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={event.posterUrl}
                      alt={event.title}
                      className="h-20 w-20 flex-none rounded-3xl border border-slate-200 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">
                        {event.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {event.category}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Price: ₹{event.price}
                      </p>
                      <p className="text-sm text-slate-500">
                        Seats: {event.availableSeats}/{event.totalSeats}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 max-w-xs">
                  <p className="font-medium text-slate-900">
                    {event.venue}, {event.city}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(event.dateTime).toLocaleString()}
                  </p>
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      event.status === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleEdit(event.id)}
                    className="mr-2 rounded-2xl px-3 py-2 text-sm font-semibold btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(event)}
                    className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!filteredEvents.length ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No events match the selected filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEvents;
