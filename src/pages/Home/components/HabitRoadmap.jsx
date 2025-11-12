import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Calendar,
  Rocket,
  Crown,
} from "lucide-react";

const HabitRoadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const roadmapStages = [
    {
      phase: "Foundation",
      days: "Days 1-7",
      title: "Start Small & Build Routine",
      description:
        "Focus on consistency over intensity. The goal is to show up, even if it's just for 5 minutes.",
      tips: ["Set micro-goals", "Use reminders", "Celebrate small wins"],
      icon: Rocket,
      color: "gradient-primary",
      progress: 25,
      category: "Foundation",
      emoji: "🌱",
    },
    {
      phase: "Momentum",
      days: "Days 8-14",
      title: "Build Consistency & Track Progress",
      description:
        "The habit starts becoming familiar. Track your progress and notice early benefits.",
      tips: [
        "Use habit tracking",
        "Review weekly progress",
        "Adjust as needed",
      ],
      icon: TrendingUp,
      color: "gradient-success",
      progress: 50,
      category: "Growth",
      emoji: "📈",
    },
    {
      phase: "Transformation",
      days: "Days 15-21",
      title: "Overcome Challenges & Build Resilience",
      description:
        "This is where most people struggle. Push through resistance and make the habit non-negotiable.",
      tips: [
        "Handle setbacks gracefully",
        "Find your 'why'",
        "Create accountability",
      ],
      icon: BarChart3,
      color: "gradient-progress",
      progress: 75,
      category: "Breakthrough",
      emoji: "💪",
    },
    {
      phase: "Mastery",
      days: "Days 22-30",
      title: "Make It Automatic & Scale Up",
      description:
        "The habit becomes second nature. Consider increasing difficulty or adding related habits.",
      tips: [
        "Habit is now automatic",
        "Consider next level goals",
        "Help others get started",
      ],
      icon: Crown,
      color: "gradient-streak",
      progress: 100,
      category: "Mastery",
      emoji: "🏆",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (custom) => ({
      width: `${custom}%`,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-16 bg-base-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <Target className="w-4 h-4" />
            Habit Building Guide
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4 font-montserrat">
            Your 30-Day Habit Blueprint
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Follow this proven roadmap to turn your goals into automatic habits.
            Each phase builds upon the last for lasting change.
          </p>
        </motion.div>

        {/* Roadmap timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-success to-orange-500 transform -translate-x-1/2 hidden md:block"></div>

          {/* Progress dots */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 hidden md:flex flex-col justify-between py-24 transform -translate-x-1/2">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className={`w-4 h-4 rounded-full border-4 border-base-100 ${
                  index === 0
                    ? "bg-primary"
                    : index === 1
                      ? "bg-success"
                      : index === 2
                        ? "bg-info"
                        : "bg-orange-500"
                }`}
              ></motion.div>
            ))}
          </div>

          {/* Roadmap cards */}
          <div className="space-y-8 md:space-y-12">
            {roadmapStages.map((stage, index) => (
              <motion.div
                key={stage.phase}
                variants={cardVariants}
                custom={index}
                className={`flex flex-col md:flex-row items-start gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row"
                }`}
              >
                {/* Mobile node */}
                <div className="flex items-center gap-4 md:hidden">
                  <div
                    className={`w-3 h-3 rounded-full ${stage.color.replace("gradient-", "bg-")}`}
                  ></div>
                  <div className="text-sm font-semibold text-base-content/60">
                    {stage.days}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`flex-1 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} ${index % 2 === 0 ? "md:text-right" : ""}`}
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-base-100 rounded-xl border border-base-300 p-6 hover:border-primary/70 group relative overflow-hidden"
                  >
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${stage.color} text-white`}
                    >
                      <span className="text-lg">{stage.emoji}</span>
                      <span>{stage.phase}</span>
                    </div>

                    {/* Days */}
                    <div className="flex items-center gap-2 mb-3 md:justify-start">
                      <Calendar className="w-4 h-4 text-base-content/60" />
                      <span className="text-sm font-semibold text-base-content/80">
                        {stage.days}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-base-content mb-3 font-montserrat group-hover:text-primary transition-colors">
                      {stage.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base-content/70 mb-4 leading-relaxed">
                      {stage.description}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-base-content">
                          Progress
                        </span>
                        <span className="text-sm text-base-content/60">
                          {stage.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-base-300 rounded-full h-2">
                        <motion.div
                          custom={stage.progress}
                          variants={progressVariants}
                          className={`h-2 rounded-full ${stage.color}`}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-base-content">
                        Key Strategies:
                      </p>
                      <ul className="space-y-1">
                        {stage.tips.map((tip, tipIndex) => (
                          <motion.li
                            key={tipIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                              isInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: -20 }
                            }
                            transition={{
                              delay: 1 + index * 0.3 + tipIndex * 0.1,
                            }}
                            className="flex items-center gap-2 text-sm text-base-content/70"
                          >
                            <CheckCircle className="w-4 h-4 text-success shrink-0" />
                            {tip}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Category tag */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-base-300/50">
                      <stage.icon className="w-4 h-4 text-base-content/60" />
                      <span className="text-xs font-medium text-base-content/60">
                        {stage.category} Phase
                      </span>
                    </div>

                    <div
                      className={`absolute top-0 right-0 w-24 h-24 ${stage.color} opacity-5 rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-10`}
                    ></div>
                  </motion.div>
                </div>

                {/* Desktop node */}
                <div className="hidden md:flex flex-col items-center justify-center w-24 shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-full ${stage.color} flex items-center justify-center text-white mb-2 group-hover:shadow-lg transition-all`}
                  >
                    <stage.icon className="w-5 h-5" />
                  </motion.div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-base-content">
                      {stage.days}
                    </div>
                    <div className="text-xs text-base-content/60">
                      {stage.phase}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HabitRoadmap;
