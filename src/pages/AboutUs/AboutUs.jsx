import { motion } from "motion/react";
import {
  Heart,
  Users,
  Target,
  Sparkles,
  Globe,
  Award,
  Rocket,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link } from "react-router";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Former behavioral psychologist turned tech entrepreneur",
      avatarColor: "bg-primary/20 text-primary",
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      bio: "Full-stack developer with passion for productivity tools",
      avatarColor: "bg-info/20 text-info",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Designer",
      bio: "UI/UX specialist focused on creating intuitive experiences",
      avatarColor: "bg-warning/20 text-warning",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      name: "Jamie Wilson",
      role: "Growth Lead",
      bio: "Marketing expert with background in wellness apps",
      avatarColor: "bg-success/20 text-success",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const values = [
    {
      title: "User-Centric Design",
      description: "Every feature is built with our users' needs at the core",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Data Privacy First",
      description:
        "Your data belongs to you. We never sell personal information",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Continuous Improvement",
      description: "We're constantly evolving based on user feedback",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: "Evidence-Based Approach",
      description: "Our methods are backed by behavioral science research",
      icon: <Target className="w-8 h-8" />,
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Founded",
      description: "HabitFlow was born from a personal need",
    },
    {
      year: "2023",
      title: "First Users",
      description: "Reached 10,000 active users",
    },
    {
      year: "2024",
      title: "Mobile Launch",
      description: "Released iOS & Android apps",
    },
    {
      year: "2025",
      title: "100K Users",
      description: "Community reached 100,000 members",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <title>Habit Flow | About Us</title>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Story</span>
              </div>

              <h1 className="text-5xl font-bold text-base-content mb-6 font-montserrat">
                Building Better{" "}
                <span className="text-gradient-primary">Habits</span>, Together
              </h1>

              <p className="text-xl text-base-content/70 mb-8 leading-relaxed">
                HabitFlow was founded in 2022 with a simple mission: make habit
                formation accessible, enjoyable, and effective for everyone.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="stat bg-base-200 rounded-xl px-6 py-4 text-center">
                  <div className="stat-value text-3xl font-bold text-primary">
                    100K+
                  </div>
                  <div className="stat-desc text-base-content/60">
                    Active Users
                  </div>
                </div>
                <div className="stat bg-base-200 rounded-xl px-6 py-4 text-center">
                  <div className="stat-value text-3xl font-bold text-success">
                    2M+
                  </div>
                  <div className="stat-desc text-base-content/60">
                    Habits Formed
                  </div>
                </div>
                <div className="stat bg-base-200 rounded-xl px-6 py-4 text-center">
                  <div className="stat-value text-3xl font-bold text-warning">
                    30+
                  </div>
                  <div className="stat-desc text-base-content/60">
                    Countries
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 rounded-2xl p-8 md:p-12 mb-16 border border-base-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-base-content mb-4 font-montserrat">
                  Our Mission
                </h2>
                <p className="text-lg text-base-content/80 mb-6">
                  To empower individuals worldwide to build lasting positive
                  habits through intuitive technology, scientific principles,
                  and a supportive community.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-base-content text-center mb-12 font-montserrat">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover"
                >
                  <div
                    className={`p-3 rounded-lg w-fit mb-4 ${
                      index === 0
                        ? "bg-primary/20 text-primary"
                        : index === 1
                          ? "bg-info/20 text-info"
                          : index === 2
                            ? "bg-success/20 text-success"
                            : "bg-warning/20 text-warning"
                    }`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-base-content mb-2 font-montserrat">
                    {value.title}
                  </h3>
                  <p className="text-base-content/70">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-base-content font-montserrat">
                Meet Our Team
              </h2>
              <div className="flex items-center gap-2 text-base-content/60">
                <Users className="w-5 h-5" />
                <span>Passionate about your success</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover text-center"
                >
                  <div
                    className={`w-20 h-20 rounded-full ${member.avatarColor} flex items-center justify-center mx-auto mb-4`}
                  >
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-bold text-base-content mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-base-content/70 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-base-content text-center mb-12 font-montserrat">
              Our Journey
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-warning"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className="w-1/2 px-8">
                      <div
                        className={`bg-base-100 rounded-xl border border-base-300 p-6 habit-card-hover ${index % 2 === 0 ? "text-right" : "text-left"}`}
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-base-300 rounded-full mb-3">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-base-content mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-base-content/70">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-base-100"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="gradient-hero rounded-2xl p-8 md:p-12 text-center text-primary-content overflow-hidden relative"
          >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6 font-montserrat">
                Ready to Transform Your Habits?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join our community of 100,000+ people building better lives, one
                habit at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/sign-up"
                  className="px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <Rocket className="w-5 h-5" />
                </Link>
                <Link
                  to="/my-habits"
                  className="px-8 py-4 bg-white/20 text-white rounded-lg font-bold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Explore Features
                </Link>
              </div>
              <p className="mt-6 text-sm opacity-80">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
