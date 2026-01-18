import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Search, Plus, X, Grid, List } from "lucide-react";
import { Link } from "react-router";
import PublicHabitCard from "../../components/ui/PublicHabitCard";
import useAxios from "../../hooks/useAxios";
import PublicHabitItem from "./components/PublicHabitItem";
import HabitCardSkeleton from "../../components/ui/HabitCardSkeleton";
import FilterControls from "../../components/ui/FilterControls";

const BrowseHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const axiosInstance = useAxios();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/api/v1/habits");
        setHabits(response.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [axiosInstance]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  // Filter and sort habits
  const filteredHabits = habits
    .filter((habit) => {
      const matchesSearch =
        searchTerm === "" ||
        habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(habit.category);

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "streak":
          return (b.streak || 0) - (a.streak || 0);
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <title>Habit Flow | Browse Habits</title>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-3">
            Browse Habits
          </h1>
          <p className="text-base-content/60 mb-6 max-w-2xl mx-auto">
            Discover and get inspired by habits from our community.
            {" Start building better routines today."}
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/dashboard/add-habits"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-primary-content font-semibold rounded-lg hover:shadow-lg transition-all duration-200 "
            >
              <Plus className="w-4 h-4" />
              Add New Habit
            </Link>
          </motion.div>
        </div>

        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between my-6 gap-3">
          <div>
            <h2 className="text-xl font-semibold text-base-content">
              {filteredHabits?.length} Habit
              {filteredHabits?.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-base-content/60 text-sm">
              {selectedCategories.length > 0 &&
                `In ${selectedCategories.join(", ")}`}
              {selectedCategories.length > 0 && searchTerm && " • "}
              {searchTerm && `Matching "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Habits card*/}

        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[...Array(8)].map((_, index) => (
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
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${filteredHabits?.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredHabits?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-base-content/40" />
                  </div>
                  <h3 className="font-semibold text-base-content mb-2">
                    No habits found
                  </h3>
                  <p className="text-base-content/60 mb-4 max-w-md mx-auto">
                    {searchTerm || selectedCategories.length > 0
                      ? "Try adjusting your search terms or filters"
                      : "No public habits available yet. Be the first to create one!"}
                  </p>
                  {(searchTerm || selectedCategories.length > 0) && (
                    <button
                      onClick={clearAllFilters}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Clear all filters
                    </button>
                  )}
                  {!searchTerm && selectedCategories.length === 0 && (
                    <Link
                      to="/dashboard/add-habits"
                      className="inline-block mt-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      Create first habit
                    </Link>
                  )}
                </motion.div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredHabits?.map((habit, index) => (
                    <motion.div
                      key={habit._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <PublicHabitCard habit={habit} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredHabits?.map((habit, index) => (
                    <motion.div
                      key={habit._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <PublicHabitItem habit={habit} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default BrowseHabits;
