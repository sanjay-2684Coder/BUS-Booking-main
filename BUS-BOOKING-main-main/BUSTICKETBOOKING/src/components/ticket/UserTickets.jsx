import React, { useEffect, useState } from "react";
import axiosInstance from "../service/axiosConfig";
import "./UserTickets.css";

const UserTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Format date/time with proper error handling
  const formatDateTime = (datetimeString) => {
    try {
      const date = new Date(datetimeString);
      if (isNaN(date.getTime())) return "Invalid Date";
      
      return date.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (err) {
      console.error("Date formatting error:", err);
      return "Invalid Date";
    }
  };

  // Format just the date portion
  const formatDateOnly = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (err) {
      console.error("Date formatting error:", err);
      return "Invalid Date";
    }
  };

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/bookings/getByUserId");

        const mappedTickets = response.data.map((ticket) => ({
          id: ticket.bookingId,
          bookingDate: ticket.bookingDate,
          route: ticket.seat?.schedule?.routes
            ? `${ticket.seat.schedule.routes.source} → ${ticket.seat.schedule.routes.destination}`
            : "Route Details N/A",
          busNumber: ticket.seat.schedule.buses.busNumber || "N/A",
          busDriverName: ticket.seat?.schedule?.buses?.busDriverName || "N/A",
          busDriverNumber: ticket.seat?.schedule?.buses?.busDriverNumber || "N/A",
          departureTime: ticket.seat?.schedule?.departureDatetime || "N/A",
          arrivalTime: ticket.seat?.schedule?.arrivalDatetime || "N/A",
          seatNumber: ticket.seat?.seatNumber || "N/A",
          seatPrice: ticket.seat?.seatPrice || 0,
          travelDate: ticket.seat?.schedule?.travelDate || "N/A",
          status: ticket.status || "UNKNOWN",
          prioritySeat: ticket.prioritySeat || false,
          rawData: ticket // Keep original data for reference
        }));

        setTickets(mappedTickets);
        setFilteredTickets(mappedTickets);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tickets. Please try again later.");
        console.error("Ticket fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    let filtered = [...tickets];

    // Apply date filter
    if (selectedDate) {
      filtered = filtered.filter(ticket => {
        try {
          const ticketDate = new Date(ticket.travelDate).toISOString().split('T')[0];
          return ticketDate === selectedDate;
        } catch (err) {
          console.error("Date filtering error:", err);
          return false;
        }
      });
    }

    // Apply status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    setFilteredTickets(filtered);
  }, [selectedDate, statusFilter, tickets]);

  const handleCancelTicket = async (ticketId) => {
    if (!window.confirm("Are you sure you want to cancel this ticket?")) return;
    
    try {
      await axiosInstance.delete(`/bookings/${ticketId}`);
      setTickets(prev => prev.filter(t => t.id !== ticketId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel ticket");
      console.error("Ticket cancellation error:", err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-alert">
          <h3>Error Loading Tickets</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-tickets-container">
      <header className="tickets-header">
        <h1>Your Tickets</h1>
        <div className="ticket-filters">
          <div className="filter-group">
            <label htmlFor="date-filter">Travel Date:</label>
            <input
              type="date"
              id="date-filter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </header>

      {filteredTickets.length === 0 ? (
        <div className="no-tickets">
          <img src="/images/no-tickets.svg" alt="No tickets found" />
          <h3>No tickets found</h3>
          <p>{selectedDate || statusFilter !== "ALL" 
            ? "Try adjusting your filters" 
            : "You haven't booked any tickets yet"}</p>
        </div>
      ) : (
        <div className="tickets-list">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className={`ticket-card status-${ticket.status.toLowerCase()}`}>
              <div className="ticket-header">
                <div className="ticket-meta">
                  <span className="ticket-id">Booking #{ticket.id}</span>
                  <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="ticket-route">
                  <h2>{ticket.route}</h2>
                  <span className="travel-date">
                    {formatDateOnly(ticket.travelDate)}
                  </span>
                </div>
              </div>

              <div className="ticket-body">
                <div className="trip-details">
                  <div className="time-details">
                    <div className="time-group">
                      <span className="time-label">Departure</span>
                      <span className="time-value">
                        {formatDateTime(ticket.departureTime)}
                      </span>
                    </div>
                    <div className="time-group">
                      <span className="time-label">Arrival</span>
                      <span className="time-value">
                        {formatDateTime(ticket.arrivalTime)}
                      </span>
                    </div>
                  </div>

                  <div className="bus-details">
                    <div className="detail-group">
                      <span>Bus Number:</span>
                      <strong>{ticket.busNumber}</strong>
                    </div>
                    <div className="detail-group">
                      <span>Driver:</span>
                      <strong>{ticket.busDriverName}</strong>
                    </div>
                    <div className="detail-group">
                      <span>Contact:</span>
                      <strong>{ticket.busDriverNumber}</strong>
                    </div>
                  </div>
                </div>

                <div className="seat-details">
                  <div className="seat-info">
                    <span>Seat Number:</span>
                    <strong className={ticket.prioritySeat ? "priority-seat" : ""}>
                      {ticket.seatNumber}
                      {ticket.prioritySeat && " (Priority)"}
                    </strong>
                  </div>
                  <div className="seat-price">
                    <span>Price:</span>
                    <strong>₹{ticket.seatPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </div>

              <div className="ticket-footer">
                <div className="booking-date">
                  Booked on: {formatDateTime(ticket.bookingDate)}
                </div>
                <div className="ticket-actions">
                  <button className="print-btn">Print Ticket</button>
                  {ticket.status === "CONFIRMED" && (
                    <button 
                      className="cancel-btn"
                      onClick={() => handleCancelTicket(ticket.id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTickets;