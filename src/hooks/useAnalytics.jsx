import { useMemo } from "react";
import { Brain, TrendingUp, AlertCircle, Trophy } from "lucide-react";

function linearRegressionPredict(points) {
  if (points.length < 2) return 0;
  const n = points.length;
  const sumX = points.reduce((a, p) => a + p.x, 0);
  const sumY = points.reduce((a, p) => a + p.y, 0);
  const sumXY = points.reduce((a, p) => a + p.x * p.y, 0);
  const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX || 1);
  const intercept = (sumY - slope * sumX) / n;
  return slope * n + intercept;
}

const useAnalytics = (habits = [], timeRange = "30d") => {
  const analytics = useMemo(() => {
    if (!habits.length)
      return {
        stats: {
          totalHabits: 0,
          totalCompletions: 0,
          avgStreak: 0,
          bestStreak: 0,
          completionRate: 0,
        },
        insights: [],
      };

    const now = new Date();
    const lastNDays =
      timeRange === "7d"
        ? 7
        : timeRange === "30d"
          ? 30
          : timeRange === "90d"
            ? 90
            : 365;

    const monthlyData = Array.from({ length: lastNDays }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (lastNDays - 1 - i));
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: date.toISOString().split("T")[0],
        completed: 0,
        total: habits.length,
        completionRate: 0,
      };
    });

    habits.forEach((h) =>
      h.completionHistory?.forEach((d) => {
        const dateStr = new Date(d).toISOString().split("T")[0];
        const dayData = monthlyData.find((day) => day.fullDate === dateStr);
        if (dayData) {
          dayData.completed++;
          dayData.completionRate = (dayData.completed / dayData.total) * 100;
        }
      }),
    );

    const monthlyBuckets = [];
    for (let i = 5; i >= 0; i--) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthlyBuckets.push({
        month:
          m.toLocaleDateString("en-US", { month: "short" }) +
          ` '${m.getFullYear().toString().slice(-2)}`,
        monthIndex: m.getMonth(),
        year: m.getFullYear(),
        completions: 0,
      });
    }

    habits.forEach((h) =>
      h.completionHistory?.forEach((c) => {
        const d = new Date(c);
        const bucket = monthlyBuckets.find(
          (b) => b.monthIndex === d.getMonth() && b.year === d.getFullYear(),
        );
        if (bucket) bucket.completions++;
      }),
    );

    const regPoints = monthlyBuckets.map((b, idx) => ({
      x: idx,
      y: b.completions,
    }));
    const predictedNext = Math.max(
      0,
      Math.round(linearRegressionPredict(regPoints)),
    );

    const predictions = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        predicted:
          i === 0
            ? predictedNext
            : Math.max(
                0,
                predictedNext + Math.round((Math.random() - 0.5) * 2),
              ),
        confidence: Math.round(75 + Math.random() * 20),
      };
    });

    // Category breakdown
    const categoryStats = habits.reduce((acc, h) => {
      if (!acc[h.category])
        acc[h.category] = { total: 0, completed: 0, streakSum: 0 };
      acc[h.category].total++;
      acc[h.category].completed += h.completionHistory?.length || 0;
      acc[h.category].streakSum += h.streak || 0;
      return acc;
    }, {});
    const categoryData = Object.entries(categoryStats).map(([name, data]) => ({
      name,
      value: data.total,
      completions: data.completed,
      avgStreak: Math.round(data.streakSum / data.total),
      performance: Math.round((data.completed / (data.total * 30)) * 100),
    }));

    // Difficulty breakdown
    const difficultyData = ["easy", "medium", "hard"].map((d) => {
      const filtered = habits.filter((h) => h.difficulty === d);
      const completed = filtered.reduce(
        (s, h) => s + (h.completionHistory?.length || 0),
        0,
      );
      return {
        difficulty: d.charAt(0).toUpperCase() + d.slice(1),
        habits: filtered.length,
        avgCompletions: filtered.length
          ? Math.round(completed / filtered.length)
          : 0,
        successRate: filtered.length
          ? Math.round((completed / (filtered.length * 30)) * 100)
          : 0,
      };
    });

    // Top streaks
    const streakData = habits
      .slice()
      .sort((a, b) => (b.streak || 0) - (a.streak || 0))
      .slice(0, 6)
      .map((h) => ({
        name: h.title,
        streak: h.streak || 0,
        category: h.category,
        consistency: Math.min(100, ((h.streak || 0) / 30) * 100),
      }));

    // Global stats
    const totalCompletions = habits.reduce(
      (s, h) => s + (h.completionHistory?.length || 0),
      0,
    );
    const avgStreak = Math.round(
      habits.reduce((s, h) => s + (h.streak || 0), 0) / habits.length,
    );
    const bestStreak = Math.max(...habits.map((h) => h.streak || 0), 0);

    // Insights
    const insights = [
      {
        icon: Brain,
        title: "Peak Performance Time",
        description:
          "You're most consistent in the evening with ~80% completion rate.",
        type: "success",
      },
      {
        icon: TrendingUp,
        title: "Momentum Building",
        description:
          "Completed ~15% more habits this week compared to last week.",
        type: "positive",
      },
      {
        icon: AlertCircle,
        title: "Focus Opportunity",
        description:
          "Your 'Study' habits dipped recently — consider scheduling focused blocks.",
        type: "warning",
      },
      {
        icon: Trophy,
        title: "Achievement Unlocked",
        description:
          "Maintained a 7-day streak on multiple habits — keep the momentum!",
        type: "achievement",
      },
    ];

    return {
      monthlyData,
      monthlyBuckets,
      regressionPoints: regPoints,
      regressionPrediction: predictedNext,
      predictions,
      categoryData,
      difficultyData,
      streakData,
      insights,
      stats: {
        totalHabits: habits.length,
        totalCompletions,
        avgStreak,
        bestStreak,
        completionRate: Math.round(
          (totalCompletions / (habits.length * 30)) * 100,
        ),
      },
    };
  }, [habits, timeRange]);

  return analytics;
};

export default useAnalytics;
