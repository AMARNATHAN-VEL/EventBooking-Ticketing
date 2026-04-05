export const EVENT_PATH = "/events";

export const getEventFilterOptions = (events) => {
  const statuses = Array.from(
    new Set(events.map((event) => event.status || "")),
  ).filter(Boolean);
  const categories = Array.from(
    new Set(events.map((event) => event.category || "")),
  ).filter(Boolean);
  return { statuses, categories };
};

export const normalizeDate = (dateTimeString) => {
  if (!dateTimeString) return "";
  return new Date(dateTimeString).toISOString().split("T")[0];
};

export const filterEvents = (events, filters) => {
  const { status, category, date } = filters;

  return events.filter((event) => {
    const matchesStatus = status ? event.status === status : true;
    const matchesCategory = category ? event.category === category : true;
    const matchesDate = date ? normalizeDate(event.dateTime) === date : true;
    return matchesStatus && matchesCategory && matchesDate;
  });
};

export const getEventRowLabel = (event) => ({
  venue: `${event.venue}, ${event.city}`,
  timing: event.dateTime ? new Date(event.dateTime).toLocaleString() : "-",
});

export const getVipRevenue = (event) => {
  if (!event?.seatMap?.length) return 0;

  return event.seatMap
    .filter((seat) => seat.type === "VIP" && seat.status === "booked")
    .reduce((sum, seat) => sum + (seat.price || 0), 0);
};
