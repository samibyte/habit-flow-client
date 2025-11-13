import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
  const location = useLocation();
  const preFilledEmail = location.state?.email || "";

  const { resetPassword } = useAuth();
  const [email, setEmail] = useState(preFilledEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSubmitted(true);
      toast.success("Password reset email sent!");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (err.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again later.");
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 py-8">
      <title>Habit Flow | Reset Password</title>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-base-content mb-1 font-montserrat">
            Reset Your Password
          </h1>
          <p className="text-sm text-base-content/70">
            {isSubmitted
              ? "Check your email for reset instructions"
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        {/* Forgot Password Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 shadow-xl border border-base-300/50"
        >
          {!isSubmitted ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-base-content/80 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Instructions */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                <p className="text-xs text-base-content/70 text-center">
                  We'll send you a link to reset your password
                </p>
              </div>

              {/* Reset Button */}
              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full py-3 bg-linear-to-r from-primary to-secondary via-primary hover:via-secondary transition-colors text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group text-sm"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </span>
              </button>
            </form>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              {/* Success Icon */}
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>

              {/* Success Message */}
              <div>
                <h3 className="font-semibold text-base-content mb-2">
                  Check Your Email
                </h3>
                <p className="text-md text-base-content/70">
                  We've sent a password reset link to:
                  <br />
                  <span className="font-medium text-primary">{email}</span>
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-base-200 rounded-xl p-3">
                <p className="text-xs text-base-content/70">
                  📧 Check your spam folder if you don't see the email
                  <br />
                  ⏱️ The link will expire in 1 hour
                </p>
              </div>

              {/* Back to Login */}
              <Link
                to="/login"
                className="w-full block py-3 text-center rounded-xl font-medium bg-base-200 text-base-content hover:bg-base-300 transition-all duration-200 text-sm"
              >
                Back to Login
              </Link>
            </motion.div>
          )}

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4 pt-4 border-t border-base-300/50 space-y-2"
          >
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Login
            </Link>
            <p className="text-xs text-base-content/50">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Help Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-3 mt-6 text-center"
        >
          {[
            { icon: "📧", text: "Check Spam", tip: "Look in spam/junk folder" },
            {
              icon: "⏱️",
              text: "Activate Fast",
              tip: "Link expires in 1 hour",
            },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="p-3 bg-base-200/50 rounded-xl backdrop-blur-sm border border-base-300/30"
            >
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-xs font-semibold text-base-content/70">
                {item.text}
              </div>
              <div className="text-xs text-base-content/50 mt-1">
                {item.tip}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
