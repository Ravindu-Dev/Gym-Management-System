import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AdminBoard from "./components/AdminBoard";
import PlansPage from "./components/PlansPage";
import UserBoard from "./components/UserBoard";
import ClassSchedule from "./components/ClassSchedule";
import AdminClassManagement from "./components/AdminClassManagement";
import AdminAnalytics from "./components/AdminAnalytics";
import WorkoutTracker from "./components/WorkoutTracker";
import MemberQR from "./components/MemberQR";
import AdminScanner from "./components/AdminScanner";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";
import UserLayout from "./components/UserLayout";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminTrainerManagement from "./components/AdminTrainerManagement";
import TrainerDashboard from "./components/TrainerDashboard";
import NutritionTracker from "./components/NutritionTracker";

import BookTrainer from "./components/BookTrainer";
import MyBookings from "./components/MyBookings";
import BookingService from "./services/booking.service";

function App() {
  const [currentUser, setCurrentUser] = useState(() => AuthService.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState(() => {
    const user = AuthService.getCurrentUser();
    return user ? user.roles.includes("ROLE_ADMIN") : false;
  });
  const [isMember, setIsMember] = useState(() => {
    const user = AuthService.getCurrentUser();
    return user ? user.roles.includes("ROLE_USER") : false;
  });
  const [isTrainer, setIsTrainer] = useState(() => {
    const user = AuthService.getCurrentUser();
    return user ? user.roles.includes("ROLE_TRAINER") : false;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
      setIsMember(user.roles.includes("ROLE_USER"));
      setIsTrainer(user.roles.includes("ROLE_TRAINER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/login");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isMemberRoute = ["/user", "/profile", "/classes", "/workouts", "/my-qr", "/plans", "/book-trainer", "/my-bookings", "/nutrition"].includes(location.pathname);
  const isTrainerRoute = ["/trainer-dashboard"].includes(location.pathname);
  const showPublicNavbar = !isAuthPage && !isAdmin && !isTrainerRoute && (!isMember || !isMemberRoute);

  return (
    <div className="min-h-screen bg-gmsdark-950 text-gray-100 font-sans">
      {showPublicNavbar && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gmsdark-950/80 backdrop-blur-lg border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="text-3xl font-display font-bold heading-gradient tracking-tighter">
              GMS
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/home" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Contact</Link>
              <Link to="/classes" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Classes</Link>
              <Link to="/plans" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Plans</Link>
            </div>

            <div className="flex items-center space-x-4">
              {currentUser ? (
                <Link to={isAdmin ? "/admin" : "/user"} className="btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Login</Link>
                  <Link to="/register" className="btn-primary">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      <div className={showPublicNavbar ? "pt-20" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans" element={isMember ? <UserLayout user={currentUser}><PlansPage /></UserLayout> : <PlansPage />} />
          <Route path="/classes" element={isMember ? <UserLayout user={currentUser}><ClassSchedule /></UserLayout> : <ClassSchedule />} />

          {/* Member Protected Routes */}
          <Route path="/user" element={isMember ? <UserLayout user={currentUser}><UserBoard /></UserLayout> : <Navigate to="/login" />} />
          <Route path="/profile" element={isMember ? <UserLayout user={currentUser}><Profile /></UserLayout> : <Navigate to="/login" />} />
          <Route path="/workouts" element={isMember ? <UserLayout user={currentUser}><WorkoutTracker /></UserLayout> : <Navigate to="/login" />} />
          <Route path="/nutrition" element={isMember ? <UserLayout user={currentUser}><NutritionTracker /></UserLayout> : <Navigate to="/login" />} />
          <Route path="/my-qr" element={isMember ? <UserLayout user={currentUser}><MemberQR /></UserLayout> : <Navigate to="/login" />} />

          {/* Admin Routes (Kept as is for now, or potentially wrap in AdminLayout) */}
          <Route path="/admin" element={isAdmin ? <AdminBoard /> : <Navigate to="/home" />} />
          <Route path="/admin/classes" element={isAdmin ? <AdminClassManagement /> : <Navigate to="/home" />} />
          <Route path="/admin/analytics" element={isAdmin ? <AdminAnalytics /> : <Navigate to="/home" />} />
          <Route path="/admin/scan" element={isAdmin ? <AdminScanner /> : <Navigate to="/home" />} />
          <Route path="/admin/trainers" element={isAdmin ? <AdminTrainerManagement /> : <Navigate to="/home" />} />

          {/* Trainer Routes */}
          <Route path="/trainer-dashboard" element={isTrainer ? <TrainerDashboard /> : <Navigate to="/login" />} />


          {/* User Booking Route */}
          <Route path="/book-trainer" element={isMember ? <UserLayout user={currentUser}><BookTrainer /></UserLayout> : <Navigate to="/login" />} />
          <Route path="/my-bookings" element={isMember ? <UserLayout user={currentUser}><MyBookings /></UserLayout> : <Navigate to="/login" />} />

          {/* Payment Routes */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </div>
      {showPublicNavbar && <Footer />}
    </div>
  );
}

export default App;
