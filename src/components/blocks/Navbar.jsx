import { User, Menu, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import MenuSwitch from "../ui/MenuSwitch";

const Navbar = () => {
  const [state, setState] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Browse Habits", path: "/habits" },
    { title: "My Habits", path: "/my-habits" },
    { title: "Add Habits", path: "/add-habits" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading">
              <span className="text-primary">Habit</span>
              <span className="text-seondary">Flow</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
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
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/auth/login"
              className="btn px-4 py-3 h-auto btn-ghost text-base-content/70 hover:text-primary"
            >
              Log in
            </Link>
            <Link
              to="/auth/sign-up"
              className="btn px-4 py-3 h-auto btn-primary shadow-lg hover:shadow-xl transition-shadow duration-300"
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

          {/* Mobile Menu Button */}
          <div className="menu-btn md:hidden">
            <MenuSwitch state={state} setState={setState} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {state && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-base-100 border-t border-base-300 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Navigation Links */}
              {navigation.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-content shadow-md"
                        : "text-base-content/70 hover:text-primary hover:bg-base-200"
                    }`
                  }
                  onClick={() => setState(false)}
                >
                  {item.title}
                </NavLink>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-base-300 space-y-3">
                <Link
                  to="/auth/login"
                  className="block px-4 py-3 text-center rounded-lg font-medium text-primary hover:bg-base-200 transition-colors"
                  onClick={() => setState(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/auth/sign-up"
                  className="block px-4 py-3 text-center rounded-lg font-medium bg-primary text-primary-content shadow-lg hover:shadow-xl transition-shadow"
                  onClick={() => setState(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
