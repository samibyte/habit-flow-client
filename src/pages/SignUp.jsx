import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Upload,
  Link as LinkIcon,
  X,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeImageMethod, setActiveImageMethod] = useState("url");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WEBP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const apiKey = import.meta.env.VITE_IMG_BB_API;

    if (!apiKey) {
      toast.error("Image upload service is not configured");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        setFormData((prev) => ({
          ...prev,
          photoURL: response.data.data.url,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(response.data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response?.data?.error?.message) {
        toast.error(`Upload failed: ${error.response.data.error.message}`);
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, photoURL: "" }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements");
      return;
    }

    setIsLoading(true);

    try {
      await createUser(formData.email, formData.password);
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL || null,
      });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password is too weak. Please use a stronger password.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        toast.error("Google sign in was cancelled");
      } else {
        toast.error("Google sign in failed. Please try again.");
      }
    }
  };

  const passwordRequirements = [
    { text: "6+ characters", met: formData.password.length >= 6 },
    { text: "Uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Lowercase letter", met: /[a-z]/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every((req) => req.met);
  const passwordsMatch = formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-90 h-90 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-base-content mb-1 font-montserrat">
            Join <span className="text-gradient-primary">HabitFlow</span>
          </h1>
          <p className="text-sm text-base-content/70">
            Start your journey today
          </p>
        </div>

        {/* Sign up form*/}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 shadow-xl border border-base-300/50"
        >
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Name field */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-base-content/80 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 text-sm bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-base-content/80 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 text-sm bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            {/* Profile photo section */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-base-content/80">
                Profile Photo (Optional)
              </label>

              {/* Image preview */}
              {(imagePreview || formData.photoURL) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center mb-2"
                >
                  <div className="relative">
                    <img
                      src={imagePreview || formData.photoURL}
                      alt="Profile preview"
                      className="w-16 h-16 rounded-xl object-cover border-2 border-primary/20"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center text-sm hover:scale-110 transition-transform"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Method toggle*/}
              <div className="flex gap-1.5 mb-2">
                <button
                  type="button"
                  onClick={() => setActiveImageMethod("url")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                    activeImageMethod === "url"
                      ? "bg-primary text-white shadow-md"
                      : "bg-base-200 text-base-content/70 hover:bg-base-300"
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageMethod("upload")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                    activeImageMethod === "upload"
                      ? "bg-primary text-white shadow-md"
                      : "bg-base-200 text-base-content/70 hover:bg-base-300"
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  Upload
                </button>
              </div>

              {/* URL input */}
              {activeImageMethod === "url" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-1"
                >
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    placeholder="https://example.com/photo.jpg"
                  />
                </motion.div>
              )}

              {/* Image file upload  */}
              {activeImageMethod === "upload" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <label
                    className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${
                      uploading
                        ? "border-primary/50 bg-primary/5"
                        : "border-base-300 bg-base-200/50 hover:bg-base-200"
                    }`}
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium text-primary">
                          Uploading...
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-base-content/50 mb-1" />
                        <span className="text-sm font-medium text-base-content/70">
                          Click to upload
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </motion.div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-base-content/80 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 text-sm bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 pr-10"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password requirements */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex flex-wrap gap-3 pt-1"
                >
                  {passwordRequirements.map((req, index) => (
                    <motion.div
                      key={req.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-1 text-xs ${
                        req.met ? "text-success" : "text-base-content/50"
                      }`}
                    >
                      {req.met ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-base-300" />
                      )}
                      {req.text}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-base-content/80">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2.5 text-sm bg-base-200 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 pr-10 ${
                    formData.confirmPassword
                      ? passwordsMatch
                        ? "border-success/50"
                        : "border-error/50"
                      : "border-base-300"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-error text-xs"
                >
                  Passwords do not match
                </motion.p>
              )}
            </div>

            {/* Sign up button */}
            <button
              type="submit"
              disabled={
                !allRequirementsMet || !passwordsMatch || isLoading || uploading
              }
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group text-sm"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Start Your Journey"
                )}
              </span>
            </button>

            {/* Google button  */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              disabled={isLoading || uploading}
              className="w-full py-3 bg-base-200 border border-base-300 text-base-content font-semibold rounded-xl shadow-lg hover:bg-base-300 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Login link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4 pt-4 border-t border-base-300/50"
          >
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
