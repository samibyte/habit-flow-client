import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router";
import PublicHabitCard from "../../../components/ui/PublicHabitCard";
import HabitCardSkeleton from "../../../components/ui/HabitCardSkeleton";

const LatestHabits = () => {
  const axiosInstance = useAxios();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/api/v1/latest-habits");
        setHabits(response.data);
      } catch (err) {
        setError("Failed to load latest habits");
        console.error("Error fetching habits:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [axiosInstance]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="font-montserrat text-3xl md:text-5xl font-bold bg-linear-to-b from-base-content to-neutral bg-clip-text text-transparent">
            Latest Habits
          </h2>
        </div>
        <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
          Discover the newest habits from our community and get inspired to
          start your own journey
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HabitCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-error" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              Unable to Load Habits
            </h3>
            <p className="text-base-content/60 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        ) : habits.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-base-200 rounded-2xl border border-base-300"
          >
            <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-base-content/40" />
            </div>
            <h3 className="text-2xl font-semibold text-base-content mb-3">
              No Habits Yet
            </h3>
            <p className="text-base-content/60 mb-6 max-w-md mx-auto">
              Be the first to create a habit and inspire others in the
              community!
            </p>
            <Link
              to="/add-habits"
              className="px-6 py-3 gradient-primary text-primary-content rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Create First Habit
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="habits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {habits.map((habit, index) => (
              <motion.div
                key={habit._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PublicHabitCard habit={habit} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && habits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/habits"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-content transition-all duration-300"
          >
            <TrendingUp className="w-5 h-5" />
            Browse All Habits
          </Link>
        </motion.div>
      )}
    </section>
  );
};

export default LatestHabits;
