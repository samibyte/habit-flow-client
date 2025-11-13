import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { Sparkles } from "lucide-react";
import { saveAs } from "file-saver";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAnalytics from "../../hooks/useAnalytics";
import { ChartCard, ExportMenu, StatCard } from "./components/AnalyticsCards";
import PageLoader from "../../components/ui/PageLoader";

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [activeInsight, setActiveInsight] = useState(0);
  const exportRef = useRef(null);
  const insightIntervalRef = useRef(null);
  // console.log(habits);
  useEffect(() => {
    (async () => {
      try {
        const uid = user?.uid;
        const res = await axiosSecure.get(`/api/v1/my-habits?uid=${uid}`);
        setHabits(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load habits");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user, axiosSecure]);

  const analytics = useAnalytics(habits, timeRange);

  useEffect(() => {
    insightIntervalRef.current = setInterval(() => {
      setActiveInsight((prev) =>
        analytics?.insights?.length
          ? (prev + 1) % analytics.insights.length
          : 0,
      );
    }, 10000);

    return () => clearInterval(insightIntervalRef.current);
  }, [analytics.insights]);

  const exportCSV = (
    filename = `habit-analytics-${new Date().toISOString().slice(0, 10)}.csv`,
  ) => {
    if (!habits.length) return alert("No data to export.");
    const rows = [
      [
        "id",
        "title",
        "category",
        "createdAt",
        "streak",
        "difficulty",
        "completionCount",
        "completionDates",
      ],
      ...habits.map((h) => [
        h.id || "",
        escapeCsv(h.title || ""),
        escapeCsv(h.category || ""),
        h.createdAt || "",
        h.streak || 0,
        h.difficulty || "",
        (h.completionHistory || []).length,
        escapeCsv((h.completionHistory || []).join(" | ")),
      ]),
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, filename);
  };

  const escapeCsv = (str = "") => `"${(str || "").replace(/"/g, '""')}"`;

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-base-100 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-base-content mb-2 font-montserrat">
              Progress Analytics
            </h1>
            <p className="text-base-content/60">
              AI-powered insights and predictive analysis for your habit journey
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {["7d", "30d", "90d", "1y"].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-2 rounded-lg text-sm ${timeRange === r ? "gradient-primary text-white" : "bg-base-200"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <ExportMenu exportCSV={exportCSV} />
          </div>
        </div>

        {/* Analytics charts */}
        <section ref={exportRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Active Habits"
              value={analytics.stats?.totalHabits}
            />
            <StatCard
              label="Total Completions"
              value={analytics.stats?.totalCompletions}
            />
            <StatCard
              label="Best Streak"
              value={`${analytics.stats?.bestStreak} days`}
            />
            <StatCard
              label="Completion Rate"
              value={`${analytics.stats?.completionRate}%`}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="30-Day Completions">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={analytics.monthlyData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="completed" stroke="#7c3aed" fill="#ede7ff" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Predicted Next Week">
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={analytics.predictions || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Category Performance">
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={analytics.categoryData || []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar
                    dataKey="performance"
                    stroke="#7c3aed"
                    fill="#7c3aed"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Difficulty Analysis">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={analytics.difficultyData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="difficulty" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="successRate" fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>

        <section className="relative h-[50vh] flex flex-col items-center justify-center text-center text-base-content dark:text-white px-4">
          <h1 className="text-4xl font-bold mb-3">
            Your Habit Journey in Motion
          </h1>
          <p className="text-base max-w-xl mb-8 opacity-80">
            Watch your habits evolve, visualize progress, and stay consistent
            with every small win.
          </p>

          {/* Insight card */}
          <div className="flex items-center gap-3 justify-center">
            {analytics.insights?.length > 0 && (
              <motion.div
                key={activeInsight}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="p-5 bg-base-200/90 dark:bg-base-300/90 rounded-xl text-center max-w-3xl shadow-lg backdrop-blur-md"
              >
                <div className="flex justify-center mb-2">
                  {(() => {
                    const Icon = analytics.insights[activeInsight].icon;
                    return <Icon className="w-6 h-6 text-primary" />;
                  })()}
                </div>
                <div className="font-semibold text-lg">
                  {analytics.insights[activeInsight].title}
                </div>
                <div className="text-sm text-base-content/70 dark:text-base-content/60">
                  {analytics.insights[activeInsight].description}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer */}
        <section className="mt-8 text-sm text-base-content/60 text-center">
          <div className="mb-2">
            Analytics updated in real-time • Last refresh: Just now
          </div>
          <div className="inline-flex items-center gap-3 bg-base-100 border border-base-300 rounded-xl px-6 py-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <div>
              <div className="font-medium">Insights ready</div>
              <div className="text-xs">
                Export full report or schedule weekly insights.
              </div>
            </div>
            <div className="ml-4 flex gap-2">
              <ExportMenu exportCSV={exportCSV} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
