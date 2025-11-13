import React from "react";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-base-300 rounded w-32"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-base-300 rounded-xl"></div>
              <div className="h-32 bg-base-300 rounded-xl"></div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-base-300 rounded-xl"></div>
              <div className="h-32 bg-base-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
