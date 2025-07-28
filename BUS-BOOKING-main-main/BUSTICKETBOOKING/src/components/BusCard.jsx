// src/components/BusCard.jsx
import React from "react";
import { FaWifi, FaTv, FaUtensils, FaChargingStation } from "react-icons/fa";

const BusCard = ({ schedule, onClick }) => {
  const departureTime = new Date(schedule.departureDatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const arrivalTime = new Date(schedule.arrivalDatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg cursor-pointer transition-all min-h-[250px]"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-xs">From</p>
          <h2 className="text-xl font-bold">{schedule.routes.source}</h2>
        </div>
        <div className="flex flex-col items-center">
          <span className="border-dashed border rounded-full px-3 py-1 text-xs text-gray-500">
            {schedule.duration} Hrs
          </span>
        </div>
        <div>
          <p className="text-gray-400 text-xs">To</p>
          <h2 className="text-xl font-bold">{schedule.routes.destination}</h2>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex gap-4 text-gray-500 text-sm mt-4">
        <FaWifi title="Internet" />
        <FaUtensils title="Snacks" />
        <FaTv title="TV" />
        <FaChargingStation title="Mobile Charging" />
      </div>

      {/* Price + Button */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-2xl font-bold">
          Rs. {schedule.fare || "N/A"}
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm">
          Reserve Seat
        </button>
      </div>
    </div>
  );
};

export default BusCard;
