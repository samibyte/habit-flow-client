import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Clock,
  Target,
  Sparkles,
  Zap,
  Calendar,
  Bell,
  TrendingUp,
  X,
  Link,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const AddHabit = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    {
      value: "Morning",
      label: "🌅 Morning",
      icon: "⏰",
      description: "Start your day right",
    },
    {
      value: "Work",
      label: "💼 Work",
      icon: "📊",
      description: "Professional development",
    },
    {
      value: "Fitness",
      label: "💪 Fitness",
      icon: "🏃‍♂️",
      description: "Physical health",
    },
    {
      value: "Evening",
      label: "🌙 Evening",
      icon: "🌆",
      description: "Wind down routines",
    },
    {
      value: "Study",
      label: "📚 Study",
      icon: "🎓",
      description: "Learning and growth",
    },
  ];

  const frequencies = [
    { value: "daily", label: "Daily", description: "Every day" },
    { value: "weekdays", label: "Weekdays", description: "Monday to Friday" },
    { value: "weekly", label: "Weekly", description: "Once a week" },
  ];

  const difficulties = [
    {
      value: "easy",
      label: "Easy",
      color: "text-emerald-500",
      description: "Quick & simple",
    },
    {
      value: "medium",
      label: "Medium",
      color: "text-amber-500",
      description: "Moderate effort",
    },
    {
      value: "hard",
      label: "Hard",
      color: "text-red-500",
      description: "Challenging",
    },
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Morning",
    reminderTime: "",
    frequency: "daily",
    difficulty: "medium",
    isPublic: false,
    goal: "",
    imageUrl: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatTime = (timeString) => {
    if (!timeString) return "No time set";

    try {
      const [hours, minutes] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting time:", error);
      return timeString;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a habit title");
      return;
    }

    setLoading(true);

    try {
      const habitData = {
        ...formData,
        creator: {
          email: user.email,
          name: user.displayName,
          uid: user.uid,
        },
      };
      const response = await axiosSecure.post("/api/v1/habits", habitData);
      toast.success(
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span>{response.data?.message || "Habit created successfully!"}</span>
        </div>,
        { duration: 3000 },
      );

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "Morning",
        reminderTime: "",
        frequency: "daily",
        difficulty: "medium",
        isPublic: false,
        goal: "",
        imageUrl: "",
      });

      setTimeout(() => {
        navigate("/dashboard/my-habits");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create habit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    return categories.find((cat) => cat.value === category)?.icon || "🎯";
  };

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <title>Habit Flow | Add Habit</title>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Create New Habit
          </h1>
          <p className="text-xl text-base-content/60 max-w-2xl mx-auto">
            Build lasting routines that transform your life, one day at a time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main form */}
          <div className="lg:col-span-3">
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-base-100 rounded-2xl border border-base-300 p-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-base-content mb-3">
                    What habit do you want to build?
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Morning meditation, Daily reading, Evening walk..."
                    className="w-full px-4 py-4 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg placeholder-base-content/40 transition-all"
                    maxLength={60}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-base-content/60">
                      Be specific and actionable
                    </span>
                    <span
                      className={`text-sm ${
                        formData.title.length > 50
                          ? "text-warning"
                          : "text-base-content/60"
                      }`}
                    >
                      {formData.title.length}/60
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-lg font-semibold text-base-content mb-3">
                    Why is this habit important to you?
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe the benefits and motivation behind this habit..."
                    rows="3"
                    className="w-full px-4 py-4 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder-base-content/40 transition-all"
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-base-content/60">
                      This will help you stay motivated
                    </span>
                    <span className="text-sm text-base-content/60">
                      {formData.description.length}/200
                    </span>
                  </div>
                </div>

                {/* Image url input */}
                <div>
                  <label className="block text-lg font-semibold text-base-content mb-3">
                    Add Habit Image (Optional)
                  </label>

                  <div className="space-y-4">
                    {/* Url input */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-3"
                    >
                      <div className="flex-1 relative">
                        <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4" />
                        <input
                          type="url"
                          value={formData.imageUrl}
                          onChange={(e) =>
                            handleInputChange("imageUrl", e.target.value)
                          }
                          placeholder="https://example.com/image.jpg"
                          className="w-full pl-10 pr-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="flex items-start gap-2 text-sm text-base-content/60">
                        <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>
                          Enter a direct link to your image (JPEG, PNG, GIF,
                          WEBP, SVG).
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-lg font-semibold text-base-content mb-4">
                    When will you practice this habit?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleInputChange("category", category.value)
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          formData.category === category.value
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                            : "border-base-300 bg-base-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="font-semibold text-base-content">
                          {category.label.split(" ")[1]}
                        </div>
                        <div className="text-sm text-base-content/60 mt-1">
                          {category.description}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Reminder Time */}
                <div>
                  <label className="block text-lg font-semibold text-base-content mb-3">
                    <Bell className="w-5 h-5 inline mr-2" />
                    Set Daily Reminder
                  </label>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    {/* Time Picker */}
                    <div className="flex-1 min-w-0">
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4 z-10" />
                        <input
                          type="time"
                          value={formData.reminderTime}
                          onChange={(e) =>
                            handleInputChange("reminderTime", e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                        />
                      </div>
                    </div>

                    {/* Quick time buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {["06:00", "12:00", "18:00", "20:00"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() =>
                            handleInputChange("reminderTime", time)
                          }
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            formData.reminderTime === time
                              ? "bg-primary text-primary-content shadow-md"
                              : "bg-base-200 text-base-content/70 hover:bg-base-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reminder status */}
                  <div className="mt-3 p-3 bg-base-200 rounded-lg border border-base-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${formData.reminderTime ? "bg-success animate-pulse" : "bg-base-300"}`}
                        />
                        <span className="text-sm font-medium text-base-content">
                          {formData.reminderTime
                            ? `Reminder set for ${formatTime(formData.reminderTime)}`
                            : "No reminder set"}
                        </span>
                      </div>
                      {formData.reminderTime && (
                        <button
                          type="button"
                          onClick={() => handleInputChange("reminderTime", "")}
                          className="text-xs text-error hover:text-error/80 transition-colors"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-base-content/60 mt-2">
                    We'll send you a gentle reminder to help you stay consistent
                    with your habit
                  </p>
                </div>

                {/* Privacy setting */}
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                  <div>
                    <div className="font-semibold text-base-content">
                      Make this habit public
                    </div>
                    <div className="text-sm text-base-content/60">
                      Others can see and get inspired by your habit
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublic}
                      onChange={(e) =>
                        handleInputChange("isPublic", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-base-300 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-base-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Advanced options toggle */}
                <motion.button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-base-content">
                      Advanced Options
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: showAdvanced ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="w-4 h-4 text-base-content/60" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6 overflow-hidden"
                    >
                      {/* Frequency */}
                      <div>
                        <label className="block text-lg font-semibold text-base-content mb-3">
                          How often?
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {frequencies.map((freq) => (
                            <motion.button
                              key={freq.value}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                handleInputChange("frequency", freq.value)
                              }
                              className={`p-3 rounded-lg border transition-all duration-200 ${
                                formData.frequency === freq.value
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-base-300 bg-base-200 text-base-content/70 hover:border-primary/50"
                              }`}
                            >
                              <div className="font-medium text-sm">
                                {freq.label}
                              </div>
                              <div className="text-xs text-base-content/60 mt-1">
                                {freq.description}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Difficulty */}
                      <div>
                        <label className="block text-lg font-semibold text-base-content mb-3">
                          Difficulty Level
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {difficulties.map((diff) => (
                            <motion.button
                              key={diff.value}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                handleInputChange("difficulty", diff.value)
                              }
                              className={`p-3 rounded-lg border transition-all duration-200 ${
                                formData.difficulty === diff.value
                                  ? "border-primary bg-primary/10"
                                  : "border-base-300 bg-base-200 hover:border-primary/50"
                              }`}
                            >
                              <div
                                className={`font-medium text-sm ${diff.color}`}
                              >
                                {diff.label}
                              </div>
                              <div className="text-xs text-base-content/60 mt-1">
                                {diff.description}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Goal setting */}
                      <div>
                        <label className="block text-lg font-semibold text-base-content mb-3">
                          <Target className="w-5 h-5 inline mr-2" />
                          Goal (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.goal}
                          onChange={(e) =>
                            handleInputChange("goal", e.target.value)
                          }
                          placeholder="e.g., Read 20 books this year, Run 5km in 30 mins..."
                          className="w-11/12 m-1 px-4 py-3 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-base-content/40 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* User info (read only) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-base-200 rounded-xl">
                  <div>
                    <div className="text-sm text-base-content/60 mb-1">
                      Created by
                    </div>
                    <div className="font-semibold text-base-content">
                      {user?.displayName || "User"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-base-content/60 mb-1">
                      Email
                    </div>
                    <div className="font-semibold text-base-content">
                      {user?.email}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.title.trim()}
                  className="w-full gradient-primary text-primary-content py-4 rounded-xl font-bold cursor-pointer text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      Creating Your Habit...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" />
                      Create Habit & Start Tracking
                    </div>
                  )}
                </button>
              </div>
            </motion.form>
          </div>

          {/* Preview sidebar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 mb-6">
                <h3 className="font-bold text-base-content mb-4 text-lg">
                  Habit Preview
                </h3>

                <div className="space-y-4">
                  {/* Preview card */}
                  <div className="p-4 rounded-xl border-2 purple">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-2xl shrink-0">
                          {getCategoryIcon(formData.category)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-base-content text-sm line-clamp-2">
                            {formData.title || "Your Habit Name"}
                          </div>
                          <div className="text-xs text-base-content/60">
                            {formData.category} • {formData.frequency}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${
                          formData.difficulty === "easy"
                            ? "bg-emerald-100 text-emerald-700"
                            : formData.difficulty === "medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {formData.difficulty}
                      </div>
                    </div>

                    {formData.description && (
                      <p className="text-sm text-base-content/70 mb-3 line-clamp-2 wrap-break-words">
                        {formData.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-base-content/60">
                      <div className="flex items-center gap-4">
                        <span>🔥 Day 1</span>
                        {formData.reminderTime && (
                          <span>⏰ {formData.reminderTime}</span>
                        )}
                      </div>
                      {formData.isPublic && <span>🌍 Public</span>}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-primary/5 rounded-xl p-4">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Pro Tip
                    </h4>
                    <p className="text-sm text-base-content/70">
                      {!formData.title
                        ? "Start with a clear, specific habit name"
                        : !formData.description
                          ? "Add a 'why' to stay motivated long-term"
                          : "Set a reminder to build consistency from day one"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Motivation stats */}
              <div className="bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex gap-3">
                  <Rocket />
                  <h3 className="font-bold text-base-content mb-4 text-lg">
                    Quick Start
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-base-content/70">
                      It takes 21 days to form a habit
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-base-content/70">
                      Consistency beats intensity
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-secondary" />
                    <span className="text-base-content/70">
                      Start small, build momentum
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
