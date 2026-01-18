import { motion } from "framer-motion";
import { Rocket, Sparkles, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CallToAction = () => {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500K+", label: "Habits Completed" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative py-30"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main card */}
        <div className="bg-linear-to-br from-base-100 via-base-100 to-base-200 rounded-3xl border border-base-300 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left content */}
            <div className="p-8 lg:p-12">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Start Your Transformation
              </motion.span>

              <h2 className="text-3xl lg:text-4xl font-bold text-base-content mb-4 font-montserrat">
                Ready to Build{" "}
                <span className="text-gradient-primary">Lasting Habits</span>?
              </h2>

              <p className="text-lg text-base-content/70 mb-6 leading-relaxed">
                Join thousands of users who've transformed their lives one habit
                at a time. Start your 30-day journey today and see real results.
              </p>

              {/* Stats */}
              <div className="flex gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-base-content font-montserrat">
                      {stat.number}
                    </div>
                    <div className="text-xs text-base-content/60 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/sign-up/#"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 gradient-primary text-primary-content font-semibold rounded-xl hover:shadow-xl transition-all duration-300 group flex-1"
                >
                  <Rocket className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Start Your First Habit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-base-300 text-base-content font-semibold rounded-xl hover:bg-base-400 hover:shadow-lg transition-all duration-300 group flex-1">
                  <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Explore Challenges</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mt-6 pt-6 border-t border-base-300/50"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-base-100"
                    ></div>
                  ))}
                </div>
                <div className="text-sm text-base-content/60">
                  <span className="font-semibold text-base-content">
                    Join 142 others
                  </span>{" "}
                  starting this week
                </div>
              </motion.div>
            </div>

            {/* Right visual */}
            <div className="relative p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-l border-base-300/50">
              <div className="space-y-4">
                {/* Achievement cards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-base-100 rounded-xl p-4 border border-base-300 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-success rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-base-content">
                        7-Day Streak
                      </div>
                      <div className="text-xs text-base-content/60">
                        Average user achievement
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-base-100 rounded-xl p-4 border border-base-300 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-base-content">
                        Community Support
                      </div>
                      <div className="text-xs text-base-content/60">
                        Join group challenges
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20 text-center"
                >
                  <div className="text-2xl font-bold text-base-content mb-2 font-montserrat">
                    30 Days
                  </div>
                  <div className="text-sm text-base-content/60">
                    To build a lasting habit with our roadmap
                  </div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-4 right-8 w-4 h-4 bg-primary rounded-full opacity-60"
              />
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-8 left-6 w-3 h-3 bg-secondary rounded-full opacity-40"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToAction;
