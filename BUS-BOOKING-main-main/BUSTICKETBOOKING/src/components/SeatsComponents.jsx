import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from "./service/axiosConfig";

const SeatsComponent = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [scheduleInfo, setScheduleInfo] = useState(null);

  const fetchSeatsAndSchedule = useCallback(async () => {
    if (!scheduleId) {
      setError("Please select a valid schedule");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [seatsResponse, scheduleResponse] = await Promise.all([
        axiosInstance.get(`/seats/${scheduleId}`),
        axiosInstance.get(`/schedules/${scheduleId}`)
      ]);

      setSeats(seatsResponse.data.map(seat => ({
        ...seat,
        isAvailable: seat.available,
      })));
      setScheduleInfo(scheduleResponse.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [scheduleId]);

  const handleApiError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400: setError("Invalid schedule ID"); break;
        case 404: setError("No seats available for this schedule"); break;
        default: setError("Failed to fetch seats data");
      }
    } else if (error.request) {
      setError("Network error - please check your connection");
    } else {
      setError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchSeatsAndSchedule();
  }, [fetchSeatsAndSchedule]);

  const handleSeatSelection = (seatId, seatPrice) => {
    setSelectedSeats(prev => {
      const existingIndex = prev.findIndex(s => s.id === seatId);
      if (existingIndex >= 0) {
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        const seat = seats.find(s => s.seatId === seatId);
        return [...prev, { id: seatId, price: seatPrice, number: seat.seatNumber }];
      }
    });
  };

  useEffect(() => {
    setTotalPrice(selectedSeats.reduce((total, seat) => total + seat.price, 0));
  }, [selectedSeats]);

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    navigate("/BookingPreview", { 
      state: { selectedSeats, scheduleInfo, totalPrice } 
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading available seats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-lg font-medium mb-4 text-gray-800">{error}</p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {
            setError(null);
            fetchSeatsAndSchedule();
          }}
          aria-label="Retry loading seats"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your Seats</h1>
        <div className="flex justify-center items-center flex-wrap gap-6">
          {[
            { color: 'bg-green-400', label: 'Available' },
            { color: 'bg-blue-500', label: 'Selected' },
            { color: 'bg-gray-400', label: 'Booked' }
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-5 h-5 ${item.color} rounded-sm mr-2`}></div>
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bus-layout bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
        <div className="bus-front bg-gray-800 py-3 text-center">
          <div className="text-white font-medium">FRONT</div>
          <div className="w-16 h-2 bg-yellow-400 mx-auto mt-1 rounded-full"></div>
        </div>

        <div className="driver-area bg-gray-700 h-16 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🚌</span>
          </div>
        </div>

        <div className="seats-grid p-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5 grid grid-cols-2 gap-4">
              {seats.filter((_, i) => i % 2 === 0).map(seat => (
                <Seat 
                  key={seat.seatId}
                  seat={seat}
                  isSelected={selectedSeats.some(s => s.id === seat.seatId)}
                  onSelect={handleSeatSelection}
                />
              ))}
            </div>

            <div className="col-span-2 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 rounded-full"></div>
            </div>

            <div className="col-span-5 grid grid-cols-2 gap-4">
              {seats.filter((_, i) => i % 2 !== 0).map(seat => (
                <Seat 
                  key={seat.seatId}
                  seat={seat}
                  isSelected={selectedSeats.some(s => s.id === seat.seatId)}
                  onSelect={handleSeatSelection}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bus-back bg-gray-800 py-2 text-center">
          <div className="w-24 h-1 bg-red-500 mx-auto mb-1 rounded-full"></div>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="selected-summary bg-white rounded-xl shadow-lg p-6 sticky bottom-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Your Selection</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(seat => (
                  <span key={seat.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Seat {seat.number}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Total: {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}</p>
              <p className="text-2xl font-bold mt-2 text-gray-800">₹{totalPrice.toFixed(2)}</p>
              <button
                className="mt-4 w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={handleProceedToPayment}
                aria-label="Proceed to booking preview"
              >
                Continue to Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Seat = ({ seat, isSelected, onSelect }) => {
  const getSeatClasses = () => {
    let base = "seat p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ";
    if (!seat.isAvailable) {
      return base + "bg-gray-300 text-gray-500 cursor-not-allowed";
    }
    if (isSelected) {
      return base + "bg-blue-600 text-white transform scale-105 shadow-md";
    }
    return base + "bg-green-400 hover:bg-green-500 text-gray-800 cursor-pointer";
  };

  return (
    <div
      className={getSeatClasses()}
      onClick={() => seat.isAvailable && onSelect(seat.seatId, seat.seatPrice)}
      aria-label={`Seat ${seat.seatNumber} - ${seat.isAvailable ? 
        (isSelected ? 'selected' : 'available') : 'booked'} for ₹${seat.seatPrice}`}
      tabIndex={seat.isAvailable ? 0 : -1}
      onKeyDown={(e) => seat.isAvailable && e.key === 'Enter' && onSelect(seat.seatId, seat.seatPrice)}
    >
      <span className="text-lg font-semibold">{seat.seatNumber}</span>
      {seat.isAvailable && (
        <span className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-700'}`}>
          ₹{seat.seatPrice}
        </span>
      )}
    </div>
  );
};

export default SeatsComponent;