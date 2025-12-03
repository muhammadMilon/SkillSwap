import { LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import { useAuth } from "../providers/AuthProvider";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg shadow-purple-900/20 sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition">
              <img
                src={logo}
                alt="SkillSwap Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              SkillSwap
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition text-sm md:text-base font-medium"
            >
              Home
            </Link>

            <Link
              to="/my-profile"
              className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-700 transition text-sm md:text-base font-medium"
            >
              My Profile
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <div
                  className="relative"
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <img
                      src={
                        user.photoURL ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                      }
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full ring-2 ring-purple-500/50 hover:ring-purple-400 transition cursor-pointer object-cover"
                      title={user.displayName}
                    />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl shadow-purple-900/30 border border-gray-700 py-2">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium text-white">
                          {user.displayName || "User"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-pink-700 transition shadow-lg text-sm md:text-base cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-5 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition shadow-lg border border-gray-600 text-sm md:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition shadow-lg text-sm md:text-base"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
