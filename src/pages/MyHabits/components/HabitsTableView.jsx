import { motion } from "motion/react";
import { Edit3, Trash2, CheckCircle, Flame, Eye } from "lucide-react";
import { Link } from "react-router";

const HabitsListView = ({
  habits,
  onEdit,
  onUpdateModal,
  onDelete,
  onMarkComplete,
  completing,
}) => {
  return (
    <div className="bg-base-100 rounded-xl border border-base-300 overflow-hidden hover:border-primary/30">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-300">
              <th className="text-left py-4 px-6 text-base-content/60 font-semibold text-md font-montserrat">
                Habit
              </th>
              <th className="text-left py-4 px-6 text-base-content/60 font-semibold text-md font-montserrat">
                Category
              </th>
              <th className="text-left py-4 px-6 text-base-content/60 font-semibold text-md font-montserrat">
                Current Streak
              </th>
              <th className="text-left py-4 px-6 text-base-content/60 font-semibold text-sm font-montserrat">
                Created
              </th>
              <th className="text-left py-4 px-6 text-base-content/60 font-semibold text-sm font-montserrat">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, index) => {
              const { streak } = habit;
              const isCompletedToday = habit.completionHistory?.some(
                (date) =>
                  new Date(date).toDateString() === new Date().toDateString(),
              );

              return (
                <motion.tr
                  key={habit._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-base-300 hover:bg-base-200/50 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-base-content group-hover:text-primary transition-colors font-montserrat">
                        {habit.title}
                      </div>
                      <div className="text-sm text-base-content/60 mt-1 line-clamp-1">
                        {habit.description}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-base-300 text-base-content border border-neutral/20">
                      {habit.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {streak ? (
                      <div
                        className={`flex w-fit items-center gap-1.5 px-4 py-1.5 rounded-lg ${
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
                    ) : (
                      <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-base-300 text-base-content border border-neutral/20">
                        no streak
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-base-content/70 text-sm">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onEdit(habit);
                          onUpdateModal(true);
                        }}
                        className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
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

                      <motion.button
                        whileHover={{ scale: isCompletedToday ? 1 : 1.02 }}
                        whileTap={{ scale: isCompletedToday ? 1 : 0.98 }}
                        onClick={() => {
                          onMarkComplete(habit._id);
                        }}
                        disabled={isCompletedToday || completing}
                        className={` p-2 rounded-lg transition-all  ${
                          isCompletedToday
                            ? "bg-success/20 text-success cursor-not-allowed"
                            : completing
                              ? "bg-primary/50 text-primary-content cursor-not-allowed"
                              : "gradient-primary text-primary-content hover:shadow-lg"
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                  <td>
                    {/* View button */}
                    <div className="shrink-0">
                      <Link
                        to={`/habit-details/${habit._id}`}
                        state={{ from: location.pathname }}
                        className=" flex items-center justify-center gap-2 mx-2 px-1 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-content font-semibold rounded-xl border border-primary/30 hover:border-primary transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View</span>
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitsListView;
