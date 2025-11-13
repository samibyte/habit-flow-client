import { useState } from "react";
import { motion } from "motion/react";
import { Image, Eye, EyeOff } from "lucide-react";

const UpdateHabitModal = ({ habit, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: habit.title,
    description: habit.description,
    category: habit.category,
    reminderTime: habit.reminderTime || "",
    imageUrl: habit.imageUrl || "",
    difficulty: habit.difficulty || "medium",
    frequency: habit.frequency || "daily",
    isPublic: habit.isPublic || false,
    goal: habit.goal || "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(habit.imageUrl || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onUpdate({
        ...habit,
        ...formData,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url);
  };

  const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];
  const difficulties = [
    { value: "easy", label: "Easy", color: "text-success" },
    { value: "medium", label: "Medium", color: "text-warning" },
    { value: "hard", label: "Hard", color: "text-error" },
  ];
  const frequencies = ["daily", "weekly", "weekdays"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-base-100 rounded-xl p-6 w-full max-w-md border border-base-300 habit-card-hover max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-base-content mb-4 font-montserrat">
          Update Habit
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Image url input */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-2">
              Habit Image URL
            </label>
            <div className="flex gap-3 items-start">
              {/* Image preview */}
              <div className="shrink-0">
                <div className="w-16 h-16 bg-base-300 rounded-lg border border-base-400 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Habit preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-base-content/40">
                      <Image className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Url input */}
              <div className="flex-1">
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Habit Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="2"
              className="w-full px-3 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-all text-sm"
              placeholder="Describe your habit..."
            />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Goal
            </label>
            <textarea
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              rows="1"
              className="w-full px-3 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-all text-sm"
              placeholder="What do you want to achieve?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="select h-10"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                className="select h-10"
              >
                {difficulties.map((diff) => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-1">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) =>
                  setFormData({ ...formData, frequency: e.target.value })
                }
                className="select h-10"
              >
                {frequencies.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Reminder time */}
            <div>
              <label className="block text-sm font-medium text-base-content mb-1">
                Reminder Time
              </label>
              <input
                type="time"
                value={formData.reminderTime}
                onChange={(e) =>
                  setFormData({ ...formData, reminderTime: e.target.value })
                }
                className="input h-10"
              />
            </div>
          </div>

          {/* Public toggle  */}
          <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg border border-base-300">
            <div className="flex-1">
              <label className="block text-sm font-medium text-base-content mb-0.5">
                Make public
              </label>
              <p className="text-xs text-base-content/60 leading-tight">
                Others can see your habit
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isPublic: !formData.isPublic })
              }
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
                formData.isPublic ? "gradient-primary" : "bg-base-400"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  formData.isPublic ? "translate-x-5" : "translate-x-1"
                }`}
              />
              <span className="sr-only">Toggle public</span>
            </button>
          </div>

          {/* Public status */}
          {formData.isPublic && (
            <div className="flex items-center gap-2 p-2 bg-primary/10 text-primary rounded-lg border border-primary/20 text-sm">
              <Eye className="w-3 h-3" />
              <span>Visible to other users</span>
            </div>
          )}

          {!formData.isPublic && (
            <div className="flex items-center gap-2 p-2 bg-base-300 text-base-content/70 rounded-lg border border-base-300 text-sm">
              <EyeOff className="w-3 h-3" />
              <span>Private habit</span>
            </div>
          )}

          {/* Action button */}
          <div className="flex gap-2 pt-3 border-t border-base-300">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-3 py-2 bg-base-300 text-base-content rounded-lg hover:bg-base-400 transition-colors cursor-pointer text-sm font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="flex-1 px-3 py-2 gradient-primary text-primary-content font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </span>
              ) : (
                "Update Habit"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateHabitModal;
