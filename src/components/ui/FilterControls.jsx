import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Grid, List, Filter, SlidersHorizontal } from "lucide-react";

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  selectedCategories = [],
  setSelectedCategories,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onClearAll,
}) => {
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    onClearAll?.();
  };
  const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "streak", label: "Longest Streak" },
    { value: "name", label: "Name A-Z" },
  ];

  const hasActiveFilters = searchTerm || selectedCategories.length > 0;

  return (
    <div className={`space-y-6`}>
      {/* Main Controls Card */}
      <div className="bg-base-100 rounded-2xl border border-base-300 p-6">
        <div className="space-y-4">
          {/* Search and Filters Row */}
          <div className="flex flex-col md:flex-row items-start justify-between md:items-center gap-4">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-base-content mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search habits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-base-200 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-base-content mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategories.includes(category)
                          ? "bg-primary text-primary-content shadow-sm"
                          : "bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort */}
            <div className="lg:col-span-1 ">
              <label className="block text-sm font-medium text-base-content mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select h-auto py-2 min-w-40"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Quick Actions */}
            <div className=" items-center gap-2">
              <label className="block text-sm font-medium text-base-content mb-2">
                View
              </label>
              <div className="flex bg-base-200 border border-base-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/70 hover:text-base-content"
                  }`}
                  title="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/70 hover:text-base-content"
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-base-300/50"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-base-content/60">
                    Active filters:
                  </span>

                  {searchTerm && (
                    <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm">
                      <span>"{searchTerm}"</span>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="hover:text-primary/70 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-lg text-sm"
                    >
                      <span>{category}</span>
                      <button
                        onClick={() => toggleCategory(category)}
                        className="hover:text-secondary/70 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
