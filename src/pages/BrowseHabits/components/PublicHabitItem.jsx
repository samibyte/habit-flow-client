import { motion } from "framer-motion";
import {
  Eye,
  User,
  Flame,
  Calendar,
  Zap,
  Circle,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

const PublicHabitItem = ({ habit }) => {
  const {
    _id,
    title,
    description,
    category,
    creator,
    createdAt,
    difficulty,
    frequency,
    completionHistory,
  } = habit;

  const getCategoryGradient = (category) => {
    const gradients = {
      Morning: "gradient-streak",
      Work: "gradient-primary",
      Fitness: "gradient-success",
      Evening: "gradient-primary-dark",
      Study: "gradient-progress",
    };
    return gradients[category] || "gradient-primary";
  };

  const getDifficultyConfig = (difficulty) => {
    const config = {
      easy: { color: "text-success", dots: 1 },
      medium: { color: "text-warning", dots: 2 },
      hard: { color: "text-error", dots: 3 },
    };
    return (
      config[difficulty?.toLowerCase()] || { color: "text-neutral", dots: 1 }
    );
  };

  const daysActive = createdAt
    ? Math.ceil((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24))
    : 0;

  const { streak } = habit;
  const difficultyConfig = getDifficultyConfig(difficulty);
  const isMegaStreak = streak >= 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="bg-base-100 rounded-xl border border-base-300 hover:border-primary/40 p-5 relative overflow-hidden">
        {/* Subtle background accent */}
        <div
          className={`absolute top-0 left-0 w-1 h-full ${getCategoryGradient(category)} opacity-80`}
        ></div>

        <div className="flex items-start justify-between gap-4 ml-3">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header with Category and Streak */}
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-base-300 text-base-content border border-neutral/20">
                {category}
              </span>

              {/* Streak Badge */}
              {streak > 0 && (
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${getCategoryGradient(category)} text-white ${isMegaStreak ? "mega-streak" : ""}`}
                >
                  <Flame
                    className={`w-3.5 h-3.5 ${streak >= 7 ? "streak-fire" : ""}`}
                  />
                  <span className="text-xs font-bold">{streak}</span>
                  {isMegaStreak && <Sparkles className="w-3 h-3" />}
                </div>
              )}
            </div>

            {/* Title and Description */}
            <div className="mb-4">
              <h3 className="font-bold text-base-content text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors font-montserrat">
                {title}
              </h3>
              <p className="text-base-content/70 text-sm leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>

            {/* Metadata Row */}
            <div className="flex items-center justify-between">
              {/* Left: Creator and Days Active */}
              <div className="flex items-center gap-4">
                {/* Creator */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-base-300 flex items-center justify-center">
                    <User className="w-3 h-3 text-base-content/60" />
                  </div>
                  <span className="text-sm text-base-content/80 font-medium">
                    {creator?.displayName || "Anonymous"}
                  </span>
                </div>

                {/* Days Active */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-base-content/60" />
                  <span className="text-sm text-base-content/80 font-medium">
                    {daysActive}d
                  </span>
                </div>
              </div>

              {/* Right: Frequency and Difficulty */}
              <div className="flex items-center gap-4">
                {/* Frequency */}
                {frequency && (
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-info" />
                    <span className="text-xs font-semibold text-base-content/60 capitalize">
                      {frequency}
                    </span>
                  </div>
                )}

                {/* Difficulty */}
                {difficulty && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Circle
                        key={i}
                        className={`w-1.5 h-1.5 ${i < difficultyConfig.dots ? difficultyConfig.color : "text-base-content/20"}`}
                        fill="currentColor"
                      />
                    ))}
                    <span
                      className={`text-xs font-semibold ${difficultyConfig.color} ml-1 capitalize`}
                    >
                      {difficulty}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0">
            <Link
              to={`/habit-details/${_id}`}
              state={{ from: location.pathname }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-content font-semibold rounded-xl border border-primary/30 hover:border-primary transition-all duration-300"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">View</span>
            </Link>
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 ${getCategoryGradient(category)} opacity-5 rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:opacity-10`}
        ></div>
      </div>
    </motion.div>
  );
};

export default PublicHabitItem;
