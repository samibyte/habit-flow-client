import { motion } from "motion/react";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router";

const EmptyState = ({ habitsLength, searchTerm, selectedCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 bg-base-100 rounded-xl border border-base-300 habit-card-hover"
    >
      <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
        {habitsLength === 0 ? (
          <Plus className="w-8 h-8 text-base-content/40" />
        ) : searchTerm || selectedCategory !== "all" ? (
          <Search className="w-8 h-8 text-base-content/40" />
        ) : (
          <Filter className="w-8 h-8 text-base-content/40" />
        )}
      </div>

      <h3 className="font-semibold text-base-content mb-2 text-xl font-montserrat">
        {habitsLength === 0 ? "No habits yet" : "No habits found"}
      </h3>

      <p className="text-base-content/60 mb-6 max-w-md mx-auto">
        {habitsLength === 0
          ? "Start building your first habit to begin your journey towards better routines and consistency."
          : searchTerm
            ? `No habits found matching "${searchTerm}". Try adjusting your search terms.`
            : `No habits found in the ${selectedCategory} category. Try selecting a different category.`}
      </p>

      {habitsLength === 0 ? (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/dashboard/add-habits"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-primary-content font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create Your First Habit
          </Link>
        </motion.div>
      ) : (
        <div className="flex gap-3 justify-center">
          {searchTerm && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-base-300 text-base-content font-medium rounded-lg hover:bg-base-400 transition-all duration-200"
            >
              Clear Search
            </motion.button>
          )}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/dashboard/add-habits"
              className="inline-flex items-center gap-2 px-4 py-2 gradient-primary text-primary-content font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Add New Habit
            </Link>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
