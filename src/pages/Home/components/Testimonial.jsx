import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Star,
  Quote,
  TrendingUp,
  Target,
  Award,
  Sparkles,
  Heart,
  Calendar,
  CheckCircle,
  Zap,
  User,
  Globe,
  Clock,
  Users,
} from "lucide-react";

const Testimonial = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer",
      location: "San Francisco, CA",
      avatar: "SC",
      streak: 128,
      habits: ["Daily Meditation", "Morning Exercise", "Reading"],
      quote:
        "HabitFlow transformed my morning routine. The streak system kept me motivated when willpower wasn't enough. 128 days strong!",
      rating: 5,
      category: "productivity",
      before: "Struggled with consistency",
      after: "3 solid habits, 128-day streak",
      color: "gradient-primary",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "College Student",
      location: "Austin, TX",
      avatar: "MJ",
      streak: 45,
      habits: ["Study 2 hours", "Journaling", "Water intake"],
      quote:
        "As a student, consistency was my biggest challenge. The 30-day blueprint gave me structure, and now studying feels automatic.",
      rating: 5,
      category: "academic",
      before: "Inconsistent study habits",
      after: "4.0 GPA this semester",
      color: "gradient-success",
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Marketing Director",
      location: "New York, NY",
      avatar: "PS",
      streak: 92,
      habits: ["Daily Planning", "Digital Detox", "Learning Spanish"],
      quote:
        "The progress visualization made all the difference. Seeing my streak grow gave me the dopamine hit I needed to keep going.",
      rating: 5,
      category: "wellness",
      before: "Always overwhelmed",
      after: "Mastered work-life balance",
      color: "gradient-progress",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 4,
      name: "David Park",
      role: "Entrepreneur",
      location: "Seoul, South Korea",
      avatar: "DP",
      streak: 210,
      habits: ["Morning Run", "Deep Work Blocks", "Gratitude Practice"],
      quote:
        "Building my company required discipline. HabitFlow gave me the system to build the habits that built my business.",
      rating: 5,
      category: "business",
      before: "No time management system",
      after: "$1M+ revenue milestone",
      color: "gradient-streak",
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "Nurse",
      location: "London, UK",
      avatar: "EW",
      streak: 67,
      habits: ["Healthy Meal Prep", "Stress Management", "Regular Sleep"],
      quote:
        "Working night shifts made consistency impossible. The flexible reminders and streak protection saved my habit journey.",
      rating: 5,
      category: "health",
      before: "Poor work-life balance",
      after: "Lost 15lbs, better sleep",
      color: "gradient-primary-dark",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: 6,
      name: "Alex Rivera",
      role: "Freelancer",
      location: "Barcelona, Spain",
      avatar: "AR",
      streak: 156,
      habits: ["Client Follow-ups", "Skill Development", "Networking"],
      quote:
        "As a freelancer, I'm accountable to myself. The community features gave me the accountability I was missing.",
      rating: 4.5,
      category: "productivity",
      before: "Inconsistent client work",
      after: "Tripled freelance income",
      color: "gradient-success",
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  const categories = [
    { id: "all", label: "All Stories", count: testimonials.length },
    {
      id: "productivity",
      label: "Productivity",
      count: 2,
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: "health",
      label: "Health",
      count: 2,
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: "academic",
      label: "Academic",
      count: 1,
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: "business",
      label: "Business",
      count: 1,
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const stats = [
    {
      value: "4.9",
      label: "Average Rating",
      icon: <Star className="w-5 h-5" />,
    },
    {
      value: "98%",
      label: "Would Recommend",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      value: "86+",
      label: "Avg. Day Streak",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      value: "100K+",
      label: "Success Stories",
      icon: <User className="w-5 h-5" />,
    },
  ];

  const filteredTestimonials =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
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
            <Quote className="w-4 h-4" />
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4 font-montserrat">
            Real People,{" "}
            <span className="text-gradient-primary">Real Results</span>
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Join thousands who have transformed their lives with consistent
            habit building.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statVariants}
              custom={index}
              whileHover={{ y: -5 }}
              className="bg-base-100 rounded-xl border border-base-300 p-6 text-center habit-card-hover"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-base-content mb-1 font-montserrat">
                {stat.value}
              </div>
              <div className="text-sm text-base-content/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                activeCategory === category.id
                  ? "gradient-primary text-white shadow-lg"
                  : "bg-base-300 text-base-content hover:bg-base-400"
              }`}
            >
              {category.icon && <span>{category.icon}</span>}
              <span className="font-medium">{category.label}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === category.id ? "bg-white/20" : "bg-base-400"
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-base-100 rounded-xl border border-base-300 overflow-hidden group habit-card-hover relative"
              >
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16" />
                </div>

                {/* Top section */}
                <div className={`p-6 ${testimonial.color} text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-white/80 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(testimonial.rating)
                                ? "fill-current"
                                : testimonial.rating % 1 !== 0 &&
                                    i === Math.floor(testimonial.rating)
                                  ? "fill-50"
                                  : ""
                            }`}
                          />
                        ))}
                        <span className="text-sm ml-1">
                          {testimonial.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Streak badge */}
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 w-fit">
                    <Calendar className="w-4 h-4" />
                    <span className="font-bold">
                      {testimonial.streak} day streak
                    </span>
                    {testimonial.streak > 100 && (
                      <Sparkles className="w-4 h-4 ml-1" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Quote */}
                  <div className="mb-6">
                    <Quote className="w-6 h-6 text-base-content/30 mb-3" />
                    <p className="text-base-content/80 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Transformation */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-error mt-2"></div>
                      <div>
                        <p className="text-sm text-base-content/60">Before</p>
                        <p className="font-medium text-base-content">
                          {testimonial.before}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                      <div>
                        <p className="text-sm text-base-content/60">After</p>
                        <p className="font-medium text-base-content">
                          {testimonial.after}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Habits */}
                  <div>
                    <p className="text-sm font-medium text-base-content mb-2">
                      Habits Built:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {testimonial.habits.map((habit, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-300 text-base-content rounded-full text-sm"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {habit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-base-300 bg-base-300/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                      <Globe className="w-4 h-4" />
                      {testimonial.location}
                    </div>
                    <div className="flex items-center gap-2">
                      {testimonial.icon}
                      <span className="text-sm font-medium capitalize">
                        {testimonial.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Global Impact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="rounded-2xl border border-base-300 p-8 mb-12 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-success rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-base-content mb-4 font-montserrat">
                  Join a Global Movement
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-base-content">
                        4,827 years
                      </p>
                      <p className="text-sm text-base-content/60">
                        Of combined habits built
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-semibold text-base-content">
                        142 countries
                      </p>
                      <p className="text-sm text-base-content/60">
                        People building better habits worldwide
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-warning" />
                    <div>
                      <p className="font-semibold text-base-content">
                        2.1M+ habits
                      </p>
                      <p className="text-sm text-base-content/60">
                        Successfully formed and maintained
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="inline-flex items-center gap-2 px-6 py-3 gradient-primary rounded-full text-white font-bold mb-4">
                  <Award className="w-5 h-5" />
                  Top Rated Habit App 2024
                </div>
                <p className="text-base-content/70 max-w-md">
                  Join thousands who have discovered that small, consistent
                  actions lead to extraordinary transformations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 text-warning rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Ready to write your success story?
          </div>
          <h3 className="text-2xl font-bold text-base-content mb-6 font-montserrat">
            Start Your 30-Day Transformation Today
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 gradient-primary text-white rounded-lg font-bold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-base-300 text-base-content rounded-lg font-bold hover:bg-base-400 transition-colors inline-flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              View More Stories
            </button>
          </div>
          <p className="mt-6 text-base-content/60">
            No credit card required • 14-day free trial • Join 100,000+
            successful habit builders
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
