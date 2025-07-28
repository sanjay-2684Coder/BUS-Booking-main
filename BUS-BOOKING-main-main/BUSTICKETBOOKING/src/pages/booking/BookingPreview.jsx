import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/service/axiosConfig";
import { toast } from "react-hot-toast";

const BookingPreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Destructure with fallback values
  const { selectedSeats = [], scheduleInfo = {}, totalPrice = 0 } = state || {};

  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prioritySeatId, setPrioritySeatId] = useState([]);

  useEffect(() => {
    if (selectedSeats.length === 0 || !scheduleInfo) {
      setError("Missing booking information. Please reselect seats.");
      setLoading(false);
      return;
    }

    const fetchPreview = async () => {
      try {
        const seatIds = selectedSeats.map((seat) => seat.id);
        const response = await axiosInstance.post("/bookings/preview", {
          seatIds: seatIds,
          scheduleId: scheduleInfo.scheduleId,
        });

        console.log("Preview Data from Backend:", response.data);
        setPreviewData(response.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          toast.error("Session expired. Redirecting to login...");
          localStorage.removeItem("jwtToken");
          navigate("/login");
        } else {
          setError("Failed to load booking preview.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [selectedSeats, scheduleInfo, navigate]);

  const handlePrioritySeatToggle = (seatId) => {
    setPrioritySeatId(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleConfirmBooking = async () => {
    try {
      const bookingRequest = {
        seatIds: selectedSeats.map(seat => seat.id),
        scheduleId: scheduleInfo.scheduleId,
        // Add other necessary booking fields
      };

      const response = await axiosInstance.post("/bookings/create", {
        bookingRequest,
        prioritySeatsId: prioritySeatId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });

      if (response.status === 201) {
        toast.success("Booking created successfully!");
        navigate("/", {
          state: {
            selectedSeats,
            totalPrice: previewData?.totalPrice,
            scheduleInfo,
            bookingId: response.data.id // Assuming the response contains booking ID
          }
        });
      }
    } catch (error) {
      console.error("Booking creation failed:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
        <p className="text-lg font-medium text-red-500 mb-4">{error}</p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8">Booking Preview</h2>

      {/* Travel Info */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Travel Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">From:</p>
            <p>{previewData?.schedule?.routes?.source || "Source not available"}</p>
          </div>
          <div>
            <p className="font-medium">To:</p>
            <p>{previewData?.schedule?.routes?.destination || "Destination not available"}</p>
          </div>
          <div>
            <p className="font-medium">Route Name:</p>
            <p>{previewData?.schedule?.routes?.routeName || "Route name not available"}</p>
          </div>
          <div>
            <p className="font-medium">Duration:</p>
            <p>{previewData?.schedule?.duration || "Bus number not available"}</p>
          </div>
          <div>
            <p className="font-medium">Bus Number:</p>
            <p>{previewData?.schedule?.buses?.busNumber || "Bus number not available"}</p>
          </div>
          <div>
            <p className="font-medium">Bus Driver:</p>
            <p>{previewData?.schedule?.buses?.busDriverName || "Driver name not available"}</p>
          </div>
          <div>
            <p className="font-medium">Bus Driver Number:</p>
            <p>{previewData?.schedule?.buses?.busDriverNumber || "Bus number not available"}</p>
          </div>
          <div>
            <p className="font-medium">Departure:</p>
            <p>{new Date(previewData?.schedule?.departureDatetime).toLocaleString() || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium">Arrival:</p>
            <p>{new Date(previewData?.schedule?.arrivalDatetime).toLocaleString() || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Seats Info */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Selected Seats</h3>
        <div className="flex flex-wrap gap-4 mb-6">
          {previewData?.seats?.map((seat) => (
            <div key={seat.seatId} className="px-4 py-2 bg-blue-100 rounded-full text-blue-800">
              {seat.seatNumber} - ₹{seat.seatPrice}
            </div>
          ))}
        </div>

        {/* Priority Seat Selection */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4">Select Priority Seats</h4>
          <p className="text-sm text-gray-600 mb-4">
            Priority seats will be given a front seat if available
          </p>
          <div className="flex flex-wrap gap-4">
            {previewData?.seats?.map((seat) => (
              <div
                key={`priority-${seat.seatId}`}
                className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                  prioritySeatId.includes(seat.seatId)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => handlePrioritySeatToggle(seat.seatId)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total + Confirm Button */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">
          Total: ₹{previewData?.totalPrice?.toFixed(2) || "N/A"}
        </h3>
        <button
          className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg"
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingPreview;