import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2"; // Import SweetAlert2
import StatsCards from "./components/StatsCards";
import HabitsListView from "./components/HabitsTableView";
import HabitsCardView from "./components/HabitsCalendarView";
import UpdateHabitModal from "./components/UpdateHabitModal";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { BarChart3, Plus } from "lucide-react";
import EmptyState from "./components/EmptyState";
import FilterControls from "../../components/ui/FilterControls";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyHabits = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("streak");
  const [completing, setCompleting] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    (async () => {
      try {
        const uid = await user?.uid;
        const res = await axiosSecure.get(`/api/v1/my-habits?uid=${uid}`);
        setHabits(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load habits");
      } finally {
        setLoading(false);
      }
    })();
  }, [user, axiosSecure]);

  const totalStreaks = habits.reduce(
    (sum, habit) => sum + (habit.streak || 0),
    0,
  );
  const completedToday = habits.filter((habit) => {
    const today = new Date().toDateString();
    return habit.completionHistory?.some(
      (date) => new Date(date).toDateString() === today,
    );
  }).length;

  const getWeeklyProgress = (completionHistory) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    }).reverse();

    return last7Days.map((day) => ({
      date: day,
      completed:
        completionHistory?.some(
          (historyDate) => new Date(historyDate).toDateString() === day,
        ) || false,
    }));
  };

  const handleMarkComplete = async (habitId) => {
    setCompleting(true);
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const response = await axiosSecure.post(
        `/api/v1/habits/${habitId}/complete`,
        { timezone: userTimezone },
      );

      const updatedHabit = response.data?.habit;

      if (updatedHabit) {
        setHabits((prev) =>
          prev.map((habit) => (habit._id === habitId ? updatedHabit : habit)),
        );
        toast.success("Habit marked complete! ", {
          duration: 500,
        });
      } else {
        // fallback
        toast.success(response.data?.message || "Habit marked complete!", {
          duration: 500,
        });
      }
    } catch (err) {
      console.error(err);
      const serverMessage = err.response?.data?.message;
      if (serverMessage) {
        toast.error(serverMessage);
      } else {
        toast.error("Failed to mark habit complete");
      }
    } finally {
      setCompleting(false);
    }
  };

  const handleDelete = async (habitId) => {
    const habitName = habits.find((h) => h._id === habitId)?.title;

    // Sweet alert confirmation
    const result = await Swal.fire({
      title: "Delete Habit?",
      html: `Are you sure you want to delete "<strong>${habitName}</strong>"?<br>This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "var(--color-base-100)",
      color: "var(--color-base-content)",
      customClass: {
        popup: "bg-base-300 border border-base-300 rounded-xl",
        title: "text-base-content font-montserrat",
        htmlContainer: "text-base-content/70",
        confirmButton: "btn btn-error btn-xs py-0",
        cancelButton: "btn btn-ghost btn-xs py-0",
      },
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/api/v1/habits/${habitId}`);
        setHabits((prev) => prev.filter((habit) => habit._id !== habitId));
        toast.success("Habit deleted successfully");

        // Success confirmation
        Swal.fire({
          title: "Deleted!",
          text: `"${habitName}" has been deleted.`,
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "var(--color-base-100)",
          color: "var(--color-base-content)",
          customClass: {
            popup: "bg-base-100 border border-base-300 rounded-xl",
            title: "text-base-content font-montserrat",
            confirmButton: "btn btn-error btn-xs py-0 px-3",
          },
        });
      } catch (error) {
        toast.error("Failed to delete habit");

        // Error notification
        Swal.fire({
          title: "Error!",
          text: "Failed to delete habit. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          color: "var(--color-base-content)",
          customClass: {
            popup: "bg-base-100 border border-base-300 rounded-xl",
            title: "text-base-content font-montserrat",
          },
        });
      }
    }
  };

  const handleUpdate = async (updatedHabit) => {
    try {
      // Create a clean update object with only allowed fields
      const updateData = {
        title: updatedHabit.title,
        description: updatedHabit.description,
        category: updatedHabit.category,
        reminderTime: updatedHabit.reminderTime,
        imageUrl: updatedHabit.imageUrl,
        isPublic: updatedHabit.isPublic,
      };

      const { data } = await axiosSecure.patch(
        `/api/v1/habits/${updatedHabit._id}`,
        updateData,
      );
      console.log(data);

      if (!data?.habit) {
        throw new Error("Invalid response from server");
      }

      setHabits((prev) =>
        prev.map((habit) =>
          habit._id === updatedHabit._id ? data.habit : habit,
        ),
      );

      toast.success("Habit updated successfully", { duration: 5000 });
    } catch (err) {
      console.error("Error updating habit:", err);

      // Enhanced error handling
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(err.response?.data?.message || "Failed to update habit", {
          duration: 5000,
        });
      }
    } finally {
      setShowUpdateModal(false);
      setEditingHabit(null);
    }
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

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-base-content mb-2 font-montserrat">
              My Habits
            </h1>
            <p className="text-base-content/60">
              Track your progress and build lasting routines
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-content font-medium rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/add-habits"
                className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-primary-content font-semibold rounded-lg hover:shadow-lg transition-all duration-200 "
              >
                <Plus className="w-5 h-5" />
                Add New Habit
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards
          habits={habits}
          totalStreaks={totalStreaks}
          completedToday={completedToday}
        />

        {/* Controls */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onClearAll={() => console.log("All filters cleared")}
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

        {/* Habits Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredHabits.length === 0 ? (
              <EmptyState
                habitsLength={habits.length}
                searchTerm={searchTerm}
                selectedCategories={selectedCategories}
              />
            ) : viewMode === "list" ? (
              <HabitsListView
                habits={filteredHabits}
                onEdit={setEditingHabit}
                onUpdateModal={setShowUpdateModal}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
                completing={completing}
              />
            ) : (
              <HabitsCardView
                habits={filteredHabits}
                onEdit={setEditingHabit}
                onUpdateModal={setShowUpdateModal}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
                completing={completing}
                getWeeklyProgress={getWeeklyProgress}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Update habit modal */}
      <AnimatePresence>
        {showUpdateModal && (
          <UpdateHabitModal
            habit={editingHabit}
            onClose={() => {
              setShowUpdateModal(false);
              setEditingHabit(null);
            }}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyHabits;
