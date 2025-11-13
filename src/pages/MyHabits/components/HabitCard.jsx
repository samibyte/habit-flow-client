import { motion } from "motion/react";
import { Edit3, Trash2, CheckCircle, Flame, Sparkles, Eye } from "lucide-react";
import { Link } from "react-router";

const HabitCard = ({
  habit,
  onEdit,
  onUpdateModal,
  onDelete,
  onMarkComplete,
  completing,
  streak,
  getWeeklyProgress,
}) => {
  const isCompletedToday = habit.completionHistory?.some(
    (date) => new Date(date).toDateString() === new Date().toDateString(),
  );
  const weeklyProgress = getWeeklyProgress(habit.completionHistory);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-base-100 rounded-xl hover:border-primary/40 border border-base-300 p-6  relative overflow-hidden group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-base-content text-lg mb-1 font-montserrat group-hover:text-primary transition-colors line-clamp-1">
            {habit.title}
          </h3>
          <p className="text-base-content/60 h-10 text-sm line-clamp-2 wrap-break-word">
            {habit.description}
          </p>
        </div>
        <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-base-300 text-base-content border border-neutral/20 ml-2">
          {habit.category}
        </span>
      </div>

      {/* Streak badge */}
      <div className="flex items-center min-h-7 justify-between mb-4">
        {streak && (
          <div
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg ${
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
        <div className="text-sm text-base-content/60">
          {new Date(habit.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Weekly progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-base-content">
            This Week
          </span>
          <span className="text-xs text-base-content/60">
            {weeklyProgress.filter((day) => day.completed).length}/7 days
          </span>
        </div>
        <div className="flex gap-2">
          {weeklyProgress.map((day) => (
            <div key={day.date} className="flex-1 text-center">
              <div
                className={`h-2 rounded-lg flex items-center justify-center mb-2 transition-all duration-300 ${
                  day.completed
                    ? "gradient-success text-white"
                    : "bg-base-300 text-base-content/40"
                }`}
              ></div>
              <div className="text-sm font-medium text-base-content">
                {new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
                  new Date(day.date),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-base-300">
        <motion.button
          whileHover={{ scale: isCompletedToday ? 1 : 1.02 }}
          whileTap={{ scale: isCompletedToday ? 1 : 0.98 }}
          onClick={() => {
            onMarkComplete(habit._id);
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

        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onEdit(habit);
              onUpdateModal(true);
            }}
            className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors "
            title="Edit habit"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(habit._id)}
            className="p-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors "
            title="Delete habit"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* View details button */}
      <div className="pt-4">
        <Link
          to={`/habit-details/${habit._id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-primary-content font-semibold rounded-xl border border-primary/30 hover:border-primary transition-all duration-300"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Link>
      </div>

      {/* Corner indicator */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${getCategoryGradient(habit.category)} opacity-5 rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:opacity-10`}
      ></div>
    </motion.div>
  );
};

export default HabitCard;
