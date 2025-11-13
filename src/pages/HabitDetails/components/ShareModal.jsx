import { useState } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const ShareModal = ({ habit, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link");
    }
  };

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
        className="bg-base-100 rounded-xl p-6 w-full max-w-md border border-base-300 habit-card-hover"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-base-content mb-4 font-montserrat">
          Share Habit
        </h3>

        <div className="space-y-4">
          <p className="text-base-content/70">
            Share "{habit.title}" with others to inspire them!
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-3 gradient-primary text-primary-content font-semibold rounded-lg hover:shadow-lg transition-all "
          >
            {copied ? "✓ Copied!" : "Copy Link"}
          </motion.button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-base-300 text-base-content rounded-lg hover:bg-base-400 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;
