import { motion } from "motion/react";
import { TrendingUp, Flame, CheckCircle, Star } from "lucide-react";

const StatsCards = ({ habits, totalStreaks, completedToday }) => {
  const stats = [
    {
      icon: TrendingUp,
      value: habits.length,
      label: "Total Habits",
      color: "primary",
      gradient: "gradient-primary",
    },
    {
      icon: Flame,
      value: totalStreaks,
      label: "Total Streaks",
      color: "orange-500",
      gradient: "gradient-streak",
    },
    {
      icon: CheckCircle,
      value: completedToday,
      label: "Done Today",
      color: "success",
      gradient: "gradient-success",
    },
    {
      icon: Star,
      value:
        totalStreaks > 0
          ? Math.round((completedToday / totalStreaks) * 100)
          : 0,
      label: "Today's Progress",
      color: "secondary",
      gradient: "gradient-progress",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-base-100 rounded-xl p-6 border border-base-300 hover:border-primary/30 relative overflow-hidden group"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 ${stat.gradient} rounded-lg flex items-center justify-center text-white`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-base-content">
                {stat.value}
                {stat.label === "Today's Progress" ? "%" : ""}
              </div>
              <div className="text-base-content/60 text-sm">{stat.label}</div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-0 w-20 h-20 ${stat.gradient} opacity-5 rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:opacity-10`}
          ></div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
