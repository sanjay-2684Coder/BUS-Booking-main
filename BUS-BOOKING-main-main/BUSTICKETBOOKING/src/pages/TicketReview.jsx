import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TicketReviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg font-medium mb-4">No ticket information found.</p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { selectedSeats, totalPrice, scheduleId } = state;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Review Your Ticket</h2>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Schedule Details</h3>
          <p><strong>Schedule ID:</strong> {scheduleId}</p>
          {/* Later you can show more schedule details here */}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Selected Seats</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {seat.number}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Total Price</h3>
          <p className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</p>
        </div>

        <div className="flex justify-end">
          <button
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            onClick={() => alert("Payment Gateway Coming Soon")}
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketReviewPage;
