import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
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

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
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
      {!isAuthPage && (
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
                  {currentUser && (
                    <Link to={"/user"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      User
                    </Link>
                  )}
                  {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
                    <Link to={"/admin"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Admin Board
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {currentUser ? (
                  <div className="flex items-center space-x-4">
                    <Link to={"/profile"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      {currentUser.username}
                    </Link>
                    <button onClick={logOut} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                      LogOut
                    </button>
                    <Link to={"/classes"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Classes
                    </Link>
                    <Link to={"/workouts"} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Workouts
                    </Link>
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminBoard />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/user" element={<UserBoard />} />
          <Route path="/classes" element={<ClassSchedule />} />
          <Route path="/admin/classes" element={<AdminClassManagement />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/workouts" element={<WorkoutTracker />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
