import { motion } from "framer-motion";
import {
  Image,
  Sparkles,
  Target,
  Sunrise,
  Moon,
  Dumbbell,
  BookOpen,
  Briefcase,
} from "lucide-react";

const NoImageSkeleton = ({ category = "General" }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      Morning: Sunrise,
      Work: Briefcase,
      Fitness: Dumbbell,
      Evening: Moon,
      Study: BookOpen,
      General: Target,
    };
    const IconComponent = icons[category] || icons.General;
    return <IconComponent className="w-8 h-8" />;
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      Morning: "from-amber-500 to-orange-500",
      Work: "from-blue-500 to-cyan-500",
      Fitness: "from-emerald-500 to-teal-500",
      Evening: "from-purple-500 to-pink-500",
      Study: "from-indigo-500 to-purple-500",
      General: "from-primary to-secondary",
    };
    return gradients[category] || gradients.General;
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      Morning: "Start your day with purpose and consistency",
      Work: "Build professional excellence through daily practice",
      Fitness: "Transform your health one day at a time",
      Evening: "Wind down with intention and reflection",
      Study: "Expand your knowledge through consistent learning",
      General: "Build better habits through daily commitment",
    };
    return descriptions[category] || descriptions.General;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-64 bg-base-300 rounded-xl border-2 border-base-400 overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-primary to-secondary rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-br from-accent to-warning rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-4"
        >
          <div
            className={`w-16 h-16 rounded-2xl bg-linear-to-br ${getCategoryGradient(category)} flex items-center justify-center text-white shadow-lg`}
          >
            {getCategoryIcon(category)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h3 className="font-semibold text-base-content text-lg font-montserrat">
            Visual Inspiration Pending
          </h3>
          <p className="text-base-content/60 text-sm max-w-xs leading-relaxed">
            {getCategoryDescription(category)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-4 flex items-center gap-2 text-base-content/40 text-xs"
        >
          <Image className="w-3 h-3" />
          <span>Image not provided</span>
        </motion.div>

        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-4 right-4 text-base-content/20"
        >
          <Target className="w-5 h-5" />
        </motion.div>

        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.7, 1.1, 0.7],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-4 left-4 text-base-content/20"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        <motion.div
          animate={{
            borderColor: [
              "rgba(156, 163, 175, 0.5)",
              "rgba(124, 58, 237, 0.3)",
              "rgba(156, 163, 175, 0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 border-2 border-dashed rounded-xl pointer-events-none"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center opacity-0 transition-opacity duration-300"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          className="text-primary text-sm font-medium bg-base-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2"
        >
          <Image className="w-4 h-4" />
          Add visual reference
        </motion.div>
      </motion.div>

      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-base-100/30 to-transparent skew-x-12 transform"
      />
    </motion.div>
  );
};

export default NoImageSkeleton;
