import { motion } from "framer-motion";
import { Link } from "react-router";
import { Home, ArrowLeft, Search, AlertCircle, Rocket } from "lucide-react";

const ErrorPage = () => {
  const quickLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/my-habits", label: "My Habits", icon: Rocket },
    { path: "/add-habits", label: "Add Habit", icon: Search },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <title>Error Flow</title>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-8 bg-error/10 rounded-full flex items-center justify-center"
          >
            <AlertCircle className="w-16 h-16 text-error" />
          </motion.div>

          {/* Error Code */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-9xl font-bold text-base-content mb-4 font-montserrat"
          >
            404
          </motion.h1>

          {/* Main Message */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-base-content mb-4 font-montserrat"
          >
            Habit Not Found!
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Oops! The habit or page you're looking for seems to have wandered
            off. Don't worry, even the best habits need a break sometimes.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 gradient-primary text-primary-content font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-base-300 text-base-content font-semibold rounded-xl hover:bg-base-400 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-base-200 rounded-2xl p-8 border border-base-300 max-w-md mx-auto"
          >
            <h3 className="text-lg font-semibold text-base-content mb-4 font-montserrat">
              Quick Navigation
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="flex items-center gap-3 p-3 bg-base-100 rounded-lg hover:bg-base-300 transition-all duration-200 group"
                    >
                      <Icon className="w-5 h-5 text-base-content/60 group-hover:text-primary transition-colors" />
                      <span className="font-medium text-base-content group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 p-6 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 max-w-2xl mx-auto"
          >
            <p className="text-base-content/80 text-lg italic mb-2">
              "The only bad workout is the one that didn't happen. The only bad
              habit is the one you don't start."
            </p>
            <p className="text-base-content/50 text-sm">
              — Keep building better habits
            </p>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 p-4 bg-warning/10 rounded-lg border border-warning/20 inline-block"
          >
            <div className="flex items-center gap-2 text-warning">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">
                Can't find what you're looking for? Try searching for habits!
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-error/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
