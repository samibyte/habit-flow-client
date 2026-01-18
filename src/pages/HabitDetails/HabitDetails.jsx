import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Flame,
  Calendar,
  Clock,
  Target,
  Zap,
  User,
  CheckCircle,
  Edit3,
  Share2,
  BarChart3,
  Crown,
  Sparkles,
} from "lucide-react";
import { Link, useParams, useNavigate, useLocation } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import NoImageSkeleton from "./components/NoImageSkeleton";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import ShareModal from "./components/ShareModal";

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosSecure.get(`/api/v1/habits/${id}`);
        setHabit(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load habit details");
        navigate(location.state?.from || "/dashboard/my-habits");
      } finally {
        setLoading(false);
      }
    })();
  }, [axiosSecure, id, navigate, location]);

  const handleMarkComplete = async (habitId) => {
    setCompleting(true);
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await axiosSecure.post(
        `/api/v1/habits/${habitId}/complete`,
        { timezone: userTimezone },
      );

      const updatedHabit = response.data?.habit;

      if (updatedHabit) {
        setHabit(updatedHabit);
        toast.success("Habit marked complete! ");
      } else {
        // fallback
        toast.success(response.data?.message || "Habit marked complete!");
      }
    } catch (err) {
      console.error(err);
      const serverMessage = err.response?.data?.message;
      if (serverMessage) {
        toast.error(serverMessage);
      } else {
        toast.error("Failed to mark habit complete");
      }
    } finally {
      setCompleting(false);
    }
  };

  const calculateProgress = (completionHistory) => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    });

    const completedDays =
      completionHistory?.filter((historyDate) =>
        last30Days.includes(new Date(historyDate).toDateString()),
      ).length || 0;

    return Math.round((completedDays / 30) * 100);
  };

  const getWeeklyProgress = (completionHistory) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    }).reverse();

    return last7Days.map((day) => ({
      date: day,
      completed:
        completionHistory?.some(
          (historyDate) => new Date(historyDate).toDateString() === day,
        ) || false,
    }));
  };

  const getStreakStyle = (streak) => {
    if (streak >= 30) {
      return {
        gradient: "gradient-streak-mega",
        text: "text-white",
        icon: <Crown className="w-5 h-5" />,
        badge: "mega-streak",
        label: "Legendary Streak!",
        fireAnimation: "streak-fire",
      };
    } else if (streak >= 14) {
      return {
        gradient: "gradient-streak",
        text: "text-white",
        icon: <Flame className="w-5 h-5 streak-fire" />,
        badge: "",
        label: "Amazing Streak!",
        fireAnimation: "streak-fire",
      };
    } else if (streak >= 7) {
      return {
        gradient: "gradient-primary-dark",
        text: "text-white",
        icon: <Flame className="w-5 h-5" />,
        badge: "",
        label: "Great Streak!",
        fireAnimation: "",
      };
    } else if (streak >= 3) {
      return {
        gradient: "gradient-primary",
        text: "text-white",
        icon: <Flame className="w-5 h-5" />,
        badge: "",
        label: "Good Streak!",
        fireAnimation: "",
      };
    } else if (streak >= 1) {
      return {
        gradient: "bg-warning",
        text: "text-white",
        icon: <Flame className="w-5 h-5" />,
        badge: "",
        label: "Getting Started!",
        fireAnimation: "",
      };
    } else {
      return {
        gradient: "bg-base-300",
        text: "text-base-content",
        icon: <Flame className="w-5 h-5" />,
        badge: "",
        label: "Start Your Streak!",
        fireAnimation: "",
      };
    }
  };

  const getDifficultyConfig = (difficulty) => {
    const config = {
      easy: { color: "text-success", bg: "bg-success/10", dots: 1 },
      medium: { color: "text-warning", bg: "bg-warning/10", dots: 2 },
      hard: { color: "text-error", bg: "bg-error/10", dots: 3 },
    };
    return (
      config[difficulty?.toLowerCase()] || {
        color: "text-neutral",
        bg: "bg-neutral/10",
        dots: 1,
      }
    );
  };

  const isCompletedToday = habit?.completionHistory?.some(
    (date) => new Date(date).toDateString() === new Date().toDateString(),
  );

  const streak = habit?.streak;
  const progress = habit ? calculateProgress(habit.completionHistory) : 0;
  const streakStyle = getStreakStyle(streak);
  const difficultyConfig = habit ? getDifficultyConfig(habit.difficulty) : {};
  const weeklyProgress = habit
    ? getWeeklyProgress(habit.completionHistory)
    : [];

  // console.log(weeklyProgress);

  if (loading) {
    return <LoadingState />;
  }

  if (!habit) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <title>Habit Flow | Habit Details</title>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            to={location.state?.from || "/dashboard/my-habits"}
            className="inline-flex items-center gap-2 px-4 py-2 bg-base-300 text-base-content rounded-lg hover:bg-base-400 transition-colors "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Habits
          </Link>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-base-300 text-base-content rounded-lg hover:bg-base-400 transition-colors "
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-base-100 rounded-xl border border-base-300 overflow-hidden habit-card-hover"
            >
              <div className="relative h-64 bg-base-300">
                {habit.imageUrl ? (
                  <img
                    src={habit.imageUrl}
                    alt={habit.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <NoImageSkeleton category={habit.category} />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 text-sm font-bold rounded-lg bg-base-100/90 text-base-content border border-base-300">
                    {habit.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-3xl font-bold text-base-content mb-3 font-montserrat">
                  {habit.title}
                </h1>
                <p className="text-base-content/70 text-lg leading-relaxed mb-6">
                  {habit.description}
                </p>

                {/* Goal */}
                {habit.goal && (
                  <div className="flex items-start gap-3 p-4 bg-base-300/40 rounded-lg mb-6">
                    <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-base-content mb-1">
                        Goal
                      </p>
                      <p className="text-base-content/70 italic">
                        "{habit.goal}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Progress */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base-content">
                      30-Day Progress
                    </span>
                    <span className="text-base-content/70">{progress}%</span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="gradient-progress h-3 rounded-full progress-fill"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weekly progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover"
            >
              <h2 className="text-xl font-bold text-base-content mb-4 font-montserrat">
                Weekly Progress
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-base-content">
                    This Week
                  </span>
                  <span className="text-sm text-base-content/60">
                    {weeklyProgress.filter((day) => day.completed).length}/7
                    days
                  </span>
                </div>
                <div className="flex gap-2">
                  {weeklyProgress.map((day, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div
                        className={`h-12 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 ${
                          day.completed
                            ? "gradient-success text-white"
                            : "bg-base-300 text-base-content/40"
                        }`}
                      >
                        <CheckCircle
                          className={`w-5 h-5 ${day.completed ? "text-white" : "text-base-content/20"}`}
                        />
                      </div>
                      <div className="text-sm font-medium text-base-content">
                        {new Intl.DateTimeFormat("en-US", {
                          weekday: "short",
                        }).format(new Date(day.date))}
                      </div>
                      <div className="text-xs text-base-content/60">
                        {new Date(day.date).getDate()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar*/}
          <div className="space-y-6">
            {/* Streak Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover text-center"
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg mb-3 ${streakStyle.gradient} ${streakStyle.text} ${streakStyle.badge}`}
              >
                {streakStyle.icon}
                <span className="text-lg font-bold">{streak} days</span>
                {streak >= 30 && <Sparkles className="w-4 h-4" />}
              </div>
              <p className="text-base-content/70 text-sm mb-4">
                {streakStyle.label}
              </p>

              {/* Mark complete button */}
              <motion.button
                whileHover={{ scale: isCompletedToday ? 1 : 1.02 }}
                whileTap={{ scale: isCompletedToday ? 1 : 0.98 }}
                onClick={() => {
                  handleMarkComplete(habit._id);
                }}
                disabled={isCompletedToday || completing}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all  ${
                  isCompletedToday
                    ? "bg-success/20 text-success cursor-not-allowed"
                    : completing
                      ? "bg-primary/50 text-primary-content cursor-not-allowed"
                      : "gradient-primary text-primary-content hover:shadow-lg"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                {completing
                  ? "Completing..."
                  : isCompletedToday
                    ? "Completed Today"
                    : "Mark Complete"}
              </motion.button>
            </motion.div>

            {/* Habit Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover"
            >
              <h3 className="font-bold text-base-content mb-4 font-montserrat">
                Habit Details
              </h3>

              <div className="space-y-4">
                {/* Frequency */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Frequency</p>
                    <p className="font-semibold text-base-content capitalize">
                      {habit.frequency}
                    </p>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-base-300">
                    <BarChart3 className="w-5 h-5 text-base-content/60" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Difficulty</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((dot) => (
                          <div
                            key={dot}
                            className={`w-2 h-2 rounded-full ${
                              dot <= difficultyConfig.dots
                                ? difficultyConfig.color
                                : "bg-base-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span
                        className={`text-sm font-semibold capitalize ${difficultyConfig.color}`}
                      >
                        {habit.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reminder Time */}
                {habit.reminderTime && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Reminder</p>
                      <p className="font-semibold text-base-content">
                        {new Date(
                          `2000-01-01T${habit.reminderTime}`,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {/* Created Date */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Started</p>
                    <p className="font-semibold text-base-content">
                      {new Date(habit.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Creator Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover"
            >
              <h3 className="font-bold text-base-content mb-4 font-montserrat">
                Creator
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-base-300 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-base-content/60" />
                </div>
                <div>
                  <p className="font-semibold text-base-content">
                    {habit.creator?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-base-content/60">
                    {habit.creator?.email || "Private user"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showShareModal && (
          <ShareModal habit={habit} onClose={() => setShowShareModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HabitDetails;
