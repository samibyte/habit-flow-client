import { motion } from "motion/react";
const HabitCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-base-100 rounded-xl border border-base-300 p-5 animate-pulse"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="h-6 bg-base-300 rounded-full w-20"></div>
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 bg-base-300 rounded"></div>
        <div className="h-4 bg-base-300 rounded w-8"></div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="h-5 bg-base-300 rounded w-3/4"></div>

      <div className="space-y-2">
        <div className="h-3 bg-base-300 rounded w-full"></div>
        <div className="h-3 bg-base-300 rounded w-2/3"></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-base-300 rounded-full"></div>
        <div className="h-3 bg-base-300 rounded w-20"></div>
      </div>
    </div>

    <div className="w-full h-10 bg-base-300 rounded-lg mt-4"></div>
  </motion.div>
);

export default HabitCardSkeleton;
