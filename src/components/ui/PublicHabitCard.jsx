import { motion } from "framer-motion";
import { Eye, User, Flame, Calendar, Zap, Circle } from "lucide-react";
import { Link } from "react-router";

const PublicHabitCard = ({ habit }) => {
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

  const daysActive = habit.createdAt
    ? Math.ceil(
        (new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24),
      )
    : 0;

  const { streak } = habit;
  const difficultyConfig = getDifficultyConfig(habit.difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <div className="relative h-full bg-base-200 rounded-2xl border border-base-300 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
        <div className="p-5 pb-4 border-b border-base-300/50">
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Category badge */}
            <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-base-300 text-base-content border border-neutral/20">
              {habit.category}
            </span>

            {/* Streak badge */}
            {streak && (
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${
                  streak >= 30
                    ? "gradient-streak-mega"
                    : streak >= 14
                      ? "gradient-streak"
                      : streak >= 7
                        ? "gradient-primary-dark"
                        : streak >= 3
                          ? "gradient-primary"
                          : streak >= 1
                            ? "bg-warning"
                            : "bg-base-300"
                } text-white`}
              >
                <Flame
                  className={`w-3.5 h-3.5 ${streak >= 7 ? "streak-fire" : ""}`}
                />
                <span className="text-xs font-bold">{streak}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-base-content leading-snug line-clamp-2 group-hover:text-primary transition-colors font-montserrat">
            {habit.title}
          </h3>
        </div>

        {/* Content section */}
        <div className="p-5 space-y-4">
          {/* Description */}
          <p className="text-sm h-10 text-base-content/60 leading-relaxed line-clamp-2">
            {habit.description}
          </p>

          {/* Goal text */}
          {habit.goal && habit.goal !== habit.description && (
            <div className="flex items-start gap-2 p-3 bg-base-300/40 rounded-lg">
              <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0"></div>
              <p className="text-xs text-base-content/70 font-medium line-clamp-1 italic">
                "{habit.goal}"
              </p>
            </div>
          )}

          <div className="flex justify-between">
            {/* Creator */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center">
                <User className="w-4 h-4 text-base-content/60" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-base-content/50 font-medium">
                  Creator
                </p>
                <p className="text-sm font-semibold text-base-content truncate">
                  {habit.isPublic
                    ? habit.creator?.name ||
                      habit.creator?.displayName ||
                      "Anonymous"
                    : "Anonymous"}
                </p>
              </div>
            </div>

            {/* Days active */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-base-300 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-base-content/60" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-base-content/50 font-medium">
                  Active
                </p>
                <p className="text-sm font-semibold text-base-content">
                  {daysActive}d
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-base-300/50">
            {/* Frequency */}
            {habit.frequency && (
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-info" />
                <span className="text-xs font-semibold text-base-content/60 capitalize">
                  {habit.frequency}
                </span>
              </div>
            )}

            {/* Difficulty dots */}
            {habit.difficulty && (
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
                  {habit.difficulty}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action button */}
        <div className="p-5 pt-0">
          <Link
            to={`/habit-details/${habit._id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-content font-semibold rounded-xl border border-primary/30 hover:border-primary transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </Link>
        </div>

        {/* Subtle Corner Indicator */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 ${getCategoryGradient(habit.category)} opacity-5 rounded-bl-full pointer-events-none`}
        ></div>
      </div>
    </motion.div>
  );
};
export default PublicHabitCard;
