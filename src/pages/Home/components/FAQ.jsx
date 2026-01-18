import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  HelpCircle,
  ChevronDown,
  Zap,
  Target,
  Users,
  Shield,
  Sparkles,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  BarChart3,
} from "lucide-react";

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [activeIndex, setActiveIndex] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Zap className="w-5 h-5" />,
      color: "gradient-primary",
      questions: [
        {
          question: "How do I start building my first habit?",
          answer:
            "Start with our 30-day Habit Blueprint. Choose one small habit you can do consistently for 5 minutes daily. Use reminders and track your progress. Most importantly, focus on consistency over intensity in the first week.",
          tips: [
            "Start with just 5 minutes",
            "Use daily reminders",
            "Celebrate day 1",
          ],
        },
        {
          question: "Is HabitFlow free to use?",
          answer:
            "Yes! HabitFlow offers a free plan with all essential features including habit tracking, progress analytics, and basic reminders. Our premium plan unlocks advanced features like detailed analytics, custom reminders, and team features.",
          tips: [
            "Free forever plan",
            "14-day premium trial",
            "No credit card needed",
          ],
        },
        {
          question: "Can I use HabitFlow on multiple devices?",
          answer:
            "Absolutely! HabitFlow syncs seamlessly across all your devices – web, iOS, and Android. Your progress updates in real-time, so you can track habits anywhere, anytime.",
          tips: [
            "Real-time sync",
            "iOS & Android apps",
            "Offline mode available",
          ],
        },
      ],
    },
    {
      title: "Habit Building",
      icon: <Target className="w-5 h-5" />,
      color: "gradient-success",
      questions: [
        {
          question: "What's the best way to stay consistent?",
          answer:
            "Consistency comes from creating a system, not relying on motivation. Use our streak tracking, set up automatic reminders, and join accountability groups. Start small – even 2 minutes counts as a completed habit day.",
          tips: [
            "Track your streak",
            "Set automatic reminders",
            "Find accountability",
          ],
        },
        {
          question: "How do I handle missed days?",
          answer:
            "Missing a day is normal! Don't break the chain – get back on track the next day. Our system helps you analyze patterns and provides personalized recovery plans to prevent future misses.",
          tips: [
            "Don't break the chain",
            "Analyze patterns",
            "Get back quickly",
          ],
        },
        {
          question: "Can I track multiple habits at once?",
          answer:
            "Yes, but we recommend starting with 1-3 habits maximum. Research shows focusing on 1-3 habits at a time leads to 87% better success rates compared to trying to change everything at once.",
          tips: [
            "Start with 1-3 habits",
            "Build sequentially",
            "Focus leads to success",
          ],
        },
      ],
    },
    {
      title: "Features & Tools",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "gradient-progress",
      questions: [
        {
          question: "How does streak tracking work?",
          answer:
            "Your streak counts consecutive days you've completed your habit. Our system accounts for timezones and provides streak protection for one missed day per month. Different streak tiers unlock achievements and rewards.",
          tips: [
            "Consecutive days count",
            "Timezone aware",
            "Streak protection",
          ],
        },
        {
          question: "What kind of analytics do you provide?",
          answer:
            "Get detailed insights including completion rates, best performing times, weekly/monthly progress, consistency scores, and predictive analytics to forecast your success probability.",
          tips: [
            "Completion rates",
            "Best time analytics",
            "Predictive insights",
          ],
        },
        {
          question: "Can I set up custom reminders?",
          answer:
            "Yes! Set multiple reminders per day, choose notification sounds, and customize reminder messages. Premium users get location-based reminders and smart reminders that adapt to your schedule.",
          tips: [
            "Multiple daily reminders",
            "Custom messages",
            "Smart scheduling",
          ],
        },
      ],
    },
    {
      title: "Community & Support",
      icon: <Users className="w-5 h-5" />,
      color: "gradient-streak",
      questions: [
        {
          question: "Is there a community to join?",
          answer:
            "Join our global community of 100,000+ habit builders! Share progress, join challenges, get accountability partners, and participate in group habits. Our community is supportive and science-backed.",
          tips: [
            "100K+ members",
            "Accountability partners",
            "Group challenges",
          ],
        },
        {
          question: "How do I get help if I need it?",
          answer:
            "Get help through in-app chat, email support, community forums, or schedule a 1:1 habit coaching session (premium). Most questions get answered within 2 hours during business hours.",
          tips: ["In-app chat", "24-hour response", "Habit coaching available"],
        },
        {
          question: "Can I share my progress with friends?",
          answer:
            "Yes! Share your streaks and achievements via social media, invite friends to join you, or create private groups for family/teams. Our sharing features respect your privacy – you control what's shared.",
          tips: ["Social sharing", "Private groups", "Privacy controls"],
        },
      ],
    },
  ];

  const quickStats = [
    {
      label: "Active Users",
      value: "100K+",
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: "Habits Formed",
      value: "2M+",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      label: "Avg. Success Rate",
      value: "78%",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      label: "Support Response",
      value: "<2h",
      icon: <Clock className="w-4 h-4" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const accordionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-base-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4 font-montserrat">
            Your Questions, Answered
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto mb-8">
            Everything you need to know about building better habits with
            HabitFlow. Can't find your answer? Our support team is ready to
            help.
          </p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 bg-base-200 rounded-xl"
              >
                <div className="p-2 bg-primary/10 rounded-lg">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-base-content">
                    {stat.value}
                  </div>
                  <div className="text-sm text-base-content/60">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${category.color} text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content font-montserrat">
                    {category.title}
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {category.questions.length} questions
                  </p>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 3 + index;
                  const isActive = activeIndex === globalIndex;

                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-base-300 overflow-hidden"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleAccordion(globalIndex)}
                        className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-base-300/50 transition-colors"
                      >
                        <span className="font-semibold text-base-content pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-base-content/60 shrink-0" />
                        </motion.div>
                      </button>

                      {/* Answer */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            variants={accordionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-2 border-t border-base-300">
                              <p className="text-base-content/70 mb-4 leading-relaxed">
                                {faq.answer}
                              </p>

                              {/* Tips */}
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-base-content">
                                  Quick Tips:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {faq.tips.map((tip, tipIndex) => (
                                    <span
                                      key={tipIndex}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                                    >
                                      <CheckCircle className="w-3 h-3" />
                                      {tip}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="gradient-primary rounded-2xl p-8 text-white overflow-hidden relative"
        >
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 font-montserrat">
              Still have questions?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you succeed. Get personalized
              guidance and join our community of habit builders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-primary rounded-lg font-bold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Contact Support
              </button>
              <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-bold hover:bg-white/30 transition-colors border border-white/30 inline-flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Join Community
              </button>
            </div>
            <p className="mt-6 text-sm text-white/80">
              Average response time: 2 hours • Available 24/7
            </p>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-12 border-t border-base-300"
        >
          <div className="text-center">
            <p className="text-base-content/60 mb-6">Trusted by</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="font-medium text-base-content">
                  SOC 2 Compliant
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                <span className="font-medium text-base-content">
                  4.9/5 App Store
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-info" />
                <span className="font-medium text-base-content">
                  100K+ Users
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
