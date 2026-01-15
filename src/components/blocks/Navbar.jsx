import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Sparkles,
  Home,
  Plus,
  TrendingUp,
  ChartNoAxesCombined,
  Compass,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ThemeSwitch from "../ui/ThemeSwitch";
import ProfileDropDown from "../ui/ProfileDropDown";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [state, setState] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = [
    { title: "Home", path: "/", icon: Home },
    { title: "Browse Habits", path: "/habits", icon: Compass },
    { title: "About Us", path: "/about-us", icon: Compass },
  ];
  if (user) {
    navigation.push(
      { title: "My Habits", path: "/my-habits", icon: TrendingUp },
      { title: "Add Habit", path: "/add-habits", icon: Plus },
      { title: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
    );
  }

  const userMenu = [
    { title: "Profile", path: "#", icon: User },
    { title: "Settings", path: "#", icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [state]);

  const handleLogOut = async () => {
    await signOutUser();
    setState(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-base-100/80 backdrop-blur-xl shadow-lg border-b border-base-300"
          : "bg-base-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl font-montserrat md:text-3xl font-bold font-heading">
              <span className="text-primary">Habit</span>
              <span className="text-secondary">Flow</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `font-montserrat px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-content shadow-md"
                      : "text-base-content/70 hover:text-primary hover:bg-base-200"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <ThemeSwitch />
              <ProfileDropDown />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <ThemeSwitch />
              <Link
                to="/login"
                className="block py-3 px-8 text-center rounded-lg font-medium text-primary border border-primary hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="inline-flex items-center gap-2 px-4 py-3 gradient-primary text-primary-content font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-102 "
              >
                Sign Up
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeSwitch />
            <button
              onClick={() => setState(!state)}
              className="relative z-50 p-2 rounded-xl hover:bg-base-200 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={state ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-base-content rounded-full"
                />
                <motion.span
                  animate={state ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-base-content rounded-full"
                />
                <motion.span
                  animate={state ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-base-content rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed touch-none inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setState(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - Logged In State */}
      <AnimatePresence>
        {state && user && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 bg-base-100 shadow-2xl border-l border-base-300"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-lg">Menu</span>
              </div>
              <button
                onClick={() => setState(false)}
                className="p-2 hover:bg-base-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile */}
            <div className="p-4 border-b border-base-300 bg-base-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={
                      user.photoURL ||
                      `https://avatar.iran.liara.run/username?username=${user.displayName}+`
                    }
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-lg border-2 border-primary/20 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base-content truncate">
                    {user.displayName || "User"}
                  </h3>
                  <p className="text-sm text-base-content/60 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-4 border-b border-base-300 bg-base-200/50">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-base-100">
                  <div className="text-lg font-bold text-primary">12</div>
                  <div className="text-xs text-base-content/60">Habits</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-base-100">
                  <div className="text-lg font-bold text-secondary">45</div>
                  <div className="text-xs text-base-content/60">Streak</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-base-100">
                  <div className="text-lg font-bold text-accent">85%</div>
                  <div className="text-xs text-base-content/60">Progress</div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto bg-base-100"
              style={{ maxHeight: "calc(100vh - 280px)" }}
            >
              {/* Navigation */}
              <div className="p-3 space-y-1 bg-base-100">
                {navigation.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={idx}
                      to={item.path}
                      onClick={() => setState(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? "bg-primary text-primary-content shadow-md"
                            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* User Menu */}
              <div className="p-3 border-t border-base-300 space-y-1 bg-base-100">
                {userMenu.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setState(false)}
                      className="flex items-center gap-3 p-3 rounded-lg text-base-content/70 hover:bg-base-200 hover:text-base-content transition-all duration-200 group"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Log Out Button - Fixed at bottom */}
            <div className="p-4 border-t border-base-300 bg-base-100">
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-error hover:bg-error/10 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Mobile Menu - Logged Out State */}
        {state && !user && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 bg-base-100 shadow-2xl border-l border-base-300"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Menu className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-lg">Menu</span>
              </div>
              <button
                onClick={() => setState(false)}
                className="p-2 hover:bg-base-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto bg-base-100"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {/* Navigation */}
              <div className="p-3 space-y-1 bg-base-100">
                {navigation.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={idx}
                      to={item.path}
                      onClick={() => setState(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? "bg-primary text-primary-content shadow-md"
                            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Auth Buttons - Fixed at bottom */}
            <div className="p-4 border-t border-base-300 bg-base-100 space-y-3">
              <Link
                to="/login"
                onClick={() => setState(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-primary border border-primary hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                <User className="w-4 h-4" />
                Log in
              </Link>
              <Link
                to="/sign-up"
                onClick={() => setState(false)}
                className="w-full flex items-center justify-center gap-2 py-3 gradient-primary text-primary-content font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
