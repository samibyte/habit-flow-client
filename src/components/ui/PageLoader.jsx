import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-16 h-16 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-base-content mb-4 font-montserrat"
        >
          HabitFlow
        </motion.h2>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base-content/70 mb-6"
        >
          Loading your journey...
        </motion.p>

        {/* Animated Progress Bar */}
        <div className="w-48 mx-auto bg-base-300 rounded-full h-1.5 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="h-1.5 gradient-primary rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
