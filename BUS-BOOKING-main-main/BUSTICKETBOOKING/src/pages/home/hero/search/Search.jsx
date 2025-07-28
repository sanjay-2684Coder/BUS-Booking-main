import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../components/service/axiosConfig";

const Search = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!from.trim() || !to.trim() || !date) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSchedules([]);

      const response = await axiosInstance.get("/schedules/search", {
        params: {
          source: from,
          destination: to,
          travelDate: date,
        },
        skipAuth: true,
      });

      if (response.data.length === 0) {
        setError("No schedules found for the selected route and date.");
      } else {
        setSchedules(response.data);
      }
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError("Failed to fetch schedules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleClick = (scheduleId) => {
    navigate(`/seats/${scheduleId}`);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gray-900 opacity-40 z-0"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('/home/saim/Downloads/BUS-BOOKING-main zip (3)/BUS-BOOKING-main/BUSTICKETBOOKING/src/assets/herobg.png')" 
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Search Bus Schedules
        </h1>

        {/* Search Form */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 px-6 rounded-md transition disabled:opacity-50 w-full md:w-auto"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
        </div>

        {/* Schedules List */}
        {loading ? (
          <div className="text-center text-white text-lg mt-10">
            Searching for available schedules...
          </div>
        ) : schedules.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((schedule) => (
              <div
                key={schedule.scheduleId}
                onClick={() => handleScheduleClick(schedule.scheduleId)}
                className="p-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg cursor-pointer transition border border-gray-200 hover:border-blue-400"
              >
                <p className="text-lg font-semibold mb-2">
                  {schedule.routes.source} ➔ {schedule.routes.destination}
                </p>
                <p className="text-gray-600">
                  <strong>Bus No:</strong> {schedule.buses.busNumber}
                </p>
                <p className="text-gray-600">
                  <strong>Departure:</strong>{" "}
                  {new Date(schedule.departureDatetime).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <strong>Arrival:</strong>{" "}
                  {new Date(schedule.arrivalDatetime).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <strong>Duration:</strong> {schedule.duration} hrs
                </p>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center text-white text-lg mt-10">
              No schedules found. Try searching again!
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;