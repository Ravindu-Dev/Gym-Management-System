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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.roles.includes("ROLE_ADMIN"));
      setIsMember(user.roles.includes("ROLE_USER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/login");
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-sans">
      {!isAuthPage && !isAdmin && (
        <nav className="bg-dark-800 border-b border-dark-700 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to={"/"} className="text-2xl font-bold text-primary-500 tracking-tight">
                  GMS
                </Link>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link to={"/home"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Home
                  </Link>
                  {isMember && (
                    <Link to={"/user"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Dashboard
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to={"/admin"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Admin Panel
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {currentUser ? (
                  <div className="flex items-center space-x-4">
                    {/* User specific profile/logout */}
                    {!isAdmin && (
                      <Link to={"/profile"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        {currentUser.username}
                      </Link>
                    )}
                    {isAdmin && (
                      <span className="text-primary-400 font-medium px-3 py-2 text-sm">
                        Admin: {currentUser.username}
                      </span>
                    )}

                    <button onClick={logOut} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                      LogOut
                    </button>

                    {/* Features only for members */}
                    {isMember && (
                      <>
                        <Link to={"/classes"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                          Classes
                        </Link>
                        <Link to={"/workouts"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                          Workouts
                        </Link>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to={"/classes"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Classes
                    </Link>
                    <Link to={"/login"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Login
                    </Link>
                    <Link to={"/register"} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg hover:shadow-primary-500/30">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAdmin ? <AdminBoard /> : <Navigate to="/home" />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/user" element={isMember ? <UserBoard /> : <Navigate to="/home" />} />
          <Route path="/classes" element={<ClassSchedule />} />
          <Route path="/admin/classes" element={isAdmin ? <AdminClassManagement /> : <Navigate to="/home" />} />
          <Route path="/admin/analytics" element={isAdmin ? <AdminAnalytics /> : <Navigate to="/home" />} />
          <Route path="/admin/scan" element={isAdmin ? <AdminScanner /> : <Navigate to="/home" />} />
          <Route path="/workouts" element={isMember ? <WorkoutTracker /> : <Navigate to="/home" />} />
          <Route path="/my-qr" element={isMember ? <MemberQR /> : <Navigate to="/home" />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
