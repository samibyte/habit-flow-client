import { motion } from "motion/react";
import { Eye, User, Calendar } from "lucide-react";

const PublicHabitCard = ({ habit, onViewDetails }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Morning: "bg-amber-500/10 text-amber-700 border-amber-200",
      Work: "bg-blue-500/10 text-blue-700 border-blue-200",
      Fitness: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
      Evening: "bg-purple-500/10 text-purple-700 border-purple-200",
      Study: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
    };
    return colors[category] || "bg-gray-500/10 text-gray-700 border-gray-200";
  };

  const streak = habit.completionHistory?.length || 0;
  const daysActive = Math.ceil(
    (new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div className="bg-base-100 rounded-xl border border-base-300 p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-sm">
        {/* Header - Category and Streak */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getCategoryColor(habit.category)}`}
          >
            {habit.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-base-content/60">
            <Calendar className="w-3 h-3" />
            <span>{streak} days</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-base-content leading-tight line-clamp-2">
            {habit.title}
          </h3>

          {/* Description */}
          <p className="text-base-content/70 text-sm leading-relaxed line-clamp-2">
            {habit.description}
          </p>

          {/* Creator Info */}
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span>{habit.creator?.displayName || "Anonymous"}</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewDetails(habit._id)}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Eye className="w-4 h-4" />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PublicHabitCard;
