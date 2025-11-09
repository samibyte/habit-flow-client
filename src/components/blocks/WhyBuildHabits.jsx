import { motion } from "framer-motion";
import { Target, Zap, TrendingUp, Award, Sparkles } from "lucide-react";

const WhyBuildHabits = () => {
  const benefits = [
    {
      icon: Target,
      title: "Better Focus",
      description:
        "Build laser-sharp concentration by eliminating decision fatigue through automated daily routines.",
      gradient: "from-blue-500 to-cyan-500",
      color: "primary",
    },
    {
      icon: Zap,
      title: "Increased Energy",
      description:
        "Consistent habits optimize your body's natural rhythms, boosting vitality and reducing burnout.",
      gradient: "from-amber-500 to-orange-500",
      color: "warning",
    },
    {
      icon: TrendingUp,
      title: "Steady Progress",
      description:
        "Small daily improvements compound into remarkable results. 1% better each day equals 37× better in a year.",
      gradient: "from-emerald-500 to-teal-500",
      color: "success",
    },
    {
      icon: Award,
      title: "Reduced Stress",
      description:
        "Turn chaos into calm. Structured habits create predictability and mental clarity in your daily life.",
      gradient: "from-purple-500 to-pink-500",
      color: "secondary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
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

  return (
    <section className="relative py-24 px-6 bg-linear-to-b from-base-100 to-base-200 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 to-secondary/10 rounded-full text-sm font-semibold text-primary mb-4"
          >
            <Sparkles className="w-4 h-4" />
            The Science of Success
          </motion.span>

          <h2 className="font-montserrat text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-base-content to-neutral bg-clip-text">
            Why Build Habits?
          </h2>

          <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Habits are the compound interest of self-improvement. Small changes
            today create extraordinary transformations tomorrow.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group relative"
              >
                <div className="card rounded-md bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 h-full">
                  <div className="card-body p-8">
                    {/* Icon with gradient background */}
                    <div
                      className={`inline-flex p-4 rounded-xl bg-linear-to-br ${benefit.gradient} mb-5 text-white transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 w-fit`}
                    >
                      <Icon className="w-12 h-12" />
                    </div>

                    {/* Title */}
                    <h3 className="card-title text-2xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base-content/70 leading-relaxed text-sm">
                      {benefit.description}
                    </p>

                    {/* Decorative corner accent */}
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`}
                    ></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="card bg-linear-to-r from-base-100 to-base-300  border border-primary/20 inline-block rounded-md">
            <div className="card-body p-8">
              <p className="text-lg text-base-content/80 font-medium italic max-w-2xl">
                "We are what we repeatedly do. Excellence, then, is not an act,
                but a habit."
              </p>
              <p className="text-sm text-base-content/50 mt-2">— Aristotle</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;
