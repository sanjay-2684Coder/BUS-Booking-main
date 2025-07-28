import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar"; // Navbar
import Home from "./pages/home/Home"; // Home page
import About from "./pages/about/About"; // About page
import Footer from "./components/footer/Footer"; // Footer
import Ticket from "./pages/ticket/Ticket"; // Ticket page
import Details from "./pages/ticket/details/Details"; // Ticket details page
import Signup from "./pages/signup/Signup"; // Signup page
import Login from "./pages/login/Login"; // Login page
import SeatsComponent from "./components/SeatsComponents";
import ProtectedRoute from "./components/ProtectedRoute"; // For route protection
import BookingPreview from './pages/booking/BookingPreview';
import UserTickets from "./components/ticket/UserTickets";



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow pt-[8ch] bg-neutral-50">
          {/* Routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/BookingPreview" element={<BookingPreview />} />


            {/* Protected Routes */}
            <Route
              path="/bus-tickets"
              element={<ProtectedRoute component={<Ticket />} />}
            />
            <Route
              path="/bus-tickets/details"
              element={<ProtectedRoute component={<Details />} />}
            />
            {/* Route for Seats */}
            <Route
              path="/seats/:scheduleId"
              element={<ProtectedRoute component={<SeatsComponent />} />}
            />
            <Route path="/user-tickets" element={<UserTickets />} />


            {/* Error Page */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
