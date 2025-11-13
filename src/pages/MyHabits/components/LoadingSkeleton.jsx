const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="space-y-2">
            <div className="h-8 bg-base-300 rounded w-64 animate-pulse"></div>
            <div className="h-4 bg-base-300 rounded w-48 animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 bg-base-300 rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-base-300 rounded-lg w-40 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-base-200 rounded-xl p-6 h-32 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-base-300 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-base-300 rounded w-16"></div>
                  <div className="h-4 bg-base-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls Skeleton */}
        <div className="bg-base-200 rounded-xl p-6 mb-6 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="h-10 bg-base-300 rounded-lg flex-1"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-base-300 rounded-lg w-20"></div>
              ))}
            </div>
            <div className="h-10 bg-base-300 rounded-lg w-32"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-base-200 rounded-xl p-6 h-64 animate-pulse"
            >
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                    <div className="h-3 bg-base-300 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-base-300 rounded w-16"></div>
                </div>
                <div className="h-6 bg-base-300 rounded w-24"></div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-base-300 rounded w-16"></div>
                    <div className="h-3 bg-base-300 rounded w-12"></div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="flex-1">
                        <div className="h-2 bg-base-300 rounded mb-1"></div>
                        <div className="h-2 bg-base-300 rounded w-3 mx-auto"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-8 bg-base-300 rounded flex-1"></div>
                  <div className="flex gap-1">
                    <div className="h-8 bg-base-300 rounded w-8"></div>
                    <div className="h-8 bg-base-300 rounded w-8"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
