const EmptyState = () => {
  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
        <h1 className="text-2xl font-bold text-base-content mb-4">
          Habit Not Found
        </h1>
        <Link
          to={location.state?.from || "/dashboard/my-habits"}
          className="btn btn-primary"
        >
          Back to My Habits
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
